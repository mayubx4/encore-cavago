import { ActivityType } from '@shared/api/home/schemas';
import _ from 'lodash';

export function getHostSlugFromActivity(activity: Partial<ActivityType>) {
  return `${activity.facility_details?.facility_name?.replace(/[^\w\s]/gi, '').split(' ').join('-')}-${activity.facility_details?.id}`.toLowerCase();
}

export function getHostIdFromHostSlug(hostSlug: string) {
  return _.last(hostSlug?.split('-'));
}

export function generateActivityProfileUrlFromActivity(activity: Partial<ActivityType>) {
  return `/hosts/${getHostSlugFromActivity(activity)}/activities/${activity.id}`;
}
