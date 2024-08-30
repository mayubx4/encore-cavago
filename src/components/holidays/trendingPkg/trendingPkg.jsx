import { Button, Col, Flex, Row } from "antd";
import Image from "next/image";
import React from "react";
import trendingPkgBg from "@public/assets/images/trendingPkgBg.png";
import trendingPkgBgSm from "@public/assets/images/trendingPkgBgSm.png";
import trendingStar from "@public/assets/images/trendingStar.png";
import Title from "antd/es/typography/Title";
import { ArrowRightOutlined } from "@ant-design/icons";
import TrendingCard from "./trendingCard";

const TrendingPkg = () => {
  return (
    <Flex vertical className='mt-12 xxldesktop:mx-24 mx-10 relative'>
      <Image
        alt='trending Package background'
        className='w-full object-contain hidden lg:block h-full '
        style={{
          objectFit: "cover",
          maxWidth: "1728px",
          position: "absolute",
          zIndex: 0,
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
      <div className='mt-20 mb-[60px] relative z-[1]'>
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
          <TrendingCard
            bgImage='/assets/images/trendingCard1.png'
            imageSrc='/assets/images/trending.png'
            category='Equestrian Festivals'
            title='Doñana Experience Route'
            rating='4.5'
            location='Turismo Ecuestre Doñana, Spain'
            price='£180.00'
          />
        </Col>
        <Col span={24 / 3}>
          <TrendingCard
            bgImage='/assets/images/trendingCard2.png'
            imageSrc='/assets/images/trending.png'
            category='Equestrian Festivals'
            title='Doñana Experience Route'
            rating='4.5'
            location='Turismo Ecuestre Doñana, Spain'
            price='£180.00'
          />
        </Col>
        <Col span={24 / 3}>
          <TrendingCard
            bgImage='/assets/images/trendingCard3.png'
            imageSrc='/assets/images/trending.png'
            category='Equestrian Festivals'
            title='Doñana Experience Route'
            rating='4.5'
            location='Turismo Ecuestre Doñana, Spain'
            price='£180.00'
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
