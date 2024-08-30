'use client';

import { useWhichDeviceContext } from '@shared/hooks/whichDeviceContext';
import React, { useLayoutEffect } from 'react';
import Desktop from './desktop/invitationDesktop';
import { useRouter } from 'next/navigation';
import Animations from '@shared/components/common/animations';

export default function Index({ invitationId }: { invitationId: string }) {
  const device = useWhichDeviceContext();
  const router = useRouter();

  useLayoutEffect(() => {
    if (invitationId && device === 'mobile') {
      router.replace(`/invitations?invitationId=${invitationId}`);
    }
  }, [router, invitationId]);


  if (device === 'desktop') {
    return (
      <Desktop invitationId={invitationId} />
    );
  } else {
    return <Animations name="cavagoLoader" style={{ width: 100, height: 100 }} />;
  }
}
