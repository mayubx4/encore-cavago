import React, { useState } from 'react';
import Image from 'next/image';
import moment from 'moment';
import { Divider, Drawer } from 'antd';
import currencySymbolMap from 'currency-symbol-map';
import invitationsApi from '@shared/api/invitations/invitationsApi';
import QueryHandler from '@shared/components/common/queryHandler/queryHandler';
import './_invitationsMobile.scss';
import Icon from '@shared/components/common/icons';
import FallbackImage from '@shared/constants/fallbackImage';
import { InvitationType } from '@shared/api/invitations/scheme';
import ActivityCarousel from '@shared/components/mobile/activityCarousel/activityCarousel';
import useToggle from '@shared/hooks/useToggle';
import colors from '@shared/theme/colors';
import HostCard from '@shared/components/mobile/hostCard/hostCard';
import LocationMobile from '@shared/components/mobile/locationMobile/locationMobile';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { DECLINED_STATUS } from '@shared/constants/invitations';
import { generateSessions } from '@app/invitations/utils';
import CollapsedText from '@shared/components/mobile/collapsedText/collapsedText';

type SessionType = {
  day: string;
  date: string;
  timeSlot: string;
  isPast: boolean;
  remainingHours: number;
  remainingDays: number;
};

export default function InvitationsMobile() {
  const getInvitationsQuery = invitationsApi.getInvitations.useQuery();
  const { data: invitations } = getInvitationsQuery;

  return (
    <div className="page booking">
      <div className="booking-head">
        <h2>Bookings</h2>
        <p>Keep a track of all your bookings.</p>
      </div>
      <ul className="booking-tabs">
        <li>
          <a href="/bookings">My bookings</a>
        </li>
        <li className="active">
          <a href="/invitations">Invitations</a>
        </li>
      </ul>
      <QueryHandler queries={[getInvitationsQuery]}>
        {invitations && invitations.length ? (
          invitations.map((invitation: InvitationType) => (
            <InvitationCard data={invitation} key={invitation.id} />
          ))) : (
          <NoInvitationScreen />
        )}
      </QueryHandler>
    </div>
  );
}

function InvitationCard({ data }: { data: InvitationType }) {
  const searchParams = useSearchParams();
  const invitationId = searchParams.get('invitationId');

  const [openDetails, toggleOpenDetails] = useToggle({ initialValue: Number(invitationId || 0) === data.id });

  const totalSessions = generateSessions(
    data.allocate_from, data.allocate_to, JSON.parse(data.allocate_time_slot),
  );
  const completedSessions = totalSessions?.filter(({ isPast }) => isPast);
  const upcomingSessions = totalSessions?.filter(({ isPast }) => !isPast);
  const confirmed = data.b_facilities && data.b_facilities.length;
  const declined = data.status === DECLINED_STATUS;
  const dateRange = `${moment(data.allocate_from).format('MMM DD')} - ${moment(data.allocate_to).format('MMM DD, YYYY')}`;

  if (!data) {
    return;
  }

  return (
    <div className="booking-block">
      <div className="info-img-block" onClick={() => { toggleOpenDetails(); }}>
        {confirmed ? (
          <>
            <span className="tag confirmed">
              Confirmed
            </span>
            <span className="tag time">
              {upcomingSessions && upcomingSessions.length ? `IN ${upcomingSessions[0].remainingHours} HR` : 'Completed'}
            </span>
          </>
        ) : (
          <>
            {declined ? (
              <span className="tag declined">Declined</span>
            ) : (
              <span className="tag pending">Pending</span>
            )}
            <span className="tag for-you">
              <Icon name="userCheck" width={12} height={12} />
              <span>For You</span>
            </span>
          </>
        )}
        <div className="allocation-footer">
          {confirmed && upcomingSessions && upcomingSessions.length ? (
            <div className="confirmed">
              <h4>
                {`${data.sub_activities.name} • ${dateRange}`}
              </h4>
              <Divider className="divider" />
              <h3>
                {`Session ${completedSessions.length + 1} - ${upcomingSessions[0].day}`}
              </h3>
              <p>{`${data.facility_details.city}, ${data.facility_details.country}`}</p>
            </div>
          ) : (
            <>
              <h3>
                <span className="price">
                  {currencySymbolMap(data.facility_details.base_currency)}
                  {data.sub_activities.base_price}
                </span>
                {data.sub_activities.name}
              </h3>
              <p>{`${data.facility_details.city}, ${data.facility_details.country}`}</p>
            </>
          )}

          <ul className="booking-list-info">
            <li>
              <span className="gray">
                Sessions:
                <span>
                  {
                    `${confirmed
                      ? `${completedSessions.length} / ${totalSessions.length}`
                      : totalSessions.length}`
                  }
                </span>
              </span>
            </li>
            <li>
              <span className="white">
                {confirmed && upcomingSessions && upcomingSessions.length ? (
                  moment(upcomingSessions[0].date).format('MMM DD, YYYY')
                ) : dateRange}
              </span>
            </li>
          </ul>
        </div>
        <Image src={data.sub_activities.img_1 ?? FallbackImage} alt="ImgBooking" height={350} width={300} />
      </div>
      <InvitationsBottomSheet
        key={data.id}
        open={openDetails}
        toggleOpen={toggleOpenDetails}
        data={data}
        totalSessions={totalSessions}
        upcomingSessions={upcomingSessions}
        completedSessions={completedSessions}
      />
    </div>
  );
}

function NoInvitationScreen() {
  return (
    <div className="no-booking">
      <div className="no-booking-content">
        <div>
          <h2>You don't have any bookings...yet!</h2>
          <p>In the meantime, explore Cavago and find your next adventure.</p>
        </div>
        <div>
          <button>Start Searching</button>
        </div>
      </div>
    </div>
  );
}


function InvitationsBottomSheet({ open, toggleOpen, data, totalSessions, upcomingSessions, completedSessions, }: {
  open: boolean;
  toggleOpen: () => void;
  data: InvitationType;
  totalSessions: SessionType[];
  upcomingSessions: SessionType[];
  completedSessions: SessionType[];
}) {
  const router = useRouter();

  const declineInvitation = invitationsApi.declineInvitation.useMutation({
    onError: () => {
      toast.error('Failed to decline invitation. Please try again.');
    },
    onSuccess: () => {
      toast.success('Invitation is declined successfully.');
      invitationsApi.getInvitations.queryFn();
    }
  });

  const confirmed = !!(data.b_facilities && data.b_facilities.length);
  const declined = data.status === DECLINED_STATUS;
  const pending = !confirmed && !declined;
  const completed = totalSessions.length === completedSessions.length;
  const [pos, setPos] = useState({ lat: 10, lng: 10 });

  const onDecline = () => {
    toggleOpen();
    declineInvitation.mutate({ invitation_id: data.id });
  }

  if (!data) {
    return;
  }

  return (
    <Drawer
      title={null}
      placement="bottom"
      closable={false}
      onClose={() => {
        toggleOpen()
        router.replace('/invitations')
      }}
      open={open}
      height="auto"
      styles={{
        content: { height: '100vh' },
        body: { padding: 0, paddingBottom: 100 },
        footer: { padding: 0 }
      }}
      footer={pending && [
        <div className="invitation-drawer-footer" key={data.id}>
          <div className="grandTotal">
            <p>
              Grand Total
              <span>
                {`${currencySymbolMap(data.facility_details.base_currency)}${data.sub_activities.base_price}`}
              </span>
            </p>
          </div>
          <div className="btn-holder">
            <a className="btn btn-outline" onClick={onDecline}>Decline</a>
            <a className="btn btn-yellow" onClick={() => { router.push(`/checkout?activityId=${data.sub_activities.id}`) }}>
              Accept
            </a>
          </div>
        </div>
      ]}
    >
      <div className="page booking">
        <a
          onClick={() => {
            toggleOpen()
            router.replace('/invitations')
          }}
          className="back-link close"
        >
          <Icon name="cross" width={24} height={24} />
        </a>
        <div className="booking-banner-mobile">
          <div className="slide">
            <ActivityCarousel
              img1={data.sub_activities.img_1 ?? FallbackImage}
              img2={data.sub_activities.img_2 ?? FallbackImage}
              img3={data.sub_activities.img_3 ?? FallbackImage}
              img4={data.sub_activities.img_4 ?? FallbackImage}
              img5={data.sub_activities.img_5 ?? FallbackImage}
              height={340}
            />
          </div>
        </div>
        <div className="booking-content-mobile">
          <div className="allocation-m-h">
            <div className="info">
              <h2>Sessions schedule</h2>
              <p>See what's next and explore all session details.</p>
            </div>
            <div className="tag-holder">
              {confirmed && (
                <span className="tag confirmed">Confirmed</span>
              )}
              {pending && (
                <span className="tag pending">Pending</span>
              )}
              {declined && (
                <span className="tag declined">Declined</span>
              )}
            </div>
          </div>
          {confirmed && !completed ? (
            <ScheduledSessions upcomingSessions={upcomingSessions} completedSessions={completedSessions} />
          ) : (
            <div className="session-list">
              {totalSessions?.map((session, index) => (
                <div key={index} className="session done">
                  <h3>Session {index + 1} - {session.day}</h3>
                  <div className="session-time">
                    <span>{session.date}</span>
                    <span className="dot">•</span>
                    <span>{session.timeSlot}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="booking-info">
            <div className="info">
              <div className="info-list">
                <Icon name="activity" width={24} height={25} color={colors.neutrals[300]} />
                <div className="detail">
                  <span className="title">Activity</span>
                  <span className="des">{data.sub_activities.name}</span>
                </div>
              </div>
              <div className="info-list">
                <Icon name="location" width={24} height={25} color={colors.neutrals[300]} />
                <div className="detail">
                  <span className="title">Location</span>
                  <span className="des">
                    {`${data.facility_details.city}, ${data.facility_details.country}`}
                  </span>
                </div>
              </div>
              <div className="info-list">
                <Icon name="session" width={24} height={25} color={colors.neutrals[300]} />
                <div className="detail">
                  <span className="title">Sessions</span>
                  <span className="des">{totalSessions.length}</span>
                </div>
              </div>
              <div className="info-list">
                <Icon name="calendarDots" width={24} height={25} />
                <div className="detail">
                  <span className="title">Schedule</span>
                  <span className="des">
                    {`${moment(data.allocate_from).format('MMM DD')} - ${moment(data.allocate_to).format('MMM DD, YYYY')}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {!!(confirmed && data.b_facilities?.length) && (
            <div className="booking-price-block">
              <span>Amount paid</span>
              <span className="price">{data.sub_activities.base_price}</span>
            </div>
          )}
          <div className="b-m-content">
            <a href="#" className="link">
              <Icon name="message" width={24} height={24} />
              <div className="info">
                <span>Message your host</span>
              </div>
              <div className="arrow">
                <Icon name="arrowNext" width={16} height={16} />
              </div>
            </a>
          </div>
          <div className="b-m-content">
            <a href="#" className="link">
              <Icon name="location" width={24} height={24} />
              <div className="info">
                <span>Get directions</span>
              </div>
              <div className="arrow">
                <Icon name="arrowNext" width={16} height={16} />
              </div>
            </a>
          </div>
          {!!data.sub_activities.session_description && (
            <div className="b-m-content">
              <h2>Generic details</h2>
              <div className="c-holder">
                <CollapsedText
                  side="left"
                  maxHeight={80}
                  description={data.sub_activities.session_description || ''}
                />
              </div>
            </div>
          )}
          <div className="b-m-content">
            <LocationMobile
              pos={pos}
              zoom={10}
              description={data.facility_details.overview_quick_view?.specialities_descrioption || ''}
              title={data.facility_details.overview_quick_view?.specialities_title || ''}
            />
          </div>
          <div className="b-m-content">
            <HostCard
              hostName={data.facility_details.facility_name}
              reviewsCount={10}
              rating={5}
              profilePicture={data.facility_details.profile_picture ?? FallbackImage}
            />
          </div>
        </div>
      </div>
    </Drawer >
  );
}

function ScheduledSessions({ upcomingSessions, completedSessions }: { upcomingSessions: SessionType[], completedSessions: SessionType[] }) {
  const [completedTab, toggleCompletedTab] = useToggle();

  return (
    <>
      {!!(completedSessions?.length) && !!(upcomingSessions?.length) && (
        <ul className="booking-tabs">
          <li className={`${completedTab ? '' : 'active'}`} onClick={() => toggleCompletedTab()}>
            <a>Upcoming</a>
          </li>
          <li className={`${completedTab ? 'active' : ''}`} onClick={() => toggleCompletedTab()}>
            <a>Completed</a>
          </li>
        </ul>
      )}
      <div className="session-list">
        {!completedTab && upcomingSessions?.map((session, index) => (
          <div key={index} className={`session ${index < 1 ? 'upcoming' : 'done'}`}>
            {index < 1 ? (
              <span className="upcoming-text">
                {session.remainingDays > 0 ? `IN ${session.remainingDays} DAYS` : `IN ${session.remainingHours} HRS`}
              </span>
            ) : null}
            <h3>Session {index + 1 + completedSessions.length} - {session.day}</h3>
            <div className="session-time">
              <span>{session.date}</span>
              <span className="dot">•</span>
              <span>{session.timeSlot}</span>
            </div>
          </div>
        ))
        }
        {
          completedTab && completedSessions?.map((session, index) => (
            <div key={index} className="session done">
              <h3>Session {index + 1} - {session.day}</h3>
              <div className="session-time">
                <span>{session.date}</span>
                <span className="dot">•</span>
                <span>{session.timeSlot}</span>
              </div>
            </div>
          ))
        }
      </div >
    </>
  );
}
