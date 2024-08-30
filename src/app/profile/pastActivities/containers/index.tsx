'use client';

import { useWhichDeviceContext } from '@shared/hooks/whichDeviceContext';
import React from 'react';
import { withAuth } from '@shared/hooks/authenticationContext';
import Mobile from './mobile/pastActivities';

function Index() {
  const device = useWhichDeviceContext();
  if (device === 'desktop') {
    return (
      null
    );
  }

  return (
    <Mobile />
  );
}
export default withAuth(Index);
