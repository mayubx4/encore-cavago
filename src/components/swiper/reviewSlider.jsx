"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Navigation, Pagination } from "swiper/modules";

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
import ReviewCard from "../holidays/ratingAndReviews/reviewCard";

const ReviewSlider = ({
  slides = [
    <ReviewCard key={1} />,
    <ReviewCard key={2} />,
    <ReviewCard key={3} />,
    <ReviewCard key={4} />,
    <ReviewCard key={5} />,
    <ReviewCard key={6} />,
    <ReviewCard key={7} />,
    <ReviewCard key={8} />,
  ],
}) => {
  return (
    <>
      {/* <Button className='back !hidden md:!flex !p-0' shape='circle'>
        <Image alt='arrow-left-circle' src={ArrowLeftCircleIcon} />
      </Button> */}
      <Swiper
        slidesPerView={1.5}
        spaceBetween={"40px"}
        centeredSlides
        loop
        pagination={true}
        key={"qwe"}
        navigation={{ prevEl: ".back", nextEl: ".next" }}
        modules={[Navigation, Pagination]}
        className='review relative !w-[calc(100%+200px)] !-ml-[100px]'
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={"qwe" + i}>{slide}</SwiperSlide>
        ))}
      </Swiper>
      {/* <Button className='next !hidden md:!flex !p-0' shape='circle'>
        <Image alt='arrow-right-circle' src={ArrowRightCircleIcon} />
      </Button> */}
    </>
  );
};

export default ReviewSlider;
