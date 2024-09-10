"use client";
import { Button, Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import React, { useRef, useState } from "react";
import { PauseCircleOutlined, PlayCircleOutlined } from "@ant-design/icons";

const AboutHoliday = () => {
  const [play, setPlay] = useState(true);
  const videoRef = useRef(null); // Create a ref for the video element

  const handlePlayPause = () => {
    if (play) {
      videoRef.current.pause(); // Pause the video
    } else {
      videoRef.current.play(); // Play the video
    }
    setPlay(!play); // Toggle the play state
  };

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
      <div className='relative mt-10'>
        <video
          ref={videoRef} // Attach the ref to the video element
          style={{ width: "100%", borderRadius: "24px" }}
          className="aspect-video"
          autoPlay={play}
          muted={play}
          loop={true}
        >
          <source src='/assets/videos/about.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>
        <Button
          ghost
          className='absolute bottom-4 right-8'
          style={{ fontSize: "48px", color: "white", padding: 0 }}
          type='text'
          shape='circle'
          icon={play ? <PauseCircleOutlined /> : <PlayCircleOutlined />} // Change icon based on play state
          onClick={handlePlayPause} // Call the play/pause handler
        />
      </div>
    </div>
  );
};

export default AboutHoliday;
