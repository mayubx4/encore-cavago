import Footer from "@/components/footer/footer";
import { Flex } from "antd";
import React from "react";

const layout = ({ children }) => {
  return (
    <>
      <Flex vertical className='max-w-[1328px] p-10 m-auto'>
      {children}
      </Flex>
      <Footer />
    </>
  );
};

export default layout;
