import { Divider, Flex } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import PaymentSchedule from "./paymentSchedule";
import PaymentWarning from "./paymentWarning";
import PaymentSpecifications from "./paymentSpecifications";

const BookingPayment = () => {
  return (
    <Flex vertical>
      <Title
        level={2}
        style={{ fontSize: "28px", fontWeight: "600", color: "#233240" }}
      >
        Standard pricing and payment plan
      </Title>
      <Flex
        vertical
        style={{
          backgroundColor: "#F7F3F2",
          borderRadius: "20px",
          padding: "60px 40px",
        }}
      >
        <PaymentSchedule />
        <PaymentWarning />
        <Flex justify='stretch' gap={40}>
          <PaymentSpecifications
            title={"Included"}
            list={[
              "5 riding days.",
              "4 Camping Nights.",
              "3 Hotel nights in Muscat & Ibra.",
              "BLD (Breakfast, Lunch & Dinner) Day 2 to 6.",
              "Local driver.",
              "English-speaking horse guide.",
            ]}
          />
          <PaymentSpecifications
            title={"Not Included"}
            list={[
              "5 riding days.",
              "4 Camping Nights.",
              "3 Hotel nights in Muscat & Ibra.",
              "BLD (Breakfast, Lunch & Dinner) Day 2 to 6.",
              "Local driver.",
              "English-speaking horse guide.",
            ]}
          />
        </Flex>
      </Flex>
      <Divider style={{ marginBlock: "48px" }} />
    </Flex>
  );
};

export default BookingPayment;
