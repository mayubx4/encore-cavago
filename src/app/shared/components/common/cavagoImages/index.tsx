'use client';

import React, { SVGProps } from 'react';
import icon from './icon.svg';

const svgs = {
  icon,
};

export type CavagoImagesType = keyof typeof svgs;

export default function CavagoImages(
  { image, ...rest }: { image: CavagoImagesType } & SVGProps<SVGElement>,
) {
  const Image = svgs[image];

  return (
    <Image
      {...rest}
    />
  );
}
