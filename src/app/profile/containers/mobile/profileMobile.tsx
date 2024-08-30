/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import './_profileMobile.scss';
import Avatar from '@shared/components/common/avatar/avatar';
import Icon, { IconType } from '@shared/components/common/icons';
import { useRouter } from 'next/navigation';
import { Button } from 'antd';
import { useAuthenticationContext } from '@shared/hooks/authenticationContext';
import Link from 'next/link';

interface LinkType {
  icon: IconType
  label: string;
  link: string;
}
export default function ProfileMobile() {
  const authProvider = useAuthenticationContext();
  const links: LinkType[] = [
    {
      icon: 'userLight',
      label: 'Personal information',
      link: '/profile/personalInformation',
    },
    {
      icon: 'lockSimple',
      label: 'Login and security',
      link: '/profile/loginAndSecurity',
    },
    {
      icon: 'stack',
      label: 'Past activites',
      link: '/profile/pastActivities',
    },
  ];

  return (
    <div className="profileContainer">
      <h2 className="title">Profile</h2>
      <ProfileCard style={{ marginBottom: 32 }} />
      {links.map((l, i) => <LinkItem key={i} {...l} />)}
      <Button shape="round" className="becomeAHostButton">
        Become a Host
      </Button>
      <Button shape="round" className="becomeAHostButton" onClick={authProvider.onLogout}>
        Log out
      </Button>
    </div>
  );
}

function ProfileCard(props: React.HTMLAttributes<HTMLDivElement>) {
  const { user } = useAuthenticationContext();

  return (
    <div className="profileCardContainer" {...props}>
      <Avatar radius={60} />
      <div className="typography">
        <h2 className="name">
          {user?.first_name}
          {' '}
          {user?.last_name}
        </h2>
        <p className="email">{user?.email}</p>
      </div>
    </div>
  );
}

function LinkItem({
  icon, link, label, ...props
}
  : React.HtmlHTMLAttributes<HTMLDivElement> & LinkType) {
  const router = useRouter();

  return (
    <Link href={link} className="profileLinks">
      <div
        {...props}
        className="profileLinkContainer"
        onClick={() => router.replace(link)}
      >
        <div className="info">
          <Icon name={icon} width={20} height={20} />
          <p className="label">{label}</p>
        </div>
        <Icon name="caretRight" width={16} height={16} />
      </div>
    </Link>
  );
}
