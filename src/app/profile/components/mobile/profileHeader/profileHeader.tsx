import React from 'react';
import './_profileHeader.scss';
import Icon from '@shared/components/common/icons';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';

export default function ProfileHeader({ title, subtitle }: { title: string; subtitle?: string; }) {
  const nav = useRouter();

  return (
    <div className="profileHeaderContainer">
      <Button type="link" onClick={nav.back}>
        <Icon name="caretLeft" />
      </Button>
      <div>
        <h2 className="title">{title}</h2>
        <p className="subtitle">{subtitle}</p>
      </div>
    </div>
  );
}
