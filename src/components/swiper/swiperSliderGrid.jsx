"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import "./stylesGrid.css";

// import required modules
import { Grid, Pagination } from "swiper/modules";
import GridSlide from "./gridSlide";

export default function SwiperSliderGrid({
  slides = [
    <GridSlide />,
    <GridSlide />,
    <GridSlide />,
    <GridSlide />,
    <GridSlide />,
    <GridSlide />,
    <GridSlide />,
    <GridSlide />,
    <GridSlide />,
    <GridSlide />,
    <GridSlide />,
    <GridSlide />,
    <GridSlide />,
    <GridSlide />,
    <GridSlide />,
    <GridSlide />,
    <GridSlide />,
  ],
}) {
  const swiperRef = useRef(null);

  // const [activeIndex, setActiveIndex] = useState(0);

  // const updateActiveIndex = index => {
  //   setActiveIndex(index);
  //   swiperRef.current.swiper.slideTo(index);
  // };

  // const goToNextSlide = () => {
  //   const swiper = swiperRef.current.swiper;
  //   swiper.slideNext();
  //   setActiveIndex(swiper.activeIndex);
  // };

  // const goToPrevSlide = () => {
  //   const swiper = swiperRef.current.swiper;
  //   swiper.slidePrev();
  //   setActiveIndex(swiper.activeIndex);
  // };

  // const goToFirstSlide = () => {
  //   swiperRef.current.swiper.slideTo(0);
  //   setActiveIndex(0);
  // };

  // const goToLastSlide = () => {
  //   const lastSlideIndex = swiperRef.current.swiper.slides.length - 1;
  //   swiperRef.current.swiper.slideTo(lastSlideIndex);
  //   setActiveIndex(lastSlideIndex);
  // };

  return (
    <>
      <Swiper
        ref={swiperRef}
        slidesPerView={4}
        grid={{
          rows: 3,
        }}
        spaceBetween={30}
        pagination={{
          clickable: true,

          renderBullet: function (index, className) {
            return `<span class="${className}"> ${index + 1} </span>`;
          },
        }}
        modules={[Grid, Pagination]}
        className='swiper-grid'
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>{slide}</SwiperSlide>
        ))}
      </Swiper>
      {/* <div className='swiper-custom-pagination'>
        <button onClick={goToFirstSlide} disabled={activeIndex === 0}>
          {"<<"}
        </button>
        <button onClick={goToPrevSlide} disabled={activeIndex === 0}>
          {"<"}
        </button>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => updateActiveIndex(index)}
            className={activeIndex === index ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={goToNextSlide}
          disabled={activeIndex === slides.length - 1}
        >
          {">"}
        </button>
        <button
          onClick={goToLastSlide}
          disabled={activeIndex === slides.length - 1}
        >
          {">>"}
        </button>
      </div> */}
    </>
  );
}
