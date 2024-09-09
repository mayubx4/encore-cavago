import { Button, Card, Flex, Space } from "antd";
import Image from "next/image";
import React from "react";
import g2 from "@public/assets/images/g2.png";
import FavouriteBar from "../shared/favouriteBar";

const GridSlide = ({ disableBodyPadding = false, transparent = true }) => {
  return (
    <Card
      className={`${disableBodyPadding && "disableBodyPadding"} ${
        transparent && "!bg-transparent"
      }`}
      hoverable
      style={{
        maxWidth: "350px",
        padding: "0",
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
          <div className='absolute w-full flex justify-between p-4 box-border'>
            <FavouriteBar />
          </div>
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
      <Flex vertical justify='space-between' gap={8}>
        <p style={{ color: "#566573", fontSize: "14px", margin: 0 }}>
          Equestrian Festivals
        </p>

        <div>
          <p
            style={{
              color: "#2C3F50",
              fontSize: "18px",
              fontWeight: "bold",
              margin: 0,
              lineHeight: "22px",
            }}
          >
            Doñana Experience Route
          </p>
          <p
            style={{
              color: "#566573",
              fontSize: "14px",
              margin: "6px 0",
              lineHeight: 1,
            }}
          >
            Turismo Ecuestre Doñana, Spain
          </p>
          <p
            style={{
              color: "#2C3F50",
              fontSize: "14px",
              fontWeight: 500,
              margin: 0,
            }}
          >
            Starting from £180.00
          </p>
        </div>
      </Flex>
    </Card>
  );
};

export default GridSlide;
