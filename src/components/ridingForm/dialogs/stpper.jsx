import React, { useState } from "react";
import { Button, ConfigProvider, Flex, Steps } from "antd";
import activeStepIcon from "@public/assets/images/activeStep.png"; // Update with actual path
import inactiveStepIcon from "@public/assets/images/inActiveStep.png"; // Update with actual path
import completeStepIcon from "@public/assets/images/completeStep.png"; // Update with actual path
import Image from "next/image";
import "./stepper.css";
import { QuestionCircleFilled } from "@ant-design/icons";
import ContactUsForm from "./contactUsForm";
import Dialog from "./dialog";
import useToggle from "@shared/hooks/useToggle";
import { useWhichDeviceContext } from "@shared/hooks/whichDeviceContext";

const Stepper = ({ current, setCurrent, steps }) => {
  const [openForm, toggleOpenForm] = useToggle();
  const device = useWhichDeviceContext();
  const getIcon = index => {
    if (index < current) {
      return (
        <Image src={completeStepIcon} alt='complete-step' className='w-full' />
      );
    }
    if (index === current) {
      return (
        <Image src={activeStepIcon} alt='active-step' className='w-full' />
      );
    }
    return (
      <Image src={inactiveStepIcon} alt='inactive-step' className='w-full' />
    );
  };

  const items = steps.map((item, index) => ({
    key: item.title,
    title: (
      <span className='text-xs mt-0 xs:-mt-10 lg:mt-0 block lg:text-sm text-[#A37B7B] lg:text-[#566573] xs:text-nowrap'>
        {item.title}
      </span>
    ),
    // Show description if the step is completed or active
    description: (
      <div className='step-description mb-5 hidden lg:block text-lg font-semibold text-[#2C3F4F]'>
        {index < current ? (
          steps[index].content
        ) : (
          <span className='opacity-0 text-lg font-semibold text-[#2C3F4F]'>
            -
          </span>
        )}
      </div>
    ),
    icon: getIcon(index),
  }));

  return (
    <Flex
      vertical
      className='lg:p-10 flex lg:bg-[#F7F3F2] justify-between items-start rounded-3xl lg:w-[360px] relative'
    >
      <Flex
        vertical
        className={`lg:h-[281px] mt-[77px] pr-10 w-full ${
          current === 4 && device === "mobile" ? "hidden" : "flex"
        }`}
      >
        <Steps
          current={current}
          direction={device === "desktop" ? "vertical" : "horizontal"}
          labelPlacement={device === "desktop" ? "horizontal" : "vertical"}
          className='custom-steps'
          responsive={false}
        >
          {items.map((item, index) => (
            <Steps.Step
              key={item.key}
              title={item.title}
              description={item.description}
              icon={item.icon}
              className={`step-item ${index <= current ? "completed" : ""}`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </Steps>
      </Flex>
      <ConfigProvider wave={{ disabled: true }}>
        <Button
          // ghost
          type='text'
          className='!m-0 !p-0 lg:hidden  bg-[#A37B7B] text-[#F7F3F2] !h-5 w-5 absolute top-5 right-5'
          onClick={() => toggleOpenForm()}
          shape='circle'
          icon={
            <QuestionCircleFilled className='text-5xl   rounded-full relative h-8 w-8' />
          }
        ></Button>
        <Button
          ghost
          type='text'
          className='!m-0 !p-0 hidden lg:block'
          onClick={() => toggleOpenForm()}
        >
          <Flex
            className='bg-[#A37B7B] rounded-lg p-6 w-full'
            align='center'
            gap={10}
          >
            <QuestionCircleFilled className='text-5xl text-[#F7F3F2]' />
            <Flex vertical justify='space-between'>
              <p className='text-sm text-[#F7F3F2]'>Need our help?</p>
              <p className='text-lg font-semibold text-[#F7F3F2]'>Contact us</p>
            </Flex>
          </Flex>
        </Button>
      </ConfigProvider>
      <Dialog open={openForm} toggleOpen={toggleOpenForm}>
        <div className='lg:p-10'>
          <ContactUsForm detailsReqired />
        </div>
      </Dialog>
    </Flex>
  );
};

export default Stepper;
