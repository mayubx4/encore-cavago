import React from 'react';
import { Space } from 'antd';
import Icon, { IconType } from '@shared/components/common/icons';
import './_attributes.scss';
import Text from '@shared/wrappers/Text';

export default function ActivityAttributes({
  icon,
  name,
  description,
}: {
  icon: IconType;
  name: string | null;
  description: string;
}) {
  return (
    <Space className="attributes">
      <Icon name={icon} width={24} height={24} className="icon" />
      <Space direction="vertical" size={0} style={{ marginLeft: 26 }} className="details">
        {name && <Text className="title">{name}</Text>}
        <p className="info">{description}</p>
      </Space>
    </Space>
  );
}
