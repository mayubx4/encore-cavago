import { Button, Col, Flex, Row } from "antd";
import Image from "next/image";
import React from "react";
import trendingPkgBg from "@public/assets/images/trendingPkgBg.png";
import trendingPkgBgSm from "@public/assets/images/trendingPkgBgSm.png";
import trendingCard1 from "@public/assets/images/trendingCard1.png";
import trendingCard2 from "@public/assets/images/trendingCard2.png";
import trendingCard3 from "@public/assets/images/trendingCard3.png";
import trendingStar from "@public/assets/images/trendingStar.svg";
import holidayPlanBg from "@public/assets/images/holidayPlanBg.png";
import Title from "antd/es/typography/Title";
import { ArrowRightOutlined } from "@ant-design/icons";

const TrendingPkg = () => {
  return (
    <Flex vertical className='mt-12 lg:mx-24 mx-3 relative'>
      <Image
        alt='trending Package background'
        className='w-full object-contain hidden lg:block h-full '
        style={{
          objectFit: "cover",
          maxWidth: "1728px",
          position: "absolute",
          zIndex: -1,
        }}
        src={trendingPkgBg}
      />
      <Image
        alt='trending Package background'
        className='w-full object-contain lg:hidden h-full'
        style={{
          objectFit: "cover",
          maxWidth: "1728px",
          position: "absolute",
          zIndex: 0,
        }}
        src={trendingPkgBgSm}
      />
      <div className='mt-20 mb-[60px]'>
        <Flex align='center' justify='center' gap={11}>
          <Image alt='trendingStar' src={trendingStar} />
          <Title className='!text-[32px] !font-semibold text-[#2C3F4F] !m-0'>
            Trending packages
          </Title>
          <Image alt='trendingStar' src={trendingStar} />
        </Flex>
        <Title className='!text-[21px] text-center !font-medium text-[#2C3F4F] mt-3'>
          Explore all types of our latest trending packages.
        </Title>
      </div>
      {/* <div className='flex justify-between w-full px-9'> */}
      <Row className='w-full px-9 !m-0' gutter={[24, 0]}>
        <Col span={24 / 3}>
          <Image
            alt='trendingCard1'
            src={trendingCard1}
            className='w-full h-auto'
          />
        </Col>
        <Col span={24 / 3}>
          <Image
            alt='trendingCard2'
            src={trendingCard2}
            className='w-full h-auto'
          />
        </Col>
        <Col span={24 / 3}>
          <Image
            alt='trendingCard3'
            src={trendingCard3}
            className='w-full h-auto'
          />
        </Col>
      </Row>
      <Flex justify='center'>
        <Button shape='round' className='border-[#533736] text-[#533736] my-5'>
          See all <ArrowRightOutlined />
        </Button>
      </Flex>
      {/* </div> */}
    </Flex>
  );
};

export default TrendingPkg;
