import React, { useEffect, useMemo, useState } from 'react';
import './_forgotPasswordMobile.scss';
import { Button, Divider, Form, Input } from 'antd';
import Icon from '@shared/components/common/icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { InputField } from '@app/profile/components/mobile/updatePasswordForm/updatePasswordForm';
import authApi from '@shared/api/authentication/authenticationApi';
import { useAuthenticationContext } from '@shared/hooks/authenticationContext';
import colors from '@shared/theme/colors';

export default function ForgotPasswordMobile() {
  const nav = useRouter();
  const [state, setState] = useState<'emailForm' | 'otpScreen' | 'passwordForm' | 'passwordChanged'>('emailForm');
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');

  const childComponent = useMemo(() => {
    if (state === 'emailForm') {
      return (<EmailForm onSubmit={() => setState('otpScreen')} setEmail={setEmail} />);
    }
    if (state === 'otpScreen') {
      return (<VerifyOtpScreen setState={setState} secEmail={email} />);
    }

    if (state === 'passwordForm') {
      return (<PasswordForm onSubmit={() => setState('passwordChanged')} />);
    }

    if (state === 'passwordChanged') {
      return (<PasswordChanged onSubmit={() => nav.push('/authentication')} />);
    }
  }, [state]);

  useEffect(() => {
    if (searchParams.get('otp')) {
      setState('passwordForm');
    }
  }, [searchParams]);

  return (
    <div className="container">
      {['emailForm', 'otpScreen'].includes(state) && (
        <Button className="backBtn" type="link" onClick={nav.back}>
          <Icon name="caretLeft" width={35} height={35} style={{ marginTop: 44 }} />
        </Button>
      )}
      {childComponent}
    </div>
  );
}

function EmailForm({ onSubmit, setEmail }
  : { onSubmit: () => void, setEmail: (e: string) => void }) {
  const [form] = Form.useForm();
  const forgotPasswordMutation = authApi.forgotPasswordOTP.useMutation({
    onSuccess: onSubmit,
  });

  return (
    <div className="forgotContent">
      <h1>Forgot Password</h1>
      <p className="secondary">Don't worry we got you.</p>
      <Form form={form} name="forget-form" onFinish={forgotPasswordMutation.mutate}>
        <Form.Item rules={[{ required: true }, { type: 'email' }]} name="email">
          <InputField label="Email" placeholder="Enter email address" onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Button className="submit" shape="round" htmlType="submit" loading={forgotPasswordMutation.isLoading}>
          Confirm Email Address
        </Button>
      </Form>
    </div>
  );
}

function VerifyOtpScreen({ setState, secEmail }
  : { setState: (e: string) => void, secEmail?: string }) {
  const [form] = Form.useForm();
  const { user } = useAuthenticationContext();
  const verifyForgotPasswordOTPMutation = authApi.verifyOtp.useMutation({
    onSuccess: (e) => {
      localStorage.setItem('token', e.access_token);
      setState('passwordForm');
    },
  });
  const forgotPasswordMutation = authApi.forgotPasswordOTP.useMutation();

  return (
    <Form form={form} className="verifyContent" initialValues={{ email: user?.email || secEmail }} onFinish={verifyForgotPasswordOTPMutation.mutate}>
      <h1>Check your email</h1>
      <p className="secondary">
        Please enter the code we sent you to reset your password. This code is valid for 30 minutes.
      </p>
      <div className="otpContainer">
        <Form.Item rules={[{ required: true }]} name="otp">
          <Input.OTP size="large" style={{ width: 300 }} />
        </Form.Item>
      </div>
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
      <Divider />
      <Button className="submit" shape="round" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
}

function PasswordForm({ onSubmit }: { onSubmit: () => void }) {
  const [form] = Form.useForm();
  const updatePasswordMutation = authApi.updatePassword.useMutation({
    onSuccess: onSubmit,
  });

  return (
    <div className="passwordContent">
      <h1>Create a new password</h1>
      <p className="secondary">You can set up a new password now</p>
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
          <InputField label="New Password" placeholder="Enter new password" type="password" />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} name="confirm_password">
          <InputField label="Confirm Password" placeholder="Confirm new password" type="password" />
        </Form.Item>

        <Button className="submit" shape="round" htmlType="submit" loading={updatePasswordMutation.isLoading}>
          Change Password
        </Button>
      </Form>
    </div>
  );
}

function PasswordChanged({ onSubmit }: { onSubmit: () => void }) {
  return (
    <div className="changedContent">
      <Icon name="passwordUpdate" width={140} height={140} style={{ marginBottom: 10 }} />
      <h1>Password changed</h1>
      <p className="secondary">
        You can now use your new password to log in.
      </p>

      <Button className="submit" shape="round" htmlType="submit" onClick={onSubmit}>
        Login Now
      </Button>
    </div>
  );
}
