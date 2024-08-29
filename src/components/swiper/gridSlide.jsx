import { Button, Card, Flex, Space } from "antd";
import Image from "next/image";
import React from "react";
import g2 from "@public/assets/images/g2.png";
import StarIcon from "@public/assets/images/star.svg";
import CrownIcon from "@public/assets/images/crown.svg";
import HeartIcon from "@public/assets/images/heart.svg";

const GridSlide = ({ disableBodyPadding = false, transparent = true }) => {
  return (
    <Card
      className={`${disableBodyPadding && "disableBodyPadding"} ${
        transparent && "!bg-transparent"
      }`}
      hoverable
      style={{
        maxWidth: "350px",
        padding: "0 0 24px",
        flexGrow: 1,
      }}
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
                padding: "6px 12px !important",
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
                  padding: "6px 12px !important",
                }}
                icon={
                  <Image src={CrownIcon} alt='share' width={20} height={20} />
                }
                shape='circle'
              ></Button>
              <Button
                style={{
                  fontSize: "14px",
                  padding: "6px 12px !important",
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
            src={g2}
            width={350}
            height={250}
            style={{
              borderRadius: "8px",
              objectFit: "cover",
              width: "100%",
              // maxWidth: "350px",
            }}
          />
        </Flex>
      }
    >
      <Flex vertical justify='space-between' className={""}>
        <p style={{ color: "#566573", fontSize: "14px", margin: 0 }}>
          Equestrian Festivals
        </p>
        <p
          style={{
            color: "#2C3F50",
            fontSize: "18px",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          Doñana Experience Route
        </p>
        <p style={{ color: "#566573", fontSize: "14px", margin: 0 }}>
          Turismo Ecuestre Doñana, Spain
        </p>
        <p
          style={{
            color: "#2C3F50",
            fontSize: "16px",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          Starting from £180.00
        </p>
      </Flex>
    </Card>
  );
};

export default GridSlide;
