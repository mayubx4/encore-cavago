import { Divider, Flex } from "antd";
import React from "react";
import Activities from "./activities";
import Activity from "@public/assets/images/activity.svg";
import ActivityType from "@public/assets/images/activityType.svg";
import Category from "@public/assets/images/category.svg";
import RunningAbility from "@public/assets/images/runningAbility.svg";
const BookingActivity = () => {
  return (
    <Flex vertical gap={40} style={{ paddingBlock: "40px" }}>
      <Activities
        icon={Activity}
        type={"Activity"}
        description={"Daily Rides and Experiences"}
      />
      <Activities
        icon={ActivityType}
        type={"Activity Type"}
        description={"Package"}
      />
      <Activities
        icon={Category}
        type={"Category"}
        description={"Individual, Group"}
      />
      <Activities
        icon={RunningAbility}
        type={"Activity"}
        description={"Beginner"}
      />
      <Divider />
    </Flex>
  );
};

export default BookingActivity;
