"use client";
import React, { useState } from "react";
import Text from "antd/es/typography/Text";
import CustomDropDownSelector from "app/activity/components/desktop/customDropdownSelector/customDropdownSelector";
import ActivityDateChoices from "@app/activity/components/desktop/fullDayActivity/activityDateChoices";
import FullDayActivity from "@app/activity/components/desktop/fullDayActivity/fullDayActivity";
import ChoiceOfFewActivity from "@app/activity/components/desktop/choiceOfFewActivity/choiceOfFewActivity";
import { Button, Divider, Flex, Select, Space } from "antd";
import "./bookingPriceDetails.scss";
import Icon from "@shared/components/common/icons";
import Title from "antd/es/typography/Title";
import AddOns from "components/checkout/addOns";
import TextAndAmount from "components/checkout/textAndAmount";
const dates = [
  {
    startDate: "Mar, 09, 2024",
    endDate: "Mar, 16, 2024",
  },
  {
    startDate: "Mar, 16, 2024",
    endDate: "Mar, 21, 2024",
  },
  {
    startDate: "Mar, 21, 2024",
    endDate: "Mar, 26, 2024",
  },
  {
    startDate: "Mar, 26, 2024",
    endDate: "Mar, 29, 2024",
  },
];

const BookingPriceDetails = () => {
  const [dateValue, setDateValue] = useState();
  const [openDateDropdown, setOpenDateDropdown] = useState(false);

  return (
    <div className='pricingDetails shadow-[0px_2px_7px_0px_#00000026]'>
      <Text className='priceText'>
        From&nbsp;
        <b>${"125"}</b>
        &nbsp;/ per person
      </Text>
      <p
        className='priceDetails'
        // onClick={togglePriceModal}
      >
        Show price details
      </p>
      <div className='dropdownSelector'>
        <CustomDropDownSelector
          adultsCount={1}
          childrenCount={1}
          setAdultsCount={() => {}}
          setChildrenCount={() => {}}
          adult={1}
          child={1}
          both={1}
          minAge={"12"}
          basePrice={`$${150}`}
        />
        <div className='mt-10'>
          <span className='placeholder'>DATES</span>
          <Select
            open={openDateDropdown}
            onDropdownVisibleChange={visible => setOpenDateDropdown(visible)}
            className='selector'
            placeholder='DATES'
            suffixIcon={<Icon name='arrowDown' width={24} height={24} />}
            defaultValue={"Mar, 09, 2024 - Mar, 16, 2024"}
            value={dateValue}
            dropdownRender={() => (
              <div className='py-6 px-[18px] rounded-xl'>
                <Flex className='mb-3'>
                  <p className='w-1/2 text-[#808C96] text-xs font-semibold uppercase'>
                    From
                  </p>
                  <p className='w-1/2 text-[#808C96] text-xs font-semibold uppercase'>
                    To
                  </p>
                </Flex>
                {dates.map((d, i) => (
                  <div key={i}>
                    <Flex
                      role='button'
                      className='hover:bg-[#a37b7b] hover:text-white text-[#2C3F50] cursor-pointer rounded-lg p-1 -ml-1'
                      onClick={() => {
                        setDateValue(`${d.startDate} - ${d.endDate}`);
                        setOpenDateDropdown(false);
                      }}
                    >
                      <p className='w-1/2 text-sm font-semibold '>
                        {d.startDate}
                      </p>
                      <p className='w-1/2 text-sm font-semibold'>{d.endDate}</p>
                    </Flex>
                    <Divider className='!m-3' />
                  </div>
                ))}
                <Button
                  block
                  onClick={() => {
                    setDateValue("Custom Dates");
                    setOpenDateDropdown(false);
                  }}
                >
                  Custom Dates
                </Button>
              </div>
            )}
          />
        </div>
        {dateValue === "Custom Dates" && (
          <FullDayActivity
            activity={{
              id: 22294,
              facility_id: 331,
              equine_main_activity_id: 2,
              category_group_status: 1,
              name: "5 Day Paradise Odyssey",
              activity_types: 2,
              group_minimum: 2,
              group_maximum: 10,
              category_individual_status: 0,
              category_shared_status: null,

              base_price: "1947",
              status: 1,
              age_minimum: null,
              age_maximum: null,
              cancellation_policy: null,
              age_adult_status: null,
              age_child_status: null,
              age_both_status: null,
              unit: 10,
              package_specific_date_status: 0,
              package_specific_date: null,
              availablity_from: "17-08-2023",
              availablity_to: "31-12-2025",
              activity_type_hours: null,
              activity_type_days: 5,
              available_specific_time_status: 0,
              available_from_time: null,
              available_to_time: null,
              available_time_slots: null,
              days_disabled: "[0]",
              latitude: "-13.283563114206357",
              longitude: "-72.19901211779718",
              rider_ability: "[0]",
              eq_main_activity: {
                title: "Riding Holidays",
              },
              facility_details: {
                id: 331,
                facility_name: "Hacienda del Chalán",
                city: "Urubamba",
                vat_percentage: 0,
                country: "Peru",
                base_currency: "USD",
                overview_quick_view: {
                  id: 121,
                  facility_id: 331,
                  brief_description_heading:
                    "Experience Ancient Cultures Along the Way",
                  brief_description:
                    "<p>One of the most exciting parts about riding with Hacienda del Chalan is experiencing the rich ancient Andean culture as you ride through villages and ruins of civilizations that once were. Many of the rides take you through regions that were populated by the Pre-Inka and Inka civilizations from the mid-15th to mid-16th centuries. You will find yourself riding through their tombs and villages and acquainting yourself with the history of the area. If you find yourself intrigued by different cultures and their ways of life, a ride with Hacienda Del Chalan is a great way to experience this firsthand.</p>",
                  specialities_title: "The Peruvian Horse",
                  specialities_descrioption:
                    "<p>With a good height and balance, the Peruvian horse is the perfect companion for long trail-rides across the mountainous landscape of Peru. Along with being graceful and elegant, this breed of horses is known to fare extremely well on trail rides and longer excursions, so you can rest easy knowing you&rsquo;re in good hands while you take in the beauty of your surroundings and enjoy a smooth and comfortable ride.</p>",
                  longitude: "-72.19901211779718",
                  latitude: "-13.283563114206357",
                },
              },
              eq_tcs: null,
              schedule_dates: [],
              exception_dates: [],
              seasonal_rates: [],
              activity_add_ons: [
                {
                  id: 1422,
                  product_id: 22294,
                  facility_id: 331,
                  title: "Upgrade to Private Room",
                  description:
                    "Price per person - Quantity selected should be same as group members",
                  price: "75",
                  quantity: 1,
                  mandatory_status: 0,
                },
                {
                  id: 1423,
                  product_id: 22294,
                  facility_id: 331,
                  title: "Additional Member (3rd)",
                  description: null,
                  price: "1902",
                  quantity: 1,
                  mandatory_status: 0,
                },
                {
                  id: 1424,
                  product_id: 22294,
                  facility_id: 331,
                  title: "Additional Member (4th)",
                  description: null,
                  price: "1780",
                  quantity: 1,
                  mandatory_status: 0,
                },
                {
                  id: 1425,
                  product_id: 22294,
                  facility_id: 331,
                  title: "Additional Member (5th - 10th)",
                  description: null,
                  price: "1894",
                  quantity: 1,
                  mandatory_status: 0,
                },
              ],
            }}
            setBasePrice={() => {}}
            setDate={() => {}}
          />
        )}
        <Divider />
        <Title
          level={5}
          style={{ fontSize: "18px", fontWeight: "600", color: "#2C3F50" }}
        >
          Add-ons
        </Title>
        <Space direction='vertical' size='large' style={{ width: "100%" }}>
          <AddOns textOverButton />
          <AddOns textOverButton />
        </Space>
        <Divider />
        <Flex vertical gap={32}>
          <TextAndAmount
            text={"Sub total"}
            amont={"1,722"}
            style={{ fontWeight: "600" }}
          />
          <TextAndAmount
            text={"Add-ons total"}
            amont={"426"}
            style={{ fontWeight: "600" }}
          />
          <TextAndAmount
            text={"Tax"}
            amont={"0.00"}
            style={{ fontWeight: "600" }}
          />
          <TextAndAmount
            text={"Grand Total"}
            amont={"2,148"}
            style={{ fontSize: "24px", fontWeight: "bold" }}
          />
        </Flex>
        <Divider />
        <Button
          type='primary'
          className='button'
          // onClick={openCheckout}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default BookingPriceDetails;
