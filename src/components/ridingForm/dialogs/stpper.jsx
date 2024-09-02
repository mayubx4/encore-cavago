import React, { useState } from "react";
import { Button, ConfigProvider, Flex, Steps } from "antd";
import activeStepIcon from "@public/assets/images/activeStep.png"; // Update with actual path
import inactiveStepIcon from "@public/assets/images/inactiveStep.png"; // Update with actual path
import completeStepIcon from "@public/assets/images/completeStep.png"; // Update with actual path
import Image from "next/image";
import "./stepper.css";
import { QuestionCircleFilled } from "@ant-design/icons";
import ContactUsForm from "./contactUsForm";
import Dialog from "./dialog";
import useToggle from "@shared/hooks/useToggle";

const Stepper = ({ current, setCurrent, steps }) => {
  const [openForm, toggleOpenForm] = useToggle();
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
    title: item.title,
    // Show description if the step is completed or active
    description: (
      <div className='step-description mb-5'>
        {index < current ? (
          steps[index].content
        ) : (
          <span className='opacity-0'>-</span>
        )}
      </div>
    ),
    icon: getIcon(index),
  }));

  return (
    <Flex vertical className='p-10 flex bg-[#F7F3F2] rounded-3xl w-[360px]'>
      <Flex vertical className='h-[281px] mt-[77px]'>
        <Steps current={current} direction='vertical' className='custom-steps'>
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
          ghost
          className='!m-0 !mt-[297px] !p-0 !border-none'
          onClick={() => toggleOpenForm()}
        >
          <Flex
            className='bg-[#533736] rounded-lg p-6 '
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
        <div className='p-10'>
          <ContactUsForm detailsReqired/>
        </div>
      </Dialog>
    </Flex>
  );
};

export default Stepper;
