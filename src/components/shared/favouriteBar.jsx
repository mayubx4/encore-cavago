"use client";
import { Button, Flex, Space } from "antd";
import React from "react";
import StarIcon from "@public/assets/images/star.svg";
import CrownIcon from "@public/assets/images/crown.svg";
import HeartIcon from "@public/assets/images/heart.svg";

const FavouriteBar = () => {
  return (
    <Flex
      style={{
        top: 10,
        fontSize: "14px",
        width: "100%",
      }}
      justify='space-between'
    >
      <Button
        style={{
          fontSize: "14px",
          padding: "6px 12px !important",
          boxShadow: "0px 1px 4px 0px #0C0C0D0D",
          boxShadow: "0px 1px 4px 0px #0C0C0D1A",
        }}
        className='!py-[6px] !px-3'
        icon={<StarIcon />}
        shape='round'
      >
        Guest Favourite
      </Button>
      <Space>
        <Button
          style={{
            fontSize: "14px",
            padding: "6px 12px !important",
            boxShadow: "0px 1px 4px 0px #0C0C0D0D",
            boxShadow: "0px 1px 4px 0px #0C0C0D1A",
          }}
          className='!py-[6px] !px-3'
          icon={<CrownIcon />}
          shape='circle'
        ></Button>
        <Button
          style={{
            fontSize: "14px",
            padding: "6px 12px !important",
            boxShadow: "0px 1px 4px 0px #0C0C0D0D",
            boxShadow: "0px 1px 4px 0px #0C0C0D1A",
          }}
          className='!py-[6px] !px-3'
          icon={<HeartIcon />}
          shape='circle'
        ></Button>
      </Space>
    </Flex>
  );
};

export default FavouriteBar;
