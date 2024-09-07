import { Button, Flex, Space } from "antd";
import React from "react";
import DropdownFilter from "./dropdownFilter";

const GridFilters = () => {
  return (
    <Flex
      justify='space-between'
      style={{ marginBlock: "64px" }}
      className='xxldesktop:px-[97px] xl:px-20 sm:px-10'
      gap={12}
    >
      <div className='flex gap-4 flex-col md:flex-row'>
        <Button
          shape='round'
          style={{
            // fontSize: "18px",
            fontWeight: "normal",
            // padding: "21px 24px",
          }}
        >
          All Packages
        </Button>
        <Button
          shape='round'
          style={{
            // fontSize: "18px",
            fontWeight: "normal",
            // padding: "21px 24px",
          }}
          danger
        >
          Trending Packages
        </Button>
        <Button
          shape='round'
          style={{
            // fontSize: "18px",
            fontWeight: "normal",
            // padding: "21px 24px",
          }}
        >
          Wishlist Packages
        </Button>
      </div>
      <DropdownFilter />
    </Flex>
  );
};

export default GridFilters;
