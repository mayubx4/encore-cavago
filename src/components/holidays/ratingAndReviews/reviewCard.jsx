"use client";
import React from "react";
import { Rate } from "antd";
import Image from "next/image";
import review from "@public/assets/images/review.png"; // replace with actual path
import secondaryImage from "@public/assets/images/g1.png"; // replace with actual path
import Title from "antd/es/typography/Title";
import { StarFilled, StarOutlined } from "@ant-design/icons";

const ReviewCard = () => {
  return (
    <div className='bg-[#F9F5F2] py-10 lg:px-11 px-3 rounded-3xl flex flex-col-reverse lg:flex-row justify-between items-center gap-6 w-full box-border'>
      <div className='max-w-[454px]'>
        <Title
          level={3}
          className='!text-sm lg:!text-[28px] lg:!text-left !text-center !font-semibold !text-[#593E34]'
        >
          Intensive Training Week in Portugal
        </Title>
        <p className='text-xs lg:text-lg lg:text-left text-center font-semibold text-[#233240] mb-4'>
          Solo Traveller • March 2024
        </p>
        <p className='text-xs lg:text-[21px] leading-5 lg:leading-8 font-medium text-[#233240] lg:text-left text-center'>
          It was my first time ever riding a horse and it was awesome! Myla was
          a great guide. She was very friendly and knew my horse&apos;s
          personality and habits, which made it easy for me to get comfortable
          with him. The ride along the beach was really nice and scenic.
        </p>
        <div className='flex items-stretch mt-4 md:mt-0'>
          <div className='relative w-9 lg:w-16 h-9 lg:h-16 rounded-full overflow-hidden'>
            <Image
              src={secondaryImage}
              alt='Secondary'
              layout='fill'
              objectFit='cover'
            />
          </div>
          <div className='ml-4 flex flex-col justify-between'>
            <p className='text-sm lg:text-xl !font-semibold !text-[#533736] m-0'>
              Cavago Holidaymaker
            </p>
            <Rate
              disabled
              defaultValue={4}
              character={({ value, index }) => {
                return index < value ? (
                  <StarFilled
                    style={{ color: "#FFB300" }}
                    className='text-sm lg:text-xl m-0'
                  />
                ) : (
                  <StarOutlined
                    style={{ color: "#FFB300" }}
                    className='text-sm lg:text-xl m-0'
                  />
                );
              }}
            />
          </div>
        </div>
      </div>
      <Image
        src={review}
        alt='review'
        className='w-[124px] lg:w-[239px] desktop:w-[339px] h-auto !object-scale-down'
      />
    </div>
  );
};

export default ReviewCard;
