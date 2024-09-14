"use client";
import React from "react";
import GridSlide from "./gridSlide";
import { Button, Col, Flex, Row } from "antd";
import CustomPagination from "../shared/customPagination";
import { ArrowRightOutlined } from "@ant-design/icons";

export default function ActivityGrid({
  disablepagination,
  slides = [
    <GridSlide key={1} disableBodyPadding />,
    <GridSlide key={2} disableBodyPadding />,
    <GridSlide key={3} disableBodyPadding />,
    <GridSlide key={4} disableBodyPadding />,
    <GridSlide key={5} disableBodyPadding />,
    <GridSlide key={6} disableBodyPadding />,
    <GridSlide key={7} disableBodyPadding />,
    <GridSlide key={8} disableBodyPadding />,
    <GridSlide key={9} disableBodyPadding />,
    <GridSlide key={10} disableBodyPadding />,
    <GridSlide key={11} disableBodyPadding />,
    <GridSlide key={2} disableBodyPadding />,
    <GridSlide key={3} disableBodyPadding />,
    <GridSlide key={14} disableBodyPadding />,
    <GridSlide key={15} disableBodyPadding />,
    <GridSlide key={16} disableBodyPadding />,
    <GridSlide key={17} disableBodyPadding />,
  ],
}) {
  return (
    <>
      <Row className='max-w-[1472px] !m-auto px-2' gutter={[24, 32]}>
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
            {!disablepagination ? (
              <CustomPagination />
            ) : (
              <Button
                shape='round'
                className='border-[#533736] text-[#533736] mt-5'
              >
                See all <ArrowRightOutlined />
              </Button>
            )}
          </Flex>
        </Col>
      </Row>
    </>
  );
}
