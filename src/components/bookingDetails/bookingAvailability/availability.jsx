import { Flex } from "antd";
import Image from "next/image";
import React from "react";
import calander from "@public/assets/images/calander.svg";

const Availability = ({ day, date }) => {
  return (
    <Flex
      style={{
        backgroundColor: "#F9F6F1",
        borderRadius: "8px",
        padding: "24px",
        paddingRight: "100px",
      }}
    >
      <Flex align='center' gap={20}>
        <Image alt='calander' src={calander} />
        <Flex vertical gap={8}>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#561931",
              margin: 0,
            }}
          >
            {day}
          </p>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "500",
              color: "#233240",
              margin: 0,
            }}
          >
            {date}
          </p>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Availability;
