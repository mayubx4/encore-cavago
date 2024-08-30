import React from 'react';
import {
  Button, Col, Row, Space,
} from 'antd';
import './_bookingsMobile.scss';
import bookingsApi from '@shared/api/bookings/bookingsApi';
import BookingsCardMobile from '@app/bookings/components/mobile/bookingsCard/bookingsCard';
import { useSearchParams } from 'next/navigation';
import BookingDetailsMobile from '@app/bookings/components/mobile/bookingDetailsMobile/bookingDetailsMobile';

export default function BookingsMobile() {
  const getUpcomingBookingsQuery = bookingsApi.getUpcomingBookings.useQuery();
  const getPreviousBookingsQuery = bookingsApi.getPreviousBookings.useQuery();
  const params = useSearchParams();
  const id = params.get('id');
  const facilityId = params.get('facilityId');

  const { data } = getUpcomingBookingsQuery;
  const prevData = getPreviousBookingsQuery.data;

  if (id && facilityId) {
    return (
      <BookingDetailsMobile id={id} facilityId={facilityId} />
    );
  }

  return (
    <div className="bookingsContainer">
      <h1 className="heading">Bookings</h1>
      <p className="secondary">Keep a track of all your bookings.</p>
      <Row justify="space-between" align="middle">
        <Col span={12} className="col selected">
          <p>My bookings</p>
        </Col>
        <Col span={12} className="col">
          <p>Invitations</p>
        </Col>
      </Row>
      <Row justify="space-between" align="middle" className="cardContent">
        {data || prevData ? (
          <>
            {data?.map((booking) => (
              <BookingsCardMobile data={booking} />
            ))}
            {prevData?.map((booking) => (
              <BookingsCardMobile data={booking} />
            ))}
          </>
        ) : (
          <Col span={24}>
            <Space className="noBookings" direction="vertical" size={10}>
              <h2>You don't have any bookings yet..!</h2>
              <p>Explore Cavago to find your perfect equestrian holiday.</p>
              <Button className="button">Start searching</Button>
            </Space>
          </Col>
        )}
      </Row>
    </div>
  );
}
