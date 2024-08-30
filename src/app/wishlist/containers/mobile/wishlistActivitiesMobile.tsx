import React from 'react';
import './_wishlistActivitiesMobile.scss';
import Icon from '@shared/components/common/icons';
import ActivityCard, { parseActivityPropsFromSchema } from '@shared/components/common/activityCard/activityCard';
import wishlistApi from '@shared/api/wishlist/wishlistApi';
import InfiniteScroll from 'react-infinite-scroll-component';
import Animations from '@shared/components/common/animations';
import QueryHandler from '@shared/components/common/queryHandler/queryHandler';

export default function AllWishlistsMobile() {
  const wishlistQuery = wishlistApi.getWishlist.useInfiniteQuery({ limit: 10 });

  return (
    <div className="allWishlistsContainerMobile">
      <div className="headerContainer">
        <Icon name="caretLeft" width={24} height={24} />
        {/* <div className="actionContainer">
          <Button shape="circle" className="actionButton">
            <Icon name="pencil" width={20} height={20} color={colors.neutrals[500]} />
          </Button>
          <Button shape="circle" className="actionButton">
            <Icon name="share" width={20} height={20} color={colors.neutrals[500]} />
          </Button>
          <Button shape="circle" className="actionButton">
            <Icon name="trash" width={20} height={20} color={colors.neutrals[500]} />
          </Button>
        </div> */}
      </div>
      <h2 className="pagetitle">Wishlist</h2>
      <InfiniteScroll
        dataLength={wishlistQuery.data?.length || 0}
        next={wishlistQuery.fetchNextPage}
        hasMore={!!wishlistQuery.hasNextPage}
        loader={<Animations name="cavagoLoader" style={{ width: 100, height: 100 }} />}
        scrollThreshold={1}
      >
        <div className="wishlistCardsContainrMobile">
          <QueryHandler queries={[wishlistQuery]}>
            {wishlistQuery.data?.map((card, i) => (
              <ActivityCard
                key={i}
                {...parseActivityPropsFromSchema(card.activity_details)}
                isFavourite
                onFvrt={() => {
                  wishlistApi.getWishlist.deleteItem({ limit: 10 }, (o) => o.activity_details.id === card.activity_details.id);
                }}
              />
            ))}
          </QueryHandler>
        </div>
      </InfiniteScroll>
    </div>
  );
}
