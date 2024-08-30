import React, { useState } from 'react';
import {
  Button, Col, Divider, Input, Row, Space,
} from 'antd';
import colors from '@shared/theme/colors';
import Icon from '@shared/components/common/icons';
import './_messagesMobile.scss';
import Avatar from '@shared/components/common/avatar/avatar';
import { z } from 'zod';
import { MessageSchema, MessagesInboxSchema } from '@shared/api/messages/schemas';
import moment from 'moment';
import MessageInboxMobile from '@app/messages/components/mobile/messageIndividualMobile/messageInboxMobile';
import { useRouter } from 'next/navigation';

function MessagesMobile({
  receiverId,
  inbox,
  inboxLoading,
  userId,
  bookingId,
}: {
  receiverId: string | null;
  inbox: z.infer<typeof MessagesInboxSchema>;
  inboxLoading: boolean;
  userId: number;
  bookingId: string | null;
}) {
  const noMessages = !inboxLoading && inbox?.length === 0;
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

  if (receiverId) {
    return <MessageInboxMobile receiverId={receiverId} bookingId={bookingId} />;
  }

  return (
    <div className="messagesMRoot">
      <Row justify="space-between" align="middle">
        <Col>
          <h1 className="heading">Messages</h1>
        </Col>
        <Col>
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
      <Row className="messageTypeContainer">
        {typesOfMessages.map((_type, idx) => (
          <Col>
            <Button
              key={idx}
              className={`typeButton ${type === _type && 'typeButton__active'}`}
              onClick={() => setType(_type)}
            >
              {_type}
            </Button>
          </Col>
        ))}
      </Row>
      {!noMessages ? (
        <div className="messagesContainer">
          <Row>
            {filteredMessages.map((message, idx) => {
              if (message.data.type === 'Support') {
                return (
                  <Col span={24} key={idx}>
                    <CavagoSupport />
                  </Col>
                );
              }

              return (
                <Col span={24} key={idx}>
                  <Message data={message.data} userId={userId} />
                </Col>
              );
            })}
          </Row>

        </div>
      ) : (
        <Row className="noMessageContainer" gutter={[0, 24]}>
          <Col span={24}>
            <Icon name="chats" width={40} height={40} />
          </Col>
          <Col span={24}>
            <Row gutter={[0, 9]} justify="center">
              <Col span={24}>
                <h2>You don't have any messages</h2>
              </Col>
              <Col span={18}>
                <p>When you receive a new message, it will appear here.</p>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
}

function Message({ data, userId }: { data: z.infer<typeof MessageSchema>, userId: number }) {
  const router = useRouter();
  let path = `/messages?receiverId=${data.receiver_id}`;
  if (data.booking_id) {
    path += `&bookingId=${data.booking_id}`;
  }

  return (
    <Row className="messageContent" align="middle" onClick={() => router.push(path)}>
      <Col span={3}>
        <Avatar radius={44} />
      </Col>
      <Col span={20}>
        <Row gutter={[0, 5]} align="middle">
          <Col span={24}>
            <Row justify="space-between">
              {data.booking_details?.status ? (
                <Col>
                  <p
                    className="status"
                    style={{ color: data.booking_details?.status === 'Accepted' ? colors.greens[500] : colors.red.error }}
                  >
                    {data.booking_details?.status}
                  </p>
                </Col>
              ) : (
                <Col>
                  {' '}
                </Col>
              )}
              <Col>
                <p className="activityDetails">
                  {moment(data.created_at).format('hh:mm A')}
                </p>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <p className="messageDetails">
              {(data.sender_id === userId
                ? data.receiver.first_name : data.sender.first_name)}
            </p>
          </Col>
          <Col span={24}>
            <p className="messageDetails">
              {data.message.length > 35 ? `${data.message.substring(0, 35)}...` : data.message}
            </p>
          </Col>
          {data.booking_details?.activity_details && (
            <Col span={24}>
              <p className="activityDetails">
                {data.booking_details.activity_details?.name}
                {' '}
                •
                {data.booking_details.time_slots && data.booking_details.time_slots.length > 0 && ` ${data.booking_details.time_slots[0].time_slot}, `}
                {data.booking_details.from_date && moment(data.booking_details.from_date).format('MMM DD')}
                {data.booking_details.to_date && ` - ${moment(data.booking_details.to_date).format('MMM DD')}`}
              </p>
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  );
}

function CavagoSupport() {
  return (
    <Row className="messageContent" align="middle">
      <Col span={3}>
        <Icon name="cavagoIconNoBackground" width={44} height={44} />
      </Col>
      <Col span={20}>
        <Row gutter={[0, 10]}>
          <Col span={24}>
            <Row justify="space-between">
              <Col>
                <p className="cavagoSupport">
                  Cavago Support
                </p>
              </Col>
              <Col>
                <p className="activityDetails">
                  3:45 PM
                </p>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <p className="cavagoSupport">
              What can we do for you?
            </p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default MessagesMobile;
