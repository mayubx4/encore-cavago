'use Client';

import React from 'react';
import './_wishlistActivitiesDesktop.scss';
import MinimalHeader from '@shared/components/desktop/header/minimalHeader';
import { Col, Row } from 'antd';
import Icon from '@shared/components/common/icons';
import ActivityCard, { parseActivityPropsFromSchema } from '@shared/components/common/activityCard/activityCard';
import wishlistApi from '@shared/api/wishlist/wishlistApi';
import InfiniteScroll from 'react-infinite-scroll-component';
import Animations from '@shared/components/common/animations';
import QueryHandler from '@shared/components/common/queryHandler/queryHandler';

export default function allWishlistsDesktop() {
  const wishlistQuery = wishlistApi.getWishlist.useInfiniteQuery({ limit: 10 });

  return (
    <>
      <div className="header-desktop">
      <div className="headerParent">
        <MinimalHeader />
      </div>
      </div>
      <div className="wishlistActivitiesContainer">
        <Row justify="center">
          <Col xs={22}>
            <div className="actionBar">
              <Icon name="caretLeft" width={32} height={32} />
              {/* <div className="actionBarIcons">
                <IconTextRow iconName="share" text="Share" iconColor={colors.neutrals[500]}
                iconWidth={20} iconHeight={20} />
                <IconTextRow iconName="trash" text="Delete" iconColor={colors.neutrals[500]}
                iconWidth={20} iconHeight={20} />
              </div> */}
            </div>
            <h2 className="title">Wishlist</h2>
            <InfiniteScroll
              dataLength={wishlistQuery.data?.length || 0}
              next={wishlistQuery.fetchNextPage}
              hasMore={!!wishlistQuery.hasNextPage}
              loader={<Animations name="cavagoLoader" style={{ width: 100, height: 100 }} />}
              scrollThreshold={1}
            >
              <div className="itemLists">
                <QueryHandler queries={[wishlistQuery]}>
                  {wishlistQuery.data?.map((card, i) => (
                    <ActivityCard
                      key={i}
                      {...parseActivityPropsFromSchema(card.activity_details)}
                      isFavourite
                      onFvrt={() => {
                        wishlistApi.getWishlist
                          .deleteItem({ limit: 10 }, (o) => o.activity_details.id === card.activity_details.id);
                      }}
                    />
                  ))}
                </QueryHandler>
              </div>
            </InfiniteScroll>
          </Col>
        </Row>
      </div>
    </>
  );
}
