import { Divider, Flex } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import map from "@public/assets/images/map.png";
import Image from "next/image";
import ExpandableParagraph from "@/components/shared/expandableParagraph";

const BookingLocation = () => {
  return (
    <Flex vertical style={{ marginTop: "100px" }}>
      <Title
        level={2}
        style={{ fontSize: "28px", fontWeight: "600", color: "#233240" }}
      >
        Location
      </Title>
      <Image
        alt='map'
        src={map}
        style={{ width: "100%", objectFit: "cover" }}
      />
      <Title level={2} style={{ color: "#233240", marginTop: "40px" }}>
        Oman Ride - Luxury Tours
      </Title>
      <ExpandableParagraph text="Luxury Travel & Tours stands as a premier travel agency dedicated to providing top-tier travel services. Our commitment to excellence is reflected in the luxurious experiences we curate for our clients. Whether it's a honeymoon getaway, a corporate event, or a bespoke adventure, our expertise and attention to detail ensure a seamless and memorable journey." />
      <Divider />
    </Flex>
  );
};

export default BookingLocation;
