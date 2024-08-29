"use client";
import React from "react";
import { Typography, Avatar, Rate } from "antd";
import Image from "next/image";
import profilePic from "@public/assets/images/g1.png"; // replace with actual path
import review from "@public/assets/images/review.png"; // replace with actual path
import secondaryImage from "@public/assets/images/g1.png"; // replace with actual path
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import { StarFilled, StarOutlined } from "@ant-design/icons";

const ReviewCard = () => {
  return (
    <div className='bg-[#F9F5F2] py-10 px-11 rounded-3xl flex flex-col-reverse md:flex-row justify-between items-center gap-6 w-full box-border'>
      <div className='max-w-[454px]'>
        <Title
          level={3}
          className='!text-[28px] !font-semibold !text-[#593E34] !text-left'
        >
          Intensive Training Week in Portugal
        </Title>
        <p className='text-lg font-semibold text-[#233240] mb-4 !text-left'>
          Solo Traveller • March 2024
        </p>
        <p className='text-[21px] font-medium text-[#233240] !text-left'>
          It was my first time ever riding a horse and it was awesome! Myla was
          a great guide. She was very friendly and knew my horse&apos;s
          personality and habits, which made it easy for me to get comfortable
          with him. The ride along the beach was really nice and scenic.
        </p>
        <div className='flex items-center mt-4 md:mt-0'>
          <div className='relative w-16 h-16 rounded-full overflow-hidden'>
            <Image
              src={secondaryImage}
              alt='Secondary'
              layout='fill'
              objectFit='cover'
            />
          </div>
          <div className='ml-4 flex flex-col'>
            <p className='!font-semibold !text-[#533736] m-0'>
              Cavago Holidaymaker
            </p>
            <Rate
              disabled
              defaultValue={4}
              character={({ value, index }) => {
                console.log(index < value);

                return index < value ? (
                  <StarFilled style={{ color: "#FFB300" }} />
                ) : (
                  <StarOutlined style={{ color: "#FFB300" }} />
                );
              }}
            />
          </div>
        </div>
      </div>

      <Image src={review} alt='Main' />
    </div>
  );
};

export default ReviewCard;
