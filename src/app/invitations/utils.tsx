import { InvitationType } from "@shared/api/invitations/scheme";
import { DECLINED_STATUS } from "@shared/constants/invitations";
import moment from "moment";

type SessionType = {
  day: string;
  date: string;
  timeSlot: string;
  isPast: boolean;
  remainingHours: number;
  remainingDays: number;
};

export const generateSessions = (fromDate: string, toDate: string, schedule: { [key: string]: string[] }[]): SessionType[] => {
  const sessions: SessionType[] = [];
  const startDate = moment(fromDate);
  const endDate = moment(toDate);
  const now = moment();

  while (startDate.isSameOrBefore(endDate)) {
    const dayName = startDate.format('dddd');

    schedule.forEach(daySchedule => {
      if (daySchedule[dayName]) {
        daySchedule[dayName].forEach(timeSlot => {
          const [startTime, endTime] = timeSlot.split('-');
          const startMoment = moment(startDate.format('YYYY-MM-DD') + ' ' + startTime, 'YYYY-MM-DD HH:mm');
          const endMoment = moment(startDate.format('YYYY-MM-DD') + ' ' + endTime, 'YYYY-MM-DD HH:mm');

          const isPast = startDate.isSame(now, 'day') ? now.isAfter(endMoment) : startDate.isBefore(now, 'day');
          const remainingHours = isPast ? 0 : Math.max(startMoment.diff(now, 'hours'), 0);
          const remainingDays = isPast ? 0 : Math.max(startMoment.diff(now, 'day'), 0);

          sessions.push({
            day: dayName,
            date: startDate.format('YYYY-MM-DD'),
            timeSlot,
            isPast,
            remainingHours,
            remainingDays,
          });
        });
      }
    });

    startDate.add(1, 'day');
  }

  return sessions;
}

export const getPreviousInvitations = (data: InvitationType[]): InvitationType[] => {
  const result = data.filter(element => {
    const totalSessions = generateSessions(
      element.allocate_from, element.allocate_to , JSON.parse(element.allocate_time_slot),
    );
    const completedSessions = totalSessions?.filter(({ isPast }) => isPast);
    return completedSessions.length === totalSessions.length || element.status === DECLINED_STATUS;
  });
  return result;
}

export const isValidImageUrl = (url: string | null | undefined) => {
  try {
    new URL(url ?? '');
    return true;
  } catch (_) {
    return false;
  }
}
