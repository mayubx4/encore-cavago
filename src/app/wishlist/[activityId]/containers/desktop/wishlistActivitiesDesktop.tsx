'use Client';

import React from 'react';
import './_wishlistActivitiesDesktop.scss';
import MinimalHeader from '@shared/components/desktop/header/minimalHeader';
import { Col, Row } from 'antd';
import Icon from '@shared/components/common/icons';
import IconTextRow from '@shared/components/common/iconTextRow/iconTextRow';
import colors from '@shared/theme/colors';
import ActivityCard from '@shared/components/common/activityCard/activityCard';

export default function allWishlistsDesktop() {
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
              <div className="actionBarIcons">
                <IconTextRow iconName="share" text="Share" iconColor={colors.neutrals[500]} iconWidth={20} iconHeight={20} />
                <IconTextRow iconName="trash" text="Delete" iconColor={colors.neutrals[500]} iconWidth={20} iconHeight={20} />
              </div>
            </div>
            <h2 className="title">Beach rides for summer 24</h2>
            <div className="itemLists">
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
              <ActivityCard
                img="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/991px-Placeholder_view_vector.svg.png"
                title="Test"
                rating="1"
                price="12"
                address="saasc"
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
