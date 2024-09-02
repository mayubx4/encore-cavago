import { Col, Flex, Input, Row } from "antd";
import React from "react";
import holidayFormStep1 from "@public/assets/images/holidayFormStep1.png";
import Title from "antd/es/typography/Title";
import Image from "next/image";
import TextArea from "antd/es/input/TextArea";

const ContactUsForm = ({ detailsReqired = false }) => {
  return (
    <Flex vertical className='h-full' justify='space-between'>
      <Title className='!text-[40px] font-semibold text-[#2C3F4F]'>
        Leave your details with us
      </Title>
      <Row className='mt-[60px]'>
        <Col span={24 / 2}>
          <Flex
            vertical
            align='center'
            justify='center'
            gap={32}
            className='h-full'
          >
            <div className='w-full px-4 py-3 border border-solid rounded-xl border-[#D5D9DC]'>
              <p className='text-xs font-semibold text-[#808C96] mb-3 uppercase'>
                Name
              </p>
              <Input
                variant='borderless'
                className='text-lg font-medium text-[#2C3F50] p-0'
              />
            </div>
            <div className='w-full px-4 py-3 border border-solid rounded-xl border-[#D5D9DC]'>
              <p className='text-xs font-semibold text-[#808C96] mb-3 uppercase'>
                Email
              </p>
              <Input
                variant='borderless'
                className='text-lg font-medium text-[#2C3F50] p-0'
              />
            </div>
            <div className='w-full px-4 py-3 border border-solid rounded-xl border-[#D5D9DC]'>
              <p className='text-xs font-semibold text-[#808C96] mb-3 uppercase'>
                Conatct #
              </p>
              <Input
                variant='borderless'
                className='text-lg font-medium text-[#2C3F50] p-0'
              />
            </div>
            {detailsReqired && (
              <div className='w-full px-4 py-3 border border-solid rounded-xl border-[#D5D9DC]'>
                <p className='text-xs font-semibold text-[#808C96] mb-3 uppercase'>
                  Details
                </p>
                <TextArea
                  variant='borderless'
                  className='text-lg font-medium text-[#2C3F50] p-0'
                  placeholder='Share your requirements and our team will get back to you.'
                  style={{ height: 120, resize: "none" }}
                />
              </div>
            )}
          </Flex>
        </Col>
        <Col span={24 / 2}>
          <Flex align='center' justify='center' className='h-full'>
            <Image alt='holidayFormStep1' src={holidayFormStep1} />
          </Flex>
        </Col>
      </Row>
    </Flex>
  );
};

export default ContactUsForm;
