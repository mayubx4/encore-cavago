'use client';

import { useWhichDeviceContext } from '@shared/hooks/whichDeviceContext';
import React, { useLayoutEffect } from 'react';
import Desktop from './desktop/invitationsDesktop';
import Mobile from './mobile/invitationsMobile';
import MinimalHeader from '@shared/components/desktop/header/minimalHeader';
import { useRouter, useSearchParams } from 'next/navigation';
import Animations from '@shared/components/common/animations';

export default function Index() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const invitationId = searchParams.get('invitationId');

  const device = useWhichDeviceContext();

  useLayoutEffect(() => {
    if (invitationId && device === 'desktop') {
      router.replace(`/invitations/${invitationId}`);
    }
  }, [searchParams, invitationId]);

  if (device === 'mobile') {
    return (
      <Mobile />
    );
  }

  if (!invitationId) {
    return (
      <>
        <div className="headerParent">
          <MinimalHeader />
        </div>
        <Desktop />
      </>
    );
  } else {
    return <Animations name="cavagoLoader" style={{ width: 100, height: 100 }} />;
  }
}
