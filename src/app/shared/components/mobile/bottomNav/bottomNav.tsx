'use Client';

import React from 'react';
import './_bottomNav.scss';
import Icon from '@shared/components/common/icons';
import colors from '@shared/theme/colors';
import Link from 'next/link';

export type ActiveBottomNavType = 'bookings' | 'wishlist' | 'explore' | 'message' | 'profile';
export default function BottomNav({ activeTab = 'explore' }: { activeTab: ActiveBottomNavType }) {
  return (
    <div className="bottomNavContainer">
      <Link href="#">
        <div className={`menuButton ${activeTab === 'bookings' && 'active'}`}>
          <Icon name="calendarCheck" color={activeTab === 'bookings' ? colors.primary[500] : colors.neutrals[200]} />
          <p>Bookings</p>
        </div>
      </Link>
      <Link href="/wishlist">
        <div className={`menuButton ${activeTab === 'wishlist' && 'active'}`}>
          <Icon name="heart" color={activeTab === 'wishlist' ? colors.primary[500] : colors.neutrals[200]} />
          <p>Wishlist</p>
        </div>
      </Link>
      <Link href="/">
        <div className={`menuButton ${activeTab === 'explore' && 'active'}`}>
          <Icon name="houseSimple" color={activeTab === 'explore' ? colors.primary[500] : colors.neutrals[200]} />
          <p>Explore</p>
        </div>
      </Link>
      <Link href="/messages">
        <div className={`menuButton ${activeTab === 'message' && 'active'}`}>
          <Icon name="chatCentered" color={activeTab === 'message' ? colors.primary[500] : colors.neutrals[200]} />
          <p>Messages</p>
        </div>
      </Link>
      <Link href="/profile">
        <div className={`menuButton ${activeTab === 'profile' && 'active'}`}>
          <Icon name="user" color={activeTab === 'profile' ? colors.primary[500] : colors.neutrals[200]} />
          <p>Profile</p>
        </div>
      </Link>
    </div>
  );
}
