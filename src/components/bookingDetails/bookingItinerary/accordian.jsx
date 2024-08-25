"use client";
import React from "react";
import { Collapse } from "antd";
import UnorderList from "./accordianList";
import Title from "antd/es/typography/Title";
import { DownOutlined } from "@ant-design/icons";
import g1 from "@public/assets/images/g1.png";

const text = [
  "Arrival at Seeb International Airport and transfer to your hotel located nearby Mutrah Souk and Old Muscat City.",
  "Visit Mutrah Souk, one of the most popular souks in the Middle East, offering a myriad of merchandise, from imported fabrics to exotic Oriental spices, perfumes, and richly handcrafted artifacts.",
  "Enjoy a comfortable night at Mutrah, setting the tone for your Arabian adventure.",
];
const items = [
  {
    key: "1",
    label: (
      <Title level={3} style={{ margin: 0, color: "#2C3F50" }}>
        Day 1: Saturday - Arrival Day
      </Title>
    ),
    children: <UnorderList list={text} images={[g1, g1, g1]} />,
  },
  {
    key: "2",
    label: (
      <Title level={3} style={{ margin: 0, color: "#2C3F50" }}>
        Day 1: Saturday - Arrival Day
      </Title>
    ),
    children: <UnorderList list={text} />,
  },
  {
    key: "3",
    label: (
      <Title level={3} style={{ margin: 0, color: "#2C3F50" }}>
        Day 1: Saturday - Arrival Day
      </Title>
    ),
    children: <UnorderList list={text} />,
  },
  {
    key: "4",
    label: (
      <Title level={3} style={{ margin: 0, color: "#2C3F50" }}>
        Day 1: Saturday - Arrival Day
      </Title>
    ),
    children: <UnorderList list={text} />,
  },
  {
    key: "5",
    label: (
      <Title level={3} style={{ margin: 0, color: "#2C3F50" }}>
        Day 1: Saturday - Arrival Day
      </Title>
    ),
    children: <unorderList list={text} />,
  },
];
const Accordian = () => (
  <Collapse
    defaultActiveKey={["1"]}
    ghost
    items={items}
    expandIconPosition='end'
    expandIcon={({ isActive }) => {
      return <DownOutlined rotate={isActive ? 180 : 0} />;
    }}
  />
);
export default Accordian;
