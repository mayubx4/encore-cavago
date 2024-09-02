import dayjs from "dayjs";
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./rangePicker.css";
import { Flex } from "antd";

const RangePicker = ({ onSelect,selected }) => {
  const [state, setState] = useState([
    {
      startDate: null,
      endDate: {},
      key: "selection",
    },
  ]);

  const handleDateChange = item => {
    console.log(item.selection);
    setState([item.selection]);
    onSelect(
      `${dayjs(item.selection.startDate).format("MMMM D")} to ${dayjs(
        item.selection.endDate
      ).format("MMMM D")}`
    );
  };

  return (
    <Flex align='center' justify='center' className='w-full relative'>
      <DateRange
        className={"metrics-date-range-picker"}
        showDateDisplay={false}
        onChange={handleDateChange}
        // moveRangeOnFirstSelection
        ranges={state}
        startDatePlaceholder='Start Date'
        endDatePlaceholder='End Date'
        rangeColors={["#F7F3F2"]}
        months={2}
        direction='horizontal'
        weekdayDisplayFormat={"EEEEE"}
        //   maxDate={new Date()}
        showMonthAndYearPickers={false}
        showSelectionPreview={false}
        showPreview={false}
      />
    </Flex>
  );
};

export default RangePicker;
