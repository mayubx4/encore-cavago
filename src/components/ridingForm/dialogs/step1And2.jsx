"use client";
import { Button, Col, Flex, Row } from "antd";
import Title from "antd/es/typography/Title";
import Image from "next/image";
import holidayFormStep1 from "@public/assets/images/holidayFormStep1.png";
import React, { useState } from "react";

const Step1And2 = ({ onSelect, btns, selected,imgSrc,title }) => {

  const [select, setSelect] = useState(selected);
  return (
    <Flex vertical className='h-full' justify='space-between'>
      <Title className='!text-[40px] font-semibold text-[#2C3F4F]'>
        {title}
      </Title>
      <Row className='mt-[58px]'>
        <Col span={24 / 2}>
          <Flex align='center' justify='center' className='h-full'>
            <Flex wrap gap={16}>
              {btns.map(btn => (
                <Button
                  key={btn}
                  className={`text-lg !font-medium !text-[#2C3F50] border-[#2C3F50] !px-6 !py-5 hover:!bg-slate-500 ${
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
        <Col span={24 / 2}>
          <Flex align='center' justify='center' className='h-full'>
            <Image alt='holidayFormStep1' src={imgSrc} />
          </Flex>
        </Col>
      </Row>
    </Flex>
  );
};

export default Step1And2;
