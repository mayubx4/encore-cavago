"use client";
import { Card, Flex } from "antd";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import flower from "@public/assets/images/flower.png";
import Title from "antd/es/typography/Title";

const Step4 = ({ onSelect, selected, btns }) => {
  const [select, setSelect] = useState(selected);

  return (
    <Flex vertical className='h-full' justify='space-between'>
      <Title className='!text-[40px] font-semibold text-[#2C3F4F]'>
        When do you want to go?
      </Title>
      <div className='mt-[120px]'></div>
      <Flex align='center' justify='space-between'>
        {btns.map((btn, i) => (
          <Fragment key={i}>
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
              <Image
                alt='step4Btn'
                src={btn.image}
                width={179.36}
                height={176.37}
              />
              <p className='text-2xl font-semibold text-[#533736] max-w-[170px] text-center mt-8'>
                {btn.text}
              </p>
            </Card>
            {btns.length - 1 !== i && <Image alt='flower' src={flower} />}
          </Fragment>
        ))}
      </Flex>
    </Flex>
  );
};

export default Step4;
