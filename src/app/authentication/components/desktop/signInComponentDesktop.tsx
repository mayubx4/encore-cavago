'use client';

import {
  Row, Col, Form, Input, Button, Divider,
} from 'antd';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Title from '@shared/wrappers/Title';
import Text from '@shared/wrappers/Text';
import HomeImage from '@assets/images/signIn2.png';
import Icon from '@shared/components/common/icons';
import styles from 'app/authentication/styles.module.scss';
import '@shared/components/desktop/header/_header.scss';
import { ZodError, z } from 'zod';
import { loginSchema } from '@shared/api/authentication/schemas';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

function SignInComponent(
  {
    isLoading,
    isError,
    error,
    handleSubmit,
    loginWithGoogle,
  }: {
    isLoading: boolean,
    isError: boolean,
    error: string | null,
    handleSubmit: (values: z.infer<typeof loginSchema>) => void,
    loginWithGoogle: (response: CredentialResponse) => void,
  },
) {
  const [activeButton, setActiveButton] = useState('customer');
  const [form] = Form.useForm();

  return (
    <Row justify="start" className={styles.mainContainer}>
      <Col md={14} lg={13}>
        <Row justify="center" style={{ margin: '45px' }}>
          <Col md={18} lg={17} xl={14}>
            <Title level={2}>Welcome back!</Title>
            <Text>Please enter your details to sign in!</Text>
            <Row className={styles.signInDiv}>
              <Col md={12} style={{ textAlign: 'center' }}>
                <button
                  className={`${styles.signInButton} ${activeButton === 'customer' && styles.active}`}
                  onClick={() => setActiveButton('customer')}
                >
                  Sign in as Customer
                </button>
              </Col>
              <Col md={12} style={{ textAlign: 'center' }}>
                <Link href="#">
                  <button
                    className={`${styles.signInButton} ${activeButton === 'host' && styles.active}`}
                    onClick={() => setActiveButton('host')}
                  >
                    Sign in as Host
                  </button>
                </Link>
              </Col>
            </Row>
            <Row justify="start" style={{ marginTop: '30px' }}>
              <Col md={24}>
                <Form
                  form={form}
                  name="signin-form"
                  layout="vertical"
                  onFinish={handleSubmit}
                >
                  <Form.Item
                    name="email"
                    rules={[{ required: true, type: 'email' }]}
                    className={styles.inputWrapper}
                  >
                    <Input allowClear placeholder="Email" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[{ required: true, min: 8 }]}
                    className={styles.inputWrapper}
                  >
                    <Input.Password allowClear placeholder="Password" />
                  </Form.Item>
                  <div style={{ textAlign: 'end' }}>
                    <Link href="/profile/forgotPassword" className={styles.linkStyle}>
                      <b>Forgot Password?</b>
                    </Link>
                  </div>
                  <Form.Item>
                    <Row justify="start" style={{ marginTop: '20px' }}>
                      <Col md={24}>
                        <Button
                          block
                          shape="round"
                          size="large"
                          className={styles.buttonStyle}
                          htmlType="submit"
                          loading={isLoading}
                          icon={<Icon name="arrowForward" height={20} width={20} />}
                          iconPosition="end"
                        >
                          Sign in
                        </Button>
                      </Col>
                    </Row>
                  </Form.Item>
                  {isError && <p style={{ textAlign: 'center', color: '#ff4d4f' }}>{error}</p>}
                </Form>
              </Col>
            </Row>
            <Divider>or</Divider>
            <Row justify="center" style={{ margin: '15px 0' }}>
              <Col md={24} style={{ display: 'flex', justifyContent: 'center' }}>
                <GoogleLogin
                  shape="pill"
                  logo_alignment="left"
                  size="large"
                  onSuccess={loginWithGoogle}
                />
              </Col>
            </Row>
            <Row justify="center" style={{ margin: '15px 0' }}>
              <Col md={24} style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  shape="round"
                  size="large"
                  icon={
                    <Icon name="appleFilled" />
                }
                  className={styles.appleButton}
                >
                  Sign in with Apple
                </Button>
              </Col>
            </Row>
            <Row justify="start" style={{ marginTop: '25px' }}>
              <Col><p>New to Cavago?</p></Col>
              <Col style={{ alignContent: 'center', marginLeft: '3px' }}>
                <Link href="/authentication/signup" className={styles.linkStyle}><b> Sign up</b></Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col md={10} lg={11}>
        <div className={styles.homeImage}>
          <Image src={HomeImage} alt="Horse Ride" />
        </div>
      </Col>
    </Row>
  );
}

export default SignInComponent;
