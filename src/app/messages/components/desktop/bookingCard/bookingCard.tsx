import React from 'react';
import { Col, Divider, Row, Space } from 'antd';
import Icon from '@shared/components/common/icons';
import moment from 'moment';
import Image from 'next/image';
import { BookingDetailType } from '@shared/api/messages/schemas';
import './_bookingCard.scss';

export default function BookingCard(
  { data, type, name, address }
  : { data: BookingDetailType, type: string, name: string, address: string },
) {
  const timeSlots = JSON.parse(data?.time_slots || '[]');

  return (
    <div className="bookingCard">
      <p className="header">
        {data.status === 'Pending' && 'Your booking request has been sent and is awaiting confirmation from the host.'}
        {data.status === 'Completed' && 'Your booking has been confirmed. Enjoy!'}
        {type === 'Subscriptions' && `You have received an invitation from ${name}`}
      </p>
      <Row justify="space-between" align="middle" className="card">
        <Col span={12}>
          <Space direction="vertical" size={5} className="details">
            <p className="title">{data?.activity_details?.name || ''}</p>
            <p className="secondary">
              {address}
            </p>
            {data.booking_fac_details && (
              <p className="title">
                {`${data.booking_fac_details?.currency_type} ${data.booking_fac_details?.grand_total}`}
              </p>
            )}
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
            {timeSlots && timeSlots.length > 0 && (
              <Space size={5} align="start">
                <Icon name="clock" width={24} height={24} />
                <p className={`attributesText ${data.status === 'Pending' && 'strike'}`}>
                  {timeSlots[0].name}
                </p>
              </Space>
            )}
          </Space>
        </Col>
        <Col span={12} className="imageHolder">
          <span className={`left ${data.status === 'Accepted' ? 'success' : 'failure'}`}>
            {data.status}
          </span>
          <Image src={data?.activity_details?.img_1_url || 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/991px-Placeholder_view_vector.svg.png'} width={694} height={450} alt="booking" className="img" />
        </Col>
      </Row>
    </div>
  )
};
