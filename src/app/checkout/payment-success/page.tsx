'use client';

import React, { useEffect } from 'react';
import PaymentSuccessful from '@shared/components/common/paymentSuccessful/paymentSuccessful';
import MinimalHeader from '@shared/components/desktop/header/minimalHeader';
import { useWhichDeviceContext } from '@shared/hooks/whichDeviceContext';
import checkoutApi from '@shared/api/checkout/checkoutApi';
import { toast } from 'sonner';
import { useSearchParams, useRouter } from 'next/navigation';
import Animations from '@shared/components/common/animations';

export default function Page() {
  const device = useWhichDeviceContext();
  const router = useRouter();

  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const saveBookingQuery = checkoutApi.saveBooking.useMutation({
    onError: () => {
      toast.error('Error occured while saving booking. Please try again.');
      router.replace('/home');
    },
  });

  useEffect(() => {
    if (sessionId) {
      saveBookingQuery.mutate({ checkout_session_id: sessionId });
    }
  }, []);

  if (!saveBookingQuery.isSuccess) {
    return <Animations name="cavagoLoader" style={{ width: 100, height: 100 }} />;
  }

  return (
    <>
      {device === 'desktop' && (
        <div className="header-desktop">
          <div className="headerParent">
            <MinimalHeader />
          </div>
        </div>
      )}
      <PaymentSuccessful />
    </>
  );
}
