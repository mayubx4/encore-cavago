import React from 'react';
import './_wishlistActivitiesMobile.scss';
import { Button } from 'antd';
import WishlistCard from '@shared/components/desktop/wishlistCard/wishlistCard';
import Icon from '@shared/components/common/icons';
import colors from '@shared/theme/colors';
import ActivityCard from '@shared/components/common/activityCard/activityCard';

export default function AllWishlistsMobile() {
  return (
    <div className="allWishlistsContainerMobile">
      <div className="headerContainer">
        <Icon name="caretLeft" width={24} height={24} />
        <div className="actionContainer">
          <Button shape="circle" className="actionButton">
            <Icon name="pencil" width={20} height={20} color={colors.neutrals[500]} />
          </Button>
          <Button shape="circle" className="actionButton">
            <Icon name="share" width={20} height={20} color={colors.neutrals[500]} />
          </Button>
          <Button shape="circle" className="actionButton">
            <Icon name="trash" width={20} height={20} color={colors.neutrals[500]} />
          </Button>
        </div>
      </div>
      <h2 className="pagetitle">Group activities 2024</h2>
      <div className="wishlistCardsContainrMobile">
        <ActivityCard
          img="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/991px-Placeholder_view_vector.svg.png"
          title="Test"
          rating="1"
          price="12"
          address="saasc"
        />
        <ActivityCard
          img="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/991px-Placeholder_view_vector.svg.png"
          title="Test"
          rating="1"
          price="12"
          address="saasc"
        />
        <ActivityCard
          img="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/991px-Placeholder_view_vector.svg.png"
          title="Test"
          rating="1"
          price="12"
          address="saasc"
        />
      </div>
    </div>
  );
}
