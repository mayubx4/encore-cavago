"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Button } from "antd";
import Slide from "./slide";
import Image from "next/image";
import ArrowRightCircleIcon from "@public/assets/images/arrow-right-circle.svg";
import ArrowLeftCircleIcon from "@public/assets/images/arrow-left-circle.svg";

const SwiperSlider = ({
  slides = [
    <Slide />,
    <Slide title='Equestrian Festivals' />,
    <Slide />,
    <Slide />,
    <Slide />,
    <Slide />,
    <Slide />,
    <Slide />,
  ],
}) => {
  return (
    <>
      <Button className='back' shape='circle'>
        <Image alt='arrow-left-circle' src={ArrowLeftCircleIcon} />
      </Button>
      <Swiper
        navigation={{ prevEl: ".back", nextEl: ".next" }}
        modules={[Navigation]}
        className='mySwiper'
        slidesPerView={5}
      >
        {slides.map((slide, i) => (
          <React.Fragment key={i}>
            <SwiperSlide key={i}>
              <React.Fragment key={i}>{slide}</React.Fragment>
            </SwiperSlide>
          </React.Fragment>
        ))}
      </Swiper>
      <Button className='next' shape='circle'>
        <Image alt='arrow-right-circle' src={ArrowRightCircleIcon} />
      </Button>
    </>
  );
};

export default SwiperSlider;
