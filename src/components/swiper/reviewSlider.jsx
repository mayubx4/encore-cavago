"use client";
import React, { useRef, useState } from "react";
import ArrowRightCircleIcon from "@public/assets/images/arrow-right-circle.svg";
import ArrowLeftCircleIcon from "@public/assets/images/arrow-left-circle.svg";

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
import ReviewCard from "../holidays/ratingAndReviews/reviewCard";
import "./review.css";
import { Button } from "antd";
import Image from "next/image";

const ReviewSlider = ({
  slides = [
    <ReviewCard />,
    <ReviewCard />,
    <ReviewCard />,
    <ReviewCard />,
    <ReviewCard />,
    <ReviewCard />,
    <ReviewCard />,
    <ReviewCard />,
  ],
}) => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = index => {
    const swiper = swiperRef.current.swiper;
    swiper.slideToLoop(index);
    setActiveIndex(index);
  };

  const goToNextSlide = () => {
    const swiper = swiperRef.current.swiper;
    swiper.slideNext();
    setActiveIndex(swiper.realIndex);
  };

  const goToPrevSlide = () => {
    const swiper = swiperRef.current.swiper;
    swiper.slidePrev();
    setActiveIndex(swiper.realIndex);
  };

  return (
    <>
      <Swiper
        ref={swiperRef}
        slidesPerView={1.5}
        spaceBetween={"40px"}
        centeredSlides
        loop
        key={"review"}
        className='review relative !w-[calc(100%+5rem)] xxldesktop:!w-[calc(100%+200px)] !-ml-[2.5rem] xxldesktop:!-ml-[100px]'
        onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={"qwe" + i}>
            <div key={"slide" + i} className='w-full'>
              {slide}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='swiper-custom-pagination items-center'>
        <Button
          className='!p-0 !w-auto !bg-transparent'
          shape='circle'
          onClick={goToPrevSlide}
        >
          <Image alt='arrow-left-circle' src={ArrowLeftCircleIcon} />
        </Button>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => updateActiveIndex(index)}
            className={activeIndex === index ? "active" : ""}
          ></button>
        ))}
        <Button
          className='!p-0 !w-auto !bg-transparent'
          shape='circle'
          onClick={goToNextSlide}
        >
          <Image alt='arrow-right-circle' src={ArrowRightCircleIcon} />
        </Button>
      </div>
    </>
  );
};

export default ReviewSlider;
