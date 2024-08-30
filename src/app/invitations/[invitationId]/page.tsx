import React from 'react';
import Invitations from './containers';

export default function Page({ params }: { params: { invitationId: string } }) {
  return (
    <Invitations invitationId={params.invitationId} />
  );
}
