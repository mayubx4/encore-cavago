import {
  Spin, Button,
  Col,
  Row,
  Space,
  Divider,
  Collapse,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ActivitySchema } from '@shared/api/home/schemas';
import { ActivityRatingSchema } from '@shared/api/activity/schemas';
import { z } from 'zod';
import parse from 'html-react-parser';
import api from '@shared/api/activity/ActivityApi';
import ActivityCarousel from '@shared/components/mobile/activityCarousel/activityCarousel';
import Icon from '@shared/components/common/icons';
import Man from 'app/assets/images/man.png';
import colors from '@shared/theme/colors';
import Title from '@shared/wrappers/Title';
import Text from '@shared/wrappers/Text';
import './_activtyMobile.scss';
import Image from 'next/image';
import ActivityAttributes from '@shared/components/common/attributes/attribites';
import CollapsedText from '@shared/components/mobile/collapsedText/collapsedText';
import Animations from '@shared/components/common/animations';
import InfiniteScroll from 'react-infinite-scroll-component';
import ActivityCard, { parseActivityPropsFromSchema } from '@shared/components/common/activityCard/activityCard';
import LocationMobile from '@shared/components/mobile/locationMobile/locationMobile';
import HostCard from '@shared/components/mobile/hostCard/hostCard';
import Link from 'next/link';
import { getHostSlugFromActivity } from '@shared/utils/urlUtils';
import QueryHandler from '@shared/components/common/queryHandler/queryHandler';
import homeApi from '@shared/api/home/homeApi';

export default function ActivityMobile({
  isLoading,
  activity,
  activityRating,
  onHeart,
}: {
  isLoading: boolean,
  activity: z.infer<typeof ActivitySchema>,
  activityRating: z.infer<typeof ActivityRatingSchema>,
  onHeart: () => void
}) {
  const router = useRouter();
  const [pos, setPos] = useState({ lat: 10, lng: 10 });

  const allActivitiesQuery = homeApi.getActivities.useInfiniteQuery({
    facility_id: activity?.facility_id ?? 1,
  });

  useEffect(() => {
    if (activity?.facility_details) {
      setPos({
        lat: Number(activity?.facility_details?.overview_quick_view.latitude || '10'),
        lng: Number(activity?.facility_details?.overview_quick_view.longitude || '10'),
      });
    }
  }, [activity]);

  const riderAbility = activity?.rider_ability;

  let activityType = 'Hours';
  let categoryType = 'Individual';
  let ridingType = null;
  if (activity) {
    if (activity.activity_types === 2) {
      activityType = 'Packages';
    } else if (activity.activity_types === 4) {
      activityType = 'Virtual Courses';
    } else if (activity.activity_types === 5) {
      activityType = 'Competitions';
    }

    if (activity.category_group_status === 1 && activity.category_individual_status == 1) {
      categoryType = 'Individual, Group';
    } else if (activity.category_group_status === 1) {
      categoryType = 'Group';
    }

    if (riderAbility && riderAbility.length > 0) {
      const start = riderAbility[0];
      if (start === 1) {
        ridingType = 'Beginner';
      } else if (start === 2) {
        ridingType = 'Novice';
      } else if (start === 3) {
        ridingType = 'Intermediate';
      } else if (start === 4) {
        ridingType = 'Strong Intermediate';
      } else if (start === 5) {
        ridingType = 'Advanced';
      }
    }
  }

  return (
    <div className="activityMobile">
      {isLoading && <Spin />}
      {activity && (
        <section>
          <div className="firstDiv">
            <Button shape="circle" className="heartButton">
              <Icon name="backArrow" color={colors.neutrals[500]} className="icon" />
            </Button>
          </div>
          <div className="secondDiv">
            <Button shape="circle" className="heartButton btn" onClick={onHeart}>
              <Icon name={activity?.is_favourite ? 'heartfilled' : 'heart'} color={colors.neutrals[500]} />
            </Button>
            <Button shape="circle" className="heartButton">
              <Icon name="share" color={colors.neutrals[500]} />
            </Button>
          </div>
          <ActivityCarousel
            img1={activity.img_1_url || ''}
            img2={activity.img_2_url || ''}
            img3={activity.img_3_url || ''}
            img4={activity.img_4_url || ''}
            img5={activity.img_5_url || ''}
          />
          <main className="mainContent">
            <Title className="activityHeading">{activity.name}</Title>
            <p className="locName">
              {activity.facility_details?.facility_name}
              ,&nbsp;
              {activity.facility_details?.country}
            </p>
            <div>
              <Space direction="horizontal">
                <Icon width={16} height={16} name="goldenStar" style={{ marginTop: 5 }} />
                {activityRating?.rating}
                {' • '}
                {activityRating?.review_count}
                reviews
              </Space>
            </div>
            <p className="description">
              {parse(activity?.facility_details?.overview_quick_view?.brief_description || '')}
            </p>
            <Divider />
            <Space>
              <Image
                src={Man}
                alt="man"
                width={40}
                height={40}
                className="hostInfo"
              />
              <Space direction="vertical" size={1}>
                <Link href={`/hosts/${getHostSlugFromActivity(activity)}`}>
                  <Text className="hostInfo">
                    Hosted by&nbsp;
                    {activity.facility_details?.facility_name}
                  </Text>
                </Link>
                <Text className="hostInfoSec">
                  3 years hosting
                </Text>
              </Space>
            </Space>
            <Divider />
            <Row justify="space-between" align="middle" style={{ cursor: 'pointer' }} onClick={() => router.push(`/hosts/${getHostSlugFromActivity(activity)}?message=true`)}>
              <Col span={20}>
                <Space size="middle">
                  <Icon name="message" width={20} height={20} />
                  <Title level={5} color={colors.neutrals[500]}>Message your Host</Title>
                </Space>
              </Col>
              <Col span={4} style={{ textAlign: 'right' }}>
                <Icon name="arrowNext" width={20} height={20} />
              </Col>
            </Row>
            <Divider />
            <div className="attributes">
              <ActivityAttributes icon="activity" name="Activity" description={activity?.eq_main_activity?.title || ''} />
            </div>
            <div className="attributes">
              <ActivityAttributes icon="type1" name="Activity Type" description={activityType} />
            </div>
            <div className="attributes">
              <ActivityAttributes icon="list" name="Category" description={categoryType} />
            </div>
            {ridingType && (
              <div className="attributes">
                <ActivityAttributes icon="chart" name="Riding Ability" description={ridingType} />
              </div>
            )}
            <Divider />
            <div>
              <Title className="activityHeading">Session Description</Title>
              <CollapsedText
                side="left"
                maxHeight={80}
                description={activity?.session_description || ''}
              />
            </div>
            <Divider />
            <div>
              <Title className="activityHeading">Booking Details</Title>
              <Title level={5} color={colors.neutrals[500]}>Cancellation Policy</Title>
              <CollapsedText
                side="left"
                maxHeight={20}
                description={`
                  <ul>
                    <li>This is a limit.</li>
                    <li>This is a limit.</li>
                    <li>This is a limit.</li>
                    <li>This is a limit.</li>
                    <li>This is a limit.</li>
                    <li>This is a limit.</li>
                    <li>This is a limit.</li>
                    <li>This is a limit.</li>
                    <li>This is a limit.</li>
                    <li>This is a limit.</li>
                  </ul>
                `}
              />
              <Title level={5} color={colors.neutrals[500]}>Safety & Other Information</Title>
              <CollapsedText
                side="left"
                maxHeight={20}
                description={`
                  <ul>
                    <li>This is a limit.</li>
                    <li>This is a limit.</li>
                    <li>This is a limit.</li>
                    <li>This is a limit.</li>
                    <li>This is a limit.</li>
                    <li>This is a limit.</li>
                    <li>This is a limit.</li>
                    <li>This is a limit.</li>
                    <li>This is a limit.</li>
                    <li>This is a limit.</li>
                  </ul>
                `}
              />
            </div>
            <Divider />
            <LocationMobile
              pos={pos}
              header
              description={activity?.facility_details?.overview_quick_view.specialities_descrioption || ''}
              title={activity?.facility_details?.overview_quick_view.specialities_title || ''}
            />
            <Divider />
            <div>
              <Title level={4} color={colors.neutrals[500]}>Browser Similar Activities</Title>
              <Row justify="center">
                <Col xs={24}>
                  <div className="activitiesScroller">
                    <QueryHandler queries={[allActivitiesQuery]}>
                      {allActivitiesQuery.data?.map((activity, i) => (
                        <ActivityCard
                          key={i}
                          {...parseActivityPropsFromSchema(activity)}
                          onFvrt={() => {
                            homeApi.getActivities.setData(undefined, ((old) => (old).map((o) => {
                              if (o.id === activity.id) {
                                o.is_favourite = !o.is_favourite;
                              }

                              return o;
                            })));
                          }}
                        />
                      ))}
                    </QueryHandler>
                  </div>
                </Col>
              </Row>
            </div>
            <Divider />
            <HostCard
              hostName="John Doe"
              rating={3}
              reviewsCount={10}
            />
            <Divider />
            <Row justify="space-between" align="middle">
              <Col span={12}>
                <Space direction="vertical" size={1}>
                  <Text color={colors.neutrals[300]} style={{ fontWeight: 300, fontSize: 14 }}>
                    Per person
                  </Text>
                  <Title level={5} color={colors.neutrals[500]}>
                    From&nbsp;
                    $
                    {activity.base_price}
                    /day
                  </Title>
                </Space>
              </Col>
              <Col span={12}>
                <Button type="primary" className="bookNow" onClick={() => router.push(`/checkout?activityId=${activity.id}`)}>
                  <b>Book now</b>
                </Button>
              </Col>
            </Row>
          </main>
        </section>
      )}
    </div>
  );
}
