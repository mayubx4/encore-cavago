"use client";
import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Input,
  Button,
  Form,
  Select,
  Divider,
  Flex,
  Space,
} from "antd";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import Option from "antd/es/select/index";
import ApplePayIcon from "@public/assets/images/applePay.svg";
import DebitCardIcon from "@public/assets/images/debitCard.svg";
import Image from "next/image";
import AddOns from "@/components/checkout/addOns";
import PriceBox from "@/components/checkout/priceBox";
import Icon from "@shared/components/common/icons";

const Checkout = () => {
  return (
    <Row
      gutter={16}
      style={{
        paddingTop: "40px",
        paddingInline: "60px",
        marginBottom: "80px",
      }}
    >
      <Col xs={24} xl={10}>
        {/* <Card> */}
        <Flex gap={32}>
          <div className='mt-1'>
            <Button
              type='text'
              style={{
                borderRadius: "4px",
                paddingTop: "8px",
                paddingInline: 0,
                // marginTop: "4px",
                marginLeft: "4px",
              }}
            >
              <Icon name='backArrow' />
            </Button>
          </div>
          <div>
            <Title
              level={3}
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                color: "#233240",
                marginBottom: "42px",
              }}
            >
              Checkout and pay
            </Title>
            <Title
              level={4}
              style={{
                fontSize: "28px",
                fontWeight: "600",
                color: "#2C3F50",
                marginBottom: "48px",
              }}
            >
              Your booking
            </Title>
            <Title
              level={5}
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#2C3F50",
                marginBottom: 0,
              }}
            >
              Date and time
            </Title>
            <Title
              level={5}
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#566573",
                marginTop: 0,
                marginBottom: "40px",
              }}
            >
              Sat, Mar 09, 2024 - Sat Mar 16, 2024
            </Title>
            <Form layout='vertical'>
              <Title
                level={5}
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#2C3F50",
                }}
              >
                Number of guests
              </Title>
              {/* <Form.Item label='Number of guests' style={{}}> */}
              <Select defaultValue='1 Adult' style={{ width: 120 }}>
                <Option value='1'>1 Adult</Option>
                <Option value='2'>2 Adults</Option>
                <Option value='3'>3 Adults</Option>
              </Select>
              {/* </Form.Item> */}
              <Divider />
              <Title
                level={5}
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#2C3F50",
                }}
              >
                Add-ons
              </Title>

              <Space
                direction='vertical'
                size='large'
                style={{ width: "100%" }}
              >
                <AddOns />
                <AddOns />
              </Space>
              <Divider />
              <Flex vertical>
                <Text
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#2C3F50",
                  }}
                >
                  Have a promo code?
                </Text>
                <Flex
                  style={{
                    border: "1px solid #4793F5",
                    borderRadius: "8px",
                    paddingBlock: "5px",
                    marginTop: "20px",
                  }}
                >
                  <Input
                    placeholder='Apply Promo'
                    style={{ width: "100%" }}
                    variant='borderless'
                  />
                  <Button
                    type='link'
                    style={{ marginLeft: 8, fontWeight: "normal" }}
                  >
                    Apply
                  </Button>
                </Flex>
              </Flex>

              <Divider />
              <Flex vertical className='xl:hidden w-full'>
                <PriceBox />
                <Divider />
              </Flex>
              <Title
                level={5}
                style={{
                  fontSize: "28px",
                  fontWeight: "600",
                  color: "#2C3F50",
                }}
              >
                Cancellation Policy
              </Title>
              <Text>
                <ul style={{ listStyleType: "disc" }}>
                  <li>
                    Notify at least 48 hours in advance to receive a full
                    refund.
                  </li>
                  <li>
                    Cancellations made within 48 hours of the scheduled activity
                    will incur a 50% cancellation fee.
                  </li>
                  <li>No-shows will be charged the full amount.</li>
                </ul>
              </Text>
              <Text style={{ fontSize: "14px", color: "#566573" }}>
                By clicking the button below, I accept the terms and conditions
                of Cavago&apos;s booking and refunds policies.
              </Text>
              <Button
                type='primary'
                shape='round'
                block
                style={{
                  marginTop: 24,
                  backgroundColor: "black",
                  color: "white",
                  paddingBlock: "24px",
                  fontSize: "20px",
                  fontWeight: "normal",
                }}
              >
                Pay with <ApplePayIcon />
              </Button>
              <Button
                block
                type='text'
                shape='round'
                style={{
                  border: "1px solid #1A2630",
                  marginTop: 16,
                  color: "#2C3F50",
                  paddingBlock: "24px",
                  fontSize: "18px",
                  fontWeight: "normal",
                }}
              >
                <DebitCardIcon /> Add a debit or credit card
              </Button>
            </Form>
          </div>
        </Flex>
        {/* </Card> */}
      </Col>

      <Col
        xs={24}
        xl={11}
        offset={3}
        style={{ padding: "0" }}
        className='hidden xl:flex'
      >
        <PriceBox />
      </Col>
    </Row>
  );
};

export default Checkout;
