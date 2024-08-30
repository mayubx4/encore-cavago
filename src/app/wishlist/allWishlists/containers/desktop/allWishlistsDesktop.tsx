'use Client';

import React from 'react';
import './_allWishlistsDesktop.scss';
import MinimalHeader from '@shared/components/desktop/header/minimalHeader';
import { Col, Row } from 'antd';
import WishlistCard from '@shared/components/desktop/wishlistCard/wishlistCard';

export default function allWishlistsDesktop() {
  return (
    <>
      <div className="header-desktop">
        <div className="headerParent">
          <MinimalHeader />
        </div>
      </div>
      <div className="allWishlistsContainer">
        <Row justify="center">
          <Col xs={22}>
            <h2 className="title">Wishlists</h2>
            <div className="itemLists">
              <WishlistCard />
              <WishlistCard />
              <WishlistCard />
              <WishlistCard />
              <WishlistCard />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
