import UnorderList from "@/components/shared/unorderList";
import { Button, Flex } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";

const ThingsToKnow = ({ title, list }) => {
  return (
    <Flex
      vertical
      style={{
        flexGrow: 1,
      }}
    >
      <Title level={3} style={{ color: "#233240" }}>
        {title}
      </Title>
      <UnorderList list={list} textStyle={{ color: "#2C3F50" }} />
      <Flex justify='end'>
        <Button
          type='link'
          style={{
            fontSize: "16px",
            margin: 0,
            padding: 0,
            textDecoration: "underline",
            color: "#233240",
            fontWeight: "600",
          }}
        >
          See more
        </Button>
      </Flex>
    </Flex>
  );
};

export default ThingsToKnow;
