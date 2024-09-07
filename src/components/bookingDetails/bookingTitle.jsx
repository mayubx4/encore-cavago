import React from "react";
import { LeftOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Space, Typography } from "antd";
import Title from "antd/es/typography/Title";
import ShareIcon from "@public/assets/images/share.png";
import HeartIcon from "@public/assets/images/heart.png";
import Image from "next/image";

const BookingTitle = () => {
  return (
    <>
      <Flex vertical gap={2}>
        <Title
          level={2}
          style={{ color: "#2C3F50", fontWeight: "600", marginBottom: "5px" }}
        >
          Oman Sea Side & Desert Ride 2024
        </Title>
        <Flex justify='space-between'>
          <Typography style={{ color: "#566573" }}>
            Princess Taghreed street, Oman
          </Typography>
        </Flex>
        <Flex justify='end' gap={8}>
          <Button
            type='text'
            style={{ fontWeight: "600", fontSize: "18px", padding: 0 }}
            icon={<Image src={ShareIcon} alt='share' width={20} height={20} />}
          >
            Share
          </Button>
          <Button
            type='text'
            style={{ fontWeight: "600", fontSize: "18px", padding: 0 }}
            icon={<Image src={HeartIcon} alt='share' width={20} height={20} />}
          >
            Wishlist
          </Button>
        </Flex>
      </Flex>
      <Divider style={{ color: "#D5D9DC" }} />
    </>
  );
};

export default BookingTitle;
