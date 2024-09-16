import Header from "@/components/header/header";
import Image from "next/image";
import React from "react";
import homeHero from "@public/assets/images/home-hero.png";
import HomeHero from "@/components/festivals/homeHero";
import Footer from "components/footer/footer";

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
      <HomeHero>
        {children}
        <Footer />
      </HomeHero>
    </div>
  );
};

export default layout;
