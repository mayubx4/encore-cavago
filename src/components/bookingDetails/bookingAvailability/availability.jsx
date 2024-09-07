import { Flex } from "antd";
import Image from "next/image";
import React from "react";
import calander from "@public/assets/images/calander.png";

const Availability = ({ day, date }) => {
  return (
    <Flex
      style={{
        backgroundColor: "#F7F3F2",
        borderRadius: "8px",
      }}
      className=' p-6'
    >
      <Flex align='center' gap={20} className='xxldesktop:mr-16 mr-0'>
        <Image alt='calander' src={calander} />
        <Flex vertical gap={8}>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#A37B7B",
              margin: 0,
            }}
          >
            {day}
          </p>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "500",
              color: "#2C3F4F",
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
