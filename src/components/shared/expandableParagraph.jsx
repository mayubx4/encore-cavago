"use client";
import { Button, Flex } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import React, { useState } from "react";

const ExpandableParagraph = ({
  text = " Embark on a captivating journey, combining the mesmerizing landscapes of Oman's Sea Side and the enchanting Wahiba Sand Desert. Join us for an unforgettable experience encompassing 5 days of riding, delightful evening camps, and cultural exploration. Embark on a captivating journey, combining the mesmerizing landscapes of Oman's Sea Side and the enchanting Wahiba Sand Desert. Join us for an unforgettable experience encompassing 5 days of riding, delightful evening camps, and cultural exploration.",
  rows = 3,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Flex vertical align='start'>
      <Paragraph
        style={{ margin: 0 }}
        ellipsis={
          !expanded
            ? {
                expandable: false,
                rows,
              }
            : false
        }
      >
        {text}
      </Paragraph>
      <Button
        type='link'
        style={{
          fontSize: "16px",
          margin: 0,
          padding: 0,
          textDecoration: "underline",
        }}
        onClick={() => setExpanded(prev => !prev)}
      >
        {expanded ? "See less" : "See more"}
      </Button>
    </Flex>
  );
};

export default ExpandableParagraph;
