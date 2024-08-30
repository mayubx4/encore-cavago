import Icon, { IconType } from '@shared/components/common/icons';
import { Input, InputProps } from 'antd';
import React from 'react';
import './_InputFields.scss';

export default function RoundedIconedInputField({ icon, ...props }:
  InputProps & { icon: IconType }) {
  return (
    <div className="roundedIconedInputField">
      <Icon name={icon} width={20} height={20} />
      <Input className="textField" {...props} />
    </div>
  );
}
