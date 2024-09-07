import { Card, Divider, Flex } from "antd";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import Image from "next/image";
import React from "react";
import TextAndAmount from "./textAndAmount";
import g1 from "@public/assets/images/g1.png";
import ratingStar from "@public/assets/images/ratingStar.png";

const PriceBox = () => {
  return (
    <Card
      style={{
        boxShadow: "0px 2px 7px 0px #00000026",
        marginTop: "140px",
        border: "1px solid #D5D9DC",
        borderRadius: "12px",
        flexGrow: 1,
      }}
      className='h-fit'
    >
      <div className='flex flex-col lg:flex-row gap-10'>
        <Flex className='flex-grow lg:w-[250px] lg:h-[150px]'>
          <Image
            alt='image'
            src={g1}
            style={{
              borderRadius: "18px",
              overflow: "hidden",
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
        </Flex>
        <Flex vertical>
          <Title
            level={4}
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#233240",
              margin: 0,
            }}
          >
            Oman Sea Side & Desert Ride 2024
          </Title>
          <Text
            style={{
              fontSize: "18px",
              color: "#566573",
              margin: 0,
            }}
          >
            Princess Taghreed street, Jordan
          </Text>
          <Text
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#233240",
              margin: 0,
            }}
          >
            <Image alt='rating' src={ratingStar} /> 4.9
          </Text>
        </Flex>
      </div>

      <Title
        level={5}
        style={{
          fontSize: "24px",
          fontWeight: "600",
          color: "#2C3F50",
        }}
      >
        Price breakdown
      </Title>
      <Flex vertical gap={12}>
        <TextAndAmount text={"Subtotal"} amont={"1,722"} />
        <TextAndAmount text={"Subtotal"} amont={"1,722"} />
        <TextAndAmount text={"Subtotal"} amont={"1,722"} />
        <TextAndAmount
          text={"PROMO"}
          amont={"1,722"}
          style={{ color: "#4A8FF7" }}
        />
      </Flex>

      <Divider />
      <TextAndAmount
        text={"Grand Total"}
        amont={"1,722"}
        style={{ fontSize: "24px", fontWeight: "bold" }}
      />
      <Flex
        vertical
        style={{
          backgroundColor: "#F9F6F1",
          padding: "32px",
          borderRadius: "12px",
          marginBottom: "40px",
          marginTop: "32px",
        }}
      >
        <Title
          level={5}
          style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#2C3F50",
            margin: 0,
          }}
        >
          Payment plan
        </Title>
        <Flex vertical gap={12}>
          <TextAndAmount text={"At reservation today (20%)"} amont={"1,722"} />
          <TextAndAmount
            text={"At Cavago's confirmation (50%)"}
            amont={"1,722"}
          />
          <TextAndAmount text={"Before travel (30%)"} amont={"1,722"} />
        </Flex>
        <Divider />
        <TextAndAmount
          text={"You pay today to book"}
          amont={"1,722"}
          style={{ fontSize: "24px", fontWeight: "bold" }}
        />
      </Flex>
    </Card>
  );
};

export default PriceBox;
