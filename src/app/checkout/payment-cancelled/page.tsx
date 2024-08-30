'use client';

import React from 'react';
import MinimalHeader from '@shared/components/desktop/header/minimalHeader';
import { useWhichDeviceContext } from '@shared/hooks/whichDeviceContext';
import PaymentCancelled from '@shared/components/desktop/paymentCancelled/paymentCancelled';

export default function Page() {
  const device = useWhichDeviceContext();

  return (
    <>
      {device === 'desktop' && (
      <div className="header-desktop">
        <div className="headerParent">
          <MinimalHeader />
        </div>
      </div>
      )}
      <PaymentCancelled />
    </>
  );
}
