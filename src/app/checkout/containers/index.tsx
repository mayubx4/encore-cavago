'use client';

import { useWhichDeviceContext } from '@shared/hooks/whichDeviceContext';
import React from 'react';
import MinimalHeader from '@shared/components/desktop/header/minimalHeader';
import CheckoutDesktop from './desktop/checkoutDesktop';
import CheckoutMobile from './mobile/checkoutMobile';

export default function Index() {
  const device = useWhichDeviceContext();
  if (device === 'desktop') {
    return (
      <>
        <div className="header-desktop">
          <div className="headerParent">
            <MinimalHeader />
          </div>
        </div>
        <CheckoutDesktop />
      </>
    );
  }

  return <CheckoutMobile />;
}
