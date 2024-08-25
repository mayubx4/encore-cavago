import UnorderList from "@/components/shared/unorderList";
import { Button, Flex } from "antd";
import Image from "next/image";
import React from "react";

const AccordianList = ({ list, images }) => {
  return (
    <>
      <UnorderList list={list} />
      <Flex gap={10}>
        {images?.map((img, i) => (
          <Image
            key={i}
            alt='image'
            src={img}
            style={{
              borderRadius: "8px",
              overflow: "hidden",
              objectFit: "cover",
            }}
            width={225}
            height={153}
          />
        ))}
      </Flex>
      <Button
        type='link'
        style={{
          fontSize: "16px",
          margin: 0,
          padding: 0,
          textDecoration: "underline",
        }}
      >
        See more
      </Button>
    </>
  );
};

export default AccordianList;
