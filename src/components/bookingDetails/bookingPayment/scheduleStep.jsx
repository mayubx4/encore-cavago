import { Flex } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";

const ScheduleStep = ({ title, amount, description }) => {
  return (
    <Flex vertical align='center'>
      <p
        style={{
          fontSize: "18px",
          fontWeight: "600",
          color: "#561931",
          margin: 0,
        }}
      >
        {title}
      </p>
      <Title level={3} style={{ color: "#233240" }}>
        {amount}
      </Title>
      <p style={{ fontSize: "22px", color: "#2C3F50", margin: 0 }}>
        {description}
      </p>
    </Flex>
  );
};

export default ScheduleStep;
