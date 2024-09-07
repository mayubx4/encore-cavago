import React from "react";
import { Flex } from "antd";
import Text from "antd/es/typography/Text";

const TextAndAmount = ({ text, amont, style }) => {
  return (
    <Flex justify='space-between'>
      <Text
        style={{
          fontSize: "18px",
          color: "#2C3F50",
          fontWeight: "500",
          ...style,
        }}
      >
        {text}
      </Text>
      <Text
        style={{
          fontSize: "18px",
          color: "#2C3F50",
          fontWeight: "500",
          ...style,
        }}
      >
        £{amont}
      </Text>
    </Flex>
  );
};

export default TextAndAmount;
