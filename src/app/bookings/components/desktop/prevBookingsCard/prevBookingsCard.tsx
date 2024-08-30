import { Col, Row } from 'antd';
import Image from 'next/image';
import React from 'react';
import NoBookings from 'app/assets/images/noBookings.png';
import './_prevBookingsCard.scss';
import { z } from 'zod';
import { bookingSchema } from '@shared/api/bookings/schemas';
import moment from 'moment';

export default function PreviousBookingsCard(
  { data }: { data: z.infer<typeof bookingSchema>},
) {
  const timeSlots = JSON.parse(data?.time_slots || '[]');

  return (
    <Row justify="space-between" align="middle" className="prevCard">
      <Col span={10} className="details">
        <Image src={NoBookings} width={182} height={182} alt="booking" className="prevImg" />
      </Col>
      <Col span={14} className="details">
        <h4 className="heading">{data.m_activity_name}</h4>
        <p className="secondaryHeading">
          {`Hosted by ${data.booking_fac_details.facility_details?.contact_person || 'User'}`}
        </p>
        {data.from_date && (
          <p className="secondaryTimeline">
            {moment(data.from_date).format('MMM DD, YYYY')}
            {data.to_date && ` - ${moment(data.to_date).format('MMM DD, YYYY')}`}
          </p>
        )}
        {timeSlots.length > 0 && (
          <p className="secondaryTimeline">
            {timeSlots[0].name}
          </p>
        )}
        <p className={`${data.status === 'Accepted' ? 'success' : 'failure'}`}>
          {data.status}
        </p>
      </Col>
    </Row>
  );
}
