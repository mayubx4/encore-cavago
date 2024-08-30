import React from 'react';
import { Button, Col, Input, Row, Space } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import Icon from '@shared/components/common/icons';
import Animations from '@shared/components/common/animations';
import moment from 'moment';
import { IndividualMessageType } from '@shared/api/messages/schemas';
import Avatar from '@shared/components/common/avatar/avatar';
import './_messageInboxMobile.scss';
import colors from '@shared/theme/colors';
import { useRouter } from 'next/navigation';
import useMessages from '../../common/utils';

export default function MessageInboxMobile(
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
  const router = useRouter();

  if (!receiverId) {
    return null;
  }

  return (
    <div className="messageInboxMRoot">
      <div className={`messageInboxHeader ${!isScrollable ? 'messageInboxHeader__scrolled' : ''}`}>
        <Row gutter={[0, 24]} align="middle">
          <Col span={1}>
            <Icon name="backArrow" width={24} height={24} onClick={() => router.replace('/messages')} />
          </Col>
          {!isScrollable ? (
            <Col span={23}>
              <Row gutter={[12, 0]} justify="center" align="middle">
                <Col>
                  <Avatar radius={44} image={facilityDetails?.profile_picture || ''} />
                </Col>
                <Col>
                  <p className="hostName hostName__scrolled">{facilityDetails?.facility_name}</p>
                </Col>
              </Row>
            </Col>
          ) : (
            <Col span={24}>
              <Row justify="space-between" align="middle">
                <Col span={13}>
                  <Row gutter={[0, 6]}>
                    <Col span={24}>
                      <p
                        className="status"
                        style={{ color: bookingDetails?.status === 'Accepted' ? colors.greens[500] : colors.red.error }}
                      >
                        {bookingDetails?.status}
                      </p>
                    </Col>
                    <Col span={24}>
                      <p className="activityName">{facilityDetails?.facility_name}</p>
                    </Col>
                    <Col span={24}>
                      <p className="activityLocation">{facilityDetails?.address_line_1}</p>
                    </Col>
                  </Row>
                </Col>
                <Col span={11}>
                  <div className="hostInfoContainer">
                    <Row gutter={[0, 4]} justify="center">
                      <Col>
                        <Avatar radius={24} image={facilityDetails?.profile_picture || ''} />
                      </Col>
                      <Col span={24}>
                        <p className="hostName">{facilityDetails?.facility_name}</p>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </div>
      <div ref={messagesRef} className={`messageInboxContent ${!isScrollable ? 'messageInboxContent__scrolled' : ''}`} style={{ display: 'flex', flexDirection: 'column-reverse' }}>
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
              {messagesByDate[date].map(
                (message: IndividualMessageType, idx: number) => (
                  <Col span={24} style={{ marginTop: 15 }} key={`msg-${idx}`}>
                    {message.sender_id === Number(receiverId) ? (
                      <HostMessages
                        text={message}
                        name={facilityDetails?.facility_name || ''}
                        image={facilityDetails?.profile_picture || ''}
                      />
                    ) : (
                      <CustomerMessages text={message} />
                    )}
                  </Col>
                ),
              )}
              <Col span={24}>
                <p className="messagesDate">{date === moment().format('YYYY-MM-DD') ? 'Today' : date}</p>
              </Col>
            </React.Fragment>
          ))}
        </InfiniteScroll>
      </div>
      <div className="messageInboxFooter">
        <div className="typeMessageContainer">
          <Row justify="space-between">
            <Col span={22}>
              <Row align="middle" className="messageField">
                <Col>
                  <Icon name="paperClip" width={20} height={20} />
                </Col>
                <Col span={21}>
                  <Input size="small" placeholder="Type here..." className="typeMessageInput" value={messageContent} onChange={(e) => setMessageContent(e.target.value)} />
                </Col>
              </Row>
            </Col>
            <Col>
              <Icon name="vector" onClick={handleSendMessage} />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

function HostMessages(
  { text, image, name }: { text: IndividualMessageType, image: string, name: string },
) {
  return (
    <Row align="bottom" style={{ margin: '5px 0' }}>
      <Col span={3}>
        <Avatar radius={22} image={image} />
      </Col>
      <Col span={21}>
        <Row gutter={[0, 8]}>
          <Col span={24} id={`${text.id}`}>
            <div className="hostMessageContainer">
              <p className="hostName">{name}</p>
              <div className="messageRow">
                <p className="messageText">{text.message}</p>
                <p className="messageTime">{moment(text.created_at).format('hh:mm a').toUpperCase()}</p>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

function CustomerMessages({ text }: { text: IndividualMessageType }) {
  return (
    <Row gutter={[0, 8]} style={{ margin: '5px 0' }}>
      <Col span={24} id={`${text.id}`}>
        <div className="customerMessageContainer">
          <div className="customerMessage">
            <div className="messageRow">
              <p className="messageText">{text.message}</p>
              <p className="messageTime">{moment(text.created_at).format('hh:mm a').toUpperCase()}</p>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
