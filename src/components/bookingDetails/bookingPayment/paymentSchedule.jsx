import { Divider, Flex } from "antd";
import Image from "next/image";
import React from "react";
import flower from "@public/assets/images/flower.png";
import ScheduleStep from "./scheduleStep";

const PaymentSchedule = () => {
  return (
    <Flex vertical>
      <Flex align='center' className='xxldesktop:px-40 lg:pl-32 lg:pr-20 pl-20 pr-14'>
        <Image alt='flower' src={flower} />
        <Divider
          style={{
            borderColor: "#F2E9DB",
            minWidth: 0,
            width: "auto",
            flexGrow: 1,
          }}
        >
          <Image alt='flower' src={flower} />
        </Divider>
        <Image alt='flower' src={flower} />
      </Flex>
      <Flex justify='space-between' className='px-2'>
        <ScheduleStep
          title={"First Payment"}
          amount={"20% (£429.6)"}
          description={"At reservation today"}
        />
        <ScheduleStep
          title={"Second Payment"}
          amount={"50% (£861)"}
          description={"At Cavago's confirmation"}
        />
        <ScheduleStep
          title={"Third Payment"}
          amount={"30% (£516.6)"}
          description={"Before travel"}
        />
      </Flex>
    </Flex>
  );
};

export default PaymentSchedule;
