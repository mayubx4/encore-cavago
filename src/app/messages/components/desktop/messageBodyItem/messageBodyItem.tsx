import { Image, Space } from 'antd';
import React from 'react';
import './_messageBodyItem.scss';

export default function MessageBodyItem({
  name,
  time,
  text,
  image,
}: {
  name: string;
  time: string;
  text: string;
  image: string;
}) {
  return (
    <Space align="start" size={15} className="messageBody">
      <Image src={image} fallback="https://via.placeholder.com/150" alt="profile" className="profileImage" preview={false} />
      <Space direction="vertical" size={10}>
        <Space>
          <h4 className="name">{name}</h4>
          <p className="time">{time}</p>
        </Space>
        <p className="message">{text}</p>
      </Space>
    </Space>
  );
}
