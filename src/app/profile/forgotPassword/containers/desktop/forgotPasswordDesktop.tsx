'use client';

import MinimalHeader from '@shared/components/desktop/header/minimalHeader';
import {
  Button, Col, Form, Input, Row,
} from 'antd';
import './_forgotPasswordDesktop.scss';
import '@app/profile/loginAndSecurity/containers/desktop/_loginAndSecurityDesktop.scss';
import React, { useEffect, useMemo, useState } from 'react';
import Icon from '@shared/components/common/icons';
import authApi from '@shared/api/authentication/authenticationApi';
import { InputField } from '@app/profile/components/desktop/updatePasswordForm/updatePasswordForm';
import colors from '@shared/theme/colors';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthenticationContext } from '@shared/hooks/authenticationContext';

export default function ForgotPasswordDesktop() {
  const [state, setState] = useState<'emailForm' | 'otpScreen' | 'passwordForm' | 'passwordChanged'>('emailForm');
  const nav = useRouter();
  const searchParams = useSearchParams();

  const comp = useMemo(() => {
    if (state === 'emailForm') {
      return (<EmailForm onSubmit={() => setState('otpScreen')} />);
    }
    if (state === 'otpScreen') {
      return (<VerifyOtpScreen onSubmit={() => setState('passwordForm')} />);
    }

    if (state === 'passwordForm') {
      return (<PasswordForm onSubmit={() => setState('passwordChanged')} />);
    }

    if (state === 'passwordChanged') {
      return (<PasswordChanged onSubmit={() => nav.push('/')} />);
    }
  }, [state]);

  useEffect(() => {
    if (searchParams.get('otp')) {
      setState('passwordForm');
    }
  }, [searchParams]);

  return (
    <>
      <div className="header-desktop">
        <div className="headerParent">
          <MinimalHeader />
        </div>
      </div>
      <div className="container">
        <Row justify="center">
          <Col sm={22}>
            <div className="contentContainer">
              <Button type="link" onClick={nav.back}>
                <Icon name="caretLeft" width={35} height={35} style={{ marginTop: 44 }} />
              </Button>
              {comp}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

function EmailForm({ onSubmit }: { onSubmit: () => void }) {
  const [form] = Form.useForm();
  const nav = useRouter();
  const forgotPasswordMutation = authApi.forgotPasswordOTP.useMutation({
    onSuccess: onSubmit,
  });

  return (
    <>
      <div className="titleContainer">
        <h2 className="title">Forgot your password?</h2>
        <p className="subTitle">Don’t worry, we can send you a link to reset it.</p>
        <div className="dividor" />
      </div>

      <div className="forgotPasswordform">
        <div className="title">
          <p className="label">Enter your email address</p>
          <Button type="link" className="link" onClick={nav.back}>
            Cancel
          </Button>
        </div>
        <Form form={form} className="form-gap" onFinish={forgotPasswordMutation.mutate}>
          <Form.Item rules={[{ required: true }, { type: 'email' }]} name="email">
            <InputField label="Enter your email address" />
          </Form.Item>

          <Button className="submit" shape="round" htmlType="submit" loading={forgotPasswordMutation.isLoading}>
            Send reset link
          </Button>
        </Form>
      </div>
    </>
  );
}

function VerifyOtpScreen({ onSubmit }: { onSubmit: () => void }) {
  const [form] = Form.useForm();
  const { user } = useAuthenticationContext();
  const verifyForgotPasswordOTPMutation = authApi.verifyOtp.useMutation({
    onSuccess: onSubmit,
  });
  const forgotPasswordMutation = authApi.forgotPasswordOTP.useMutation();

  return (
    <>
      <Form form={form} className="form-gap" initialValues={{ email: user?.email }} onFinish={verifyForgotPasswordOTPMutation.mutate}>
        <div className="titleContainer verifyEmailMsgContainer">
          <h2 className="title">Check your email</h2>
          <p className="subTitle">
            Please enter the code we sent you to reset your password. This code is valid for 30 minutes.
          </p>
          <Form.Item rules={[{ required: true }]} name="otp">
            <Input.OTP size="large" style={{ width: 300 }} />
          </Form.Item>
          <Form.Item noStyle name="email">
            <input type="hidden" />
          </Form.Item>
          <p className="subTitle" style={{ color: colors.neutrals[400] }}>
            Didn’t receive it? Check your spam folder, or
            <span
              className="resendLink"
              onClick={() => {
                forgotPasswordMutation.mutate({ email: user?.email });
              }}
            >
              {' '}
              resend email.
            </span>
          </p>
          <div className="dividor" />
        </div>

        <div className="forgotPasswordform">
          <Button className="submit" shape="round" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </>

  );
}

function PasswordChanged({ onSubmit }: { onSubmit: () => void }) {
  return (
    <>
      <div className="titleContainer verifyEmailMsgContainer">
        <h2 className="title">Password changed!</h2>
        <p className="subTitle">
          Your password has been changed.
        </p>
        <div className="dividor" />
      </div>

      <div className="forgotPasswordform">
        <Button className="submit" shape="round" htmlType="submit" onClick={onSubmit}>
          Back to him
        </Button>
      </div>
    </>

  );
}

function PasswordForm({ onSubmit }: { onSubmit: () => void }) {
  const [form] = Form.useForm();
  const updatePasswordMutation = authApi.updatePassword.useMutation({
    onSuccess: onSubmit,
  });

  return (
    <>
      <div className="titleContainer">
        <h2 className="title">Create a new password</h2>
        <p className="subTitle">You can set up a new password now</p>
        <div className="dividor" />
      </div>

      <div className="forgotPasswordform">

        <Form
          form={form}
          className="form-gap"
          onFinish={updatePasswordMutation.mutate}
          initialValues={{
            is_forgot_password: true,
          }}
        >
          <Form.Item name="is_forgot_password" noStyle>
            <input type="hidden" />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="new_password">
            <InputField label="New Password" type="password" />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="confirm_password">
            <InputField label="Confirm Password" type="password" />
          </Form.Item>

          <Button className="submit" shape="round" htmlType="submit" loading={updatePasswordMutation.isLoading}>
            Change Password
          </Button>
        </Form>
      </div>
    </>
  );
}
