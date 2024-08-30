'use client';

import React, { useState } from 'react';
import {
  Divider, Modal, Button,
  Row,
  Col,
  Image,
} from 'antd';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { HostProfileSchema } from '@shared/api/host/schemas';
import MessageForm from '@shared/components/common/directMessageForm/messageForm';
import './_hostMessageModal.scss';

export default function HostMessageModal({
  open,
  data,
  toggleModal,
} : {
  open: boolean;
  data: z.infer<typeof HostProfileSchema>,
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
              {!sent ? `Contact ${data.facility_user.first_name}` : 'Message Sent'}
            </h2>
            <p className="response">
              {!sent ? 'Usually responds within 1 day' : 'Host will get back to you soon'}
            </p>
          </Col>
          <Col span={4}>
            <Image src={data.facility_images.img_1_url || ''} width={64} height={64} alt="logo" preview={false} className="hostLogo" />
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
            <h4 className="hostName miniHeading">Most guests asked about</h4>
            <Divider />
            <h4 className="hostName miniHeading">Message the host</h4>
            <MessageForm
              receiverId={4065}
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
