import { Flex } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import RangePicker from "./rangPicker";

const Step3 = ({ onSelect,selected }) => {
  return (
    <Flex vertical className='h-full' justify='space-between'>
      <Title className='!text-[40px] font-semibold text-[#2C3F4F]'>
        When do you want to go?
      </Title>
      <div className='mt-[58px]'>
        <RangePicker onSelect={onSelect}selected={selected} />
      </div>
    </Flex>
  );
};

export default Step3;
