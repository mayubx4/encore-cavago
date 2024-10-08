import UnorderList from "@/components/shared/unorderList";
import { Flex } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";

const PaymentSpecifications = ({ title, list }) => {
  return (
    <Flex
      vertical
      style={{
        backgroundColor: "#E8DEDC",
        borderRadius: "24px",
        padding: "24px",
        flexGrow: 1,
      }}
    >
      <Title level={3} style={{ color: "#533736" }}>
        {title}
      </Title>
      <UnorderList list={list} />
    </Flex>
  );
};

export default PaymentSpecifications;
