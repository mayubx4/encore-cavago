"use client";
import { Button, Flex } from "antd";
import React, { useState } from "react";
import Text from "antd/es/typography/Text";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const AddOns = ({ title, text }) => {
  const [addonCount, setAddonCount] = useState({ single: 1, transfer: 1 });

  const handleAddonChange = (type, value) => {
    setAddonCount(prevState => ({
      ...prevState,
      [type]: value,
    }));
  };

  return (
    <div className='flex justify-between flex-col xxldesktop::flex-row gap-3'>
      <Text style={{ color: "#2C3F50", fontSize: "18px" }}>
        Single Supplement
      </Text>
      <Text style={{ color: "#2C3F50", fontSize: "18px", fontWeight: "600" }}>
        £374/person
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
        <Button
          icon={<MinusOutlined />}
          type='text'
          shape='circle'
          onClick={() =>
            handleAddonChange("single", Math.max(addonCount.single - 1, 0))
          }
        />
        <Text
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#2C3F50",
          }}
        >
          1
        </Text>
        <Button
          icon={<PlusOutlined />}
          shape='circle'
          type='text'
          onClick={() => handleAddonChange("single", addonCount.single + 1)}
        />
      </Flex>
    </div>
  );
};

export default AddOns;
