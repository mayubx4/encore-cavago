import Title from "antd/es/typography/Title";
import React from "react";
import tripIcon1 from "@public/assets/images/tripIcon1.svg";
import tripIcon2 from "@public/assets/images/tripIcon2.svg";
import tripIcon3 from "@public/assets/images/tripIcon3.svg";
import flower from "@public/assets/images/flower.svg";
import { Flex } from "antd";
import Image from "next/image";

const MakeYourTripSpecial = () => {
  return (
    <div className='bg-white -mt-96 pt-96'>
      <Title className='!text-[40px], !font-semibold !text-[#2C3F4F] text-center !mt-[120px] !mb-6'>
        How We&apos;ll Make Your Trip Special
      </Title>
      <p className='text-[22px] font-semibold text-[#2C3F4F] text-center !m-0'>
        Turning dreams of luxury into reality
      </p>
      <Flex
        justify='space-between'
        align='center'
        className='max-w-6xl mx-auto pt-[90px] pb-[120px] px-10'
      >
        <Flex vertical>
          <Image alt='tripIcon1' src={tripIcon1} />
          <p className='text-[28px] font-semibold text-[#533736] text-center !mt-10 !mb-0'>
            Total
            <br /> Privacy
          </p>
        </Flex>
        <Image alt='flower' src={flower} />
        <Flex vertical>
          <Image alt='tripIcon2' src={tripIcon2} />
          <p className='text-[28px] font-semibold text-[#533736] text-center !mt-10 !mb-0'>
            Rare
            <br />
            Experience
          </p>
        </Flex>
        <Image alt='flower' src={flower} />
        <Flex vertical>
          <Image alt='tripIcon3' src={tripIcon3} />
          <p className='text-[28px] font-semibold text-[#533736] text-center !mt-10 !mb-0'>
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
