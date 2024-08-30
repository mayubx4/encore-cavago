import React, { CSSProperties } from 'react';
import { Typography } from 'antd';
import Icon, { IconType } from '../icons';
import './_iconTextRow.scss';

export default function IconTextRow({
  iconName,
  text,
  iconColor,
  iconWidth,
  iconHeight,
  textStyle = {},
}: {
  iconName: IconType;
  text: string;
  iconColor: string;
  textStyle?: CSSProperties;
  iconWidth?: number;
  iconHeight?: number;
}) {
  return (
    <div className="iconTextRowContainer">
      <Icon name={iconName} color={iconColor} width={iconWidth} height={iconHeight} />
      <Typography.Text style={textStyle} className="text">{text}</Typography.Text>
    </div>
  );
}
