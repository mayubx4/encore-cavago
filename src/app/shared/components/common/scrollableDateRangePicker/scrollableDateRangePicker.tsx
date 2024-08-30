import React, { useEffect, useState } from 'react';
import moment, { Moment } from 'moment';
import {
  Button, Col, Divider, Row, Space,
} from 'antd';
import './_scrollableDateRangePicker.scss';
import { toast } from 'sonner';
import Text from '@shared/wrappers/Text';
import { SeasonalRatesSchema, ExceptionDatesSchema } from '@shared/api/home/schemas';
import { z } from 'zod';
import {
  disabledDates, disabledPackagesDates, isPackageStartDate,
  isSeasonalDate, isExceptionDate, isDisabledDay, getTimeSlots,
} from '@shared/components/common/utils';
import { useHomeFiltersContext } from '@shared/hooks/homeFiltersContext';
import Icon from '../icons';

function ScrollableDateRangePicker(
  {
    onStepDecrement,
    minRange,
    maxRange,
    availableTimeSlots,
    availablityFrom,
    availablityTo,
    activityTypeHours,
    availableSpecificTimeStatus,
    availableFromTime,
    availableToTime,
    packageSpecificDate,
    daysDisabled,
    seasonalRates,
    exceptionDates,
    selectedDate,
    setSelectedDate,
    selectedFromDate,
    setSelectedFromDate,
    selectedToDate,
    setSelectedToDate,
    selectedTimeSlot,
    setSelectedTimeSlot,
    setBasePrice,
    hideSaveButton = false,
  }:
    {
      onStepDecrement: () => void;
      minRange?: number | null | undefined;
      maxRange?: number | null | undefined;
      availableTimeSlots?: string | null | undefined;
      availablityFrom?: string | null | undefined;
      availablityTo?: string | null | undefined;
      activityTypeHours?: string | null | undefined;
      availableSpecificTimeStatus?: number | null | undefined;
      availableFromTime?: string | null | undefined;
      availableToTime?: string | null | undefined;
      packageSpecificDate?: string | null | undefined;
      daysDisabled?: string | null | undefined;
      seasonalRates?: z.infer<typeof SeasonalRatesSchema>[] | null | undefined;
      exceptionDates?: z.infer<typeof ExceptionDatesSchema>[] | null | undefined;
      selectedDate?: string;
      setSelectedDate?: (date: string) => void;
      selectedFromDate?: string;
      setSelectedFromDate?: (date: string) => void;
      selectedToDate?: string;
      setSelectedToDate?: (date: string) => void;
      selectedTimeSlot?: string;
      setSelectedTimeSlot?: (timeSlot: string) => void;
      setBasePrice?: (price: number) => void;
      hideSaveButton?: boolean;
    },
) {
  const [startDate, setStartDate] = useState<Moment | null>(selectedFromDate ? moment(selectedFromDate) : null);
  const [endDate, setEndDate] = useState<Moment | null>(selectedToDate ? moment(selectedToDate) : null);
  const [hoverDate, setHoverDate] = useState<Moment | null>(null);
  const [showTimeSlots, setShowTimeSlots] = useState<boolean>(false);

  const daysDisabledArray = JSON.parse(daysDisabled || '[]');

  const packagesAvailabilityDates = JSON.parse(packageSpecificDate || '[]');

  useEffect(() => {
    if (selectedDate !== '' && !hideSaveButton) {
      setStartDate(moment(selectedDate, 'YYYY-MM-DD'));
    }
  }, [selectedDate]);

  useEffect(() => {
    if (startDate && setSelectedFromDate) {
      setSelectedFromDate(startDate.format('YYYY-MM-DD'));
    }
  }, [startDate]);

  useEffect(() => {
    if (endDate && setSelectedToDate) {
      setSelectedToDate(endDate.format('YYYY-MM-DD'));
    }
  }, [endDate]);

  let timeSlots = null;
  if (availableSpecificTimeStatus && availableTimeSlots) {
    timeSlots = JSON.parse(availableTimeSlots);
  } else if (availableFromTime && availableToTime && activityTypeHours) {
    timeSlots = getTimeSlots(activityTypeHours, availableFromTime, availableToTime);
  }

  const generateCalendar = (startMonth: Moment, monthsToShow: number) => {
    const months = [];
    for (let i = 0; i < monthsToShow; i++) {
      const month = startMonth.clone().add(i, 'month');
      months.push(month);
    }

    return months;
  };

  const handleDayClick = (date: Moment) => {
    if (packagesAvailabilityDates.length > 0
      && !isPackageStartDate(date, packagesAvailabilityDates)) return;
    if (packagesAvailabilityDates.length === 0
      && disabledDates(date, availablityFrom, availablityTo)) return;
    if (isExceptionDate(date, exceptionDates)) return;
    if (isDisabledDay(date, daysDisabledArray)) return;

    if (
      !startDate
      || (startDate && endDate)
      || (minRange && maxRange && minRange === maxRange)
      || (timeSlots && timeSlots.length > 0)
    ) {
      setStartDate(date);
      if (minRange && maxRange && minRange === maxRange) {
        setEndDate(date.clone().add(maxRange - 1, 'days'));
      } else {
        setEndDate(null);
      }
    } else if (startDate && !endDate) {
      if (date.isBefore(startDate)) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        const range = date.diff(startDate, 'days') + 1;
        if (minRange && range < minRange) {
          toast.error(`Please select at least ${minRange} days.`);
        } else if (maxRange && range > maxRange) {
          toast.error(`Please select no more than ${maxRange} days.`);
        } else {
          setEndDate(date);
        }
      }
    }
  };

  const isInRange = (date: Moment) => {
    if ((!startDate || !hoverDate) && !selectedFromDate) return false;
    if (endDate) {
      return date.isBetween(startDate, endDate, 'day', '[]');
    }

    return date.isBetween(startDate, hoverDate, 'day', '[]');
  };

  const months = generateCalendar(moment(), 12);
  const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  let headerText = "When's your plan";
  if (minRange || (timeSlots && timeSlots.length > 0)) {
    headerText = 'Select start date';
    if (startDate && !endDate && minRange !== maxRange) {
      headerText = 'Select end date';
    } else {
      headerText = 'Select start date';
    }
  }

  const customSetHoverDate = (date: Moment) => {
    if (timeSlots && timeSlots.length > 0) return;
    setHoverDate(date);
  };

  return (
    <div className="datepickerContainer">
      <Row gutter={[0, 20]}>
        <Row gutter={[0, 22]} className="header">
          <Col span={24}>
            <Icon
              name="backArrow"
              width={24}
              height={24}
              style={{ flexShrink: 0 }}
              onClick={() => onStepDecrement()}
            />
          </Col>
          <Col span={24}>
            <Space direction="vertical" size={0}>
              <Space direction="horizontal">
                {timeSlots && timeSlots.length > 0 ? (
                  <Space direction="horizontal">
                    <Text className={showTimeSlots ? 'grayHeader' : 'h3'}>{headerText}</Text>
                    <Icon name="arrowNext" className="arrow" />
                    <Text className={showTimeSlots ? 'h3' : 'grayHeader'}>Select a time slot</Text>
                  </Space>
                ) : (
                  <Text className="h3">{headerText}</Text>
                )}
              </Space>
              <Space size={3} direction="vertical">
                <Text className="dateInfo">
                  {minRange && !startDate && 'Add your dates for exact pricing.'}
                  {timeSlots && timeSlots.length > 0 && !startDate && 'Add your time for exact pricing.'}
                  {startDate && startDate.format('ddd DD, MMM')}
                  {selectedTimeSlot && ` • ${selectedTimeSlot}`}
                  {startDate && minRange && minRange === maxRange && ` - ${startDate.clone().add(maxRange - 1, 'days').format('ddd DD, MMM')}`}
                  {endDate && !minRange && ` - ${endDate.format('ddd DD, MMM')}`}
                </Text>
                {minRange && maxRange && (
                  <Text className="dateRange">
                    {minRange !== maxRange && `Min ${minRange} nights - Max ${maxRange} nights`}
                    {minRange === maxRange && `${minRange} days activity`}
                  </Text>
                )}
              </Space>
            </Space>
          </Col>
        </Row>
        <Col span={24}>
          {!showTimeSlots && (
            <>
              <div className="calendarWeekdayContainer">
                <Row justify="space-between">
                  {weekdays.map((day, i) => (
                    <Col key={i} className="calendarWeekday">
                      <p>{day}</p>
                    </Col>
                  ))}
                </Row>
              </div>
              <Divider className="divider" />
              <div className="calendarScrollable">
                {months.map((month, index) => (
                  <div key={index} className="calendarMonth">
                    <h4>{month.format('MMMM YYYY')}</h4>
                    <div className="calendarGrid">
                      {Array.from({ length: month.daysInMonth() }, (_, dayIndex) => {
                        const date = month.clone().date(dayIndex + 1);
                        const isSelected = date.isSame(startDate, 'day') || date.isSame(endDate, 'day');
                        const inRange = isInRange(date);
                        const isStart = date.isSame(startDate, 'day');
                        const isEnd = date.isSame(endDate, 'day');
                        const isDisabled = (packagesAvailabilityDates.length > 0
                          ? disabledPackagesDates(date, packagesAvailabilityDates)
                          : disabledDates(date, availablityFrom, availablityTo))
                          || isExceptionDate(date, exceptionDates)
                          || isDisabledDay(date, daysDisabledArray);
                        const isExpensive = isSeasonalDate(date, seasonalRates);
                        const isPkgStart = packagesAvailabilityDates.length > 0
                          ? isPackageStartDate(date, packagesAvailabilityDates) : false;

                        const gridColumn = date.day();

                        return (
                          <div
                            key={dayIndex}
                            className={`calendarDayContainer ${isStart ? 'start' : ''} ${isEnd ? 'end' : ''} ${inRange ? 'in-range' : ''} ${isDisabled ? 'disabled' : ''}`}
                            onClick={() => handleDayClick(date)}
                            onMouseEnter={() => !isDisabled && customSetHoverDate(date)}
                            style={{ gridColumn }}
                          >
                            <div className={`calendarDay ${isPkgStart ? 'pkgStart' : ''} ${isSelected ? 'selected' : ''} ${inRange ? 'in-range' : ''} ${isDisabled ? 'disabled' : ''}`}>
                              <p>{dayIndex + 1}</p>
                              {isExpensive !== 0 && !isDisabled && <span className="expensive">£££</span>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {showTimeSlots && (
            <>
              <Divider />
              <div className="timeSlots">
                {timeSlots && timeSlots.length > 0 && timeSlots.map((slot, idx) => (
                  <Button
                    key={idx}
                    className={`slotBtn ${selectedTimeSlot === slot.slot ? 'checked' : ''}`}
                    onClick={() => setSelectedTimeSlot(slot.slot)}
                  >
                    {slot.slot}
                  </Button>
                ))}
              </div>
            </>
          )}
          <Divider className="divider" />
          {!showTimeSlots && !hideSaveButton && (
            <Button
              className="saveBtn"
              onClick={() => {
                if (startDate) {
                  setSelectedDate(startDate.format('YYYY-MM-DD'));
                  const newBasePrice = isSeasonalDate(startDate, seasonalRates);
                  if (newBasePrice !== 0) {
                    setBasePrice(newBasePrice);
                  }
                }
                if (timeSlots && timeSlots.length > 0) {
                  setShowTimeSlots(!showTimeSlots);
                } else if (startDate) {
                  onStepDecrement();
                }
              }}
            >
              {timeSlots && timeSlots.length > 0 ? 'Continue' : 'Save'}
            </Button>
          )}
          {showTimeSlots && timeSlots && timeSlots.length > 0 && (
            <Row justify="space-around" align="middle">
              <Col span={6}>
                <Button className="backBtn" onClick={() => setShowTimeSlots(!showTimeSlots)}>
                  Back
                </Button>
              </Col>
              <Col span={14}>
                <Button
                  className="saveBtn"
                  onClick={() => {
                    if (selectedTimeSlot) {
                      onStepDecrement();
                    }
                  }}
                >
                  Save
                </Button>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default ScrollableDateRangePicker;
