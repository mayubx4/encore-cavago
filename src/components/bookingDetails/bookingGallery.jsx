import { Button, Col, Flex, Row, Space } from "antd";
import Image from "next/image";
import React from "react";
import g1 from "@public/assets/images/g1.png";
import g2 from "@public/assets/images/g2.png";
import g3 from "@public/assets/images/g3.png";
import g4 from "@public/assets/images/g4.png";
import g5 from "@public/assets/images/g5.png";
import photo from "@public/assets/images/photo.svg";

const BookingGallery = () => {
  return (
    <div>
      <div
        className='flex flex-col lg:flex-row justify-between gap-6 relative'
        style={{ borderRadius: "18px", overflow: "hidden", width: "100%" }}
      >
        <Flex className='flex-grow'>
          <Image alt='image' src={g1} className='w-full h-full object-cover' />
        </Flex>
        <div className='flex flex-row lg:flex-col justify-between flex-grow gap-6'>
          <Image alt='image' src={g2} className='w-full h-full object-cover' />
          <Image alt='image' src={g3} className='w-full h-full object-cover' />
        </div>
        <div className='flex flex-row lg:flex-col justify-between flex-grow gap-6'>
          <Image alt='image' src={g4} className='w-full h-full object-cover' />
          <Image alt='image' src={g5} className='w-full h-full object-cover' />
        </div>
        <Button className='!absolute bottom-3 right-3 !rounded-xl py-3 px-4'>
          <Image
            alt='photo'
            src={photo}
            className='font-semibold text-base text-[#2C3F50]'
          />{" "}
          See all photos
        </Button>
      </div>
    </div>
  );
};

export default BookingGallery;
