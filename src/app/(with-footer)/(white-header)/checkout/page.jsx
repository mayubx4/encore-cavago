"use client";
import React, { useState } from "react";
import { Row, Col, Card, Input, Button, Form, Select, Divider } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import Option from "antd/es/select/index";

// const { Title, Text } = Typography;
// const { Option } = Select;

const Checkout = () => {
  const [addonCount, setAddonCount] = useState({ single: 1, transfer: 1 });

  const handleAddonChange = (type, value) => {
    setAddonCount(prevState => ({
      ...prevState,
      [type]: value,
    }));
  };

  return (
    <Row gutter={16} style={{ padding: "20px" }}>
      <Col xs={24} md={16}>
        <Card>
          <Title level={3}>Checkout and pay</Title>
          <Form layout='vertical'>
            <Form.Item label='Date and time'>
              <Text>Sat, Mar 09, 2024 - Sat Mar 16, 2024</Text>
            </Form.Item>

            <Form.Item label='Number of guests'>
              <Select defaultValue='1 Adult' style={{ width: 120 }}>
                <Option value='1'>1 Adult</Option>
                <Option value='2'>2 Adults</Option>
                <Option value='3'>3 Adults</Option>
              </Select>
            </Form.Item>

            <Form.Item label='Add-ons'>
              <div>
                <Text>Single Supplement</Text>
                <Input
                  addonBefore='£374/person'
                  value={addonCount.single}
                  onChange={e =>
                    handleAddonChange("single", Number(e.target.value))
                  }
                  style={{ width: 120, marginLeft: 16 }}
                />
                <Button
                  icon={<MinusOutlined />}
                  onClick={() =>
                    handleAddonChange(
                      "single",
                      Math.max(addonCount.single - 1, 0)
                    )
                  }
                />
                <Button
                  icon={<PlusOutlined />}
                  onClick={() =>
                    handleAddonChange("single", addonCount.single + 1)
                  }
                />
              </div>
              <div style={{ marginTop: 16 }}>
                <Text>Airport Transfer</Text>
                <Input
                  addonBefore='£51/person'
                  value={addonCount.transfer}
                  onChange={e =>
                    handleAddonChange("transfer", Number(e.target.value))
                  }
                  style={{ width: 120, marginLeft: 16 }}
                />
                <Button
                  icon={<MinusOutlined />}
                  onClick={() =>
                    handleAddonChange(
                      "transfer",
                      Math.max(addonCount.transfer - 1, 0)
                    )
                  }
                />
                <Button
                  icon={<PlusOutlined />}
                  onClick={() =>
                    handleAddonChange("transfer", addonCount.transfer + 1)
                  }
                />
              </div>
            </Form.Item>

            <Form.Item label='Have a promo code?'>
              <Input placeholder='Apply Promo' style={{ width: 200 }} />
              <Button type='primary' style={{ marginLeft: 8 }}>
                Apply
              </Button>
            </Form.Item>

            <Divider />
            <Title level={5}>Cancellation Policy</Title>
            <Text>
              <ul>
                <li>
                  Notify at least 48 hours in advance to receive a full refund.
                </li>
                <li>
                  Cancellations made within 48 hours of the scheduled activity
                  will incur a 50% cancellation fee.
                </li>
                <li>No-shows will be charged the full amount.</li>
              </ul>
            </Text>

            <Button type='primary' block style={{ marginTop: 24 }}>
              Pay with Apple Pay
            </Button>
            <Button block style={{ marginTop: 16 }}>
              Add a debit or credit card
            </Button>
          </Form>
        </Card>
      </Col>

      <Col xs={24} md={8}>
        <Card>
          <Title level={4}>Oman Sea Side & Desert Ride 2024</Title>
          <Text>Princess Taghreed street, Jordan</Text>
          <Text strong>⭐ 4.9</Text>

          <Divider />
          <Title level={5}>Price breakdown</Title>
          <Text>Subtotal: £1,722</Text>
          <br />
          <Text>Add-ons total: £426</Text>
          <br />
          <Text>Tax: £0.00</Text>
          <br />
          <Text>Promo: -£0.00</Text>

          <Divider />
          <Title level={4}>Grand Total: £2,148</Title>

          <Divider />
          <Title level={5}>Payment plan</Title>
          <Text>At reservation today (20%): £429.6</Text>
          <br />
          <Text>At Cavago&apos;s confirmation (50%): £1,074</Text>
          <br />
          <Text>Before travel (30%): £644.4</Text>

          <Divider />
          <Title level={4}>You pay today to book: £429.6</Title>
        </Card>
      </Col>
    </Row>
  );
};

export default Checkout;
