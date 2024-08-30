import React from 'react';
import './_seeAllActivityList.scss';
import { Button, Col, Row } from 'antd';
import QueryHandler, { QueryType } from '@shared/components/common/queryHandler/queryHandler';
import ActivityCard, { parseActivityPropsFromSchema } from '@shared/components/common/activityCard/activityCard';
import { ActivityType } from '@shared/api/home/schemas';
import InfiniteScroll from 'react-infinite-scroll-component';
import Animations from '@shared/components/common/animations';
import BottomSheet, { useBottomSheet } from '../bottomSheet/BottomSheet';

export default function SeeAllActivityList({ query }:
  {
    query: QueryType & {
      data: ActivityType[];
      fetchNextPage: () => void;
      hasNextPage: boolean;
    }
  }) {
  const seeAllBottomSheet = useBottomSheet();

  return (
    <div className="seeAllContainer">
      <Row justify="center">
        <Col xs={24}>
          <div className="title">
            <h2>
              Popular
            </h2>
            <Button type="link" onClick={() => seeAllBottomSheet.setOpen(true)}>
              See All
            </Button>
          </div>
        </Col>
      </Row>

      <Row justify="center">
        <Col xs={24}>
          <div className="activitiesScroller">
            <QueryHandler queries={[query]}>
              {(query?.data)?.map((activity, i) => (
                <ActivityCard key={i} {...parseActivityPropsFromSchema(activity)} />
              ))}
            </QueryHandler>
          </div>
        </Col>
        <BottomSheet title={null} {...seeAllBottomSheet} fullscreen>
          <InfiniteScroll
            dataLength={query.data?.length || 0}
            next={query.fetchNextPage}
            hasMore={!!query.hasNextPage}
            loader={<Animations name="cavagoLoader" style={{ width: 100, height: 100 }} />}
            scrollThreshold={1}
          >
            <QueryHandler queries={[query]}>
              {(query?.data)?.map((activity, i) => (
                <ActivityCard
                  key={i}
                  {...parseActivityPropsFromSchema(activity)}
                  onFvrt={() => {
                    query.setData(undefined, ((old) => (old).map((o) => {
                      if (o.id === activity.id) {
                        o.is_favourite = !o.is_favourite;
                      }

                      return o;
                    })));
                  }}
                />
              ))}
            </QueryHandler>
          </InfiniteScroll>
        </BottomSheet>
      </Row>
    </div>
  );
}
