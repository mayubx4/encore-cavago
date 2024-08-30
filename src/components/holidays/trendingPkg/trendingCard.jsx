import React from "react";
import Image from "next/image";
import { Flex } from "antd";
import { StarFilled } from "@ant-design/icons";
import FavouriteBar from "@/components/shared/favouriteBar";

const TrendingCard = ({
  bgImage,
  imageSrc,
  category,
  title,
  rating,
  location,
  price,
}) => {
  console.log(bgImage);

  return (
    <div
      className='p-4 rounded-2xl'
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className='relative overflow-hidden h-[508px]'>
        <Image
          alt={title}
          src={imageSrc}
          className='w-full rounded-2xl object-cover'
          fill
        />
        <Flex
          vertical
          justify='space-between'
          className='bg-[linear-gradient(180deg,rgba(0,0,0,0)_20.66%,#000000_113.35%)] h-full w-full absolute top-0 left-0 box-border p-4 rounded-2xl'
        >
          <FavouriteBar />

          <div className='text-white'>
            <p className='text-sm'>{category}</p>
            <Flex align='center' justify='space-between'>
              <p className='text-lg m-0 font-semibold'>{title}</p>
              <p className='text-base m-0'>
                <StarFilled style={{ color: "#F5B946" }} /> {rating}
              </p>
            </Flex>
            <p className='text-sm mt-0'>{location}</p>
            <p className='text-base font-semibold'>{`Starting from ${price}`}</p>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default TrendingCard;
