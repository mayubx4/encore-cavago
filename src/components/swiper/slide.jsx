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
      height: "163px",
      backgroundColor: bgColor,
      borderRadius: "8px",
      // paddingInline: "23px",
      minWidth: "100px",
    }}
    align='center'
    justify='center'
    gap={10}
  >
    {icon}
    <p style={{ fontSize: "18px", maxWidth: "117px", color: textColor }}>
      {title}
    </p>
  </Flex>
);
export default Slide;
