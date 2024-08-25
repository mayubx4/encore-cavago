import { Flex } from "antd";
import Image from "next/image";
import React from "react";

const Activities = ({ icon, type, description }) => {
  return (
    <Flex gap={18}>
      <Image alt='icon' src={icon} />
      <Flex vertical gap={8}>
        <p style={{ fontSize: "18px", color: "#566573", margin: 0 }}>{type}</p>
        <p
          style={{
            fontSize: "24px",
            fontWeight: "500",
            color: "#233240",
            margin: 0,
          }}
        >
          {description}
        </p>
      </Flex>
    </Flex>
  );
};

export default Activities;
