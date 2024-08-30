import React, { useState } from 'react';
import './_bookingDetailsDesktop.scss';
import Icon from '@shared/components/common/icons';
import {
  Button, Col, Divider, Image, Row, Space, Spin,
} from 'antd';
import parse from 'html-react-parser';
import LocationMap from '@shared/components/desktop/locationMap/locationMap';
import bookingsApi from '@shared/api/bookings/bookingsApi';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import MessageCardModule from '../messageCardModule/messageCardModule';

export default function BookingDetailsDesktop(
  { id, facilityId }: { id: string, facilityId: string },
) {
  const getBookingDetailsQuery = bookingsApi.getBookingDetails.useQuery({ id, facilityId });
  const [openMessage, setOpenMessage] = useState(false);
  const { data } = getBookingDetailsQuery;
  const router = useRouter();

  const toggleMessage = () => {
    setOpenMessage(!openMessage);
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
  const timeSlots = JSON.parse(data.time_slots || '[]');

  return (
    <div className="bookingDetails">
      <Icon name="back" width={48} height={48} onClick={() => router.push('/bookings')} />
      <main className="detailsMain">
        <div
          className="header"
          style={{
            background: `url(${data.booking_fac_details.facility_details?.profile_picture})`,
          }}
        >
          <Space className="shareDiv">
            <Button icon={<Icon name="share" width={20} height={20} />} className="shareBtn" />
            <p className="shareTxt">Share</p>
          </Space>
          <h2 className="heading">
            {data.m_activity_name}
          </h2>
          <h3 className="location">
            {data.booking_fac_details.facility_details?.address_line_1}
          </h3>
          <p className={`${data?.status === 'Accepted' ? 'success' : 'failure'}`}>
            {data?.status}
          </p>
          {remainingDays >= 0 && (
            <Row justify="end" align="middle" className="remainingTime">
              <Col md={10} xl={8} className="timeDiv">
                <Space size={20}>
                  <Space direction="vertical">
                    <p className="remaining">{remainingDays}</p>
                    <p className="title">Days</p>
                  </Space>
                  <Space direction="vertical">
                    <p className="remaining">{remainingHours}</p>
                    <p className="title">Hours</p>
                  </Space>
                  <Space direction="vertical">
                    <p className="remaining">{remainingMinutes}</p>
                    <p className="title">Minutes</p>
                  </Space>
                  <Space direction="vertical">
                    <p className="remaining">{remainingSeconds}</p>
                    <p className="title">Seconds</p>
                  </Space>
                </Space>
              </Col>
            </Row>
          )}
        </div>
        <section className="mainAttributes">
          <Row justify="space-between" align="middle" className="attrsContainer">
            <Col span={6}>
              {data.from_date && (
                <Space size={8}>
                  <Icon name="calendarCheck" width={24} height={24} className="icon" />
                  <p className="attributes">
                    {moment(data.from_date).format('MMM DD, YYYY')}
                    {data.to_date && ` - ${moment(data.to_date).format('MMM DD, YYYY')}`}
                  </p>
                </Space>
              )}
            </Col>
            {timeSlots.length > 0 && (
              <Col span={6}>
                <Space size={8}>
                  <Icon name="clock" width={24} height={24} className="icon" />
                  <p className="attributes">
                    {timeSlots[0].name}
                  </p>
                </Space>
              </Col>
            )}
            <Col span={6}>
              <Space size={8}>
                <Icon name="user" width={24} height={24} className="icon" />
                <p className="attributes">
                  {`${data.activity_quantity} guests`}
                </p>
              </Space>
            </Col>
            <Col span={6}>
              <Space size={8}>
                <Icon name="creditCard" width={24} height={24} />
                <p className="attributes">
                  {`${data.booking_fac_details.currency_type} ${data.booking_fac_details.grand_total}`}
                </p>
              </Space>
            </Col>
          </Row>
          <Divider />
          <Row
            justify="space-between"
            align="middle"
            className="actionRow"
            style={{ cursor: 'pointer' }}
            onClick={toggleMessage}
          >
            <Col span={20}>
              <Space size={10}>
                <Icon name="message" width={32} height={32} />
                <Space direction="vertical" size={5}>
                  <p className="main">Message your host</p>
                  <p className="secondary">{data.booking_fac_details.facility_details?.contact_person}</p>
                </Space>
              </Space>
            </Col>
            <Col span={4} className="last">
              <Icon name="arrowNext" width={32} height={32} />
            </Col>
          </Row>
          <Divider />
          <Row justify="space-between" align="middle" className="actionRow">
            <Col span={20}>
              <Space size={10}>
                <Icon name="location" width={32} height={32} />
                <Space direction="vertical" size={5}>
                  <p className="main">Get directions</p>
                  <p className="secondary">
                    {`Address: ${data.booking_fac_details.facility_details?.address_line_1}`}
                  </p>
                </Space>
              </Space>
            </Col>
            <Col span={4} className="last">
              <Icon name="arrowNext" width={32} height={32} />
            </Col>
          </Row>
          <Divider />
          <div>
            <h4 className="title">{data.booking_fac_details.facility_details?.facility_name}</h4>
            <p className="content">
              {parse('<h2>No Idea, what to place here!</h2>')}
            </p>
          </div>
          <Divider />
          <div>
            <h4 className="title">Booking Details</h4>
            <h5 className="subTitle">Cancellation Policy</h5>
            <p className="content">{parse('<p>Hello world</p>')}</p>
            <h5 className="subTitle">Things to Know</h5>
            <p className="content">{parse('<p>Hello world</p>')}</p>
          </div>
          <Divider />
          <LocationMap
            title={data.booking_fac_details.facility_details?.address_line_1 || ''}
            description="Lorem Ipsum Bengun"
            pos={{ lat: 20, lng: 20 }}
            header
          />
          <Divider />
          <div className="hostCard">
            <Row justify="space-between" align="middle">
              <Col span={12}>
                <Space size={15}>
                  <Image src={data.booking_fac_details.facility_details?.profile_picture || ''} width={80} height={80} preview={false} className="hostIcon" />
                  <Space direction="vertical" size={4}>
                    <h5 className="hostTitle">{data.booking_fac_details.facility_details?.contact_person}</h5>
                    <p className="hostSecondary">Host</p>
                  </Space>
                </Space>
              </Col>
              <Col span={12} style={{ textAlign: 'center' }}>
                <Space size={30}>
                  <Space direction="vertical" size={4}>
                    <h5 className="hostTitle">4.84</h5>
                    <p className="hostSecondary">Rating</p>
                  </Space>
                  <Space direction="vertical" size={4}>
                    <h5 className="hostTitle">770</h5>
                    <p className="hostSecondary">Reviews</p>
                  </Space>
                  <Space direction="vertical" size={4}>
                    <h5 className="hostTitle">3 years</h5>
                    <p className="hostSecondary">Hosting on Cavago</p>
                  </Space>
                </Space>
              </Col>
            </Row>
          </div>
        </section>
      </main>
      <MessageCardModule open={openMessage} data={data} toggleModal={toggleMessage} />
    </div>
  );
}
