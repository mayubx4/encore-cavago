import UnorderList from "@/components/shared/unorderList";
import { Divider, Flex } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import ThingsToKnow from "./thingsToKnow";

const BookingThingsToKnow = () => {
  return (
    <Flex vertical>
      <Title level={2} style={{ color: "#233240" }}>
        Things to know
      </Title>
      <Flex gap={70}>
        <ThingsToKnow
          title={"Cancellation Policy"}
          list={[
            "Notify at least 48 hours in advance to receive a full refund.",
            "Cancellations made within 48 hours of the scheduled activity will incur a 50% cancellation fee.",
            "No-shows will be charged the full amount.",
          ]}
        />
        <ThingsToKnow
          title={"Safety Information"}
          list={[
            "Notify at least 48 hours in advance to receive a full refund.",
            "Cancellations made within 48 hours of the scheduled activity will incur a 50% cancellation fee.",
            "No-shows will be charged the full amount.",
          ]}
        />
        <ThingsToKnow
          title={"What to bring"}
          list={[
            "Notify at least 48 hours in advance to receive a full refund.",
            "Cancellations made within 48 hours of the scheduled activity will incur a 50% cancellation fee.",
            "No-shows will be charged the full amount.",
          ]}
        />
      </Flex>
      <Divider style={{marginTop:'48px',marginBottom:'120px'}}/>
    </Flex>
  );
};

export default BookingThingsToKnow;
