import React from 'react';
import { useSharedModalPopupContext } from '@shared/hooks/sharedModalPopUp';
import CavagoImages from '../../common/cavagoImages';
import {
  Button, List, Popover,
} from 'antd';
import './_header.scss';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthenticationContext } from '@shared/hooks/authenticationContext';
import Avatar from '@shared/components/common/avatar/avatar';
import Icon from '@shared/components/common/icons';

export default function MinimalHeader() {
  const nav = useRouter();
  const authProvider = useAuthenticationContext();

  return (
    <div className="header-top">
      <div className="logo">
        <Link href="/">
          <CavagoImages image="icon" />
        </Link>
      </div>
      <div className="head-tab">
          <button className="active btn-text">
            Experiences
          </button>
          {/* <button className="btn-text">
            Holidays by Cavago
          </button> */}
          <button className="btn-text">
            Competitions
          </button>
        </div>
      <div className="headerAuthButtons">
        <button className="btn-outline pillButton">
          Become a Host
        </button>
        {authProvider.isLoggedIn ? (
          <ProfileButton />
        )
          : (
            <>
              <button className="btn-text" onClick={() => nav.push('/authentication/signup')}>
                Sign Up
              </button>
              <button className="btn-text" onClick={() => nav.push('/authentication')}>
                Sign In
              </button>
            </>
          )}
      </div>
    </div>
  );
}

function ProfileButton() {
  const authProvider = useAuthenticationContext();

  return (
    <Popover
      trigger="click"
      content={(
        <List className="profileOptPop">
          <Link href="/profile">
            <List.Item className="profileOptButton">Profile</List.Item>
          </Link>
          <Link href="/invitations">
            <List.Item className="profileOptButton">Invitations</List.Item>
          </Link>
          <Link href="/wishlist">
            <List.Item className="profileOptButton">Wishlists</List.Item>
          </Link>
          <Link href="/messages">
            <List.Item className="profileOptButton">Messages</List.Item>
          </Link>
          <div className="dividor" />
          <List.Item onClick={authProvider.onLogout} className="profileOptButton">Logout</List.Item>
        </List>
      )}
    >
      <Button shape="round" className="profileHeaderButton">
        <Avatar radius={24} />
        {authProvider.user?.first_name}
        <Icon name="caretRight" width={16} height={16} rotate={90} />
      </Button>
    </Popover>
  );
}
