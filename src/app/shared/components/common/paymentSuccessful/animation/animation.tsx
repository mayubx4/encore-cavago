'use client';

import { ReactNode } from 'react';
import { useWhichDeviceContext } from '@shared/hooks/whichDeviceContext';
import classes from './animation.module.css';
import Animations from '../../animations';

export default function CongratulationsAnimation({ children }: { children: ReactNode }) {
  const device = useWhichDeviceContext();

  return (
    <div className={classes.animationWrapper}>
      <div className={classes.animationContainer}>
        {device === 'desktop' ? <Animations name="confettiDesktop" /> : <Animations name="confettiMobile" />}
      </div>
      <div className={classes.content}>
        {children}
      </div>
    </div>
  );
}
