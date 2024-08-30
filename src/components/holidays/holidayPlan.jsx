import React from "react";
import holidayPlanBg from "@public/assets/images/holidayPlan.png";
import holidayPlanBgSm from "@public/assets/images/holidayPlanBgSm.png";
import Image from "next/image";
import Title from "antd/es/typography/Title";
import { Button, Flex } from "antd";

const HolidayPlan = () => {
  return (
    <div className='px-10 xxldesktop:px-[100px] relative z-10'>
      <div className='w-full bg-[#533736] flex justify-between gap-5 rounded-3xl overflow-hidden mt-[120px]'>
        <div className='py-[88px] lg:pl-[68px] pl-7 w-1/2'>
          <Title className=' !font-semibold !text-5xl xxldesktop:!text-6xl !text-[#E8DEDC] !mt-0 !mb-1'>
            Plan Your Own
            <br />
            Holiday in Minutes
          </Title>
          <p className='xxldesktop:!text-[28px] text-lg !font-medium !text-[#E8DEDC] !mt-8 !mb-0'>
            Plan an equestrian holiday you&apos;ll never forget!
          </p>
          <div className='relative mt-16'>
            <Image
              alt='holidayPlanBgSm'
              src={holidayPlanBgSm}
              style={{
                objectFit: "cover",
                objectPosition: "top",
                width: "100%",
                maxWidth: "534px",
                position: "absolute",
                // zIndex: -1,
              }}
              className='rounded-3xl overflow-hidden'
            />
            <div className='p-4 xxldesktop:p-8'>
              <p className='text-xl xxldesktop:!text-[28px] !font-semibold !text-[#533736] !m-0 z-10 relative'>
                I&apos;m travelling . . .
              </p>
              <div className='flex flex-row mt-10 xxldesktop:gap-6 gap-1'>
                <Button
                  className='!font-semibold !text-[#533736] !text-sm xxldesktop:!text-lg xxldesktop:!px-6 !py-[21.5px]'
                  shape='round'
                >
                  Solo
                </Button>
                <Button
                  className='!font-semibold !text-[#533736] !text-sm xxldesktop:!text-lg xxldesktop:!px-6 xxldesktop:!py-[21.5px]'
                  shape='round'
                >
                  With a group
                </Button>
                <Button
                  className='!font-semibold !text-[#533736] !text-sm xxldesktop:!text-lg xxldesktop:!px-6 xxldesktop:!py-[21.5px]'
                  shape='round'
                >
                  With my partner
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className='w-1/2 pr-5'>
          <Image
            alt='holidayPlanBg'
            src={holidayPlanBg}
            className='object-contain w-full object-right-bottom h-full'
          />
        </div>
      </div>
    </div>
  );
};

export default HolidayPlan;
