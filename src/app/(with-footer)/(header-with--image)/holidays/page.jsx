import { Col, Flex, Row } from "antd";
import Image from "next/image";
import React from "react";
import purpleBg from "@public/assets/images/purpleBg.png";
import AutoCompleteWithTabsStyled from "@/components/searchbar/searchBar";

const page = () => {
  return (
    <Row gutter={[0, 120]} style={{ margin: 0 }}>
      <Col span={24}></Col>
      <Col span={24}>
        <Flex
        className="rounded-3xl"
        //   style={{
        //     borderRadius: "24px",
        //     overflow: "hidden",
        //     position: "relative",
        //     height: "643px",
        //     maxWidth: "1529px",
        //     margin: "auto",
        //   }}
        >
          <Image
            alt='purple background'
            src={purpleBg}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              margin: "auto",
            }}
          />
        </Flex>
        <AutoCompleteWithTabsStyled />
      </Col>
    </Row>
  );
};

export default page;
