"use client";
import React from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
const items = [
  {
    key: "1",
    label: <p>1</p>,
  },
  {
    key: "2",
    label: <p>1</p>,
    icon: <SmileOutlined />,
    disabled: true,
  },
  {
    key: "3",
    label: <p>1</p>,
    disabled: true,
  },
  {
    key: "4",
    danger: true,
    label: "a danger item",
  },
];
const DropdownFilter = () => (
  <Dropdown
    menu={{
      items,
    }}
  >
    <Button
      shape='round'
      onClick={e => e.preventDefault()}
      style={{
        // fontSize: "18px",
        fontWeight: "normal",
        // padding:'21px 24px'
      }}
    >
      <Space>
        Sort By
        <DownOutlined />
      </Space>
    </Button>
  </Dropdown>
);
export default DropdownFilter;
