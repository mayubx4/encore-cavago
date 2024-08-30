import React from 'react';
import Activity from '../containers';

export default function Page({ params }: { params: { activityId: string } }) {
  return (
    <Activity activityId={params.activityId} />
  );
}
