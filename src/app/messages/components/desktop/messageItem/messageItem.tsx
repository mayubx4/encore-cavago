import {
  Col, Image, Row, Space,
} from 'antd';
import React from 'react';
import './_messageItem.scss';
import { useRouter } from 'next/navigation';

export default function MessageItem({
  imageUrl,
  name,
  message,
  id,
  bookingId,
  selected,
}: {
  imageUrl: string;
  name: string;
  message: string;
  id: number;
  bookingId: number | null;
  selected: boolean;
}) {
  const router = useRouter();
  let path = `/messages?receiverId=${id}`;
  if (bookingId) {
    path += `&bookingId=${bookingId}`;
  }

  return (
    <div className={`item ${selected && 'selected'}`} onClick={() => router.push(path)}>
      <Row justify="space-between" align="middle" style={{ padding: 10 }}>
        <Col span={4}>
          <Image src={imageUrl} fallback="https://via.placeholder.com/150" alt="profile" className="hostProfile" preview={false} />
        </Col>
        <Col span={19}>
          <Space direction="vertical" size={1}>
            <h4>{name}</h4>
            <p>{`${message.slice(0, 21)}...`}</p>
          </Space>
        </Col>
      </Row>
    </div>
  );
}
