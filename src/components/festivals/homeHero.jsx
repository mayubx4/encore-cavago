import { AutoComplete, Button, Flex, Typography } from "antd";
import Title from "antd/es/typography/Title";
import Image from "next/image";
import React from "react";
import SettingIcon from "../../../public/assets/images/setting.svg";
import { SearchOutlined } from "@ant-design/icons";
import MouseIcon from "../../../public/assets/images/mouse.svg";
import SwiperSlider from "../swiper/swiperSlider";

const HomeHero = () => {
  return (
    <Flex vertical>
      <Flex align='center' justify='center'>
        <Button type='text' style={{ color: "white", padding: "20px" }}>
          Experiences
        </Button>
        <Button
          type='text'
          style={{
            color: "#ED665F",
            borderBottom: "1px solid #ED665F",
            borderRadius: 0,
            padding: "20px",
          }}
        >
          Holidays by Cavago
        </Button>
        <Button type='text' style={{ color: "white", padding: "20px" }}>
          Competitions
        </Button>
      </Flex>
      <Title style={{ textAlign: "center", fontSize: "60px", color: "white" }}>
        What are you looking for?
      </Title>
      <Title
        level={2}
        style={{ textAlign: "center", fontSize: "28px", color: "white" }}
      >
        Plan an equestrian holiday you'll never forget!
      </Title>
      <Flex justify='center' gap={20}>
        <Flex
          align='center'
          style={{
            borderRadius: "999px",
            width: "780px",
            backgroundColor: "white",
            overflow: "hidden",
            padding: "10px",
          }}
        >
          <AutoComplete
            variant='borderless'
            style={{
              borderRadius: "999px",
              width: "100%",
              backgroundColor: "transparent",
              outline: "none",
              fontSizeAdjust: "40px",
            }}
            placeholder='Discover locations, hosts, or activities'
          />
          <Flex
            style={{
              backgroundColor: "#ED665F",
              borderRadius: "999px",
              padding: "10px",
            }}
          >
            <SearchOutlined
              size='large'
              style={{ fontSize: "20px", color: "white" }}
            />
          </Flex>
        </Flex>
        <Button
          type='text'
          shape='round'
          style={{
            backgroundColor: "white",
            // height: "64px",
            fontSize: "18px",
            fontWeight: "normal",
            padding: "28px 24px",
          }}
          icon={<Image src={SettingIcon} alt='share' width={20} height={20} />}
          iconPosition='end'
        >
          Filter
        </Button>
      </Flex>

      <Flex vertical align='center'>
        <Typography
          style={{
            fontSize: "18px",
            color: "white",
            // textAlign: "center",
            marginTop: "34px",
            marginBottom: "8px",
          }}
        >
          Discover Holiday Packages
        </Typography>
        <Image alt='mouse' src={MouseIcon} />
      </Flex>
      <Flex
        align='center'
        style={{
          backgroundColor: "#F9F6F1",
          borderRadius: "16px",
          width: "1103px",
          height: "211px",
          margin: "44px auto 0",
          paddingInline: "24px",
        }}
      >
        <SwiperSlider />
      </Flex>
    </Flex>
  );
};

export default HomeHero;
