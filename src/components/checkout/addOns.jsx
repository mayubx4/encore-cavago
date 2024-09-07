"use client";
import { Button, Flex } from "antd";
import React, { useState } from "react";
import Text from "antd/es/typography/Text";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const AddOns = ({
  title = "Single Supplement",
  text = "£374/person",
  textOverButton = false,
}) => {
  return (
    <div className='flex justify-between items-center  gap-3'>
      <Text style={{ color: "#2C3F50", fontSize: "18px", fontWeight: "500" }}>
        {title}
      </Text>
      {!textOverButton ? (
        <>
          <TextAndButton text={text} />
        </>
      ) : (
        <Flex vertical>
          <TextAndButton text={text} />
        </Flex>
      )}
    </div>
  );
};
const TextAndButton = ({ text }) => (
  <>
    <Text style={{ color: "#2C3F50", fontSize: "18px", fontWeight: "600" }}>
      {text}
    </Text>
    <Flex
      style={{
        width: "102px",
        borderRadius: "999px",
        border: "1px solid #808C96",
        padding: "0px 10px",
      }}
      justify='space-between'
      align='center'
    >
      <Button icon={<MinusOutlined />} type='text' shape='circle' />
      <Text
        style={{
          fontSize: "14px",
          fontWeight: "600",
          color: "#2C3F50",
        }}
      >
        1
      </Text>
      <Button icon={<PlusOutlined />} shape='circle' type='text' />
    </Flex>
  </>
);

export default AddOns;
