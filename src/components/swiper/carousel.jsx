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
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
      }}
      spaceBetween={30}
      effect={"fade"}
      pagination={{
        clickable: true,
      }}
      modules={[EffectFade, Pagination, Autoplay]}
      className='carouselSwiper'
    >
      <SwiperSlide>
        <div className='w-full rounded-3xl overflow-hidden'>
          <Image src={c1} alt='c1' className='w-full' />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='w-full rounded-3xl overflow-hidden'>
          <Image src={c2} alt='c1' className='w-full' />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='w-full rounded-3xl overflow-hidden'>
          <Image src={c1} alt='c1' className='w-full' />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='w-full rounded-3xl overflow-hidden'>
          <Image src={c2} alt='c1' className='w-full' />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='w-full rounded-3xl overflow-hidden'>
          <Image src={c1} alt='c1' className='w-full' />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;
