'use client';

import React from 'react';
import {
  Row, Col, Form, Input, Button,
} from 'antd';
import styles from 'app/authentication/styles.module.scss';
import { ZodError } from 'zod';
import Link from 'next/link';

export default function SignInFormComponentMobile(
  {
    isLoading,
    isError,
    error,
    handleSubmit,
  }: {
    isLoading: boolean,
    isError: boolean,
    error: string | null,
    handleSubmit: any,
  },
) {
  const [form] = Form.useForm();

  return (
    <Row justify="start" style={{ margin: '15px 0' }}>
      <Col xs={24} md={16} lg={8}>
        <Form
          form={form}
          name="signin-form"
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email' }]}
            className={styles.inputWrapper}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, min: 8 }]}
            className={styles.inputWrapper}
          >
            <Input.Password allowClear />
          </Form.Item>
          <div style={{ textAlign: 'end' }}>
            <Link href="/profile/forgotPassword" className={styles.linkStyle}>
              <b>Forgot Password?</b>
            </Link>
          </div>
          <Form.Item>
            <Row justify="start" style={{ marginTop: 10 }}>
              <Col xs={24} md={16} lg={8}>
                <Button block shape="round" htmlType="submit" size="large" className={styles.buttonStyle} loading={isLoading}>
                  <b>Sign in</b>
                </Button>
              </Col>
            </Row>
          </Form.Item>
          {isError && <p style={{ textAlign: 'center', color: '#ff4d4f' }}>{error}</p>}
        </Form>
      </Col>
    </Row>
  );
}
