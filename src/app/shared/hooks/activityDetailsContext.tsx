'use Client';

import {
  ReactNode, createContext, useContext, useState,
} from 'react';
import { z } from 'zod';

const ActualTicketsSchema = z.object({
  type: z.string(),
  quantitySelected: z.number(),
});

const ActivitySelectedDetailsSchema = z.object({
  adults: z.number().nullish(),
  children: z.number().nullish(),
  basePrice: z.number().nullish(),
  date: z.string().nullish(),
  time: z.string().nullish(),
  activityId: z.number(),
  actualTickets: z.array(ActualTicketsSchema).nullish(),
});

export type ActivitySelectedDetailsType = z.infer<typeof ActivitySelectedDetailsSchema>;

export type ActualTicketsType = z.infer<typeof ActualTicketsSchema>;

interface ActivitySelectedDetailsStoreType extends ActivitySelectedDetailsType {
  setAdults: (id: number | undefined) => void;
  setChildren: (id: number | undefined) => void;
  setDate: (value: string) => void;
  setTime: (value: string) => void;
  setBasePrice: (value: number | undefined) => void;
  setActivityId: (value: number) => void;
  setActualTickets: (value: ActualTicketsType[]) => void;
}

function useActivitySelectedDetails({
  adults, children, basePrice, date, time, activityId, actualTickets,
}: ActivitySelectedDetailsType) : ActivitySelectedDetailsStoreType {
  const [state, setState] = useState<ActivitySelectedDetailsStoreType>({
    adults,
    children,
    basePrice,
    date,
    time,
    activityId,
    actualTickets,
    setAdults: (id: number | undefined) => set('adults', id),
    setChildren: (id: number | undefined) => set('children', id),
    setDate: (value: string) => set('date', value),
    setTime: (value: string) => set('time', value),
    setBasePrice: (value: number | undefined) => set('basePrice', value),
    setActivityId: (value: number) => set('activityId', value),
    setActualTickets: (value: ActualTicketsType[]) => set('actualTickets', value),
  });

  function set<Key extends keyof ActivitySelectedDetailsType>(key: Key,
    val: ActivitySelectedDetailsType[Key] | undefined) {
    setState((value) => ({ ...value, [key]: val }));
  }

  return state;
}

export const ActivitySelectedDetailsContext = createContext<
  ReturnType<typeof useActivitySelectedDetails> | null>(null);

export function useActivitySelectedDetailsContext() {
  const ctx = useContext(ActivitySelectedDetailsContext);
  if (!ctx) {
    throw new Error('to use filterstore wrap the parent with homefiltercontext');
  }

  return ctx;
}

export function ActivitySelectedDetailsContextProvider({ children, ...rest }:
  { children: ReactNode } & ActivitySelectedDetailsType) {
  const state = useActivitySelectedDetails(rest);

  return (
    <ActivitySelectedDetailsContext.Provider value={state}>
      {children}
    </ActivitySelectedDetailsContext.Provider>
  );
}
