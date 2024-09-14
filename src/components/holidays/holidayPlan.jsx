"use client";
import React from "react";
import Title from "antd/es/typography/Title";
import { Button } from "antd";
import useToggle from "@shared/hooks/useToggle";
import Dialog from "@/components/ridingForm/dialogs/dialog";
import RidingForm from "@/components/ridingForm/dialogs/ridingForm";
import Carousel from "@/components/swiper/carousel";
import CTop from "@public/assets/images/cTop.svg";
import CTopMobile from "@public/assets/images/cTopMobile.svg";
import CBottom from "@public/assets/images/cBottom.svg";
import CRight from "@public/assets/images/cRight.svg";
import CRightMobile from "@public/assets/images/cRightMobile.svg";

const HolidayPlan = () => {
  const [openForm, toggleOpenForm] = useToggle();

  return (
    <>
      <div className='px-3 xxldesktop:px-[100px] relative overflow-hidden rounded-3xl z-10 xxldesktop:mt-[120px] mt-20 aspect-[0.432] lg:aspect-[2.38]'>
        <Carousel />

        <div className='w-[calc(100%-24px)] lg:w-[calc(100%-200px)] h-full box-border bg-[linear-gradient(0deg,rgba(0,0,0,0)_54.1%,#000000_104.03%)] lg:bg-[linear-gradient(270deg,rgba(0,0,0,0)_53.2%,#000000_108.18%)] aspect-[0.432] lg:aspect-[2.38] absolute top-0 z-10 flex justify-between gap-5 rounded-3xl overflow-hidden '>
          <div className='mt-16 w-full lg:my-auto lg:pl-[68px]'>
            <Title className=' !font-semibold !text-center lg:!text-left !text-[32px] desktop:!text-6xl !text-[#FAFAFA] !m-0 '>
              Plan Your Own
              <br />
              Holiday in Minutes
            </Title>
            <p className='desktop:!text-[28px] !text-lg !text-center lg:!text-left !font-medium !text-[#FAFAFA] lg:mt-8 mt-6 mb-0'>
              Plan an equestrian holiday
              <br className='lg:hidden block' /> you&apos;ll never forget!
            </p>
            <div className='relative z-20 desktop:mt-16 mt-11 bg-[#E3B8AF33] max-w-[326px] mx-auto lg:mx-0 lg:max-w-[400px] desktop:max-w-[534px] backdrop-blur-md rounded-3xl shadow-lg'>
              <div className='p-4 xxldesktop:p-8'>
                <p className='text-base desktop:!text-[28px] !text-center lg:!text-left !font-semibold !text-[#FAFAFA] !m-0  relative'>
                  I&apos;m travelling . . .
                </p>
                <div className='flex flex-row lg:mt-10 mt-6 lg:gap-6 gap-1'>
                  <Button
                    className='!font-semibold !text-[#533736] bg-[#F7F3F2] !text-sm desktop:!text-lg xxldesktop:!px-6 !px-3 xxldesktop:!py-4 !py-2'
                    shape='round'
                    onClick={() => toggleOpenForm()}
                  >
                    Solo
                  </Button>
                  <Button
                    className='!font-semibold !text-[#533736] bg-[#F7F3F2] !text-sm desktop:!text-lg xxldesktop:!px-6 !px-3 xxldesktop:!py-4 !py-2'
                    shape='round'
                  >
                    With a group
                  </Button>
                  <Button
                    className='!font-semibold !text-[#533736] bg-[#F7F3F2] !text-sm desktop:!text-lg xxldesktop:!px-6 !px-3 xxldesktop:!py-4 !py-2'
                    shape='round'
                  >
                    With my partner
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CTop className='absolute top-0 z-10 lg:left-1/3 rotate-[270deg] hidden lg:block' />
        <CRight className='absolute top-12 z-10 right-0 xxldesktop:mr-[100px] mr-10 hidden lg:block' />
        <CBottom className='absolute bottom-6 z-10 left-1/2 hidden lg:block' />
        <CTopMobile className='absolute z-10 top-4' />
        <CRightMobile className='absolute z-10 right-0 top-40 mr-3' />
      </div>
      <Dialog open={openForm} toggleOpen={toggleOpenForm}>
        <RidingForm />
      </Dialog>
    </>
  );
};

export default HolidayPlan;
