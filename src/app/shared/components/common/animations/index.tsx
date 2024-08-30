import React from 'react';
import Lottie, { LottieComponentProps } from 'lottie-react';
import * as cavagoLoader from './cavagoLoader.json';
import confettiDesktop from './confettiDesktop.json';
import confettiMobile from './confettiMobile.json';

const anims = {
  cavagoLoader,
  confettiDesktop,
  confettiMobile,
};

export type AnimationType = keyof typeof anims;

export default function Animations(
  { name, ...rest }: { name: AnimationType } & Omit<LottieComponentProps, 'animationData'>,
) {
  const anim = anims[name];

  return (
    <Lottie animationData={anim} loop {...rest} />
  );
}
