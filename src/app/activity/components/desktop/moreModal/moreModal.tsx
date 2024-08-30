'use client';

import React, { useState } from 'react';
import {
  Divider, Modal, Button,
} from 'antd';
import Title from '@shared/wrappers/Title';
import parse from 'html-react-parser';
import colors from '@shared/theme/colors';
import './_moreModal.scss';
import { useRouter } from 'next/navigation';
import MessageForm from '@shared/components/common/directMessageForm/messageForm';

export default function MoreModal({
  header,
  content,
  open,
  toggleModal,
} : {
  header: string;
  content: string;
  open: boolean;
  toggleModal: () => void;
}) {
  const [sent, setSent] = useState(false);
  const router = useRouter();

  return (
    <Modal
      title={<Title level={3} color={colors.neutrals[600]}>{header}</Title>}
      onCancel={toggleModal}
      open={open}
      footer={null}
    >
      <div className="mainModalDiv">
        <Divider />
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
        {!sent && (
          <>
            <div className="moreModalContent">
              {parse(content)}
            </div>
            <Divider />
            <Title level={5} color={colors.neutrals[500]}>
              Need More Information? Get in touch with the host
            </Title>
            <MessageForm
              receiverId={4065}
              setSent={setSent}
            />
          </>
        )}
      </div>
    </Modal>
  );
}
