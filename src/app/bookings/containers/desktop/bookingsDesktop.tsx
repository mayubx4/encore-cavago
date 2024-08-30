import React, { useState } from 'react';
import './_bookingsDesktop.scss';
import {
  Button, Col, Divider, Row, Space, Spin,
} from 'antd';
import UpcomingBookingsCard from '@app/bookings/components/desktop/upcomingBookingsCard/upcomingBookingsCard';
import PreviousBookingsCard from '@app/bookings/components/desktop/prevBookingsCard/prevBookingsCard';
import { useRouter } from 'next/navigation';
import NoBookingsCard from '@app/bookings/components/desktop/noBookingsCard/noBookingsCard';
import bookingsApi from '@shared/api/bookings/bookingsApi';

export default function BookingsDesktop() {
  const getUpcomingBookingsQuery = bookingsApi.getUpcomingBookings.useQuery();
  const getPreviousBookingsQuery = bookingsApi.getPreviousBookings.useQuery();
  const [openOne, setOpenOne] = useState(false);
  const router = useRouter();

  const toggleOne = () => {
    setOpenOne(!openOne);
  };

  const data = getUpcomingBookingsQuery.data && getUpcomingBookingsQuery.data[0];
  const prevData = getPreviousBookingsQuery.data;

  if (getUpcomingBookingsQuery.isLoading || getPreviousBookingsQuery.isLoading) {
    return <Spin />;
  }

  return (
    <section className="bookingContainer">
      <h1 className="heading">Bookings</h1>
      <p className="secondary">Keep track of all your bookings here</p>
      <Divider />
      <div className="bookingDetails">
        <h2 className="heading">Upcoming Bookings</h2>
        {data ? (
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => router.push(`/bookings?id=${data.id}&facilityId=${data.facility_id}`)}
          >
            <UpcomingBookingsCard data={data} />
          </div>
        ) : (
          <NoBookingsCard />
        )}
        {prevData && (
          <>
            <h2 className="heading">Previous Bookings</h2>
            <Row justify="space-between" align="middle" gutter={[10, 10]}>
              {prevData.map((prev, idx) => (
                <Col
                  span={11}
                  key={idx}
                  onClick={() => router.push(`/bookings?id=${prev.id}&facilityId=${data.facility_id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <PreviousBookingsCard data={prev} />
                </Col>
              ))}
            </Row>
          </>
        )}
      </div>
      <Divider />
      <p className="notfound">
        Can't find your booking here?&nbsp;
        <span className="contact">Contact Support</span>
      </p>
      <Space size={50}>
        <Button onClick={toggleOne}>ONE</Button>
      </Space>
    </section>
  );
}
