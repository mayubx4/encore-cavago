'use client';

import { useWhichDeviceContext } from '@shared/hooks/whichDeviceContext';
import React from 'react';
import { withAuth } from '@shared/hooks/authenticationContext';
import { useBottomNavContext } from '@shared/hooks/mobileBottomNavContext';
import Desktop from './desktop/wishlistActivitiesDesktop';
import Mobile from './mobile/wishlistActivitiesMobile';

function Index() {
  useBottomNavContext({ activeTab: 'wishlist' });
  const device = useWhichDeviceContext();
  if (device === 'desktop') {
    return (
      <Desktop />
    );
  }

  return (
    <Mobile />
  );
}

export default withAuth(Index);
