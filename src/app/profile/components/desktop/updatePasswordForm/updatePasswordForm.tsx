'use client';

import {
  Button, Form, Input, InputProps,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react';
import './_updatePasswordForm.scss';
import Link from 'next/link';
import { UpdatePasswordFormData } from '@shared/api/authentication/schemas';

export default function UpdatePasswordForm({ onSubmit, isSubmitting }:
  { onSubmit: (u: UpdatePasswordFormData) => void; isSubmitting: boolean }) {
  const [form] = useForm();

  return (
    <div className="updatePasswordform">
      <div className="title">
        <p className="label">Change Password</p>
        <p className="link">Cancel</p>
      </div>
      <Form
        form={form}
        onFinish={(data) => {
          onSubmit(data);
          form.resetFields();
        }}
        initialValues={{
          is_forgot_password: false,
        }}
        className="form-gap"
      >
        <Form.Item name="is_forgot_password" noStyle>
          <input type="hidden" />
        </Form.Item>
        <div>
          <Form.Item name="current_password" rules={[{ required: true }]}>
            <InputField type="password" label="Current Password" />
          </Form.Item>
          <div className="forgotPassSect">
            <Link href="/profile/forgotPassword" className="link-plain" style={{ float: 'right' }}>Forgot Password</Link>
          </div>
        </div>
        <Form.Item name="new_password" rules={[{ required: true }]}>
          <InputField type="password" label="New Password" />
        </Form.Item>
        <Form.Item name="confirm_password" rules={[{ required: true }]}>
          <InputField type="password" label="Confirm Password" />
        </Form.Item>
        <Button className="submit" shape="round" loading={isSubmitting} htmlType="submit">
          Change Password
        </Button>
      </Form>
    </div>
  );
}

export function InputField({ label, ...props }: InputProps & { label: string }) {
  return (
    <div className="roundedFieldContainer">
      <p className="label">{label}</p>
      <Input className="roundedField" {...props} />
    </div>
  );
}
