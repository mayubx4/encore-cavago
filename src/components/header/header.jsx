"use client";
import React from "react";
import { Button, Flex } from "antd";
import Image from "next/image";
import CavagoImages from "@shared/components/common/cavagoImages";
import Link from "next/link";
import HolidayLogo from "@public/assets/images/holidayLogo.svg";
import HolidayLogoWhite from "@public/assets/images/holidayLogoWhite.svg";

const Header = ({ isTransparent = false }) => (
  <Flex
    style={{
      width: "100%",
      marginInline: "auto",
      maxWidth: "1648px",
      padding: `24px 40px ${isTransparent ? "5px" : ""}`,
      borderBottom: isTransparent ? "none" : "1px solid #D5D9DC",
    }}
    align='center'
    justify='center'
  >
    <Flex justify='space-between' style={{ width: "100%" }}>
      <Link href='/'>
        {isTransparent ? <HolidayLogoWhite /> : <HolidayLogo />}
      </Link>
      <Flex align='center' gap={16} className='hidden md:flex'>
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
        <Button
          type='text'
          style={{ color: isTransparent ? "white" : "", padding: 0 }}
        >
          Sign Up
        </Button>
        <Button
          type='text'
          style={{ color: isTransparent ? "white" : "", padding: 0 }}
        >
          Sign In
        </Button>
      </Flex>
    </Flex>
  </Flex>
);

export default Header;
