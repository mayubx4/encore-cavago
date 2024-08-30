import { bookingSchema } from '@shared/api/bookings/schemas';
import Avatar from '@shared/components/common/avatar/avatar';
import Icon from '@shared/components/common/icons';
import {
  Button, Col, Divider, Row, Space,
} from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import MessageForm from '@shared/components/common/directMessageForm/messageForm';
import './_messageHost.scss';

export default function MessageHost(
  { toggleBack, data }: { toggleBack: () => void, data: z.infer<typeof bookingSchema> },
) {
  const [sent, setSent] = useState(false);
  const router = useRouter();
  const timeSlots = JSON.parse(data.time_slots || '[]');

  return (
    <section className="messageHost">
      {!sent && (
      <>
        <div className="content">
          <Icon name="backArrow" width={24} height={24} onClick={toggleBack} />
          <Row align="middle" justify="space-between" style={{ marginTop: 30 }}>
            <Col span={18}>
              <Space direction="vertical" size={5}>
                <p className="secondary">Host</p>
                <h3 className="primary">{data.booking_fac_details.facility_details?.profile_picture}</h3>
                <p className="secondary">Typically responds within an hour.</p>
              </Space>
            </Col>
            <Col span={4}>
              <Avatar image={data.booking_fac_details.facility_details?.profile_picture || ''} radius={40} />
            </Col>
          </Row>
          <p className={`pill ${data.status === 'Accepted' ? 'success' : 'failure'}`}>
            {data.status}
          </p>
          <h3 className="name">
            {data.m_activity_name}
          </h3>
          <p className="secLocation">
            {data.booking_fac_details.facility_details?.address_line_1}
          </p>
          <div className="date">
            <Icon name="calendarBank" width={24} height={24} />
            <p>
              {moment(data.from_date).format('MMM DD, YYYY')}
              {data.to_date && ` - ${moment(data.to_date).format('MMM DD, YYYY')}`}
            </p>
          </div>
          {
            timeSlots.length > 0 && (
              <div className="date">
                <Icon name="clock" width={24} height={24} />
                <p>
                  {timeSlots[0].name}
                </p>
              </div>
            )
          }
          <p className="messageHeader">
            Message the Host
          </p>
          <MessageForm
            receiverId={data.booking_fac_details.facility_details?.facility_user?.id || 4065}
            setSent={setSent}
            bookingId={data.id}
          />
        </div>
      </>
      )}
      {sent && (
        <>
          <div className="content">
            <Row align="middle" justify="space-between" style={{ marginTop: 30 }}>
              <Col span={18}>
                <Space direction="vertical" size={5}>
                  <h3 className="primary">Message Sent!</h3>
                  <p className="secondary">
                    You should get a response from&nbsp;
                    <b>{data.booking_fac_details.facility_details?.contact_person}</b>
                    &nbsp;in the next 24 hours.
                  </p>
                </Space>
              </Col>
              <Col span={4}>
                <Avatar image={data.booking_fac_details.facility_details?.profile_picture || ''} radius={40} />
              </Col>
            </Row>
          </div>
          <Divider />
          <Button type="primary" size="large" className="messageBtn" onClick={() => router.push('/home')}>Explore More!</Button>
          <Button type="primary" size="large" className="Btn" onClick={() => router.push('/messages')}>Go to inbox</Button>
        </>
      )}
    </section>
  );
}
