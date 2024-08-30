import React from 'react';
import './_individualMessageItem.scss';
import { Button, Col, Input, Row, Space } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import Icon from '@shared/components/common/icons';
import Animations from '@shared/components/common/animations';
import moment from 'moment';
import MessageBodyItem from '../messageBodyItem/messageBodyItem';
import BookingCard from '../bookingCard/bookingCard';
import useMessages from '../../common/utils';

export default function IndividualMessageItem(
  { receiverId, bookingId }: { receiverId: string | null, bookingId: string | null },
) {
  const {
    messagesRef,
    isScrollable,
    allMessages,
    messageContent,
    bookingDetails,
    facilityDetails,
    fetchNextPage,
    hasNextPage,
    handleSendMessage,
    setMessageContent,
    sortedKeys,
    messagesByDate,
  } = useMessages(receiverId, bookingId);

  if (!receiverId) {
    return null;
  }

  return (
    <div className="messageItem">
      <section className="infoMain">
        <Space direction="vertical" size={2} className="info">
          <h3>{facilityDetails?.facility_name || ''}</h3>
          <p>Response Time: 1 hour</p>
        </Space>
      </section>
      <section className="messagesMain">
        <div id="scrollDiv" className={`messageInboxContent ${isScrollable ? 'messageInboxContent__scrolled' : ''}`} ref={messagesRef} style={{ display: 'flex', flexDirection: 'column-reverse' }}>
          <InfiniteScroll
            dataLength={allMessages.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<Animations name="cavagoLoader" style={{ width: 100, height: 100 }} />}
            scrollableTarget="scrollDiv"
            scrollThreshold={0.8}
            inverse
            style={{ display: 'flex', flexDirection: 'column-reverse' }}
          >
            {sortedKeys.map((date) => (
              <React.Fragment key={date}>
                {messagesByDate[date].map((message, idx) => (
                  <Col span={24} style={{ marginTop: 15 }} key={`message-${idx}`}>
                    <MessageBodyItem
                      name={message.sender_id === Number(receiverId) ? facilityDetails?.facility_name || 'User' : `${message.sender.first_name} ${message.sender.last_name}`}
                      time={moment(message.created_at).format('HH:mm A')}
                      text={message.message}
                      image={message.sender_id === Number(receiverId) ? facilityDetails?.profile_picture || '' : ''}
                    />
                  </Col>
                ))}
                <Col span={24}>
                  <p className="messagesDate">{date === moment().format('YYYY-MM-DD') ? 'Today' : date}</p>
                </Col>
              </React.Fragment>
            ))}
            {bookingDetails && <BookingCard data={bookingDetails} name={facilityDetails?.facility_name || 'User'} address={facilityDetails?.address_line_1 || ''} />}
          </InfiniteScroll>
        </div>
        <div className="messageData">
          <div className="options">
            <Row justify="space-between" align="middle" style={{ margin: '0 10px' }}>
              <Col md={2} xl={1}>
                <Icon name="images" width={32} height={32} className="icon" />
              </Col>
              <Col md={22} xl={23}>
                <Button
                  size="large"
                  icon={<Icon name="arrowForward" width={32} height={32} className="icon" />}
                  className="messageIcon"
                  disabled={messageContent.length === 0}
                  onClick={handleSendMessage}
                />
                <Input placeholder="Write a Message..." className="messageInput" value={messageContent} onChange={(e) => setMessageContent(e.target.value)} />
              </Col>
            </Row>
          </div>
        </div>
      </section>
    </div>
  );
}
