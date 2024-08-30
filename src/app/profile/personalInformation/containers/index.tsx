'use client';

import { useWhichDeviceContext } from '@shared/hooks/whichDeviceContext';
import React from 'react';
import { withAuth } from '@shared/hooks/authenticationContext';
import Desktop from './desktop/personalInformationDesktop';
import Mobile from './mobile/personalInformationMobile';

function Index() {
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
