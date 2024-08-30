'use client';

import { useWhichDeviceContext } from '@shared/hooks/whichDeviceContext';
import React from 'react';
import MinimalHeader from '@shared/components/desktop/header/minimalHeader';
import '@shared/components/desktop/header/_header.scss';
import bookingsApi from '@shared/api/bookings/bookingsApi';
import { Spin } from 'antd';
import { useSearchParams } from 'next/navigation';
import BookingsDesktop from './desktop/bookingsDesktop';
import BookingsMobile from './mobile/bookingsMobile';
import BookingDetailsDesktop from '../components/desktop/bookingDetailsDesktop/bookingDetailsDesktop';

export default function Activity() {
  const device = useWhichDeviceContext();
  const params = useSearchParams();
  const id = params.get('id')?.toString();
  const facilityId = params.get('facilityId')?.toString();

  if (device === 'desktop') {
    return (
      <>
        <div className="header-desktop">
          <div className="headerParent">
            <MinimalHeader />
          </div>
        </div>
        {id && facilityId ? (
          <BookingDetailsDesktop id={id} facilityId={facilityId} />
        ) : (
          <BookingsDesktop />
        )}
      </>
    );
  }

  return (
    <BookingsMobile />
  );
}
