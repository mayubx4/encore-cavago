import { Divider, Flex, Space } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import Availability from "./availability";

const BookingAvailability = () => {
  return (
    <Flex vertical>
      <Title level={3} style={{ color: "#233240" }}>
        Availability
      </Title>
      <Space size={40}>
        <Availability day={"Every Saturday of"} date={"Feb 2024"} />
        <Availability day={"Every Saturday of"} date={"Feb 2024"} />
      </Space>
      <Divider />
    </Flex>
  );
};

export default BookingAvailability;
