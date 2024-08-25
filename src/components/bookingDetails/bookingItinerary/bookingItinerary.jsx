import { Flex } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import Accordian from "./accordian";

const BookingItinerary = () => {
  return (
    <Flex vertical>
      <Title
        level={2}
        style={{ fontSize: "28px", fontWeight: "600", color: "#233240" }}
      >
        Itinerary
      </Title>
      <Accordian />
    </Flex>
  );
};

export default BookingItinerary;
