import React from "react";
import ActivityGrid from "@/components/swiper/activityGrid";
import GridFilters from "@/components/swiper/gridFilters";

const page = () => {
  return (
    <>
      <GridFilters />
      <ActivityGrid />
    </>
  );
};

export default page;
