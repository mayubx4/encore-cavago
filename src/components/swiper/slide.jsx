import React from "react";
import { Flex } from "antd";

const Slide = ({
  title = "View All",
  icon,
  bgColor = "#ffffff",
  textColor = "#2C3F50",
}) => (
  <Flex
    vertical
    style={{
      width: "100%",
      backgroundColor: bgColor,
      borderRadius: "8px",
      minWidth: "100px",
    }}
    align='center'
    justify='center'
    className='lg:gap-[10px] lg:py-6 py-3'
  >
    {icon}
    <p
      style={{ color: textColor }}
      className='text-[10px] lg:text-lg max-w-20 lg:max-w-[117px] lg:!leading-6 !leading-none lg:h-12 h-6'
    >
      {title}
    </p>
  </Flex>
);
export default Slide;
