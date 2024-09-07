import { Flex } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";

const ScheduleStep = ({ title, amount, description }) => {
  return (
    <Flex vertical align='center' className='flex-grow'>
      <p
        style={{
          fontSize: "18px",
          fontWeight: "600",
          color: "#533736",
          margin: 0,
          textAlign: "center"
        }}
      >
        {title}
      </p>
      <Title level={3} style={{ color: "#233240", textAlign: "center" }}>
        {amount}
      </Title>
      <p
        style={{
          fontSize: "22px",
          color: "#2C3F50",
          margin: 0,
          textAlign: "center",
        }}
      >
        {description}
      </p>
    </Flex>
  );
};

export default ScheduleStep;
