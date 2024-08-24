import { Col, Flex, Row, Space } from "antd";
import Image from "next/image";
import React from "react";
import g1 from "../../../public/assets/images/g1.png";
import g2 from "../../../public/assets/images/g2.png";
import g3 from "../../../public/assets/images/g3.png";
import g4 from "../../../public/assets/images/g4.png";
import g5 from "../../../public/assets/images/g5.png";

const BookingGallery = () => {
  return (
    <Flex
      justify='space-between'
      style={{ borderRadius: "18px", overflow: "hidden", width: "100%" }}
    >
      <Image alt='image' src={g1} />
      <Flex vertical justify='space-between'>
        <Image alt='image' src={g2} />
        <Image alt='image' src={g3} />
      </Flex>
      <Flex vertical justify='space-between'>
        <Image alt='image' src={g4} />
        <Image alt='image' src={g5} />
      </Flex>
    </Flex>
  );
};

export default BookingGallery;
