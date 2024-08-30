'use client';

import { Spin, Typography } from 'antd';
import React from 'react';
import colors from '@shared/theme/colors';
import './_activityCart.scss';
import { ActivityType } from '@shared/api/home/schemas';
import wishlistApi from '@shared/api/wishlist/wishlistApi';
import { useAuthenticationContext } from '@shared/hooks/authenticationContext';
import { useRouter } from 'next/navigation';
import { generateActivityProfileUrlFromActivity } from '@shared/utils/urlUtils';
import Icon from '../icons';

import IconTextRow from '../iconTextRow/iconTextRow';
import Link from 'next/link';

interface ActivityCardProps {
  img: string;
  title: string;
  rating: string | number;
  price: string | number;
  address: string;
  isFavourite: boolean;
  facility_id: number;
  onFvrt?: () => void;
  id: number;
}
export function parseActivityPropsFromSchema(schema: ActivityType):
  ActivityCardProps {
  return {
    facility_id: schema.facility_details?.id,
    facility_name: schema.facility_details?.facility_name,
    id: schema.id,
    isFavourite: schema.is_favourite ?? false,
    img: schema.img_1_url || 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/991px-Placeholder_view_vector.svg.png',
    title: schema.name,
    rating: 0,
    price: schema.base_price ?? '',
    address: schema?.facility_details?.city && schema.facility_details.country ? `${schema.facility_details.city}, ${schema.facility_details.country}` : '',
  };
}
export default function ActivityCard({
  img,
  title,
  rating,
  price,
  address,
  onFvrt,
  id,
  isFavourite,
  facility_id,
  facility_name
}: ActivityCardProps) {
  const authState = useAuthenticationContext();
  const nav = useRouter();
  const query = wishlistApi.toggleFvrt.useMutation({
    onSuccess: onFvrt,
  });

  const onHeart = () => {
    query.mutate({ activity_id: id, mark_unfavourite: isFavourite || undefined });
  };

  return (
    <div
      className="cardContainer"
    >
      <div className="activityImageContainer">
        <img
          src={img}
          alt="Activity"
          className="activityImage"
          width={350}
          height={250}
        />
        {
          authState.isLoggedIn && (
            <button className="heartButton" onClick={onHeart} disabled={query.isLoading}>
              {query.isLoading ? (<Spin />) : (
                <Icon name={isFavourite ? 'heartfilled' : 'heart'} color={colors.neutrals[500]} />)}
            </button>
          )
        }
      </div>
      <Link
        className="titleTxtContainer"
        href={generateActivityProfileUrlFromActivity({
          id,
          facility_details: {
            facility_name: facility_name,
            id: facility_id,
          },
        } as Partial<ActivityType>)}
      >
        <Typography.Text className="titleTxt">
          {title}
        </Typography.Text>
        <IconTextRow iconColor={colors.primary[500]} iconName="star" text={rating?.toString()} />
      </Link>
      <div>
        <span className="locationtxt">
          {address}
        </span>
      </div>
      <span className="price-text">
        Starting From
        {' '}
        <span>
          £
          {Number(price).toFixed(2)}
        </span>
      </span>
    </div>
  );
}
