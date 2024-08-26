import Header from "@/components/header/header";
import { Flex } from "antd";
import Image from "next/image";
import React from "react";
import homeHero from "@public/assets/images/home-hero.png";
import HomeHero from "@/components/festivals/homeHero";
import SwiperSliderGrid from "@/components/swiper/swiperSliderGrid";
import GridFilters from "@/components/swiper/gridFilters";

const layout = ({ children }) => {
  return (
    <Flex vertical style={{ minHeight: "700px" }}>
      <Flex
        style={{
          maxWidth: "1728px",
          width: "100%",
          height: "700px",
          position: "absolute",
          zIndex: -1,
        }}
      >
        <Image
          alt='home'
          src={homeHero}
          style={{ objectFit: "cover", width: "100%" }}
        />
      </Flex>
      <Header isTransparent />
      <HomeHero />
      {children}
    </Flex>
  );
};

export default layout;
