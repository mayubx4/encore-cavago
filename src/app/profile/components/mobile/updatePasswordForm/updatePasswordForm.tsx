'use client';

import {
  Button, Form, Input, InputProps,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react';
import './_updatePasswordForm.scss';
import { UpdatePasswordFormData } from '@shared/api/authentication/schemas';

export default function UpdatePasswordForm({ onSubmit, isSubmitting }:
  { onSubmit: (u: UpdatePasswordFormData) => void; isSubmitting: boolean }) {
  const [form] = useForm();

  return (
    <div className="updatePasswordform">
      <Form
        form={form}
        className="form-gap"
        initialValues={{
          is_forgot_password: false,
        }}
        onFinish={(data) => {
          onSubmit(data);
          form.resetFields();
        }}
      >
        <Form.Item name="is_forgot_password" noStyle>
          <input type="hidden" />
        </Form.Item>
        <div>
          <Form.Item name="current_password" rules={[{ required: true, message: 'This field is required' }]}>
            <InputField type="password" label="Current Password" />
          </Form.Item>
        </div>
        <Form.Item
          rules={[
            { required: true, message: 'This field is required' },
            {
              validator: (_, v) => {
                if (form.getFieldValue('current_password') === v) {
                  return Promise.reject(_);
                }

                return Promise.resolve();
              },
              message: 'New password cannot match old password',
            },
          ]}
          name="new_password"
        >
          <InputField type="password" label="New Password" />
        </Form.Item>
        <Form.Item
          rules={[
            { required: true, message: 'This field is required' },
            {
              validator: (_, v) => {
                if (v === form.getFieldValue('new_password')) {
                  return Promise.resolve();
                }

                return Promise.reject(_);
              },
              message: 'This field should match your new password',
            },

          ]}
          name="confirm_password"
        >
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
      <div>

        <p className="label">{label}</p>
        <Input className="roundedField" {...props} />
      </div>
    </div>
  );
}
