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
    <GridSlide key={1}/>,
    <GridSlide key={2}/>,
    <GridSlide key={3}/>,
    <GridSlide key={4}/>,
    <GridSlide key={5}/>,
    <GridSlide key={6}/>,
    <GridSlide key={7}/>,
    <GridSlide key={8}/>,
    <GridSlide key={9}/>,
    <GridSlide key={10}/>,
    <GridSlide key={11}/>,
    <GridSlide key={2}/>,
    <GridSlide key={3}/>,
    <GridSlide key={14}/>,
    <GridSlide key={15}/>,
    <GridSlide key={16}/>,
    <GridSlide key={17}/>,
  ],
}) {
  const swiperRef = useRef(null);

  return (
    <>
      <Swiper
        key={"asd"}
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
          <SwiperSlide key={"asd" + i}>{slide}</SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
