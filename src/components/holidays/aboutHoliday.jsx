import { Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";

const AboutHoliday = () => {
  return (
    <div className='px-10 xxldesktop:px-[100px]  pt-20'>
      <Title className='text-[40p] font-semibold text-[#2C3F4F] mt-0'>
        About Holiday with Cavago
      </Title>
      <p className='text-[22px] font-semibold text-[#2C3F4F] mt-6 mb-10'>
        Know about us
      </p>
      <Row gutter={[71, 0]}>
        <Col md={24 / 2}>
          <p className='text-[21px] font-medium text-[#2C3F4F]'>
            Here you will find specially curated experiences created under
            themes of weekend getaways, valentines or riding tours with
            influencers such as Kerri Kasem, renowned photographers like Scott
            Trees and exceptional horsemen like Yassine Cavalier.
          </p>
        </Col>
        <Col md={24 / 2}>
          <p className='text-[21px] font-medium text-[#2C3F4F]'>
            For the traveler who likes to do holidays off the beaten path and
            far from the madding crowd, these specials provide the ideal
            backdrop and activities.
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default AboutHoliday;
