import Header from "@/components/header/header";
import { Flex } from "antd";
import React from "react";

const layout = ({ children }) => {
  return (
    <Flex vertical>
      <Header />
      <Flex
        vertical
        style={{ marginTop: "55px" }}
        className='xxldesktop:px-60 md:px-10 '
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default layout;
