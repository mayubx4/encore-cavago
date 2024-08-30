'use client';

import React from 'react';
import {
  Row, Col, Form, Input, Button,
} from 'antd';

import styles from 'app/authentication/styles.module.scss';
import Title from '@shared/wrappers/Title';
import Text from '@shared/wrappers/Text';
import { z } from 'zod';
import { registerSchemaForm } from '@shared/api/authentication/schemas';

export default function signUpMobileStep1(
  {
    customerEmail,
    isLoading,
    isError,
    error,
    onFinish,
    setCustomerEmail,
  }: {
    customerEmail: string,
    isLoading: boolean,
    isError: boolean,
    error: string | null,
    onFinish: (values: z.infer<typeof registerSchemaForm>) => void,
    setCustomerEmail: (value: string) => void,
  },
) {
  const [form] = Form.useForm();

  return (
    <>
      <Row justify="start">
        <Col span={24}>
          <Title level={4}>Sign up with email</Title>
          <Text type="secondary" className={styles.neutral300}>Please enter the details below to continue.</Text>
        </Col>
      </Row>
      <Row justify="start" style={{ margin: '15px 0' }}>
        <Col xs={24} md={16} lg={8}>
          <Form
            form={form}
            name="signup-form-1"
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
              className={styles.inputWrapper}
            >
              <Input
                allowClear
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, min: 8 }]}
              className={styles.inputWrapper}
            >
              <Input.Password allowClear />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="password_confirmation"
              rules={[
                { required: true },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject('The two passwords that you entered do not match!');
                  },
                }),
              ]}
              className={styles.inputWrapper}
            >
              <Input.Password allowClear />
            </Form.Item>
            <Form.Item>
              <Row justify="start">
                <Col xs={24} md={16} lg={8}>
                  <Button
                    shape="round"
                    size="large"
                    htmlType="submit"
                    className={styles.buttonStyle}
                    loading={isLoading}
                  >
                    <b>Continue</b>
                  </Button>
                </Col>
              </Row>
            </Form.Item>
            {isError && <p style={{ textAlign: 'center', color: '#ff4d4f' }}>{error}</p>}
          </Form>
        </Col>
      </Row>
    </>
  );
}
