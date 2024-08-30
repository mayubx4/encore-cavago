'use Client';

import React, { useState } from 'react';
import './_messagesDesktop.scss';
import MinimalHeader from '@shared/components/desktop/header/minimalHeader';
import {
  Button, Col, Input, Row, Space, Spin,
} from 'antd';
import { z } from 'zod';
import Icon from '@shared/components/common/icons';
import MessageItem from '@app/messages/components/desktop/messageItem/messageItem';
import { MessagesInboxSchema } from '@shared/api/messages/schemas';
import IndividualMessageItem from '@app/messages/components/desktop/individualMessageItem/individualMessageItem';
import colors from '@shared/theme/colors';

export default function MessagesDesktop({
  receiverId,
  bookingId,
  inbox,
  inboxLoading,
  userId,
}: {
  receiverId: string | null;
  bookingId: string | null;
  inbox: z.infer<typeof MessagesInboxSchema>,
  inboxLoading: boolean;
  userId: number;
}) {
  const noMessages = !inboxLoading && inbox.length === 0;
  const typesOfMessages = ['All', 'Unread', 'Bookings', 'Support', 'Subscriptions'];
  const [type, setType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const messages = type === 'All' ? inbox : inbox.filter((message) => {
    if (type === 'Unread') return !message.data.is_read;

    return message.data.type === type;
  });

  const filteredMessages = messages.filter((message) => (
    message.data.message.toLowerCase().includes(searchTerm.toLowerCase())
    || message.data.receiver.first_name.toLowerCase().includes(searchTerm.toLowerCase()))
    || message.data.booking_details?.activity_details.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <div className="header-desktop">
        <div className="headerParent">
          <MinimalHeader />
        </div>
      </div>
      <div className="messagesContainer">
        {inboxLoading && <Spin />}
        {!inboxLoading && (
          <Row justify="center">
            <Col md={10} xl={7} className="messagesInbox">
              <Row justify="space-between">
                <Col span={8}>
                  <h2 className="heading">Messages</h2>
                </Col>
                <Col span={16} style={{ display: 'flex', justifyContent: 'right' }}>
                  <Space>
                    {showSearch && (
                      <Input placeholder="Search" className="searchButton" onChange={(e) => setSearchTerm(e.target.value)} />
                    )}
                    <Button shape="round" className="searchButton" onClick={() => setShowSearch(!showSearch)}>
                      <Icon name="lookingGlass" color={colors.neutrals[300]} width={20} height={20} />
                    </Button>
                  </Space>
                </Col>
              </Row>
              {noMessages && (
                <Row justify="center" className="noMessages">
                  <Col span={24} style={{ textAlign: 'center' }}>
                    <Icon width={48} height={48} name="message" />
                    <h4>You don't have any messages</h4>
                    <p>When you make a booking, or contact a host, your messages will appear here.</p>
                  </Col>
                </Row>
              )}
              <Row justify="center" className="messagesList">
                {!noMessages && (
                  <Col span={24}>
                    {typesOfMessages.map((_type) => (
                      <Button
                        className={`filterBtn ${type === _type && 'selectedBtn'}`}
                        onClick={() => setType(_type)}
                      >
                        {_type}
                      </Button>
                    ))}
                  </Col>
                )}
                {filteredMessages.map((message, idx) => {
                  const isSender = message.data.sender_id === userId;
                  const firstName = (isSender ? message.data.receiver.first_name
                    : message.data.sender.first_name);
                  const id = isSender ? message.data.receiver_id : message.data.sender_id;
                  const selected = Number(receiverId) === message.data.receiver_id
                    && (bookingId && Number(bookingId) === message.booking_id);

                  return (
                    <Col span={24} key={idx}>
                      <MessageItem
                        message={message.data.message}
                        name={firstName}
                        selected={selected}
                        id={id}
                        imageUrl={message.data.booking_details?.facility?.profile_picture || ''}
                        bookingId={message.booking_id || null}
                      />
                    </Col>
                  );
                })}
              </Row>
            </Col>
            <Col md={14} xl={17} className="messagesContext">
              {receiverId && (
                <IndividualMessageItem receiverId={receiverId} bookingId={bookingId} />
              )}
            </Col>
          </Row>
        )}
      </div>
    </>
  );
}
