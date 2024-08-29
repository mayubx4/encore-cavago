import { Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import Image from "next/image";
import React from "react";
import g2 from "@public/assets/images/g2.png";

const Gallery = () => {
  return (
    <div className='bg-white px-10 xxldesktop:px-[100px] pt-[126px]'>
      <Title className='text-[40p] font-semibold text-[#2C3F4F] text-center mt-0'>
        Gallery
      </Title>
      <p className='text-[22px] font-semibold text-[#2C3F4F] text-center mt-6 mb-10'>
        Featured photos from recent tours
      </p>
      <Row
        gutter={[
          { xl: 44, lg: 24, md: 24, sm: 24, xs: 24 },
          { xl: 44, xs: 20 },
        ]}
      >
        <Col lg={24 / 3} xs={24}>
          <Image
            alt='gallery image'
            src={g2}
            className='h-[620px] w-full xxldesktop:mb-[35px] mb-4 object-cover rounded-lg'
          />
          <Image
            alt='gallery image'
            src={g2}
            className='h-[296px] w-full xxldesktop:mb-[35px] mb-4 object-cover rounded-lg'
          />
          <Image
            alt='gallery image'
            src={g2}
            className='h-[296px] w-full xxldesktop:mb-[35px] mb-4 object-cover rounded-lg'
          />
        </Col>
        <Col lg={24 / 3} xs={24}>
          <Image
            alt='gallery image'
            src={g2}
            className='h-[296px] w-full xxldesktop:mb-[35px] mb-4 object-cover rounded-lg'
          />
          <Image
            alt='gallery image'
            src={g2}
            className='h-[620px] w-full xxldesktop:mb-[35px] mb-4 object-cover rounded-lg'
          />
          <Image
            alt='gallery image'
            src={g2}
            className='h-[296px] w-full xxldesktop:mb-[35px] mb-4 object-cover rounded-lg'
          />
        </Col>
        <Col lg={24 / 3} xs={24}>
          <Image
            alt='gallery image'
            src={g2}
            className='h-[296px] w-full xxldesktop:mb-[35px] mb-4 object-cover rounded-lg'
          />
          <Image
            alt='gallery image'
            src={g2}
            className='h-[296px] w-full xxldesktop:mb-[35px] mb-4 object-cover rounded-lg'
          />
          <Image
            alt='gallery image'
            src={g2}
            className='h-[620px] w-full xxldesktop:mb-[35px] mb-4 object-cover rounded-lg'
          />
        </Col>
      </Row>
    </div>
  );
};

export default Gallery;
