'use client';

import { useWhichDeviceContext } from '@shared/hooks/whichDeviceContext';
import React from 'react';
import { withAuth } from '@shared/hooks/authenticationContext';
import { useBottomNavContext } from '@shared/hooks/mobileBottomNavContext';
import Desktop from './desktop/profileDesktop';
import Mobile from './mobile/profileMobile';

function Index() {
  const device = useWhichDeviceContext();
  useBottomNavContext({ activeTab: 'profile' });

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
