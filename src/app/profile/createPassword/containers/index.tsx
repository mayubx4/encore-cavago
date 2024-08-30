'use client';

import { useWhichDeviceContext } from '@shared/hooks/whichDeviceContext';
import React from 'react';
import { withAuth } from '@shared/hooks/authenticationContext';
import Desktop from './desktop/createPasswordDesktop';
import Mobile from './mobile/createPasswordMobile';

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
