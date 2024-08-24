import { Button, Card, Flex, Space } from "antd";
import Image from "next/image";
import React from "react";
import img from "../../../public/assets/images/g1.png";
import StarIcon from "../../../public/assets/images/star.svg";
import CrownIcon from "../../../public/assets/images/crown.svg";
import HeartIcon from "../../../public/assets/images/heart.svg";

const GridSlide = () => {
  return (
    <Card
      hoverable
      style={{ width: "350px", height: "361px", padding: 0 }}
      cover={
        <Flex
          style={{
            position: "relative",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <Flex
            style={{
              position: "absolute",
              top: 10,
              //   left: 10,
              fontSize: "14px",
              width: "90%",
              paddingInline: "20px",
            }}
            justify='space-between'
          >
            <Button
              style={{
                fontSize: "14px",
              }}
              icon={<Image src={StarIcon} alt='share' width={20} height={20} />}
              shape='round'
            >
              Guest Favourite
            </Button>
            <Space>
              <Button
                style={{
                  fontSize: "14px",
                }}
                icon={
                  <Image src={CrownIcon} alt='share' width={20} height={20} />
                }
                shape='circle'
              ></Button>
              <Button
                style={{
                  fontSize: "14px",
                  padding: "10px",
                }}
                icon={
                  <Image src={HeartIcon} alt='share' width={20} height={20} />
                }
                shape='circle'
              ></Button>
            </Space>
          </Flex>
          <Image
            alt='card'
            src={img}
            width={350}
            height={250}
            style={{ borderRadius: "8px" }}
          />
        </Flex>
      }
    >
      <Flex vertical justify='space-between'>
        <p style={{ color: "#566573", fontSize: "14px" }}>
          Equestrian Festivals
        </p>
        <p style={{ color: "#2C3F50", fontSize: "18px", fontWeight: "bold" }}>
          Doñana Experience Route
        </p>
        <p style={{ color: "#566573", fontSize: "14px" }}>
          Turismo Ecuestre Doñana, Spain
        </p>
        <p style={{ color: "#2C3F50", fontSize: "16px", fontWeight: "bold" }}>
          Starting from £180.00
        </p>
      </Flex>
    </Card>
  );
};

export default GridSlide;
