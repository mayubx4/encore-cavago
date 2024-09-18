"use client";
import { Card, Col, Flex, Row } from "antd";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import flower from "@public/assets/images/flower.png";
import Title from "antd/es/typography/Title";

const Step4 = ({ onSelect, selected, btns }) => {
  const [select, setSelect] = useState(selected);

  return (
    <Flex vertical className='h-full lg:justify-between'>
      <Title className='!text-2xl lg:!text-[40px] font-semibold text-[#2C3F4F]'>
        When do you want to go?
      </Title>
      <Flex
        align='center'
        justify='space-between'
        className='lg:my-auto lg:-mr-5'
      >
        <Row
          gutter={[12, 12]}
          className='w-full max-h-[calc(100vh-380px)] mb-5 overflow-y-auto'
        >
          {btns.map((btn, i) => (
            <Col
              key={i}
              lg={24 / 4}
              md={24 / 2}
              xs={24 / 2}
              className='flex flex-row items-center'
            >
              <Card
                key={i}
                hoverable
                onClick={() => {
                  setSelect(btn.text);
                  onSelect(btn.text);
                }}
                className={`hover:border-[#533736] ${
                  btn.text === select ? "!border-[#533736]" : ""
                }`}
              >
                <img
                  className='w-[90px] md:w-[80px] xl:w-[140px] xxldesktop:w-[180px] flex m-auto'
                  alt='step4Btn'
                  src={btn.image}
                />
                <p className='text-sm  xl:text-xl xxldesktop:text-2xl font-semibold text-[#533736] w-[90px]  xl:w-[140px] xxldesktop:w-[160px] text-center mt-8'>
                  {btn.text}
                </p>
              </Card>
              {btns.length - 1 !== i && (
                <Image
                  alt='flower'
                  src={flower}
                  className='hidden lg:block flex-1 aspect-square object-scale-down lg:w-5 w-auto xl:w-auto'
                />
              )}
            </Col>
          ))}
        </Row>
      </Flex>
    </Flex>
  );
};

export default Step4;
