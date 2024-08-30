import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Error from "next/error"
import { useRouter } from 'next/navigation';
import parse from 'html-react-parser';
import { Progress, Spin } from 'antd';
import moment from 'moment';
import currencySymbolMap from 'currency-symbol-map';
import invitationsApi from '@shared/api/invitations/invitationsApi';
import QueryHandler from '@shared/components/common/queryHandler/queryHandler';
import { DECLINED_STATUS } from '@shared/constants/invitations';
import useToggle from '@shared/hooks/useToggle';
import Icon from '@shared/components/common/icons';
import colors from '@shared/theme/colors';
import FallbackImage from '@shared/constants/fallbackImage';
import LocationMap from '@shared/components/desktop/locationMap/locationMap';
import { generateSessions } from '@app/invitations/utils';
import Animations from '@shared/components/common/animations';
import './_invitationDesktop.scss';

type SessionType = {
  day: string;
  date: string;
  timeSlot: string;
  isPast: boolean;
  remainingHours: number;
  remainingDays: number;
};

export default function InvitationDesktop({ invitationId }: { invitationId: string }) {
  const getInvitationQuery = invitationsApi.getInvitations.useQuery();
  const { data: invitations } = getInvitationQuery;
  const [pos, setPos] = useState({ lat: 10, lng: 10 });
  const router = useRouter();

  const data = useMemo(
    () => invitations?.find((d) => d.id.toString() === invitationId),
    [invitations],
  );

  if (!invitations) {
    return (<Animations name="cavagoLoader" style={{ width: 100, height: 100 }} />);
  }

  if (!data) {
    return (<Error statusCode={404} title="Page Not Found" />);
  }

  const totalSessions = generateSessions(
    data.allocate_from, data.allocate_to, JSON.parse(data.allocate_time_slot),
  );
  const completedSessions = totalSessions?.filter(({ isPast }) => isPast);
  const upcomingSessions = totalSessions?.filter(({ isPast }) => !isPast);

  const confirmed = !!(data.b_facilities && data.b_facilities.length);
  const declined = data.status === DECLINED_STATUS;
  const completed = totalSessions.length === completedSessions.length;
  const pending = !confirmed && !declined;
  const dateRange = `${moment(data.allocate_from).format('MMM DD')} - ${moment(data.allocate_to).format('MMM DD, YYYY')}`;

  return (
    <QueryHandler queries={[getInvitationQuery]}>
      <div className="page">
        <div className="sticky-header">
          <div className="head-container">
            <h1>{data.sub_activities.name}</h1>
            <div className="date">
              <Icon name="calendarDots" width={24} height={24} />
              {dateRange}
            </div>
            {confirmed && (
              <div className="created">
                <Progress
                  percent={(completedSessions.length / totalSessions.length) * 100}
                  showInfo={false}
                  strokeColor={colors.primary[500]}
                  size={{ width: 336 }}
                />
              </div>
            )}
            <div className="sessions">
              <Icon name="session" width={24} height={24} />
              {confirmed
                ? `${completedSessions.length} / ${totalSessions.length} sessions completed`
                : `${totalSessions.length} sessions`}
            </div>
            {(pending || declined) && (
              <div className="created">
                <Icon name="frame" width={24} height={24} />
                Curated for you
              </div>
            )}
            {pending && (
              <div className="created">
                <a className="btn-primary" onClick={() => { router.push(`/checkout?activityId=${data.sub_activities.id}`) }}>
                  Reserve now for {currencySymbolMap(data.facility_details.base_currency)}
                  {data.sub_activities.base_price}
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="invitations-container">
          <div className="invitations-head no-border">
            <a onClick={router.back}>
              <Icon name="backArrow" width={36} height={36} />
            </a>
          </div>
          <div className="invitations-detail-block">
            <div className="detail-banner">
              <ul className="social-link">
                <li>
                  <a>
                    <span className="ico">
                      <Icon name="share" />
                    </span>
                    Share
                  </a>
                </li>
              </ul>
              <h2>{data.sub_activities.name}</h2>
              <span className="text">
                {`${data.facility_details.city}, ${data.facility_details.country}`}
              </span>
              {confirmed && !completed && (
                <span className="tag inprogress">In Progress</span>
              )}
              {confirmed && completed && (
                <span className="tag complete">Completed</span>
              )}
              {declined && (
                <span className="tag declined">Declined</span>
              )}
              {pending && (
                <span className="tag pending">Pending</span>
              )}
              <Image src={FallbackImage} alt="ImagePage" width={649} height={480} />
            </div>
            <div className="invitations-detail-content">
              <div className="head-detail">
                <div className="date">
                  <Icon name="calendarDots" width={24} height={24} color={colors.neutrals[400]} />
                  {dateRange}
                </div>
                {confirmed && (
                  <div className="created">
                    <Progress
                      percent={(completedSessions.length / totalSessions.length) * 100}
                      showInfo={false}
                      strokeColor={colors.primary[500]}
                      size={{ width: 336 }}
                    />
                  </div>
                )}
                <div className="sessions">
                  <Icon name="session" width={24} height={24} color={colors.neutrals[400]} />
                  {confirmed
                    ? `${completedSessions.length} / ${totalSessions.length} sessions completed`
                    : `${totalSessions.length} sessions`}
                </div>
                {(pending || declined) && (
                  <div className="created">
                    <Icon name="frame" width={24} height={24} color={colors.neutrals[400]} />
                    Curated for you
                  </div>
                )}
                {pending && (
                  <div className="created">
                    <a className="btn-primary" onClick={() => { router.push(`/checkout?activityId=${data.sub_activities.id}`) }}>
                      Reserve now for {currencySymbolMap(data.facility_details.base_currency)}
                      {data.sub_activities.base_price}
                    </a>
                  </div>
                )}
              </div>
              {!!totalSessions?.length && (
                <div className="content-block">
                  <h2>Scheduled Sessions</h2>
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
                </div>
              )}
              <div className="content-block">
                <a href="#" className="link">
                  <Icon name="message" width={40} height={36} color={colors.neutrals[400]} />
                  <div className="info">
                    <h3>Message your host</h3>
                    <p>{data.facility_details.facility_name}</p>
                  </div>
                  <div className="arrow">
                    <Icon name="arrowNext" width={20} height={21} />
                  </div>
                </a>
              </div>
              <div className="content-block">
                <a href="#" className="link">
                  <Icon name="location" width={48} height={49} />
                  <div className="info">
                    <h3>Get directions</h3>
                    <p>{`${data.facility_details.city}, ${data.facility_details.country}`}</p>
                  </div>
                  <div className="arrow">
                    <Icon name="arrowNext" width={20} height={21} />
                  </div>
                </a>
              </div>
              {!!data.sub_activities.session_description && (
                <div className="content-block">
                  <h2>Generic details</h2>
                  <div>
                    {parse(data.sub_activities.session_description || '')}
                  </div>
                </div>
              )}
              <div className="content-block">
                <div className="map">
                  <LocationMap
                    pos={pos}
                    header
                    description={data.facility_details.overview_quick_view?.specialities_descrioption || ''}
                    title={data.facility_details.overview_quick_view?.specialities_title || ''}
                  />
                </div>
              </div>
              <div className="host-detail-content">
                <div className="host-info-block">
                  <div className="img-holder">
                    <Image src={data.facility_details.profile_picture ?? FallbackImage} alt="ImagePage" width="80" height="80" />
                  </div>
                  <div className="info">
                    <h3>{data.facility_details.facility_name}</h3>
                    <span className="host">Host</span>
                  </div>
                </div>
                <div className="host-info-detail">
                  <div className="numbering">
                    <h4>
                      4.84
                      <Icon name="outlinedStar" width={20} height={20} />
                    </h4>
                    <span className="text">Rating</span>
                  </div>
                  <div className="numbering">
                    <h4>770</h4>
                    <span className="text">Reviews</span>
                  </div>
                  <div className="numbering">
                    <h4>3 years</h4>
                    <span className="text">Hosting on Cavago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </QueryHandler >
  );
}

function ScheduledSessions({ upcomingSessions, completedSessions }: { upcomingSessions: SessionType[], completedSessions: SessionType[] }) {
  const [completedTab, toggleCompletedTab] = useToggle();

  return (
    <>
      {!!(completedSessions?.length) && !!(upcomingSessions?.length) && (
        <ul className="session-tabs">
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
