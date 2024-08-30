'use client';

import React, { ReactNode } from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

type TitleProps = React.ComponentProps<typeof Title>;

interface TitleBarProps extends TitleProps {
  children: ReactNode;
}

function TitleBar({ children, ...props }: TitleBarProps) {
  return (
    <Title style={{ padding: '15px 0' }} {...props}>
      {children}
    </Title>
  );
}

export default TitleBar;
