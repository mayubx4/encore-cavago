"use client";
import { Button, Col, Flex, Row } from "antd";
import React, { useState } from "react";
import Stepper from "./stpper";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import Step1And2 from "./step1And2";
import Step3 from "./step3";
import Step4 from "./step4";
import holidayFormStep1 from "@public/assets/images/holidayFormStep1.png";
import holidayFormStep2 from "@public/assets/images/holidayFormStep2.png";
import ContactUsForm from "./contactUsForm";

const btnsStep1 = ["Beginner", "Intermediate", "Advanced"];
const btnsStep2 = [
  "Portugal",
  "Spain",
  "Usa - West Coast",
  "England",
  "Norway",
  "South Africa",
  "Saudi Arabia",
  "Usa - Midwest",
];
const btnsStep3 = [
  {
    text: "Solo Self Discovery",
    image: "/assets/images/step4Btn1.png",
  },
  {
    text: "Mother & Daughter",
    image: "/assets/images/step4Btn2.png",
  },
  {
    text: "Romantic Getaway",
    image: "/assets/images/step4Btn3.png",
  },
  {
    text: "Reconnecting with Nature",
    image: "/assets/images/step4Btn4.png",
  },
];
const RidingForm = () => {
  const [current, setCurrent] = useState(2);
  const [steps, setSteps] = useState([
    {
      title: "Riding ability",
      content: "",
    },
    {
      title: "Your next stop",
      content: "",
    },
    {
      title: "Pick your dates",
      content: "",
    },
    {
      title: "Your mood",
      content: "",
    },
  ]);
  const onSelect = stepIndex => val => {
    const stp = steps;
    stp[stepIndex].content = val;
    setSteps(stp);
  };
  return (
    <Flex className='h-full'>
      <Stepper current={current} setCurrent={setCurrent} steps={steps} />

      <Flex vertical justify='space-between' className='w-full p-10'>
        <div>
          {current === 0 ? (
            <Step1And2
              title={"What is your riding ability?"}
              key={0}
              onSelect={onSelect(0)}
              btns={btnsStep1}
              selected={steps[0].content}
              imgSrc={holidayFormStep1}
            />
          ) : current === 1 ? (
            <Step1And2
              title={"Where do you want to go?"}
              key={1}
              onSelect={onSelect(1)}
              btns={btnsStep2}
              selected={steps[1].content}
              imgSrc={holidayFormStep2}
            />
          ) : current === 2 ? (
            <Step3 onSelect={onSelect(2)} selected={steps[2].content} />
          ) : current === 3 ? (
            <Step4
              onSelect={onSelect(3)}
              selected={steps[3].content}
              btns={btnsStep3}
            />
          ) : (
            <ContactUsForm />
          )}
        </div>
        <Flex justify='space-between'>
          <Button
            className='text-lg border-[#A37B7B] !text-[#A37B7B] !px-5 !py-4'
            shape='round'
            disabled={!current}
            onClick={() => setCurrent(prev => prev - 1)}
          >
            <ArrowLeftOutlined />
            Back
          </Button>
          <Button
            className='text-lg border-[#A37B7B] !text-[#A37B7B] !px-5 !py-4'
            shape='round'
            onClick={() => setCurrent(prev => prev + 1)}
          >
            Next
            <ArrowRightOutlined />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RidingForm;
