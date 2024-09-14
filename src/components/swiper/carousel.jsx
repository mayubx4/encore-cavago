import React from "react";
import c1 from "@public/assets/images/c1.png";
import c2 from "@public/assets/images/c2.png";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import "./styles.css";
import "./carousel.scss";

// import required modules
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import Image from "next/image";

const Carousel = () => {
  return (
    <Swiper
      // autoplay={{
      //   delay: 1500,
      //   disableOnInteraction: false,
      // }}
      spaceBetween={30}
      effect={"fade"}
      pagination={{
        clickable: true,
      }}
      modules={[EffectFade, Pagination, Autoplay]}
      className='carouselSwiper'
    >
      <SwiperSlide>
        <Image
          src={c1}
          alt='c1'
          className='rounded-3xl overflow-hidden h-full aspect-[0.432] lg:aspect-[2.38] object-bottom'
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={c2}
          alt='c2'
          className='rounded-3xl overflow-hidden h-full aspect-[0.432] lg:aspect-[2.38] lg:object-bottom object-[70%]'
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={c1}
          alt='c1'
          className='rounded-3xl overflow-hidden h-full aspect-[0.432] lg:aspect-[2.38] object-bottom'
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={c2}
          alt='c2'
          className='rounded-3xl overflow-hidden h-full aspect-[0.432] lg:aspect-[2.38] lg:object-bottom object-[70%]'
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={c1}
          alt='c1'
          className='rounded-3xl overflow-hidden h-full aspect-[0.432] lg:aspect-[2.38] object-bottom'
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;
