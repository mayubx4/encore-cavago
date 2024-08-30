'use client';

import { useWhichDeviceContext } from '@shared/hooks/whichDeviceContext';
import React from 'react';
import { HomeFiltersContextProvider } from '@shared/hooks/homeFiltersContext';
import { DEFAULT_CATEGORY_ID, SearchCategories } from '@shared/constants/home';
import Header from '@shared/components/desktop/header/header';
import { useBottomNavContext } from '@shared/hooks/mobileBottomNavContext';
import HomeDesktop from './desktop/homeDesktop';
import HomeMobile from './mobile/homeMobile';

export default function Index() {
  const device = useWhichDeviceContext();
  useBottomNavContext({ activeTab: 'explore' });
  const props = {
    categoryId: DEFAULT_CATEGORY_ID,
    subCategoryIds: null,
    search: null,
    searchCategory: SearchCategories.All,
    filter: null,
  };

  if (device === 'desktop') {
    return (
      <HomeFiltersContextProvider {...props}>
        <Header />
        <HomeDesktop />
      </HomeFiltersContextProvider>
    );
  }

  return (
    <HomeFiltersContextProvider {...props}>
      <HomeMobile />
    </HomeFiltersContextProvider>
  );
}
