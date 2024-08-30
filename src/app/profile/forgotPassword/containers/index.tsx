'use client';

import { useWhichDeviceContext } from '@shared/hooks/whichDeviceContext';
import React from 'react';
import Desktop from './desktop/forgotPasswordDesktop';
import Mobile from './mobile/forgotPasswordMobile';

export default function Index() {
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
