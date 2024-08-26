"use client";
import React, { useRef } from "react";
import GridSlide from "./gridSlide";
import { Col, Flex, Pagination, Row } from "antd";
import CustomPagination from "../shared/customPagination";

export default function SwiperSliderGrid({
  slides = [
    <GridSlide key={1} />,
    <GridSlide key={2} />,
    <GridSlide key={3} />,
    <GridSlide key={4} />,
    <GridSlide key={5} />,
    <GridSlide key={6} />,
    <GridSlide key={7} />,
    <GridSlide key={8} />,
    <GridSlide key={9} />,
    <GridSlide key={10} />,
    <GridSlide key={11} />,
    <GridSlide key={2} />,
    <GridSlide key={3} />,
    <GridSlide key={14} />,
    <GridSlide key={15} />,
    <GridSlide key={16} />,
    <GridSlide key={17} />,
  ],
}) {
  const swiperRef = useRef(null);

  return (
    <>
      <Row
        className='xxldesktop:!px-24 md:px-16 sm:px-5 !m-auto bg-[#F9F6F1]'
        gutter={[24, 24]}
      >
        {slides.map((slide, i) => (
          <Col
            key={i}
            xxl={24 / 4}
            xl={24 / 4}
            lg={24 / 3}
            md={24 / 2}
            sm={24 / 2}
            xs={24}
          >
            {slide}
          </Col>
        ))}
        <Col span={24}>
          <Flex justify='center'>
            <CustomPagination />
          </Flex>
        </Col>
      </Row>
    </>
  );
}
