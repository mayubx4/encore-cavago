import {
  Button, Col, Divider, Row, Space,
} from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';
import './_upcomingBookingsCard.scss';
import Icon from '@shared/components/common/icons';
import { z } from 'zod';
import { bookingSchema } from '@shared/api/bookings/schemas';
import moment from 'moment';
import MessageCardModule from '../messageCardModule/messageCardModule';

export default function UpcomingBookingsCard(
  { isModal, data }
  :
  { isModal: boolean, data: z.infer<typeof bookingSchema> | undefined },
) {
  const [message, setMessage] = useState(false);
  const timeSlots = JSON.parse(data?.time_slots || '[]');

  const toggleMessage = () => {
    setMessage(!message);
  };

  if (!data) {
    return <div>No data</div>;
  }
  const gap = moment(data.from_date).diff(moment(), 'days');

  return (
    <Row justify="space-between" align="middle" className={`upcomingCard ${isModal && 'modal'}`}>
      <Col span={12}>
        <Space direction="vertical" size={5} className="details">
          <p className="upcomingTitle">{data.m_activity_name || data.s_activity_name}</p>
          <p className="upcomingSecondary">
            {data.booking_fac_details.facility_details?.address_line_1}
          </p>
          <p className="upcomingTitle">
            {`${data.booking_fac_details.currency_type} ${data.booking_fac_details.grand_total}`}
          </p>
          <Divider />
          {data.from_date && (
            <Space size={5} align="start">
              <Icon name="calendarCheck" width={24} height={24} />
              <p className={`attributesText ${data.status === 'Pending' && 'strike'}`}>
                {moment(data.from_date).format('MMM DD, YYYY')}
                {data.to_date && ` - ${moment(data.to_date).format('MMM DD, YYYY')}`}
              </p>
            </Space>
          )}
          {timeSlots.length > 0 && (
            <Space size={5} align="start">
              <Icon name="clock" width={24} height={24} />
              <p className={`attributesText ${data.status === 'Pending' && 'strike'}`}>
                {timeSlots[0].name}
              </p>
            </Space>
          )}
          <Space size={5} align="start">
            <Icon name="user" width={24} height={24} />
            <p className="attributesText">
              {`${data.activity_quantity} guests`}
            </p>
          </Space>
        </Space>
        {data.status === 'Pending' && !isModal && (
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
      <Col span={12} className="imageHolder">
        <span className={`left ${data.status === 'Accepted' ? 'success' : 'failure'}`}>
          {data.status}
        </span>
        {gap > 0 && (
          <span className="upcoming right">
            {`Coming up in ${gap} days`}
          </span>
        )}
        <Image src={data.activity_details.img_1_url || data.booking_fac_details.facility_details?.profile_picture || ''} width={694} height={450} alt="booking" className="upcomingImg" />
      </Col>
      <MessageCardModule open={message} toggleModal={toggleMessage} data={data} />
    </Row>
  );
}
