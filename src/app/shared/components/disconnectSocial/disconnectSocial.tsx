import React from 'react';
import './_disconnectSocial.scss';
import authApi from '@shared/api/authentication/authenticationApi';
import { Button } from 'antd';

export default function DisconnectSocial({ provider }: { provider: 'google' | 'apple' }) {
  const disconnectMutation = authApi.disconnectSocial.useMutation({
    onSuccess: (data, vars) => authApi.getUser.setData(undefined, (data) => ({
      ...data,
      [vars.provider === 'google' ? 'google_id' : 'apple_id']: ''
    }))
  });

  return (
    <Button type="link" onClick={() => disconnectMutation.mutate({ provider })} className="fieldLink" loading={disconnectMutation.isLoading}>
      Disconnect
    </Button>
  );
}
