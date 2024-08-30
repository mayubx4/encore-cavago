import Title from "antd/es/typography/Title";
import React from "react";
import SwiperSliderGrid from "../swiper/swiperSliderGrid";
import GridSlide from "../swiper/gridSlide";

const AllPkg = () => {
  return (
    <div className='mt-20'>
      <Title className='!text-[32px] !font-semibold text-center text-[#2C3F4F] !m-0'>
        All Packages
      </Title>
      <Title className='!text-[21px] text-center !font-medium text-[#2C3F4F] mt-3'>
        Explore all types of our latest trending packages.
      </Title>
      <div className='mt-[60px]'>
        <SwiperSliderGrid
          disablepagination
          slides={[
            <GridSlide key={1} transparent={false} />,
            <GridSlide key={2} transparent={false} />,
            <GridSlide key={3} transparent={false} />,
            <GridSlide key={4} transparent={false} />,
            <GridSlide key={5} transparent={false} />,
            <GridSlide key={6} transparent={false} />,
            <GridSlide key={7} transparent={false} />,
            <GridSlide key={8} transparent={false} />,
          ]}
        />
      </div>
    </div>
  );
};

export default AllPkg;
