'use client';

import { useWhichDeviceContext } from '@shared/hooks/whichDeviceContext';
import React from 'react';
import MinimalHeader from '@shared/components/desktop/header/minimalHeader';
import '@shared/components/desktop/header/_header.scss';
import api from '@shared/api/activity/ActivityApi';
import ActivityDesktop from './desktop/activityDesktop';
import ActivityMobile from './mobile/activityMobile';
import wishlistApi from '@shared/api/wishlist/wishlistApi';
import { ActivitySelectedDetailsContextProvider } from '@shared/hooks/activityDetailsContext';

export default function Activity({ activityId }: { activityId: string }) {
  const device = useWhichDeviceContext();

  const getActivityQuery = api.getActivity.useQuery(activityId);
  const getActivityRatingQuery = api.getActivityRating.useQuery(activityId);
  const activity = getActivityQuery.data;
  const activityRating = getActivityRatingQuery.data;
  const activityQuery = wishlistApi.toggleFvrt.useMutation({
    onSuccess: () => {
      api.getActivity.setData(activityId, (d) => ({ ...d, is_favourite: !d.is_favourite }));
    },
  });
  const onHeart = () => activityQuery.mutate({ activity_id: activityId, mark_unfavourite: !!activity?.is_favourite });

  if (device === 'desktop') {
    return (
      <>
        <div className="header-desktop">
          <div className="headerParent">
            <MinimalHeader />
          </div>
        </div>
        <ActivityDesktop
          onHeart={onHeart}
          activity={activity}
          isLoading={getActivityQuery.isLoading}
          activityRating={activityRating}
        />
      </>
    );
  }

  return (
    <ActivityMobile
      activity={activity}
      isLoading={getActivityQuery.isLoading}
      activityRating={activityRating}
      onHeart={onHeart}
    />
  );
}
