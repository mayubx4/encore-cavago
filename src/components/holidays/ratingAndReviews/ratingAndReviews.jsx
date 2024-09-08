import ReviewSlider from "@/components/swiper/reviewSlider";
import Title from "antd/es/typography/Title";
import React from "react";

const RatingAndReviews = () => {
  return (
    <div className='bg-white px-10 xxldesktop:px-[100px] -mt-[400px] pt-[400px]'>
      <div className='bg-[#E8DEDC] rounded-3xl py-20  mt-[120px]'>
        <Title className='text-[40p] font-semibold text-[#2C3F4F] text-center mt-0'>
          Ratings & Reviews
        </Title>
        <p className='text-[22px] font-semibold text-[#2C3F4F] text-center mt-6 mb-10'>
          Hear what other travellers have to say
        </p>
        <ReviewSlider />
      </div>
    </div>
  );
};

export default RatingAndReviews;
