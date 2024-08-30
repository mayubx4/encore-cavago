import React from 'react';
import './_allWishlistsMobile.scss';
import { Button } from 'antd';
import WishlistCard from '@shared/components/desktop/wishlistCard/wishlistCard';

export default function AllWishlistsMobile() {
  return (
    <div className="allWishlistsContainerMobile">
      <div className="headerContainer">
        <h2 className="title">Wishlists</h2>
        <Button type="link" className="actionButton">
          Edit
        </Button>
      </div>
      <div className="wishlistCardsContainrMobile">
        <WishlistCard />
        <WishlistCard />
        <WishlistCard />
      </div>
    </div>
  );
}
