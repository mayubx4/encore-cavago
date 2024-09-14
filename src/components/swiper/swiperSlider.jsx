"use client";
import React, { useState } from "react";
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
import ViewAll from "@/components/festivals/icons/viewAll";
import EquestrianFestivals from "@/components/festivals/icons/equestrianFestivals";
import SafariRidingHolidays from "@/components/festivals/icons/safariRidingHolidays";
import BeachRidingHolidays from "@/components/festivals/icons/beachRidingHolidays";
import DesertRidingHolidays from "@/components/festivals/icons/desertRidingHolidays";

const SwiperSlider = ({
  slides = [
    { title: "View All", icon: ViewAll },
    { title: "Equestrian Festivals", icon: EquestrianFestivals },
    { title: "Safari Riding Holidays", icon: SafariRidingHolidays },
    { title: "Beach Riding Holidays", icon: BeachRidingHolidays },
    { title: "Desert Riding Holidays", icon: DesertRidingHolidays },
    { title: "View All", icon: ViewAll },
    { title: "View All", icon: ViewAll },
    { title: "View All", icon: ViewAll },
  ],
}) => {
  const [selectedSlide, setSelectedSlide] = useState(0);
  return (
    <>
      <Button
        className='back !hidden md:!flex !p-0 !w-auto '
        shape='circle'
        type='text'
        icon={<ArrowLeftCircleIcon />}
      ></Button>
      <Swiper
        breakpoints={{
          1: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          1440: {
            slidesPerView: 5,
            spaceBetween: 24,
          },
        }}
        key={"c"}
        navigation={{ prevEl: ".back", nextEl: ".next" }}
        modules={[Navigation]}
        className='mySwiper'
        // slidesPerView={5}
      >
        {slides.map((slide, i) => (
          <SwiperSlide
            key={"c" + i}
            onClick={() => setSelectedSlide(i)}
            className='cursor-pointer'
          >
            <Slide
              textColor={selectedSlide === i ? "#F9F6F1" : "#2C3F50"}
              bgColor={selectedSlide === i ? "#A37B7B" : "#FFFFFF"}
              key={"s" + i}
              title={slide.title}
              icon={
                <slide.icon
                  className='w-8 lg:!w-16 lg:h-16'
                  fill={selectedSlide === i ? "#F9F6F1" : "#A37B7B"}
                />
              }
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Button
        className='next !hidden md:!flex !p-0 !w-auto '
        type='text'
        shape='circle'
        icon={<ArrowRightCircleIcon />}
      ></Button>
    </>
  );
};

export default SwiperSlider;
