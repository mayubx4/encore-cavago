'use client';

import { useWhichDeviceContext } from '@shared/hooks/whichDeviceContext';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import MinimalHeader from '@shared/components/desktop/header/minimalHeader';
import api from '@shared/api/authentication/authenticationApi';
import { z } from 'zod';
import { loginSchema } from '@shared/api/authentication/schemas';
import { toast } from 'sonner';
import { CredentialResponse } from '@react-oauth/google';
import { useAuthenticationContext } from '@shared/hooks/authenticationContext';

import '@shared/components/desktop/header/_header.scss';
import { setToken } from '@shared/api/utils';
import { useBottomNavContext } from '@shared/hooks/mobileBottomNavContext';
import SignInComponent from './desktop/signInComponentDesktop';
import SignInComponentMobile from './mobile/signInComponentMobile';

export default function Login() {
  const device = useWhichDeviceContext();
  const router = useRouter();
  const authContext = useAuthenticationContext();
  const query = useSearchParams();
  useBottomNavContext({ bottomNavShown: false });

  const redirect = () => {
    if (query.get('next')) {
      router.push(query.get('next'));
    } else {
      router.push('/home');
    }
  };
  const {
    mutate,
    isLoading,
    isError,
    error,
  } = api.performLogin.useMutation({
    onSuccess: (data) => {
      setToken(data.access_token);
      authContext.onLogin();
      redirect();
    },
  });

  const {
    mutate: loginMutate,
  } = api.loginViaGoogle.useMutation({
    onSuccess: (data) => {
      if (data?.user && data.user?.first_name) {
        toast.success('Login via Google successful!');
        authContext.onLogin();
        setToken(data.access_token);
        redirect();
      } else {
        toast.error('User isn\'t registered! Please Sign Up First...');
        router.push('/authentication/signup');
      }
    },
  });

  const loginWithGoogle = (response: CredentialResponse) => {
    if (response.credential) {
      loginMutate({
        token: response.credential,
        role: 4,
        app_type: 'customer',
      });
    } else {
      toast.error('Google login failed!');
    }
  };

  const handleSubmit = (values: z.infer<typeof loginSchema>) => {
    mutate(values);
  };

  if (device === 'desktop') {
    return (
      <>
        <div className="header-desktop">
          <div className="headerParent">
            <MinimalHeader />
          </div>
        </div>
        <SignInComponent
          isLoading={isLoading}
          isError={isError}
          error={error}
          handleSubmit={handleSubmit}
          loginWithGoogle={loginWithGoogle}
        />
      </>
    );
  }

  return (
    <SignInComponentMobile
      isLoading={isLoading}
      isError={isError}
      error={error}
      handleSubmit={handleSubmit}
      loginWithGoogle={loginWithGoogle}
    />
  );
}
