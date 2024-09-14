import { Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import Image from "next/image";
import React from "react";
import image0 from "@public/assets/images/image-0.png";
import image1 from "@public/assets/images/image-1.png";
import image2 from "@public/assets/images/image-2.png";
import image3 from "@public/assets/images/image-3.png";
import image4 from "@public/assets/images/image-4.png";
import image5 from "@public/assets/images/image-5.png";
import image6 from "@public/assets/images/image-6.png";
import image7 from "@public/assets/images/image-7.png";
import image8 from "@public/assets/images/image-8.png";

const Gallery = () => {
  return (
    <div className='bg-white px-3 xxldesktop:px-[100px] pt-10 lg:pt-[126px]'>
      <Title className='!text-2xl lg:!text-[40px] font-semibold text-[#2C3F4F] text-center mt-0'>
        Gallery
      </Title>
      <p className='text-sm lg:text-[22px] font-semibold text-[#2C3F4F] text-center mt-2 lg:mt-6 mb-10'>
        Featured photos from recent tours
      </p>
      <Row
        gutter={[
          { xl: 44, lg: 24, md: 24, sm: 24, xs: 24 },
          { xl: 44, lg: 24, md: 24, sm: 24, xs: 24 },
        ]}
      >
        <Col lg={24 / 3} xs={24}>
          <Image
            alt='gallery image'
            src={image0}
            className='h-[620px] w-full xxldesktop:mb-[35px] mb-4 object-cover rounded-lg'
          />
          <Image
            alt='gallery image'
            src={image1}
            className='h-[296px] w-full xxldesktop:mb-[35px] mb-4 object-cover rounded-lg'
          />
          <Image
            alt='gallery image'
            src={image2}
            className='h-[296px] w-full xxldesktop:mb-[35px] mb-4 object-cover rounded-lg'
          />
        </Col>
        <Col lg={24 / 3} xs={24}>
          <Image
            alt='gallery image'
            src={image3}
            className='h-[296px] w-full xxldesktop:mb-[35px] mb-4 object-cover rounded-lg'
          />
          <Image
            alt='gallery image'
            src={image4}
            className='h-[620px] w-full xxldesktop:mb-[35px] mb-4 object-cover rounded-lg'
          />
          <Image
            alt='gallery image'
            src={image5}
            className='h-[296px] w-full xxldesktop:mb-[35px] mb-4 object-cover rounded-lg'
          />
        </Col>
        <Col lg={24 / 3} xs={24}>
          <Image
            alt='gallery image'
            src={image6}
            className='h-[296px] w-full xxldesktop:mb-[35px] mb-4 object-cover rounded-lg'
          />
          <Image
            alt='gallery image'
            src={image7}
            className='h-[296px] w-full xxldesktop:mb-[35px] mb-4 object-cover rounded-lg'
          />
          <Image
            alt='gallery image'
            src={image8}
            className='h-[620px] w-full xxldesktop:mb-[35px] mb-4 object-cover rounded-lg'
          />
        </Col>
      </Row>
    </div>
  );
};

export default Gallery;
