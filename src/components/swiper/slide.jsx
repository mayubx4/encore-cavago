import React from "react";
import { Flex, Typography } from "antd";
import MountainIcon from "../../../public/assets/images/mountain.svg";
import Image from "next/image";

const Slide = ({ title = "View All" }) => (
  <Flex
    vertical
    style={{
      width: "163px",
      height: "163px",
      backgroundColor: "#ED665F",
      borderRadius: "8px",
    }}
    align='center'
    justify='center'
  >
    <Image alt='mountain' src={MountainIcon} width='38px' height='38px' />
    <p style={{ fontSize: "18px", color: "#2C3F50" }}>{title}</p>
  </Flex>
);
export default Slide;
