import { Button, Flex, Space } from "antd";
import React from "react";
import StarIcon from "@public/assets/images/star.svg";
import CrownIcon from "@public/assets/images/crown.svg";
import HeartIcon from "@public/assets/images/heart.svg";
import Image from "next/image";

const FavouriteBar = () => {
  return (
    <Flex
      style={{
        // position: "absolute",
        top: 10,
        //   left: 10,
        fontSize: "14px",
        width: "100%",
        // paddingInline: "20px",
      }}
      justify='space-between'
    >
      <Button
        style={{
          fontSize: "14px",
          padding: "6px 12px !important",
        }}
        icon={<Image src={StarIcon} alt='share' width={20} height={20} />}
        shape='round'
      >
        Guest Favourite
      </Button>
      <Space>
        <Button
          style={{
            fontSize: "14px",
            padding: "6px 12px !important",
          }}
          icon={<Image src={CrownIcon} alt='share' width={20} height={20} />}
          shape='circle'
        ></Button>
        <Button
          style={{
            fontSize: "14px",
            padding: "6px 12px !important",
          }}
          icon={<Image src={HeartIcon} alt='share' width={20} height={20} />}
          shape='circle'
        ></Button>
      </Space>
    </Flex>
  );
};

export default FavouriteBar;
