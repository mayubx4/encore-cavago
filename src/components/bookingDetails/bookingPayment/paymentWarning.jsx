import { Flex } from "antd";
import React from "react";
import questionMark from "@public/assets/images/questionMark.svg";
import Image from "next/image";

const PaymentWarning = () => {
  return (
    <Flex
      style={{
        backgroundColor: "#F7E4DC",
        borderRadius: "8px",
        padding: "24px 68px",
        marginBlock: "40px",
      }}
      align='center'
      gap={40}
    >
      <Image alt='questionMark' src={questionMark} />
      <p style={{ fontSize: "18px", color: "#561931" }}>
        This is the standard pricing per person without any add-ons or
        selections. To view your final price and the payment plan, please make
        your selections for customers and add-ons.
      </p>
    </Flex>
  );
};

export default PaymentWarning;
