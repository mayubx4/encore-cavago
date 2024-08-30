'use client';

import React, { useState } from 'react';
import {
  Divider,
  Modal,
  Button,
  Row,
  Col,
  Image,
} from 'antd';
import { z } from 'zod';
import { bookingSchema } from '@shared/api/bookings/schemas';
import { useRouter } from 'next/navigation';
import MessageForm from '@shared/components/common/directMessageForm/messageForm';
import './_messageCardModule.scss';
import UpcomingBookingsCard from '../upcomingBookingsCard/upcomingBookingsCard';

export default function MessageCardModule({
  open,
  data,
  toggleModal,
} : {
  open: boolean;
  data: z.infer<typeof bookingSchema>,
  toggleModal: () => void;
}) {
  const [sent, setSent] = useState(false);
  const router = useRouter();

  return (
    <Modal
      width={800}
      style={{ top: 20 }}
      title={(
        <Row justify="space-between" align="middle">
          <Col span={20}>
            <h2 className="hostName">
              {!sent ? `Contact ${data.booking_fac_details.facility_details?.contact_person}` : 'Message Sent'}
            </h2>
            <p className="response">
              {!sent ? 'Usually responds within 1 day' : 'Host will get back to you soon'}
            </p>
          </Col>
          <Col span={4}>
            <Image src={data.booking_fac_details.facility_details?.profile_picture || ''} width={64} height={64} alt="logo" preview={false} className="hostLogo" />
          </Col>
        </Row>
      )}
      onCancel={toggleModal}
      open={open}
      footer={null}
    >
      <div className="mainModalDiv">
        {!sent && (
          <>
            <Divider />
            <h4 className="hostName miniHeading">Your booking</h4>
            <UpcomingBookingsCard isModal data={data} />
            <Divider />
            <h4 className="hostName miniHeading">Message the host</h4>
            <MessageForm
              receiverId={data.booking_fac_details.facility_details?.facility_user?.id || 4065}
              bookingId={data.id}
              setSent={setSent}
            />
          </>
        )}
        {sent && (
          <>
            <div>
              Beautiful Design ... // TODO: Add the design here
            </div>
            <Divider />
            <Button type="primary" size="large" className="messageBtn" onClick={() => router.push('/home')}>Explore More</Button>
            <Button type="primary" size="large" className="Btn" onClick={() => router.push('/messages')}>Go to Inbox</Button>
          </>
        )}
      </div>
    </Modal>
  );
}
