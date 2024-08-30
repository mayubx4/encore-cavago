'use client';

import React, { useState } from 'react';
import {
  Row, Col, Form, Input, Button, Radio, Space, Select,
} from 'antd';
import countries from '@shared/constants/countries';

import styles from 'app/authentication/styles.module.scss';
import Title from '@shared/wrappers/Title';
import Text from '@shared/wrappers/Text';
import { z } from 'zod';
import { saveCustomerDataSchema } from '@shared/api/authentication/schemas';

const filterOption = (input: string, option?: { label: string; value: string }) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

export default function SignUpMobileStep3(
  {
    isLoading,
    isError,
    error,
    onSaveCustomerData,
  }: {
    isLoading: boolean,
    isError: boolean,
    error: string | null,
    onSaveCustomerData: (values: z.infer<typeof saveCustomerDataSchema>) => void,
  },

) {
  const [form] = Form.useForm();
  const [countryDialCode, setCountryDialCode] = useState('');

  return (
    <>
      <Row justify="start">
        <Col span={24}>
          <Title level={4}>Finish signing up</Title>
          <Text type="secondary" className={styles.neutral300}>Please enter the details below to sign up.</Text>
        </Col>
      </Row>
      <Row justify="center" style={{ margin: '15px 0' }}>
        <Col xs={24} md={16} lg={8}>
          <Form
            form={form}
            name="signup-form-3"
            layout="vertical"
            onFinish={onSaveCustomerData}
          >
            <Row justify="space-between">
              <Col xs={11}>
                <Form.Item name="first_name" label="First Name" rules={[{ required: true }]} className={styles.inputWrapper}>
                  <Input allowClear placeholder="First Name" />
                </Form.Item>
              </Col>
              <Col xs={11}>
                <Form.Item name="last_name" label="Last Name" rules={[{ required: true }]} className={styles.inputWrapper}>
                  <Input allowClear placeholder="Last Name" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Country" name="country" rules={[{ required: true }]} className={styles.inputWrapper}>
              <Select
                allowClear
                placeholder="Select Country or Region"
                filterOption={filterOption}
                onChange={(value) => {
                  const selectedCountry = countries.find((country) => country.code === value);
                  if (selectedCountry) {
                    setCountryDialCode(selectedCountry.dial_code);
                  }
                }}
                showSearch
              >
                {countries.map((country) => (
                  <Select.Option
                    key={country.code}
                    label={country.name}
                    value={country.code}
                  >
                    {`${country.name} (${country.dial_code})`}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <div style={{ position: 'relative' }}>
              <span
                style={{ display: countryDialCode ? 'flex' : 'none'}}
                className={styles.countryCode}
              >
                {countryDialCode}
              </span>
              <Form.Item
                label="Mobile No."
                name="phone"
                className={styles.inputWrapper}
                getValueProps={(value) => {
                  if (value) {
                    return {
                      value: value.replace(countryDialCode, ''),
                    };
                  }

                  return value;
                }}
                normalize={(value) => `${countryDialCode}${value}`}
                rules={[
                  { required: true, message: 'Please enter your phone number' },
                  { pattern: /^\+\d{1,3}\d{6,14}$/, message: 'Please enter a valid phone number starting with +(country code)' },
                ]}
              >
                <Input
                  allowClear
                  style={{
                    paddingLeft: countryDialCode ? 60 : 15,
                  }}
                  placeholder="Enter your mobile number"
                />
              </Form.Item>
            </div>
            <Title level={5}>Your Riding Ability</Title>
            <Text type="secondary" className={styles.neutral300}>Please choose the option that best describes your current riding skill level.</Text>
            <Form.Item name="ability" rules={[{ required: true }]} className={styles.inputWrapper}>
              <Radio.Group className={styles.radioGroup} size="large">
                <Space direction="vertical" className={`${styles.inputWrapper} ${styles.radioGroup}`}>
                  <Radio value="Beginner" className={styles.radioItem}>Beginner</Radio>
                  <Radio value="Novice" className={styles.radioItem}>Novice</Radio>
                  <Radio value="Intermediate" className={styles.radioItem}>Intermediate</Radio>
                  <Radio value="Strong Intermediate" className={styles.radioItem}>Strong Intermediate</Radio>
                  <Radio value="Advanced" className={styles.radioItem}>Advanced</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Row justify="start" style={{ margin: '15px 0' }}>
                <Col xs={24} md={16} lg={8}>
                  <Button shape="round" size="large" htmlType="submit" loading={isLoading} className={styles.buttonStyle}>
                    <b>Sign up</b>
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
