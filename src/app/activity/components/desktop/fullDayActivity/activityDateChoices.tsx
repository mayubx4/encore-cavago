import { ActivitySchema } from '@shared/api/home/schemas';
import Icon from '@shared/components/common/icons';
import { Select } from 'antd';
import moment from 'moment';
import React, { useMemo, useCallback } from 'react';
import { z } from 'zod';
import { isDisabledDay, isExceptionDate } from '@shared/components/common/utils';

export default function ActivityDateChoices({
  activity,
  setDate,
}: {
  activity: z.infer<typeof ActivitySchema>,
  setDate: (date: string) => void,
}) {
  const activityDates = useMemo(() => {
    const dates: { value: string, label: string }[] = [];
    const daysDisabledArray = JSON.parse(activity.days_disabled || '[]');

    activity.ticket_schedule?.date_time_json.specific_date.forEach((date) => {
      const start = moment(date.start_date);
      const end = moment(date.end_date);

      while (start.isSameOrBefore(end)) {
        if (!isDisabledDay(start, daysDisabledArray) && !isExceptionDate(start, activity.exception_dates)) {
          dates.push({
            value: start.format('YYYY-MM-DD'),
            label: start.format('DD MMMM, YYYY'),
          });
        }
        start.add(1, 'day');
      }
    });

    return dates;
  }, [activity]);

  const handleDateChange = useCallback(
    (value: string) => setDate(value),
    [setDate],
  );

  return (
    <div className="dateChoices">
      <span className="placeholder">DATES</span>
      <Select
        className="selector"
        placeholder="Select Date"
        suffixIcon={<Icon name="arrowDown" width={24} height={24} />}
        options={activityDates}
        onChange={handleDateChange}
      />
    </div>
  );
}
