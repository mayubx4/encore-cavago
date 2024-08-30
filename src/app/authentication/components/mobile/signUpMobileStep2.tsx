'use client';

import React from 'react';
import {
  Row, Col, Form, Input, Button,
} from 'antd';
import Link from 'next/link';

import styles from 'app/authentication/styles.module.scss';
import Title from '@shared/wrappers/Title';
import Text from '@shared/wrappers/Text';

export default function SignUpMobileStep2(
  {
    customerEmail,
    isLoading,
    isError,
    error,
    onOtpFinish,
    onResendOtp,
  }: {
    customerEmail: string,
    isLoading: boolean,
    isError: boolean,
    error: string | null,
    onOtpFinish: any,
    onResendOtp: any,
  },

) {
  const [form] = Form.useForm();

  return (
    <>
      <Row justify="start">
        <Col span={24}>
          <Title level={4}>Verify your email</Title>
          <Text type="secondary" className={styles.neutral300}>
            {`Please enter the code we sent at ${customerEmail}. This code will expire in 30 mins.`}
          </Text>
        </Col>
      </Row>
      <Row justify="center" style={{ margin: '15px 0' }}>
        <Col xs={24} md={16} lg={8}>
          <Form
            form={form}
            name="signup-form-2"
            layout="vertical"
            onFinish={onOtpFinish}
          >
            <Form.Item name="otp" rules={[{ required: true, min: 6, max: 6 }]} className={styles.inputWrapper}>
              <Input.OTP size="large" />
            </Form.Item>
            <Row justify="start" style={{ margin: '15px 0' }}>
              <Col><p>Didn&apos;t get it?</p></Col>
              <Col style={{ alignContent: 'center', marginLeft: '3px' }}>
                <Link href="#" onClick={onResendOtp} className={styles.linkStyle}><b> Resend Code</b></Link>
              </Col>
            </Row>
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
