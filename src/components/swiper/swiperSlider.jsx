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
    <Slide key={1} />,
    <Slide key={2} title='Equestrian Festivals' />,
    <Slide key={3} title='Safari Riding Holidays' />,
    <Slide key={4} title='Beach Riding Holidays' />,
    <Slide key={5} title='Desert Riding Holidays' />,
    <Slide key={6} />,
    <Slide key={7} />,
    <Slide key={8} />,
  ],
}) => {
  return (
    <>
      <Button className='back !hidden md:!flex' shape='circle'>
        <Image alt='arrow-left-circle' src={ArrowLeftCircleIcon} />
      </Button>
      <Swiper
        breakpoints={{
          1: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1440: {
            slidesPerView: 5,
            spaceBetween: 24,
          },
        }}
        key={"qwe"}
        navigation={{ prevEl: ".back", nextEl: ".next" }}
        modules={[Navigation]}
        className='mySwiper'
        // slidesPerView={5}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={"qwe" + i}>{slide}</SwiperSlide>
        ))}
      </Swiper>
      <Button className='next !hidden md:!flex' shape='circle'>
        <Image alt='arrow-right-circle' src={ArrowRightCircleIcon} />
      </Button>
    </>
  );
};

export default SwiperSlider;
