'use Client';

import { ReactNode, createContext, useContext } from 'react';

type device = 'mobile' | 'desktop' | null;

export const WhichDeviceContext = createContext<device>(null);

export function useWhichDeviceContext() {
  const ctx = useContext(WhichDeviceContext);
  if (!ctx) {
    throw new Error('to use useWhichDeviceContext wrap the parent with WhichDeviceContextProvider');
  }

  return ctx;
}

export function WhichDeviceContextProvider({ children, device }:
  { children: ReactNode, device: device }) {
  return (
    <WhichDeviceContext.Provider value={device}>
      {children}
    </WhichDeviceContext.Provider>
  );
}
