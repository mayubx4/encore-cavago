'use client';

import { DatePicker, Select } from 'antd';
import React from 'react';
import { Dayjs } from 'dayjs';
import Icon from '@shared/components/common/icons';
import { z } from 'zod';
import {
  disabledDates, isSeasonalDate, isExceptionDate,
  isDisabledDay, getTimeSlots,
} from '@shared/components/common/utils';

import { ActivitySchema } from '@shared/api/home/schemas';
import moment from 'moment';
import './_fullDayActivity.scss';

export default function FullDayActivityTimeChoices(
  {
    activity,
    actualDate,
    setBasePrice,
    setDate,
    setTime,
  }: {
    activity: z.infer<typeof ActivitySchema>,
    actualDate: string,
    setBasePrice: (price: number) => void,
    setDate: (date: string) => void,
    setTime: (time: string) => void,
  },
) {
  const daysDisabledArray = JSON.parse(activity.days_disabled || '[]');
  const availabilityFrom = activity.availablity_from || '01-06-2024';
  const availabilityTo = activity.availablity_to || '30-12-2024';

  let timeSlots = null;
  if (activity.available_specific_time_status && activity.available_time_slots) {
    timeSlots = JSON.parse(activity.available_time_slots);
  } else if (
    activity.available_from_time && activity.available_to_time && activity.activity_type_hours
  ) {
    timeSlots = getTimeSlots(
      activity.activity_type_hours,
      activity.available_from_time,
      activity.available_to_time,
    );
  }

  const isDisabled = (current: Dayjs) => {
    const date = moment(current.format('YYYY-MM-DD'));

    return (
      isDisabledDay(date, daysDisabledArray)
      || isExceptionDate(date, activity.exception_dates)
      || disabledDates(date, availabilityFrom, availabilityTo)
    );
  };

  return (
    <div className="dateChoices">
      <span className="placeholder">
        DATES
      </span>
      <DatePicker
        popupClassName="datePicker"
        type="month"
        disabledDate={isDisabled}
        onChange={(current) => {
          if (activity.activity_types !== 6) {
            const rate = isSeasonalDate(moment(current.format('YYYY-MM-DD')), activity.seasonal_rates);
            if (rate) {
              setBasePrice(rate);
            }
          }
          setDate(current.format('YYYY-MM-DD'));
        }}
        cellRender={(current: any) => {
          const date = moment(current.format('YYYY-MM-DD'));
          if (isDisabled(current)) {
            return <div className="date-disabled">{current.date()}</div>;
          }
          if (isSeasonalDate(date, activity.seasonal_rates)) {
            return (
              <div className="date seasonalDate">
                <div>
                  {current.date()}
                </div>
                <span className="expensive">£££</span>
              </div>
            );
          }

          return <div className="date">{current.date()}</div>;
        }}
        allowClear={false}
        suffixIcon={<Icon name="arrowDown" width={24} height={24} />}
      />
      {
        activity.activity_types !== 6 && (
          <div style={{ marginTop: '20px' }}>
            <span className="placeholder">
              TIME SLOTS
            </span>
            <Select
              className="selector"
              placeholder="Select time"
              disabled={!actualDate}
              suffixIcon={<Icon name="arrowDown" width={24} height={24} />}
              onChange={(value: string) => setTime(value)}
              options={timeSlots?.map((slot: any) => ({
                label: slot.slot,
                value: slot.slot,
              }))}
            />
          </div>
        )
      }

    </div>
  );
}
