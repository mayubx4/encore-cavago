import { Button, Col, Flex, Input, Row } from "antd";
import React from "react";
import holidayFormStep1 from "@public/assets/images/holidayFormStep1.png";
import Title from "antd/es/typography/Title";
import Image from "next/image";
import TextArea from "antd/es/input/TextArea";

const ContactUsForm = ({ detailsReqired = false }) => {
  return (
    <Flex vertical className='h-full lg:justify-between'>
      <Image
        alt='holidayFormStep1'
        src={holidayFormStep1}
        className='object-contain w-[315px] h-auto block lg:hidden'
      />
      <Title className='!text-2xl lg:!text-[40px] font-semibold text-[#2C3F4F]'>
        Leave your details with us
      </Title>
      <Row className='lg:m-auto w-full'>
        <Col xxl={24 / 2} xl={16} lg={16} xs={24}>
          <Flex
            vertical
            align='center'
            justify='center'
            className='h-full gap-4 lg:gap-7'
          >
            <div className='w-full px-4 py-3 border border-solid rounded-xl border-[#D5D9DC]'>
              <p className='text-xs lg:text-xs font-semibold text-[#808C96] lg:mb-3 uppercase'>
                Name
              </p>
              <Input
                variant='borderless'
                className='text-sm lg:text-lg font-medium text-[#2C3F50] p-0'
              />
            </div>
            <div className='w-full px-4 py-3 border border-solid rounded-xl border-[#D5D9DC]'>
              <p className='text-xs lg:text-xs font-semibold text-[#808C96] lg:mb-3 uppercase'>
                Email
              </p>
              <Input
                variant='borderless'
                className='text-sm lg:text-lg font-medium text-[#2C3F50] p-0'
              />
            </div>
            <div className='w-full px-4 py-3 border border-solid rounded-xl border-[#D5D9DC]'>
              <p className='text-xs lg:text-xs font-semibold text-[#808C96] lg:mb-3 uppercase'>
                Conatct #
              </p>
              <Input
                variant='borderless'
                className='text-sm lg:text-lg font-medium text-[#2C3F50] p-0'
              />
            </div>
            {detailsReqired && (
              <>
                <div className='w-full px-4 py-3 border border-solid rounded-xl border-[#D5D9DC]'>
                  <p className='text-xs lg:text-xs font-semibold text-[#808C96] lg:mb-3 uppercase'>
                    Details
                  </p>
                  <TextArea
                    variant='borderless'
                    className='text-sm lg:text-lg font-medium text-[#2C3F50] p-0'
                    placeholder='Share your requirements and our team will get back to you.'
                    style={{ height: 60, resize: "none" }}
                  />
                </div>
                <Button
                  type='text'
                  shape='round'
                  block
                  className='bg-[#A37B7B] text-white'
                >
                  Contact us
                </Button>
              </>
            )}
          </Flex>
        </Col>
        <Col xxl={24 / 2} xl={8} lg={8} className='hidden lg:block'>
          <Flex align='center' justify='center' className='h-full'>
            <Image
              alt='holidayFormStep1'
              src={holidayFormStep1}
              className='object-contain w-full'
            />
          </Flex>
        </Col>
      </Row>
    </Flex>
  );
};

export default ContactUsForm;
