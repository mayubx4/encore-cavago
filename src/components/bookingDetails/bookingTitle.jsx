import React from "react";
import { LeftOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Space, Typography } from "antd";
import Title from "antd/es/typography/Title";
import ShareIcon from "@public/assets/images/share.svg";
import HeartIcon from "@public/assets/images/heart.svg";
import Image from "next/image";

const BookingTitle = () => {
  return (
<>      <Space>
        <Button
          type='text'
          style={{
            border: "1px solid #D5D9DC",
            borderRadius: "4px",
            width: "32px",
          }}
        >
          <LeftOutlined
            style={{
              color: "#797B86",
            }}
          />
        </Button>
      </Space>
      <Flex vertical style={{ marginTop: "27px" }} gap={2} >
        <Title style={{ color: "#2C3F50", fontWeight: "bold" }}>
          Oman Sea Side & Desert Ride 2024
        </Title>
        <Flex justify='space-between'>
          <Typography style={{ color: "#566573" }}>
            Princess Taghreed street, Oman
          </Typography>
          <Space>
            <Button
              type='text'
              style={{ fontWeight: "600" }}
              icon={
                <Image src={ShareIcon} alt='share' width={20} height={20} />
              }
            >
              Share
            </Button>
            <Button
              type='text'
              style={{ fontWeight: "600" }}
              icon={
                <Image src={HeartIcon} alt='share' width={20} height={20} />
              }
            >
              Wishlist
            </Button>
          </Space>
        </Flex>
      </Flex>
      <Divider style={{color:'#D5D9DC'}}/>
    </>
  );
};

export default BookingTitle;
