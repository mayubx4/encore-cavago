import React from 'react';
import {
  Button, Row, Col, Divider,
} from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { ZodError, z } from 'zod';
import { useSearchParams } from 'next/navigation';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import Title from '@shared/wrappers/Title';
import Text from '@shared/wrappers/Text';
import Icon from '@shared/components/common/icons';
import CavagoHome from '@assets/images/signIn1.png';
import styles from 'app/authentication/styles.module.scss';
import { loginSchema } from '@shared/api/authentication/schemas';
import SignInFormComponentMobile from './signInFormComponentMobile';

export default function SignInComponentMobile(
  {
    isLoading,
    isError,
    error,
    handleSubmit,
    loginWithGoogle,
  }: {
    isLoading: boolean,
    isError: boolean,
    error: ZodError | null,
    handleSubmit: (values: z.infer<typeof loginSchema>) => void,
    loginWithGoogle: (response: CredentialResponse) => void,
  },
) {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  if (query === 'true') {
    return (
      <div style={{ padding: '15px' }}>
        <Row justify="start" align="middle">
          <Col>
            <Icon name="back" width={24} height={24} />
          </Col>
        </Row>
        <Row justify="start">
          <Col span={24}>
            <Title level={4}>Sign in with email</Title>
            <Text type="secondary" className={styles.neutral300}>Please enter the details below to continue.</Text>
          </Col>
        </Row>
        <SignInFormComponentMobile
          isLoading={isLoading}
          isError={isError}
          error={error}
          handleSubmit={handleSubmit}
        />
      </div>
    );
  }

  return (
    <div style={{ padding: '15px' }}>
      <Row justify="space-between" align="middle">
        <Col><Icon name="cavagoMobile" width={48} height={48} /></Col>
        <Col><Button className={styles.headerButtonMobile} shape="round">Sign in as Host</Button></Col>
      </Row>
      <Row justify="center" align="middle" style={{ margin: '20px 0' }}>
        <Col><Image src={CavagoHome} alt="Cavago" width={300} height={300} /></Col>
      </Row>
      <Row justify="start">
        <Col span={24}>
          <Title level={4}>Sign in</Title>
          <Text type="secondary">Welcome to Cavago! Please login to continue.</Text>
        </Col>
      </Row>
      <Row justify="center" style={{ margin: '15px 0' }}>
        <Col xs={24} md={16} lg={8}>
          <Link href="/authentication?query=true">
            <Button shape="round" size="large" className={styles.buttonStyle}>
              <b>Sign in with email</b>
            </Button>
          </Link>
        </Col>
      </Row>
      <Divider>or</Divider>
      <Row justify="center" style={{ margin: '15px 0' }}>
        <Col xs={24} md={16} lg={8} style={{ display: 'flex', justifyContent: 'center' }}>
          <GoogleLogin
            shape="pill"
            logo_alignment="left"
            size="large"
            onSuccess={loginWithGoogle}
          />
        </Col>
      </Row>
      <Row justify="center" style={{ margin: '15px 0' }}>
        <Col xs={24} md={16} lg={8} style={{ display: 'flex', justifyContent: 'center' }}>
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
      <Row justify="center" style={{ margin: '15px 0' }}>
        <Col><p>Don&apos;t have an account?</p></Col>
        <Col style={{ alignContent: 'center', marginLeft: '3px' }}>
          <Link href="/authentication/signup" className={styles.linkStyle}><b> Sign up</b></Link>
        </Col>
      </Row>
    </div>
  );
}
