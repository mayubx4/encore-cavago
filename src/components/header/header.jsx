"use client";
import React from "react";
import { Button, Flex } from "antd";
import Image from "next/image";
// import logo from '../../../public/assets/images/logo.svg'

const Header = ({ isTransparent = false }) => (
  <Flex
    style={{
      height: "128px",
      paddingInline: "129px",
      borderBottom: isTransparent ? "none" : "1px solid #D5D9DC",
      boxShadow: isTransparent ? "none" : "0px 0px 8px 1px #00000026",
    }}
    align='center'
    justify='center'
  >
    <Flex justify='space-between' style={{ width: "100%" }}>
      <Image
        alt='logo'
        src={
          isTransparent
            ? "/assets/images/logo-white.svg"
            : "/assets/images/logo.svg"
        }
        width={170}
        height={47.22}
      />
      <Flex align='center' gap={24}>
        <Button
          style={{
            border: `1px solid ${isTransparent ? "white" : "#233240"}`,
            color: isTransparent ? "white" : "",
          }}
          shape='round'
          type='text'
        >
          Become a Tour Leader
        </Button>
        <Button type='text' style={{ color: isTransparent ? "white" : "" }}>
          Sign up
        </Button>
        <Button type='text' style={{ color: isTransparent ? "white" : "" }}>
          Sign in
        </Button>
      </Flex>
    </Flex>
  </Flex>
);

export default Header;
