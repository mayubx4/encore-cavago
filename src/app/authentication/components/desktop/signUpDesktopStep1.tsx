'use client';

import React from 'react';
import {
  Row, Col, Form, Input, Button, Divider, Checkbox,
} from 'antd';
import Link from 'next/link';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import Title from '@shared/wrappers/Title';
import Text from '@shared/wrappers/Text';
import Icon from '@shared/components/common/icons';
import { ZodError, z } from 'zod';
import { registerSchemaForm } from '@shared/api/authentication/schemas';

import styles from 'app/authentication/styles.module.scss';
import '@shared/components/desktop/header/_header.scss';

function SignUpDesktopStep1(
  {
    customerEmail,
    isLoading,
    isError,
    error,
    onFinish,
    setCustomerEmail,
    signUpWithGoogle,
  }: {
    customerEmail: string,
    isLoading: boolean,
    isError: boolean,
    error: string | null,
    onFinish: (values: z.infer<typeof registerSchemaForm>) => void,
    setCustomerEmail: (value: string) => void,
    signUpWithGoogle: (response: CredentialResponse) => void,
  },
) {
  const [form] = Form.useForm();

  return (
    <Col md={18} lg={17} xl={14}>
      <Title level={2}>Sign up!</Title>
      <Text>Welcome to Cavago! Please enter your details.</Text>
      <Row justify="start" style={{ marginTop: '20px' }}>
        <Col md={24}>
          <Form
            form={form}
            name="signup-form"
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
              className={styles.inputWrapper}
            >
              <Input allowClear placeholder="Email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, min: 8 }]}
              className={styles.inputWrapper}
            >
              <Input.Password allowClear placeholder="Create Password" />
            </Form.Item>
            <Form.Item
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
              <Input.Password allowClear placeholder="Confirm Password" />
            </Form.Item>
            <Form.Item
              name="terms"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) => {
                    if (value) {
                      return Promise.resolve();
                    }

                    return Promise.reject('Please agree to terms and conditions');
                  },
                }]}
            >
              <Checkbox>
                I have read and agreed to the
                {' '}
                <Link href="#" className={styles.terms}>
                  terms and conditions.
                </Link>
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Row justify="start">
                <Col md={24}>
                  <Button
                    block
                    shape="round"
                    size="large"
                    htmlType="submit"
                    className={styles.buttonStyle}
                    icon={<Icon name="arrowForward" height={20} width={20} />}
                    iconPosition="end"
                    loading={isLoading}
                  >
                    Sign up
                  </Button>
                </Col>
              </Row>
            </Form.Item>
            {isError && <p style={{ textAlign: 'center', color: '#ff4d4f' }}>{error}</p>}
          </Form>
        </Col>
      </Row>
      <Divider style={{ margin: '0' }}>or</Divider>
      <Row justify="center" style={{ marginTop: '15px' }}>
        <Col md={24} style={{ display: 'flex', justifyContent: 'center' }}>
          <GoogleLogin
            shape="pill"
            logo_alignment="left"
            text="signup_with"
            size="large"
            onSuccess={signUpWithGoogle}
          />
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: '15px' }}>
        <Col md={24} style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            shape="round"
            size="large"
            icon={
              <Icon name="appleFilled" />
          }
            className={styles.appleButton}
          >
            Sign up with Apple
          </Button>
        </Col>
      </Row>
      <Row justify="start" style={{ marginTop: '15px' }}>
        <Col><p>Already have an account?</p></Col>
        <Col style={{ alignContent: 'center', marginLeft: '3px' }}>
          <Link href="/authentication/signin" className={styles.linkStyle}><b> Login here</b></Link>
        </Col>
      </Row>
    </Col>
  );
}

export default SignUpDesktopStep1;
