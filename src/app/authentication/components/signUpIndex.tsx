'use client';

import { useWhichDeviceContext } from '@shared/hooks/whichDeviceContext';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Row, Col } from 'antd';
import { z } from 'zod';

import MinimalHeader from '@shared/components/desktop/header/minimalHeader';
import api from '@shared/api/authentication/authenticationApi';
import styles from 'app/authentication/styles.module.scss';
import HomeImage from '@assets/images/signIn2.png';
import Icon from '@shared/components/common/icons';
import '@shared/components/desktop/header/_header.scss';
import { otpSchemaForm, registerSchemaForm, saveCustomerDataSchema } from '@shared/api/authentication/schemas';

import { CredentialResponse } from '@react-oauth/google';
import { setToken } from '@shared/api/utils';
import SignUpComponentMobile from './mobile/signUpComponentMobile';
import SignUpMobileStep1 from './mobile/signUpMobileStep1';
import SignUpMobileStep2 from './mobile/signUpMobileStep2';
import SignUpMobileStep3 from './mobile/signUpMobileStep3';
import SignUpDesktopStep1 from './desktop/signUpDesktopStep1';
import SignUpDesktopStep2 from './desktop/signUpDesktopStep2';
import SignUpDesktopStep3 from './desktop/signUpDesktopStep3';

export default function SignUp() {
  const device = useWhichDeviceContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = searchParams.get('step');
  const [customerEmail, setCustomerEmail] = useState('');

  const {
    mutate: signUpMutate,
  } = api.loginViaGoogle.useMutation({
    onSuccess: (data) => {
      if (data?.user && data.user?.first_name) {
        toast.info('User already registered! Please Sign In...');
        router.push('/authentication');
      } else {
        toast.success('Signup via Google successful!');
        setCustomerEmail(data.user.email);
        setToken(data.access_token);
        router.push('/authentication/signup?step=3');
      }
    },
  });

  const signUpWithGoogle = (response: CredentialResponse) => {
    if (response.credential) {
      signUpMutate({
        token: response.credential,
        role: 4,
        app_type: 'customer',
      });
    } else {
      toast.error('Google sign up failed!');
    }
  };

  const registerMutation = api.getRegistered.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
      router.push('/authentication/signup?step=2');
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const verifyOtpMutation = api.verifyOtp.useMutation({
    onSuccess: (data) => {
      setToken(data.access_token);
      toast.success('OTP Validated Successfully!');
      router.push('/authentication/signup?step=3');
    },
  });

  const resendOtpMutation = api.onResendOtp.useMutation({
    onSuccess: () => {
      toast.success('OTP has been sent to your email.');
    },
  });

  const saveCustomerMutation = api.onSaveCustomerData.useMutation({
    onSuccess: () => {
      toast.success('Customer data saved successfully!');
      router.push('/authentication');
    },
  });

  const onOtpFinish = (values: z.infer<typeof otpSchemaForm>) => {
    verifyOtpMutation.mutate({
      otp: values.otp,
      email: customerEmail,
    });
  };

  const onFinish = (values: z.infer<typeof registerSchemaForm>) => {
    registerMutation.mutate({
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
      role: 4,
      email_verification_method: 'otp',
    });
  };

  const onResendOtp = () => {
    resendOtpMutation.mutate({
      email: customerEmail,
    });
  };

  const onSaveCustomerData = (values: z.infer<typeof saveCustomerDataSchema>) => {
    saveCustomerMutation.mutate(values);
  };

  useEffect(() => {
    if (step === '2' && !customerEmail) router.push('/authentication/signup?step=1');
    if (step === '3' && !customerEmail) router.push('/authentication/signup?step=1');
  }, []);

  if (device === 'desktop' && (!step || step === '1' || (step === '2' && customerEmail) || (step === '3' && customerEmail))) {
    return (
      <>
        <div className="header-desktop">
          <div className="headerParent">
            <MinimalHeader />
          </div>
        </div>
        <Row justify="start" className={styles.mainContainer}>
          <Col md={14} lg={13}>
            <Row justify="center" style={{ margin: '45px' }}>
              {(!step || step === '1') && (
                <SignUpDesktopStep1
                  isLoading={registerMutation.isLoading}
                  isError={registerMutation.isError}
                  error={registerMutation.error}
                  customerEmail={customerEmail}
                  setCustomerEmail={setCustomerEmail}
                  onFinish={onFinish}
                  signUpWithGoogle={signUpWithGoogle}
                />
              )}
              {step === '2' && (
                <SignUpDesktopStep2
                  isLoading={verifyOtpMutation.isLoading}
                  isError={verifyOtpMutation.isError}
                  error={verifyOtpMutation.error}
                  customerEmail={customerEmail}
                  onOtpFinish={onOtpFinish}
                  onResendOtp={onResendOtp}
                />
              )}
              {step === '3' && (
                <SignUpDesktopStep3
                  isLoading={saveCustomerMutation.isLoading}
                  isError={saveCustomerMutation.isError}
                  error={saveCustomerMutation.error}
                  onSaveCustomerData={onSaveCustomerData}
                />
              )}
            </Row>
          </Col>
          <Col md={10} lg={11}>
            <div className={styles.homeImage}>
              <Image src={HomeImage} alt="Horse Ride" />
            </div>
          </Col>
        </Row>
      </>
    );
  }

  if (device === 'mobile') {
    if (step === '1' || (step === '2' && customerEmail) || (step === '3' && customerEmail)) {
      return (
        <div style={{ padding: '15px' }}>
          <Row justify="start" align="middle" style={{ marginBottom: 10 }}>
            <Col>
              <Icon name="back" width={24} height={24} onClick={() => router.back()} />
            </Col>
          </Row>
          {step === '1' && (
            <SignUpMobileStep1
              isLoading={registerMutation.isLoading}
              isError={registerMutation.isError}
              error={registerMutation.error}
              customerEmail={customerEmail}
              setCustomerEmail={setCustomerEmail}
              onFinish={onFinish}
            />
          )}
          {step === '2' && (
            <SignUpMobileStep2
              isLoading={verifyOtpMutation.isLoading}
              isError={verifyOtpMutation.isError}
              error={verifyOtpMutation.error}
              customerEmail={customerEmail}
              onOtpFinish={onOtpFinish}
              onResendOtp={onResendOtp}
            />
          )}
          {step === '3' && (
            <SignUpMobileStep3
              isLoading={saveCustomerMutation.isLoading}
              isError={saveCustomerMutation.isError}
              error={saveCustomerMutation.error}
              onSaveCustomerData={onSaveCustomerData}
            />
          )}
        </div>
      );
    }

    if (!step) {
      return (
        <SignUpComponentMobile
          signUpWithGoogle={signUpWithGoogle}
        />
      );
    }
  }
}
