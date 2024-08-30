'use Client';

import {
  ReactNode, createContext, useContext, useState,
} from 'react';
import { z } from 'zod';

const FilterSchema = z.object({
  main_category_id: z.number().optional(),
  sub_category_id: z.array(z.number()).nullish().optional(),
  from_date: z.string().nullish().optional(),
  to_date: z.string().nullish().optional(),
  min_price: z.number().nullish().optional(),
  max_price: z.number().nullish().optional(),
  duration_in_hours: z.string().nullish().optional(),
  duration_in_days: z.string().nullish().optional(),
  rider_ability: z.array(z.number()).nullish().optional(),
  booking_method: z.number().nullish().optional(),
}).nullish();

export type FilterType = z.infer<typeof FilterSchema>;

const HomeFilterSchema = z.object({
  categoryId: z.number().nullish(),
  subCategoryIds: z.array(z.number()).nullish(),
  search: z.string().nullish(),
  filter: FilterSchema,
  searchCategory: z.string().nullish(),
});

type HomefilterType = z.infer<typeof HomeFilterSchema>;

interface HomeFilterStoreType extends HomefilterType {
  setCategoryId: (id: number | undefined) => void;
  setSubCategoryIds: (ids: number[] | undefined) => void;
  setSearch: (value: string | undefined) => void;
  setSearchCategory: (value: string) => void;
  setFilter: (value: z.infer<typeof FilterSchema>) => void;
}

function useFilterState({
  categoryId,
  subCategoryIds,
  search,
  searchCategory,
  filter,
}: HomefilterType): HomeFilterStoreType {
  const [state, setState] = useState<HomeFilterStoreType>({
    categoryId,
    subCategoryIds,
    search,
    searchCategory,
    filter,
    setCategoryId: (id: number | undefined) => set('categoryId', id),
    setSubCategoryIds: (ids: number[] | undefined) => set('subCategoryIds', ids),
    setSearch: (value: string | undefined) => set('search', value),
    setSearchCategory: (value: string) => set('searchCategory', value),
    setFilter: (value: z.infer<typeof FilterSchema>) => set('filter', value),
  });

  function set<Key extends keyof HomefilterType>(key: Key, val: HomefilterType[Key] | undefined) {
    setState((value) => ({ ...value, [key]: val }));
  }

  return state;
}

export const HomeFiltersContext = createContext<ReturnType<typeof useFilterState> | null>(null);

export function useHomeFiltersContext() {
  const ctx = useContext(HomeFiltersContext);
  if (!ctx) {
    throw new Error('to use filterstore wrap the parent with homefiltercontext');
  }

  return ctx;
}

export function HomeFiltersContextProvider({ children, ...rest }:
  { children: ReactNode } & HomefilterType) {
  const state = useFilterState(rest);

  return (
    <HomeFiltersContext.Provider value={state}>
      {children}
    </HomeFiltersContext.Provider>
  );
}
