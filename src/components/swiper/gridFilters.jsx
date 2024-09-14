import { Button, Flex, Space } from "antd";
import React from "react";
import DropdownFilter from "./dropdownFilter";

const GridFilters = () => {
  return (
    <Flex
      style={{ marginBlock: "64px" }}
      className='xxldesktop:px-[97px] xl:px-20 px-3 lg:justify-between flex-col lg:flex-row'
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
            border: "1px solid #A37B7B",
            color: "#A37B7B",
            backgroundColor:'#C3AFAF33'
          }}
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
