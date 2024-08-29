import AboutHoliday from "@/components/holidays/aboutHoliday";
import AllPkg from "@/components/holidays/allPkg";
import Gallery from "@/components/holidays/gallery/gallery";
import HolidayPlan from "@/components/holidays/holidayPlan";
import MakeYourTripSpecial from "@/components/holidays/makeYourTripSpecial";
import RatingAndReviews from "@/components/holidays/ratingAndReviews/ratingAndReviews";
import TrendingPkg from "@/components/holidays/trendingPkg";
import React from "react";

const page = () => {
  return (
    <>
      <TrendingPkg />
      <AllPkg />
      <HolidayPlan />
      <MakeYourTripSpecial />
      <AboutHoliday />
      <RatingAndReviews />
      <Gallery />
    </>
  );
};

export default page;
