import React from 'react';
import { z } from 'zod';
import { bookingSchema } from '@shared/api/bookings/schemas';
import './_bookingsCard.scss';
import {
  Button, Col, Divider, Row, Space,
} from 'antd';
import moment from 'moment';
import { useRouter } from 'next/navigation';

export default function BookingsCardMobile({ data }: { data: z.infer<typeof bookingSchema> }) {
  const router = useRouter();
  const timeSlots = JSON.parse(data?.time_slots || '[]');

  return (
    <Col
      span={24}
      className="bookingCard"
      style={{ background: `url("${data.booking_fac_details.facility_details?.profile_picture || 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/991px-Placeholder_view_vector.svg.png'}") no-repeat center center` }}
      onClick={() => router.push(`/bookings?id=${data.id}&facilityId=${data.booking_fac_details.facility_details?.id}`)}
    >
      <Row align="top" justify="space-between" className="topRow">
        <Col span={10} className={`pill ${data.status === 'Accepted' ? 'success' : 'failure'}`}>
          {data.status}
        </Col>
        {data.from_date && (
          <Col span={10} className="pill">
            {`In ${moment(data.from_date).fromNow(true)}`}
          </Col>
        )}
      </Row>
      <div className="mainDetails">
        <Space size={10}>
          <h2 className="bold">{data.m_activity_name}</h2>
          <h2 className="bold">{`${data.booking_fac_details.currency_type} ${data.booking_fac_details.grand_total}`}</h2>
        </Space>
        <p className="semibold">{data.booking_fac_details.facility_details?.address_line_1}</p>
        <Divider className="divider" />
        <p className="date">
          {data.from_date && moment(data.from_date).format('MMM DD, YYYY')}
          {data.to_date && ` - ${moment(data.to_date).format('MMM DD, YYYY')}`}
          {timeSlots.length > 0 && ` • ${timeSlots[0].name}`}
        </p>
      </div>
      {data.status === 'Pending' && (
        <div className="pendingDiv">
          <p>This activity is unavailable at the selected time. However, the host has proposed alternative slots for you to choose from.</p>
          <Row justify="space-between" align="middle">
            <Col span={11}>
              <Button className="selectBtn">Select a slot</Button>
            </Col>
            <Col span={11}>
              <Button className="messageBtn">Message Host</Button>
            </Col>
          </Row>
        </div>
      )}
    </Col>
  );
}
