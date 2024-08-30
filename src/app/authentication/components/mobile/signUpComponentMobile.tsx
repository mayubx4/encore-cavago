'use client';

import React from 'react';
import {
  Button, Row, Col, Divider,
} from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import Title from '@shared/wrappers/Title';
import Text from '@shared/wrappers/Text';
import Icon from '@shared/components/common/icons';
import CavagoHome from '@assets/images/signUp1.png';

import styles from 'app/authentication/styles.module.scss';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

export default function SignUpComponentMobile(
  { signUpWithGoogle } : { signUpWithGoogle: (response: CredentialResponse) => void},
) {
  return (
    <div style={{ padding: '15px' }}>
      <Row justify="space-between" align="middle">
        <Col><Icon name="cavagoMobile" width={48} height={48} /></Col>
        <Col><Button className={styles.headerButtonMobile} shape="round">Become a Host</Button></Col>
      </Row>
      <Row justify="center" align="middle" style={{ margin: '20px 0' }}>
        <Col><Image src={CavagoHome} alt="Cavago" width={300} height={300} /></Col>
      </Row>
      <Row justify="start">
        <Col span={24}>
          <Title level={4}>Sign up</Title>
          <Text type="secondary" className={styles.neutral300}>Welcome to Cavago! Please enter your details.</Text>
        </Col>
      </Row>
      <Row justify="center" style={{ margin: '15px 0' }}>
        <Col xs={24} md={16} lg={8}>
          <Link href="/authentication/signup?step=1">
            <Button shape="round" size="large" className={styles.buttonStyle}>
              <b>Sign up with email</b>
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
            onSuccess={signUpWithGoogle}
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
            Sign up with Apple
          </Button>
        </Col>
      </Row>
      <Row justify="center" style={{ margin: '15px 0' }}>
        <Col><p>Already have an account?</p></Col>
        <Col style={{ alignContent: 'center', marginLeft: '3px' }}>
          <Link href="/authentication" className={styles.linkStyle}><b> Sign in</b></Link>
        </Col>
      </Row>
    </div>
  );
}
