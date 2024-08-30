'use client';

import {
  Button, Form, Input, InputProps,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react';
import './_createPasswordForm.scss';
import Link from 'next/link';
import { InputField } from '../updatePasswordForm/updatePasswordForm';

export default function CreatePasswordForm() {
  const [form] = useForm();

  return (
    <div className="createPasswordform">
      <Form form={form} initialValues={{}} className="form-gap">
        <Form.Item rules={[{ required: true }]}>
          <InputField label="New Password" />
        </Form.Item>
        <Form.Item rules={[{ required: true }]}>
          <InputField label="Confirm Password" />
        </Form.Item>
        <Button className="submit" shape="round">
          Change Password
        </Button>
      </Form>
    </div>
  );
}
