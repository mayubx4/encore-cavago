'use client';

import authApi from '@shared/api/authentication/authenticationApi';
import { useWhichDeviceContext } from '@shared/hooks/whichDeviceContext';
import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { withAuth } from '@shared/hooks/authenticationContext';
import Desktop from './desktop/updatePasswordDesktop';
import Mobile from './mobile/updatePasswordMobile';

function Index() {
  const device = useWhichDeviceContext();
  const nav = useRouter();

  const authMutation = authApi.updatePassword.useMutation({
    onSuccess: () => {
      toast.success('Password updated');
      nav.back();
    },
  });
  console.log(authMutation.error?.message)
  if (device === 'desktop') {
    return (
      <>
        <Desktop onSubmit={authMutation.mutate} isSubmitting={authMutation.isLoading} />
        <p className="error">{authMutation.error?.message}</p>
      </>
    );
  }

  return (
    <>
      <Mobile onSubmit={authMutation.mutate} isSubmitting={authMutation.isLoading} />
      <p className="error">{authMutation.error?.message}</p>
    </>

  );
}

export default withAuth(Index);
