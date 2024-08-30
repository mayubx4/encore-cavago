'use client';

import React from 'react';
import {
  Row, Col, Form, Input, Button, Space,
} from 'antd';
import Link from 'next/link';

import Title from '@shared/wrappers/Title';
import Text from '@shared/wrappers/Text';
import Icon from '@shared/components/common/icons';

import styles from 'app/authentication/styles.module.scss';
import '@shared/components/desktop/header/_header.scss';
import { ZodError } from 'zod';
import { useRouter } from 'next/navigation';

function SignUpDesktopStep2(
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
  const router = useRouter();

  return (
    <Col md={18} lg={17} xl={14}>
      <Icon
        style={{ cursor: 'pointer' }}
        name="arrowBackward"
        width={24}
        height={24}
        onClick={() => router.back()}
      />
      <Space direction="vertical" size="large" style={{ marginTop: '20px' }}>
        <Title level={2}>Verify email address!</Title>
        <Text className={styles.neutral400}>
          Please enter the code we sent at&nbsp;
          <b>
            {customerEmail}
          </b>
        </Text>
        <Text className={styles.neutral400}>
          This code is valid for 30 minutes.
        </Text>
        <Form
          form={form}
          name="signup-form-2"
          layout="vertical"
          onFinish={onOtpFinish}
        >
          <Form.Item
            name="otp"
            rules={[{ required: true, min: 6, max: 6 }]}
            className={styles.inputWrapper}
          >
            <Input.OTP
              size="large"
              length={6}
            />
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
                  Verify
                </Button>
              </Col>
            </Row>
          </Form.Item>
          {isError && <p style={{ textAlign: 'center', color: '#ff4d4f' }}>{error}</p>}
        </Form>
        <Text>
          Didn't receive it?
          <Link href="#" onClick={onResendOtp} className={styles.linkStyle}>
            <b> Resend Code</b>
          </Link>
        </Text>
      </Space>
    </Col>
  );
}

export default SignUpDesktopStep2;
