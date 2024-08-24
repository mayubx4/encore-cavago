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
    </>
  );
}
