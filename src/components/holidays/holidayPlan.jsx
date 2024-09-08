"use client";
import React from "react";
import Title from "antd/es/typography/Title";
import { Button } from "antd";
import useToggle from "@shared/hooks/useToggle";
import Dialog from "@/components/ridingForm/dialogs/dialog";
import RidingForm from "@/components/ridingForm/dialogs/ridingForm";
import Carousel from "@/components/swiper/carousel";
import CTop from "@public/assets/images/cTop.svg";
import CBottom from "@public/assets/images/cBottom.svg";
import CRight from "@public/assets/images/cRight.svg";

const HolidayPlan = () => {
  const [openForm, toggleOpenForm] = useToggle();

  return (
    <>
      <div className='px-10 xxldesktop:px-[100px] relative z-10 mt-[120px]'>
        <Carousel />

        <div className='w-[calc(100%-200px)] h-full box-border bg-[linear-gradient(270deg,rgba(0,0,0,0)_53.2%,#000000_108.18%)] absolute top-0 z-10 flex justify-between gap-5 rounded-3xl overflow-hidden pt-[120px]'>
          <div className=' lg:pl-[68px] pl-7 '>
            <Title className=' !font-semibold !text-5xl xxldesktop:!text-6xl !text-[#FAFAFA] !mt-0 !mb-1'>
              Plan Your Own
              <br />
              Holiday in Minutes
            </Title>
            <p className='xxldesktop:!text-[28px] text-lg !font-medium !text-[#FAFAFA] !mt-8 !mb-0'>
              Plan an equestrian holiday you&apos;ll never forget!
            </p>
            <div className='relative z-20 mt-16 bg-[#E3B8AF33] backdrop-blur-md rounded-3xl shadow-lg'>
              <div className='p-4 xxldesktop:p-8'>
                <p className='text-xl xxldesktop:!text-[28px] !font-semibold !text-[#FAFAFA] !m-0  relative'>
                  I&apos;m travelling . . .
                </p>
                <div className='flex flex-row mt-10 xxldesktop:gap-6 gap-1'>
                  <Button
                    className='!font-semibold !text-[#533736] bg-[#F7F3F2] !text-sm xxldesktop:!text-lg xxldesktop:!px-6 '
                    shape='round'
                    onClick={() => toggleOpenForm()}
                  >
                    Solo
                  </Button>
                  <Button
                    className='!font-semibold !text-[#533736] bg-[#F7F3F2] !text-sm xxldesktop:!text-lg xxldesktop:!px-6 '
                    shape='round'
                  >
                    With a group
                  </Button>
                  <Button
                    className='!font-semibold !text-[#533736] bg-[#F7F3F2] !text-sm xxldesktop:!text-lg xxldesktop:!px-6 '
                    shape='round'
                  >
                    With my partner
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CTop className='absolute top-0 z-10 left-1/3 ' />
        <CRight className='absolute top-12 z-10 right-0 xxldesktop:mr-[100px] mr-10' />
        <CBottom className='absolute bottom-6 z-10 left-1/2 ' />
      </div>
      <Dialog open={openForm} toggleOpen={toggleOpenForm}>
        <RidingForm />
      </Dialog>
    </>
  );
};

export default HolidayPlan;
