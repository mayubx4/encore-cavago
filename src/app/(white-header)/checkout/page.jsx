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
} from "antd";
import { AppleFilled, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import Option from "antd/es/select/index";
import ApplePayIcon from "@public/assets/images/applePay.svg";
import DebitCardIcon from "@public/assets/images/debitCard.svg";
import g1 from "@public/assets/images/g1.png";
import ratingStar from "@public/assets/images/ratingStar.svg";
import Image from "next/image";
import TextAndAmount from "@/components/checkout/textAndAmount";
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
    <Row
      gutter={16}
      style={{ padding: "0", margin: "0", marginBottom: "80px" }}
    >
      <Col xs={24} md={10}>
        {/* <Card> */}
        <Title
          level={3}
          style={{ fontSize: "40px", fontWeight: "bold", color: "#233240" }}
        >
          Checkout and pay
        </Title>
        <Title
          level={4}
          style={{ fontSize: "28px", fontWeight: "600", color: "#2C3F50" }}
        >
          Your booking
        </Title>
        <Title
          level={5}
          style={{ fontSize: "20px", fontWeight: "600", color: "#2C3F50" }}
        >
          Date and time
        </Title>
        <Title
          level={5}
          style={{ fontSize: "18px", fontWeight: "600", color: "#566573" }}
        >
          Sat, Mar 09, 2024 - Sat Mar 16, 2024
        </Title>
        <Form layout='vertical'>
          <Title
            level={5}
            style={{ fontSize: "20px", fontWeight: "600", color: "#2C3F50" }}
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
            style={{ fontSize: "18px", fontWeight: "600", color: "#2C3F50" }}
          >
            Add-ons
          </Title>
          <Flex justify='space-between'>
            <Text style={{ color: "#2C3F50", fontSize: "18px" }}>
              Single Supplement
            </Text>
            <Text
              style={{ color: "#2C3F50", fontSize: "18px", fontWeight: "600" }}
            >
              £374/person
            </Text>

            <Flex
              style={{
                width: "102px",
                borderRadius: "999px",
                border: "1px solid #808C96",
                padding: "0px 10px",
              }}
              justify='space-between'
              align='center'
            >
              <Button
                icon={<MinusOutlined />}
                type='text'
                shape='circle'
                onClick={() =>
                  handleAddonChange(
                    "single",
                    Math.max(addonCount.single - 1, 0)
                  )
                }
              />
              <Text
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#2C3F50",
                }}
              >
                1
              </Text>
              <Button
                icon={<PlusOutlined />}
                shape='circle'
                type='text'
                onClick={() =>
                  handleAddonChange("single", addonCount.single + 1)
                }
              />
            </Flex>
          </Flex>
          <Flex justify='space-between' style={{ marginTop: "40px" }}>
            <Text style={{ color: "#2C3F50", fontSize: "18px" }}>
              Single Supplement
            </Text>
            <Text
              style={{ color: "#2C3F50", fontSize: "18px", fontWeight: "600" }}
            >
              £374/person
            </Text>

            <Flex
              style={{
                width: "102px",
                borderRadius: "999px",
                border: "1px solid #808C96",
                padding: "0px 10px",
              }}
              justify='space-between'
              align='center'
            >
              <Button
                icon={<MinusOutlined />}
                shape='circle'
                type='text'
                onClick={() =>
                  handleAddonChange(
                    "single",
                    Math.max(addonCount.single - 1, 0)
                  )
                }
              />
              <Text
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#2C3F50",
                }}
              >
                1
              </Text>
              <Button
                icon={<PlusOutlined />}
                shape='circle'
                type='text'
                onClick={() =>
                  handleAddonChange("single", addonCount.single + 1)
                }
              />
            </Flex>
          </Flex>
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
          <Title
            level={5}
            style={{ fontSize: "28px", fontWeight: "600", color: "#2C3F50" }}
          >
            Cancellation Policy
          </Title>
          <Text>
            <ul style={{ listStyleType: "disc" }}>
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
          <Text style={{ fontSize: "14px", color: "#566573" }}>
            By clicking the button below, I accept the terms and conditions of
            Cavago&apos;s booking and refunds policies.
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
            Pay with <Image alt='apple pay' src={ApplePayIcon} />
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
            <Image alt='apple pay' src={DebitCardIcon} /> Add a debit or credit
            card
          </Button>
        </Form>
        {/* </Card> */}
      </Col>

      <Col xs={24} md={10} offset={4} style={{ padding: "0" }}>
        <Card
          style={{
            boxShadow: "0px 2px 7px 0px #00000026",
            marginTop: "80px",
            border: "1px solid #D5D9DC",
          }}
        >
          <Flex gap={40}>
            <Image
              alt='image'
              src={g1}
              width={250}
              height={150}
              style={{
                borderRadius: "18px",
                overflow: "hidden",
                objectFit: "cover",
              }}
            />
            <Flex vertical>
              <Title
                level={4}
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#233240",
                }}
              >
                Oman Sea Side & Desert Ride 2024
              </Title>
              <Text
                style={{
                  fontSize: "18px",
                  color: "#566573",
                }}
              >
                Princess Taghreed street, Jordan
              </Text>
              <Text
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#233240",
                }}
              >
                <Image alt='rating' src={ratingStar} /> 4.9
              </Text>
            </Flex>
          </Flex>

          <Title
            level={5}
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#2C3F50",
            }}
          >
            Price breakdown
          </Title>
          <Flex vertical gap={12}>
            <TextAndAmount text={"Subtotal"} amont={"1,722"} />
            <TextAndAmount text={"Subtotal"} amont={"1,722"} />
            <TextAndAmount text={"Subtotal"} amont={"1,722"} />
            <TextAndAmount
              text={"PROMO"}
              amont={"1,722"}
              style={{ color: "#4A8FF7" }}
            />
          </Flex>

          <Divider />
          <TextAndAmount
            text={"Grand Total"}
            amont={"1,722"}
            style={{ fontSize: "24px", fontWeight: "bold" }}
          />
          <Flex
            vertical
            style={{
              backgroundColor: "#F9F6F1",
              padding: "32px",
              borderRadius: "12px",
              marginBottom: "40px",
              marginTop: "32px",
            }}
          >
            <Title
              level={5}
              style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "#2C3F50",
                margin: 0,
              }}
            >
              Payment plan
            </Title>
            <Flex vertical gap={12}>
              <TextAndAmount
                text={"At reservation today (20%)"}
                amont={"1,722"}
              />
              <TextAndAmount
                text={"At Cavago’s confirmation (50%)"}
                amont={"1,722"}
              />
              <TextAndAmount text={"Before travel (30%)"} amont={"1,722"} />
            </Flex>
            <Divider />
            <TextAndAmount
              text={"You pay today to book"}
              amont={"1,722"}
              style={{ fontSize: "24px", fontWeight: "bold" }}
            />
          </Flex>
        </Card>
      </Col>
    </Row>
  );
};

export default Checkout;
