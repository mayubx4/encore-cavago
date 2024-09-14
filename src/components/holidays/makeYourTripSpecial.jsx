import Title from "antd/es/typography/Title";
import React from "react";
import tripIcon1 from "@public/assets/images/tripIcon1.png";
import tripIcon2 from "@public/assets/images/tripIcon2.png";
import tripIcon3 from "@public/assets/images/tripIcon3.png";
import flower from "@public/assets/images/flower.png";
import { Flex } from "antd";
import Image from "next/image";

const MakeYourTripSpecial = () => {
  return (
    <div className='bg-white -mt-96 pt-96'>
      <Title className='!text-2xl lg:!text-[40px] !font-semibold !text-[#2C3F4F] text-center mt-10 lg:!mt-[120px] !mb-6'>
        How We&apos;ll <br className='block lg:hidden' />
        Make Your Trip Special
      </Title>
      <p className='text-sm lg:text-[22px] font-semibold text-[#2C3F4F] text-center !m-0'>
        Turning dreams of luxury into reality
      </p>
      <Flex
        justify='space-between'
        align='center'
        className='max-w-6xl mx-auto lg:pt-[90px] lg:pb-[120px] py-10 px-10'
      >
        <Flex vertical>
          <Image
            alt='tripIcon1'
            src={tripIcon1}
            className='w-16 h-16 lg:w-[195px] lg:h-[195px]'
          />
          <p className='text-sm lg:text-[28px] font-semibold text-[#533736] text-center mt-5 lg:!mt-10 !mb-0'>
            Total
            <br /> Privacy
          </p>
        </Flex>
        <Image
          alt='flower'
          src={flower}
          className='w-4 h-4 lg:w-[51px] lg:h-[51px]'
        />
        <Flex vertical>
          <Image
            alt='tripIcon2'
            src={tripIcon2}
            className='w-16 h-16 lg:w-[195px] lg:h-[195px]'
          />
          <p className='text-sm lg:text-[28px] font-semibold text-[#533736] text-center mt-5 lg:!mt-10 !mb-0'>
            Rare
            <br />
            Experience
          </p>
        </Flex>
        <Image
          alt='flower'
          src={flower}
          className='w-4 h-4 lg:w-[51px] lg:h-[51px]'
        />
        <Flex vertical>
          <Image
            alt='tripIcon3'
            src={tripIcon3}
            className='w-16 h-16 lg:w-[195px] lg:h-[195px]'
          />
          <p className='text-sm lg:text-[28px] font-semibold text-[#533736] text-center mt-5 lg:!mt-10 !mb-0'>
            World-Class
            <br />
            Facilities
          </p>
        </Flex>
      </Flex>
    </div>
  );
};

export default MakeYourTripSpecial;
