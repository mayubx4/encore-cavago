import { Divider, Flex } from "antd";
import React from "react";
import Activities from "./activities";
import Activity from "@public/assets/images/activity.png";
import ActivityType from "@public/assets/images/activityType.png";
import Category from "@public/assets/images/category.png";
import RunningAbility from "@public/assets/images/runningAbility.png";
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
