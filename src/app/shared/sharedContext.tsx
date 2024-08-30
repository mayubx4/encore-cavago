'use client';

import React, { ReactNode, useMemo } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { Toaster } from 'sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import CavagoReactQueryProvider from './api/cavagoReactQueryProvider';
import antdTheme from './theme/antdTheme';
import { WhichDeviceContextProvider } from './hooks/whichDeviceContext';
import { BottomNavContextProvider } from './hooks/mobileBottomNavContext';
import { SharedModalPopupContextProvider } from './hooks/sharedModalPopUp';
import { AuthenticationContextProvider } from './hooks/authenticationContext';
import { ActivitySelectedDetailsContextProvider } from './hooks/activityDetailsContext';

export default function SharedContext({ children }: { children: ReactNode }) {
  const isMobileDevice = useMemo(() => (/iPhone|iPad|iPod|Android/i).test(
    typeof window !== 'undefined' && window.navigator.userAgent,
  ), []);

  return (
    <CavagoReactQueryProvider>
      <AuthenticationContextProvider>
        <SharedModalPopupContextProvider>
          <WhichDeviceContextProvider device={isMobileDevice ? 'mobile' : 'desktop'}>
            <BottomNavContextProvider>
              <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''}>
                <ConfigProvider theme={antdTheme}>
                  <Toaster richColors />
                  <AntdRegistry>
                    <ActivitySelectedDetailsContextProvider
                      adults={1}
                      children={0}
                      basePrice={0}
                      date=""
                      time=""
                      activityId={0}
                      actualTickets={[]}
                    >
                      {children}
                    </ActivitySelectedDetailsContextProvider>
                  </AntdRegistry>
                </ConfigProvider>
                <ReactQueryDevtools initialIsOpen={false} />
              </GoogleOAuthProvider>
            </BottomNavContextProvider>
          </WhichDeviceContextProvider>
        </SharedModalPopupContextProvider>
      </AuthenticationContextProvider>
    </CavagoReactQueryProvider>
  );
}
