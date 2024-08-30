import React, { useState } from 'react';
import moment from 'moment';
import { Col, Drawer, Row } from 'antd';
import currencySymbolMap from 'currency-symbol-map';
import ProfileHeader from '@app/profile/components/mobile/profileHeader/profileHeader';
import Image from 'next/image';
import authApi from '@shared/api/authentication/authenticationApi';
import { PastActivityType } from '@shared/api/authentication/schemas';
import ActivityCarousel from '@shared/components/mobile/activityCarousel/activityCarousel';
import ActivityAttributes from '@shared/components/common/attributes/attribites';
import Icon from '@shared/components/common/icons';
import CollapsedText from '@shared/components/mobile/collapsedText/collapsedText';
import '@app/profile/loginAndSecurity/containers/desktop/_loginAndSecurityDesktop.scss';
import HostCard from '@shared/components/mobile/hostCard/hostCard';
import './_pastActivities.scss';

const fallback = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/991px-Placeholder_view_vector.svg.png';

// TODO: Implement Pagination in Past Activities

export default function PastActivities() {
  const { data: pastActivities } = authApi.getPastActivities.useQuery();
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<PastActivityType>();

  return (
    <div className="pastActivitiesContainer">
      <ProfileHeader title="Past activities" />
      <div>
        {pastActivities?.map((activity) => (
          <PastActivityCard
            imageUrl={activity.sub_activity?.img_1_url ?? ''}
            activityTitle={activity.sub_activity?.name}
            hostName={activity.facility?.facility_name}
            date={`${moment(activity.from_date).format('MMM DD, YY')}${activity.to_date ? ` - ${moment(activity.to_date).format('ddd, DD MMM')}` : ''}`}
            timeSlot={activity.time_slots[0]?.time_slot ?? ''}
            status={activity.status}
            handleClick={() => {
              setOpenDetails(true);
              setSelectedActivity(activity);
            }}
          />
        ))}
      </div>
      <PastActivityBottomSheet open={openDetails} setOpen={setOpenDetails} pastActivity={selectedActivity} />
    </div>
  );
}

function PastActivityCard({
  imageUrl, activityTitle, hostName, date, timeSlot, status, handleClick,
}: {
  imageUrl: string;
  activityTitle: string;
  hostName: string;
  date: string;
  timeSlot: string;
  status: string;
  handleClick: () => void;
}) {
  return (
    <>
      <div className="pastActivityCardContainer" onClick={handleClick}>
        <Image className="image" width={72} height={72} src={imageUrl || fallback} alt="activityImage" />
        <div className="titleContainer">
          <p className="title">{activityTitle}</p>
          <p className="hostedBy">
            Hosted By
            {hostName}
            {status === 'Cancelled' && (
              <span>
                &nbsp;•&nbsp;
                <span className="cancelledStatus">{status}</span>
              </span>
            )}
          </p>
          <p className="date">
            {date}
            {' '}
            •
            {' '}
            {timeSlot}
          </p>
        </div>
      </div>
      <div className="pastActivityCardContainer">
        <div style={{ width: 100 }} />
        <div className="dividor" style={{ marginBottom: 12 }} />
      </div>
    </>
  );
}

function PastActivityBottomSheet({ open, setOpen, pastActivity }: {
  open: boolean;
  setOpen: (value: boolean) => void;
  pastActivity: PastActivityType | undefined;
}) {
  if (!pastActivity) {
    return;
  }

  return (
    <Drawer
      title={(
        <Row justify="space-between" align="middle" className="pastActivityDrawerHeader">
          <Icon name="cross" width={24} height={24} onClick={() => setOpen(false)} className="icon" />
          <Icon name="exportIcon" width={24} height={24} onClick={() => setOpen(false)} className="icon" />
        </Row>
      )}
      placement="bottom"
      closable={false}
      onClose={() => setOpen(false)}
      open={open}
      height="auto"
      styles={{
        content: { height: '100vh', padding: 20 },
        header: { border: 'none', padding: '18px 0 24px 0' },
        body: { padding: 0, paddingBottom: 100 },
      }}
    >
      <div className="pastActivityDrawerContainer">
        <Row gutter={[0, 24]}>
          <Col span={24}>
            <h1 className="heading">
              {pastActivity.status === 'cancelled' ? 'Your booking was cancelled' : `Your booking with ${pastActivity.facility.facility_name}`}
            </h1>
          </Col>
          <Col span={24}>
            <ActivityCarousel
              img1={pastActivity.sub_activity.img_1_url || fallback}
              img2={pastActivity.sub_activity.img_2_url || fallback}
              img3={pastActivity.sub_activity.img_3_url || fallback}
              img4={pastActivity.sub_activity.img_4_url || fallback}
              img5={pastActivity.sub_activity.img_5_url || fallback}
              width={350}
              height={325}
            />
          </Col>
          {pastActivity.status === 'cancelled' && (
            <>
              <Col span={24}>
                <div className="attributes">
                  <ActivityAttributes
                    icon="handCoins"
                    name={null}
                    description={`
                    We sent you ${currencySymbolMap(pastActivity.currency)} ${pastActivity.booking_activity.booking_fac_details.grand_total} ${pastActivity.currency} refund on 7 May.
                    If you haven't received it yet, contact your bank to find out when it'll arrive.
                  `}
                  />
                </div>
              </Col>
              <Col span={24}>
                <div className="dividor" />
              </Col>
            </>
          )}
          <Col span={24}>
            <div className="attributes">
              <ActivityAttributes icon="activity" name="Activity" description={pastActivity.sub_activity?.name || ''} />
            </div>
          </Col>
          <Col span={24}>
            <div className="attributes">
              <ActivityAttributes
                icon="location"
                name="Location"
                description={`${pastActivity.facility?.city}, ${pastActivity.facility?.country}`}
              />
            </div>
          </Col>
          <Col span={24}>
            <div className="attributes">
              <ActivityAttributes
                icon="calendarBank"
                name="Date"
                description={`${moment(pastActivity.from_date).format('MMM DD, YY')}${pastActivity.to_date ? ` - ${moment(pastActivity.to_date).format('ddd, DD MMM')}` : ''}`}
              />
            </div>
          </Col>
          <Col span={24}>
            <div className="attributes">
              <ActivityAttributes
                icon="clock"
                name="Time slots"
                description={pastActivity.time_slots[0]?.time_slot ?? ''}
              />
            </div>
          </Col>
          <Col span={24}>
            <div className="dividor" />
          </Col>
          {pastActivity.status !== 'cancelled' && (
            <>
              <Col span={24}>
                <Row justify="space-between">
                  <Col>
                    <p className="paidAmountHeading">Amount Paid</p>
                  </Col>
                  <Col>
                    <p className="paidAmount">
                      {currencySymbolMap(pastActivity.currency)}
                      {pastActivity.booking_activity.booking_fac_details.grand_total}
                    </p>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <div className="dividor" />
              </Col>
            </>
          )}
          <Col span={24}>
            <Row justify="space-between" align="middle">
              <Col>
                <Row style={{ columnGap: 12 }}>
                  <Col>
                    <Icon name="message" width={24} height={24} />
                  </Col>
                  <Col>
                    <Row gutter={[0, 4]}>
                      <Col span={24}>
                        <p className="messageHost">Message your Host</p>
                      </Col>
                      <Col span={24}>
                        <p className="messageHost messageHostName">{pastActivity.facility.facility_name}</p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Icon name="arrowNext" width={16} height={16} />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <div className="dividor" />
          </Col>
          {pastActivity.status === 'cancelled' ? (
            <Col span={24}>
              <h5 className="collapsedTextHeading">Cancellation Policy</h5>
              <CollapsedText
                side="left"
                maxHeight={60}
                description={`
                  <ul>
                    <li>This is a limit.</li>
                    <li>This is a limit.</li>
                    <li>This is a limit.</li>
                    <li>This is a limit.</li>
                    <li>This is a limit.</li>
                    <li>This is a limit.</li>
                    <li>This is a limit.</li>
                    <li>This is a limit.</li>
                    <li>This is a limit.</li>
                    <li>This is a limit.</li>
                  </ul>
                `}
              />
            </Col>
          ) : (
            <Col span={24}>
              <h5 className="collapsedTextHeading">Itinerary</h5>
              <CollapsedText
                side="left"
                maxHeight={80}
                description={`
                  <p><strong>Day 1 - Arrive and explore El Rocio</strong></p>
                  <ul>
                    <li>You can explore Évora's historical center with its winding streets and white-washed buildings.</li>
                    <li>Visit prominent landmarks such as the Roman Temple of Diana and the Évora Cathedral.</li>
                  </ul>
                  <p><strong>Day 1 - Arrive and explore El Rocio</strong></p>
                  <ul>
                    <li>You can explore Évora's historical center with its winding streets and white-washed buildings.</li>
                    <li>Visit prominent landmarks such as the Roman Temple of Diana and the Évora Cathedral.</li>
                  </ul>
                `}
              />
            </Col>
          )}
          <Col span={24}>
            <div className="dividor" />
          </Col>
          <Col span={24}>
            <HostCard
              hostName={pastActivity.facility.facility_name}
              reviewsCount={10}
              rating={5}
            />
          </Col>
        </Row>
      </div>
    </Drawer>
  );
}
