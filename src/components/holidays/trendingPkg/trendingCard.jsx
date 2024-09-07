import React from "react";
import Image from "next/image";
import { Button, Flex } from "antd";
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
    <div className='rounded-2xl overflow-hidden'>
  <div className='relative overflow-hidden h-[508px] group'>
    <Image
      alt={title}
      src={imageSrc}
      className='w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110'
      fill
    />
    <Flex
      vertical
      justify='space-between'
      className='bg-[linear-gradient(180deg,rgba(0,0,0,0)_20.66%,#000000_113.35%)] h-full w-full absolute top-0 left-0 box-border p-4'
    >
      <FavouriteBar />

      {/* Text section, always visible */}
          <div className='text-white relative transition-transform duration-500 ease-in-out group-hover:-translate-y-2/3'>
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

      {/* Button sliding in on hover */}
      <div className='absolute bottom-4 left-4 right-4'>
        <Button
          className='text-[#533736] mt-6 transform translate-y-full opacity-0 transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100'
          shape='round'
        >
          Book Now
        </Button>
      </div>
    </Flex>
  </div>
</div>

  );
};

export default TrendingCard;
