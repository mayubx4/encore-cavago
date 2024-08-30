'use client';

import { useWhichDeviceContext } from '@shared/hooks/whichDeviceContext';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import messagesApi from '@shared/api/messages/messagesApi';
import authApi from '@shared/api/authentication/authenticationApi';
import MessagesDesktop from './desktop/messagesDesktop';
import MessagesMobile from './mobile/messagesMobile';
import { useBottomNavContext } from '@shared/hooks/mobileBottomNavContext';
import { withAuth } from '@shared/hooks/authenticationContext';

function Index() {
  useBottomNavContext({ activeTab: 'message' });
  const searchParams = useSearchParams();
  const receiverId = searchParams.get('receiverId');
  const bookingId = searchParams.get('bookingId');
  const device = useWhichDeviceContext();
  const { isLoading, data } = messagesApi.getMessagesInbox.useQuery();
  const { data: userData } = authApi.getUser.useQuery();

  if (device === 'desktop') {
    return (
      <MessagesDesktop
        receiverId={receiverId}
        inbox={data || []}
        inboxLoading={isLoading}
        userId={userData?.id || 0}
        bookingId={bookingId}
      />
    );
  }

  return (
    <MessagesMobile
      receiverId={receiverId}
      inbox={data || []}
      inboxLoading={isLoading}
      userId={userData?.id || 0}
      bookingId={bookingId}
    />
  );
}

export default withAuth(Index);
