import bookingsApi from '@shared/api/bookings/bookingsApi';
import Icon from '@shared/components/common/icons';
import ActivityCarousel from '@shared/components/mobile/activityCarousel/activityCarousel';
import {
  Button, Col, Divider, Row, Space, Spin,
} from 'antd';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import './_bookingDetailsMobile.scss';
import ActivityAttributes from '@shared/components/common/attributes/attribites';
import Title from '@shared/wrappers/Title';
import colors from '@shared/theme/colors';
import CollapsedText from '@shared/components/mobile/collapsedText/collapsedText';
import LocationMobile from '@shared/components/mobile/locationMobile/locationMobile';
import HostCard from '@shared/components/mobile/hostCard/hostCard';
import MessageHost from '../messageHost/messageHost';

export default function BookingDetailsMobile(
  { id, facilityId }: { id: string, facilityId: string },
) {
  const getBookingDetailsQuery = bookingsApi.getBookingDetails.useQuery({ id, facilityId });
  const { data } = getBookingDetailsQuery;
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);

  const toggleMessage = () => {
    setShowMessage(!showMessage);
  };

  if (!getBookingDetailsQuery.isLoading && !data) {
    router.push('/bookings');
  }

  if (getBookingDetailsQuery.isLoading || !data) {
    return <Spin />;
  }

  const remainingDays = moment(data.from_date).diff(moment(), 'days');
  const remainingHours = moment(data.from_date).diff(moment(), 'hours') % 24;
  const remainingMinutes = moment(data.from_date).diff(moment(), 'minutes') % 60;
  const remainingSeconds = moment(data.from_date).diff(moment(), 'seconds') % 60;
  let dateString = moment(data.from_date).format('DD MMM, YYYY');
  if (data.to_date) {
    dateString = `${dateString} - ${moment(data.to_date).format('DD MMM, YYYY')}`;
  }
  const timeSlots = JSON.parse(data.time_slots || '[]');

  return (
    <>
      {showMessage ? (
        <MessageHost toggleBack={toggleMessage} data={data} />
      ) : (
        <div className="bookingDetailsContainer">
          <div className="images">
            <Button className="cross" onClick={() => router.push('/bookings')} icon={<Icon name="cross" width={24} height={24} />} />
            <ActivityCarousel
              img1=""
              img2=""
              img3=""
              img4=""
              img5=""
              height={340}
            />
          </div>
          <div className="attributes">
            <span className={`pill ${data.status === 'Accepted' ? 'success' : 'failure'}`}>{data.status}</span>
            <ActivityAttributes icon="activity" name="Activity" description={data.m_activity_name || ''} />
            <ActivityAttributes icon="dropLoc" name="Location" description={data.booking_fac_details.facility_details?.address_line_1 || ''} />
            <ActivityAttributes icon="calendarBank" name="Dates" description={dateString} />
            <div>
              {timeSlots.length > 0 && (
                <ActivityAttributes icon="clock" name="Time" description={timeSlots[0].name} />
              )}
            </div>
          </div>
          <Divider />
          <Row justify="space-between" className="amountInfo">
            <p>Amount paid</p>
            <h4>
              {`${data.booking_fac_details.currency_type} ${data.booking_fac_details.grand_total}`}
            </h4>
          </Row>
          <Divider />
          <Row
            justify="space-between"
            align="middle"
            style={{ padding: '0 20px', cursor: 'pointer' }}
            onClick={toggleMessage}
          >
            <Col span={20}>
              <Space size="middle">
                <Icon name="message" width={24} height={24} />
                <Title level={5} color={colors.neutrals[500]}>Message your Host</Title>
              </Space>
            </Col>
            <Col span={4} style={{ textAlign: 'right' }}>
              <Icon name="arrowNext" width={20} height={20} />
            </Col>
          </Row>
          <Divider />
          <Row justify="space-between" align="middle" style={{ padding: '0 20px' }}>
            <Col span={20}>
              <Space size="middle">
                <Icon name="location" width={24} height={24} />
                <Title level={5} color={colors.neutrals[500]}>Get directions</Title>
              </Space>
            </Col>
            <Col span={4} style={{ textAlign: 'right' }}>
              <Icon name="arrowNext" width={20} height={20} />
            </Col>
          </Row>
          <Divider />
          <div style={{ padding: '0 20px' }}>
            <Title className="activityHeading">Session Description</Title>
            <CollapsedText
              side="left"
              maxHeight={80}
              description="Some description here..."
            />
          </div>
          <Divider />
          <div style={{ padding: '0 20px' }}>
            <Title className="activityHeading">Booking Details</Title>
            <Title level={5} color={colors.neutrals[500]}>Cancellation Policy</Title>
            <CollapsedText
              side="left"
              maxHeight={20}
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
            <Title level={5} color={colors.neutrals[500]}>Safety & Other Information</Title>
            <CollapsedText
              side="left"
              maxHeight={20}
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
          </div>
          <Divider />
          <div style={{ padding: '0 20px' }}>
            <LocationMobile
              pos={{ lat: 10, lng: 10 }}
              description="Some description here..."
              title="Title here"
              header
            />
            <Divider />
            <HostCard
              hostName="John Doe"
              rating={3}
              reviewsCount={10}
            />
          </div>
        </div>
      )}
    </>
  );
}
