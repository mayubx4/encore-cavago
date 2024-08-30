'use client';

import React, { useState } from 'react';
import {
  Row, Col, Form, Input, Button, Select, Tooltip, Space,
} from 'antd';

import countries from '@shared/constants/countries';
import Title from '@shared/wrappers/Title';
import Text from '@shared/wrappers/Text';
import Icon from '@shared/components/common/icons';

import styles from 'app/authentication/styles.module.scss';
import '@shared/components/desktop/header/_header.scss';
import { ZodError, z } from 'zod';
import { saveCustomerDataSchema } from '@shared/api/authentication/schemas';

const filterOption = (input: string, option?: { label: string; value: string }) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const ridingAbilityDescriptions = (
  <div>
    <p>
      <b>Beginner:</b>
      {' '}
      Little to no riding experience.
    </p>
    <p>
      <b>Novice:</b>
      {' '}
      Comfortable at walk/trot, limited cantering experience.
    </p>
    <p>
      <b>Intermediate:</b>
      {' '}
      Confident in all paces, irregular riding.
    </p>
    <p>
      <b>Strong Intermediate:</b>
      {' '}
      Regular rider, comfortable for at least 6 hours daily.
    </p>
    <p>
      <b>Advanced:</b>
      {' '}
      Mastery of all levels, adept with spirited horses in open areas.
    </p>
  </div>
);

export const ridingAbilities = [
  { label: 'Beginner', value: 'Beginner' },
  { label: 'Novice', value: 'Novice' },
  { label: 'Intermediate', value: 'Intermediate' },
  { label: 'Strong Intermediate', value: 'Strong Intermediate' },
  { label: 'Advanced', value: 'Advanced' },
];

function SignUpDesktopStep3(
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
    <Col md={18} lg={17} xl={14}>
      <div>
        <Title level={2}>Finish Signing Up!</Title>
        <Text className={styles.neutral400}>
          Add your details to finish signing up
        </Text>
      </div>
      <Space direction="vertical" size="large" style={{ marginTop: '30px' }}>
        <Form
          form={form}
          name="signup-form-3"
          layout="vertical"
          onFinish={onSaveCustomerData}
        >
          <Row justify="space-between">
            <Col md={11}>
              <Form.Item name="first_name" rules={[{ required: true }]} className={styles.inputWrapper}>
                <Input allowClear placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item name="last_name" rules={[{ required: true }]} className={styles.inputWrapper}>
                <Input allowClear placeholder="Last Name" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="country" rules={[{ required: true }]} className={styles.inputWrapper}>
            <Select
              placeholder="Country/Region"
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
                placeholder="Phone Number"
              />
            </Form.Item>
          </div>
          <Row justify="space-between">
            <Col span={24} className={styles.specialSelect}>
              <Form.Item name="ability" rules={[{ required: true }]} className={styles.inputWrapper}>
                <Select
                  placeholder="Riding Ability"
                  filterOption={filterOption}
                  showSearch
                >
                  {ridingAbilities.map((ability) => (
                    <Select.Option
                      key={ability.value}
                      label={ability.label}
                      value={ability.value}
                    >
                      {ability.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Tooltip title={ridingAbilityDescriptions} className={styles.toolTip}>
                <Text type="secondary">
                  <Icon name="infoCircleOutlined" width={20} height={20} />
                </Text>
              </Tooltip>
            </Col>
          </Row>
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
      </Space>
    </Col>
  );
}

export default SignUpDesktopStep3;
