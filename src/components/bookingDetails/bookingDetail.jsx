import { Divider, Flex } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import ExpandableParagraph from "../shared/expandableParagraph";

const BookingDetail = () => {
  return (
    <Flex vertical>
      <Title level={3} style={{ color: "#233240" }}>
        Welcome to an Exquisite Equestrian Expedition in the Sultanate of Oman!
      </Title>
      <ExpandableParagraph />
      <Divider />
    </Flex>
  );
};

export default BookingDetail;
