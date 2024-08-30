import { ExceptionDatesSchema, SeasonalRatesSchema } from '@shared/api/home/schemas';
import moment, { Moment } from 'moment';
import { z } from 'zod';

export const disabledDates = (
  date: Moment,
  availabilityFrom: string | null | undefined,
  availabilityTo: string | null | undefined,
) => {
  if (!availabilityFrom || !availabilityTo) return false;

  const startDisableDate = moment(availabilityFrom, 'DD-MM-YYYY');
  const endDisableDate = moment(availabilityTo, 'DD-MM-YYYY');

  return !date.isBetween(startDisableDate, endDisableDate, 'day', '[]');
};

export const disabledPackagesDates = (
  date: Moment,
  availabilityRanges: { from: string; to: string }[],
) => {
  for (const range of availabilityRanges) {
    const { from, to } = range;
    const startDisableDate = moment(from, 'YYYY-MM-DD');
    const endDisableDate = moment(to, 'YYYY-MM-DD');
    if (date.isBetween(startDisableDate, endDisableDate, 'day', '[]')) {
      return false;
    }
  }

  return true;
};

export const isPackageStartDate = (
  date: Moment,
  availabilityRanges: { from: string; to: string }[],
) => {
  for (const range of availabilityRanges) {
    const { from } = range;
    const startDisableDate = moment(from, 'YYYY-MM-DD');
    if (date.isSame(startDisableDate, 'day')) {
      return true;
    }
  }

  return false;
};

export const isExceptionDate = (
  date: Moment,
  expensiveDates: z.infer<typeof ExceptionDatesSchema>[] | null | undefined,
) => {
  if (!expensiveDates) return false;

  return expensiveDates.some(({ start_date, end_date }) => {
    const startExceptionDate = moment(start_date, 'DD-MM-YYYY');
    const endExceptionDate = moment(end_date, 'DD-MM-YYYY');

    return date.isBetween(startExceptionDate, endExceptionDate, 'day', '[]');
  });
};

export const isSeasonalDate = (
  date: Moment,
  seasonalRates: z.infer<typeof SeasonalRatesSchema>[] | null | undefined,
): number => {
  if (!seasonalRates) return 0;

  for (const season of seasonalRates) {
    const startSeasonalDate = moment(season.seasional_from_date, 'YYYY-MM-DD');
    const endSeasonalDate = moment(season.seasional_to_date, 'YYYY-MM-DD');

    const weekendDays = JSON.parse(season.seasional_weekend || '[]');
    if (weekendDays.includes(date.format('dddd'))
      && date.isBetween(startSeasonalDate, endSeasonalDate, 'day', '[]')) {
      return Number(season.seasional_weekend_price) || Number(season.seasional_price) || 0;
    }

    if (date.isBetween(startSeasonalDate, endSeasonalDate, 'day', '[]')) {
      return Number(season.seasional_price) || 0;
    }
  }

  return 0;
};

export const isDisabledDay = (date: Moment, days: number[]) => days.includes(date.day());

export const getTimeSlots = (
  activityTypeHours: string,
  availableFromTime: string,
  availableToTime: string,
) => {
  const timeSlots = [];

  const [activityHours, activityMinutes] = activityTypeHours.split(':').map(Number);
  const [fromHours, fromMinutes] = availableFromTime.split(':').map(Number);
  const [toHours, toMinutes] = availableToTime.split(':').map(Number);

  const activityTypeHoursInMinutes = activityHours * 60 + activityMinutes;
  const availableFromTimeInMinutes = fromHours * 60 + fromMinutes;
  const availableToTimeInMinutes = toHours * 60 + toMinutes;

  let currentTime = availableFromTimeInMinutes;

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return `${hours}:${mins < 10 ? `0${mins}` : mins}`;
  };

  while (currentTime < availableToTimeInMinutes) {
    const endTime = currentTime + activityTypeHoursInMinutes;
    timeSlots.push({ slot: `${formatTime(currentTime)} - ${formatTime(endTime)}` });
    currentTime += activityTypeHoursInMinutes;
  }

  return timeSlots;
};
