'use client';

import { DatePicker, Button, Space } from 'antd';
import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import './_fullDayActivity.scss';
import moment from 'moment';
import { z } from 'zod';
import { ActivitySchema } from '@shared/api/home/schemas';
import {
  disabledPackagesDates, isPackageStartDate, isDisabledDay,
  disabledDates, isExceptionDate, isSeasonalDate,
} from '@shared/components/common/utils';
import Title from '@shared/wrappers/Title';
import colors from '@shared/theme/colors';
import Text from '@shared/wrappers/Text';

export default function FullDayActivity(
  {
    activity,
    setBasePrice,
    setDate,
  }
  :
  {
    activity: z.infer<typeof ActivitySchema>,
    setBasePrice: (price: number) => void,
    setDate: (date: string) => void,
  },
) {
  const { RangePicker } = DatePicker;
  const [error, setError] = useState('');

  const packagesAvailabilityDates = JSON.parse(activity.package_specific_date || '[]');
  const daysDisabledArray = JSON.parse(activity.days_disabled || '[]');

  const isDisabled = (current: Dayjs) => {
    const date = moment(current.format('YYYY-MM-DD'));

    return ((packagesAvailabilityDates.length > 0
      ? disabledPackagesDates(date, packagesAvailabilityDates)
      : disabledDates(date, activity.availablity_from, activity.availablity_to))
      || isDisabledDay(date, daysDisabledArray)
      || isExceptionDate(date, activity.exception_dates)
    );
  };

  const handleChange = (dates: [Dayjs, Dayjs]) => {
    if (dates[0] && dates[1]) {
      const sDate = moment(dates[0].format('YYYY-MM-DD'));
      const rate = isSeasonalDate(sDate, activity.seasonal_rates);
      if (packagesAvailabilityDates.length > 0) {
        if (isPackageStartDate(sDate, packagesAvailabilityDates)) {
          const dayCount = activity.activity_type_days;
          const diff = dates[1].diff(dates[0], 'days') + 1;
          if (diff !== dayCount) {
            setError(`Please select Maximum of ${dayCount} days`);
          } else {
            setError('');
            setDate(`${dates[0].format('YYYY-MM-DD')}|${dates[1].format('YYYY-MM-DD')}`);
            if (rate !== 0) {
              setBasePrice(rate);
            }
          }
        } else {
          setError('Please select a valid start date');
        }
      } else {
        const dayCount = activity.activity_type_days;
        const diff = dates[1].diff(dates[0], 'days') + 1;
        if (diff !== dayCount) {
          setError(`Please select Maximum of ${dayCount} days`);
        } else {
          setError('');
          setDate(`${dates[0].format('YYYY-MM-DD')}|${dates[1].format('YYYY-MM-DD')}`);
          if (rate !== 0) {
            setBasePrice(rate);
          }
        }
      }
    }
  };

  const panelRenderFunc = (panelNode: React.ReactNode) => (
    <Space direction="vertical">
      <Space direction="vertical" size={0.5} className="header">
        <Title level={5} color={colors.neutrals[500]}>Select Check-in Date</Title>
        <Text className="secondary">Prices can vary with dates</Text>
        <Text className={`pkgDays ${error !== '' ? 'error' : ''}`}>
          {error === '' ? `Min ${activity.activity_type_days} days, and Max ${activity.activity_type_days} days` : error}
        </Text>
      </Space>
      <div>
        {panelNode}
      </div>
    </Space>
  );

  return (
    <div style={{ marginTop: '40px' }} className="mainRangeDiv">
      <span className="startDate">START DATE</span>
      <span className="endDate">END DATE</span>
      <RangePicker
        disabledDate={isDisabled}
        onChange={handleChange}
        cellRender={(current: any) => {
          const date = moment(current.format('YYYY-MM-DD'));
          const bold = isPackageStartDate(date, packagesAvailabilityDates);
          if (isDisabled(current)) {
            return <div className="date-disabled">{current.date()}</div>;
          }
          if (isSeasonalDate(date, activity.seasonal_rates)) {
            return (
              <div className={`date seasonalDate ${bold && bold}`}>
                <div>
                  {current.date()}
                </div>
                <span className="expensive bold">£££</span>
              </div>
            );
          }

          return <div className={`date ${bold && 'bold'}`}>{current.date()}</div>;
        }}
        status={error !== '' ? 'error' : ''}
        separator={null}
        suffixIcon={null}
        panelRender={panelRenderFunc}
        placeholder={['Add date', 'Add date']}
        popupClassName="datePicker"
      />
    </div>
  );
}
