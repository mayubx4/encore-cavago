'use Client';

import {
  ReactNode, createContext, useContext, useEffect, useState,
} from 'react';
import BottomNav, { ActiveBottomNavType } from '@shared/components/mobile/bottomNav/bottomNav';
import { useWhichDeviceContext } from './whichDeviceContext';

type BottomNavProps = {
  bottomNavShown?: boolean;
  activeTab?: ActiveBottomNavType;
};

type BottomNavStateProps = {
  bottomNavProps: BottomNavProps
  setBottomNavProps: (opt: BottomNavProps) => void;
};

export const BottomNavContext = createContext<BottomNavStateProps | null>(null);

export function useBottomNavContext(opt: BottomNavProps) {
  const ctx = useContext(BottomNavContext);
  if (!ctx) {
    throw new Error('to use bottomNav State wrap the parent with BottomNavContextProvider');
  }
  useEffect(() => {
    ctx.setBottomNavProps(opt);
  }, []);

  return ctx;
}

export function BottomNavContextProvider({ children }:
  { children: ReactNode }) {
  const device = useWhichDeviceContext();
  const [modalState, setModalState] = useState<BottomNavStateProps>({
    bottomNavProps: {
      bottomNavShown: device === 'mobile',
      activeTab: 'explore',
    },
    setBottomNavProps: (opt) => {
      set('bottomNavProps', { ...modalState.bottomNavProps, ...opt });
    },
  });

  function set<Key extends keyof BottomNavStateProps>(k: Key, v: BottomNavStateProps[Key]) {
    setModalState((value: any) => ({ ...value, [k]: v }));
  }

  return (
    <BottomNavContext.Provider value={modalState}>
      {children}
      {modalState.bottomNavProps.bottomNavShown && (
        <BottomNav activeTab={modalState.bottomNavProps.activeTab} />)}
    </BottomNavContext.Provider>
  );
}
