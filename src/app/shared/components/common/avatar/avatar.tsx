/* eslint-disable react/prop-types */
import React from 'react';
import Image, { StaticImageData } from 'next/image';
import './_avatar.scss';
import { useAuthenticationContext } from '@shared/hooks/authenticationContext';

export default function Avatar({ radius, image, ...props }:
  React.HTMLAttributes<HTMLDivElement> & { radius: number, image?: string | StaticImageData; }) {
  const { user } = useAuthenticationContext();

  return (
    <div className="avatarContainer" {...props} style={{ ...(props.style ?? {}), width: radius, height: radius }}>
      {(image || user?.user_profile?.img_1_url) ? (
        <Image src={image || user?.user_profile?.img_1_url} alt="image" width={radius} height={radius} style={{ borderRadius: radius }} />
      ) : (
        <span>{user?.first_name?.[0]}</span>
      )}
    </div>
  );
}
