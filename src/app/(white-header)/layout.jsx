import Header from "@/components/header/header";
import { Flex } from "antd";
import React from "react";

const layout = ({ children }) => {
  return (
    <Flex vertical>
      <Header />
      {children}
    </Flex>
  );
};

export default layout;
