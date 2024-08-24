import { Button, Flex, Space } from "antd";
import React from "react";
import DropdownFilter from "./dropdownFilter";

const GridFilters = () => {
  return (
    <Flex justify='space-between' style={{ marginBlock: "64px" }}>
      <Space>
        <Button
          shape='round'
          style={{
            fontSize: "18px",
            fontWeight: "normal",
            padding: "21px 24px",
          }}
        >
          All Packages
        </Button>
        <Button
          shape='round'
          style={{
            fontSize: "18px",
            fontWeight: "normal",
            padding: "21px 24px",
          }}
          danger
        >
          Trending Packages
        </Button>
        <Button
          shape='round'
          style={{
            fontSize: "18px",
            fontWeight: "normal",
            padding: "21px 24px",
          }}
        >
          Wishlist Packages
        </Button>
      </Space>
      <DropdownFilter />
    </Flex>
  );
};

export default GridFilters;
