"use client";
import { Button, Col, Flex, Row } from "antd";
import Title from "antd/es/typography/Title";
import Image from "next/image";
import React, { useState } from "react";

const Step1And2 = ({ onSelect, btns, selected, imgSrc, title }) => {
  const [select, setSelect] = useState(selected);
  return (
    <Flex vertical className='h-full lg:justify-between'>
      <Title className='!text-2xl lg:!text-[40px] font-semibold text-[#2C3F4F]'>
        {title}
      </Title>
      <Row className='lg:m-auto'>
        <Col xxl={24 / 2} xl={16} lg={16} xs={24}>
          <Flex align='center' justify='center' className='h-full'>
            <Flex wrap  className='w-full lg:gap-4 gap-2'>
              {btns.map(btn => (
                <Button
                  key={btn}
                  className={`!text-sm lg:!text-lg !font-medium !text-[#2C3F50] border-[#2C3F50]  lg:!px-6  hover:!bg-slate-500 ${
                    btn === select && "bg-slate-500 !text-white"
                  }`}
                  shape='round'
                  onClick={() => {
                    setSelect(btn);
                    onSelect(btn);
                  }}
                >
                  {btn}
                </Button>
              ))}
            </Flex>
          </Flex>
        </Col>
        <Col xxl={24 / 2} xl={8} lg={8} className='hidden lg:block'>
          <Flex align='center' justify='center' className='h-full'>
            <Image
              alt='holidayFormStep1'
              src={imgSrc}
              className='object-contain w-full'
            />
          </Flex>
        </Col>
      </Row>
    </Flex>
  );
};

export default Step1And2;
