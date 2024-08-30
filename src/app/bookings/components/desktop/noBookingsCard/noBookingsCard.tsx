import {
  Button, Col, Row, Space,
} from 'antd';
import Image from 'next/image';
import React from 'react';
import NoBookings from 'app/assets/images/noBookings.png';
import './_noBookingsCard.scss';

export default function NoBookingsCard() {
  return (
    <Row justify="space-between" align="middle" className="notfoundCard">
      <Col span={12} className="details">
        <Space direction="vertical" size={5}>
          <p className="notfoundTitle">You don't have any bookings... yet!</p>
          <p className="notfoundSecondary">Explore Cavago to find your perfect equestrian holiday.</p>
          <Button className="notfoundBtn">Start searching</Button>
        </Space>
      </Col>
      <Col span={12}>
        <Image src={NoBookings} width={694} height={250} alt="no_bookings" className="notfoundImg" />
      </Col>
    </Row>
  );
}
