import Header from "@/components/header/header";
import Image from "next/image";
import React from "react";
import homeHero from "@public/assets/images/home-hero.png";
import HomeHero from "@/components/festivals/homeHero";

const layout = ({ children }) => {
  return (
    <div>
      <Image
        alt='home'
        src={homeHero}
        className='desktop:object-contain object-cover'
        style={{
          objectPosition: "top",
          backgroundColor: "#f7f3f2",
          width: "100%",
          maxWidth: "1648px",
          position: "absolute",
          zIndex: -1,
        }}
      />
      <Header isTransparent />
      <HomeHero />
      <div className='bg-[#F7F3F2] -mt-24 !pt-24'>{children}</div>
    </div>
  );
};

export default layout;
