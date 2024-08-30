import React, { MouseEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button, Modal, Progress } from 'antd';
import moment from 'moment';
import currencySymbolMap from 'currency-symbol-map';
import NoInvitationImg from '@assets/images/noInvitation.png';
import invitationsApi from '@shared/api/invitations/invitationsApi';
import QueryHandler from '@shared/components/common/queryHandler/queryHandler';
import { InvitationType } from '@shared/api/invitations/scheme';
import { DECLINED_STATUS } from '@shared/constants/invitations';
import useToggle from '@shared/hooks/useToggle';
import Icon from '@shared/components/common/icons';
import colors from '@shared/theme/colors';
import FallbackImage from '@shared/constants/fallbackImage';
import { generateSessions, getPreviousInvitations, isValidImageUrl } from '@app/invitations/utils';
import './_invitationsDesktop.scss';

export default function InvitationsDesktop() {
  const getInvitationsQuery = invitationsApi.getInvitations.useQuery();
  const { data: invitations } = getInvitationsQuery;

  const previousInvitations = invitations && invitations.length && getPreviousInvitations(invitations);

  return (
    <div className="page">
      <div className="invitations-container">
        <div className="invitations-head">
          <h2>Invitations</h2>
          <p>Subscribe to packages designed especially for you</p>
        </div>
        <div className="invitations-content">
          <QueryHandler queries={[getInvitationsQuery]}>
            {invitations && invitations.length ? (
              invitations.map((invitation: InvitationType) => (
                <InvitationCard data={invitation} key={invitation.id} />
              ))) : (
              <NoInvitationScreen />
            )}
          </QueryHandler>
          <QueryHandler queries={[getInvitationsQuery]}>
            {previousInvitations && !!previousInvitations.length && (
              <>
                <h2 className="h2">Previous invitations</h2>
                <div className="pre-allo-blocks">
                  {previousInvitations.map((invitation: InvitationType) => (
                    <PreviousInvitationCard data={invitation} key={invitation.id} />
                  ))}
                </div>
              </>
            )}
          </QueryHandler>
        </div>
      </div>
    </div>
  );
}

function InvitationCard({ data }: { data: InvitationType }) {
  const router = useRouter();
  const [openCancelModal, toggleCancelModal] = useToggle();

  const declineInvitation = invitationsApi.declineInvitation.useMutation({
    onError: () => {
      toast.error('Failed to decline invitation. Please try again.');
    },
    onSuccess: () => {
      toast.success('Invitation is declined successfully.');
      invitationsApi.getInvitations.queryFn();
    }
  });

  const totalSessions = generateSessions(
    data.allocate_from, data.allocate_to, JSON.parse(data.allocate_time_slot),
  );
  const completedSessions = totalSessions?.filter(({ isPast }) => isPast);

  const confirmed = !!(data.b_facilities && data.b_facilities.length);
  const declined = data.status === DECLINED_STATUS;
  const completed = completedSessions.length === totalSessions.length;
  const pending = !confirmed && !declined;

  const dateRange = `${moment(data.allocate_from).format('MMM DD')} - ${moment(data.allocate_to).format('MMM DD, YYYY')}`;
  const title = confirmed ? 'Confirmed' : 'For you';

  const onDecline = (event: MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
    toggleCancelModal();
  }

  const onConfirmDecline = () => {
    declineInvitation.mutate({ invitation_id: data.id });
  }

  const onAccept = (event: MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
    router.push(`/checkout?activityId=${data.sub_activities.id}`);
  }

  if (!data || declined || completed) {
    return;
  }

  return (
    <>
      <h2 className="h2">{title}</h2>
      <div className="inov-block" onClick={() => router.push(`/invitations/${data.id}`)}>
        <div className="col info">
          <h3 className="h3">{data.sub_activities.name}</h3>
          <p>{`${data.facility_details.city}, ${data.facility_details.country}`}</p>
          {confirmed && (
            <span className="price">
              {currencySymbolMap(data.facility_details.base_currency)}
              {data.sub_activities.base_price}
            </span>
          )}
          {pending && (
            <a className="btn-primary" onClick={onAccept}>
              Reserve now for {currencySymbolMap(data.facility_details.base_currency)}
              {data.sub_activities.base_price}
            </a>
          )}
          <div className="bottom-info">
            <div className="data">
              <Icon name="calendarDots" height={24} width={24} />
              <span>{dateRange}</span>
            </div>
            <div className="sessions">
              <Icon name="session" height={24} width={24} />
              <span>
                {confirmed
                  ? (
                    <>
                      {`${completedSessions.length} / ${totalSessions.length} sessions completed`}
                      <Progress
                        percent={(completedSessions.length / totalSessions.length) * 100}
                        showInfo={false}
                        strokeColor={colors.primary[500]}
                        className="progress-bar"
                      />
                    </>
                  )
                  : `${totalSessions.length} sessions`
                }
              </span>
            </div>
            {pending && (
              <div className="btn-holder">
                <a className="btn-gray" onClick={onAccept}>Accept</a>
                <a className="btn-outline" onClick={onDecline}>Decline</a>
              </div>
            )}
          </div>
        </div >
        <div className="col img">
          {confirmed && (
            <span className="tag progress">In Progress</span>
          )}
          {pending && (
            <span className="tag pending">Pending</span>
          )}
          <Image src={isValidImageUrl(data.sub_activities.img_1) ? data.sub_activities.img_1 : FallbackImage} alt="ImagePage" width={649} height={416} />
        </div>
      </div >
      <CancelInvitationModal open={openCancelModal} toggleModal={toggleCancelModal} onConfirm={onConfirmDecline} />
    </>
  );
}

function PreviousInvitationCard({ data }: { data: InvitationType }) {
  const router = useRouter();

  const totalSessions = generateSessions(
    data.allocate_from, data.allocate_to, JSON.parse(data.allocate_time_slot),
  );
  const completedSessions = totalSessions?.filter(({ isPast }) => isPast);
  const declined = data.status === DECLINED_STATUS;
  const completed = completedSessions.length === totalSessions.length;
  const dateRange = `${moment(data.allocate_from).format('MMM DD')} - ${moment(data.allocate_to).format('MMM DD, YYYY')}`;

  if (!data || (!declined && !completed)) {
    return;
  }

  return (
    <div className="col" onClick={() => router.push(`/invitations/${data.id}`)}>
      <div className="img-col">
        <Image src={isValidImageUrl(data.sub_activities.img_1) ? data.sub_activities.img_1 : FallbackImage} alt="ImagePage" width="182" height="182" />
      </div>
      <div className="info-col">
        <h3>{data.sub_activities.name}</h3>
        <span className="by">Hosted by {data.facility_details.facility_name}</span>
        <span className="date">{dateRange}</span>
        <span className="session">{totalSessions.length} sessions</span>
        {declined ? (<span className="declined tag">Declined</span>) : (
          completed && (<span className="complete tag">Completed</span>)
        )}
      </div>
    </div>
  );
}

function NoInvitationScreen() {
  return (
    <>
      <div className="inov-block">
        <div className="col info">
          <h3 className="h3">You don't have any invitations...yet!</h3>
          <p className="info-text">Get in touch with a host to begin designing your own package</p>
          <a href="#" className="btn-outline">Explore hosts</a>
        </div>
        <div className="col img">
          <Image src={NoInvitationImg} alt="ImagePage" />
        </div>
      </div>
      <div className="invitations-footer">
        <p>
          Can't find your invitation here?
          <a href="#">Contact Support</a>
          .
        </p>
      </div>
    </>
  );
}

function CancelInvitationModal({
  open,
  toggleModal,
  onConfirm,
}: {
  open: boolean;
  toggleModal: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal
      open={open}
      centered
      onCancel={toggleModal}
      footer={null}
      width={678}
      title={<p className="declineInvitationTitle">Decline invitation?</p>}
      styles={{ content: { padding: 60 } }}
    >
      <div className="declineInvitationModal">
        <p className="content">Are you sure you want to decline this invitation? You can message the host to find other arrangements for timings.</p>
        <div className="button-holder">
          <Button type="text" className="button normal" onClick={toggleModal}>Cancel</Button>
          <Button type="primary" className="button red" onClick={onConfirm}>Decline</Button>
        </div>
      </div>
    </Modal>
  );
}
