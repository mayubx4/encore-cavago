import React from 'react';
import './_wishlistCard.scss';
import Image from 'next/image';
import { Button } from 'antd';
import Icon from '@shared/components/common/icons';
import { useSharedModalPopupContext } from '@shared/hooks/sharedModalPopUp';

export default function WishlistCard() {
  const modal = useSharedModalPopupContext();

  return (
    <div className="wishlistCardContainer">
      <div className="imageContainer">
        <Image className="image" width={336} height={336} src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/991px-Placeholder_view_vector.svg.png" alt="" />
        <Button
          shape="circle"
          className="closeButton"
          onClick={() => modal.showModal({
            header: <h2>Delete this wishlist?</h2>,
            body: <p>Beach rides for summer 24” will be permanently deleted.</p>,
            footer: (
              <div>
                <Button type="link" onClick={modal.closeModal}>
                  Cancel
                </Button>
                <Button shape="round">
                  Delete
                </Button>
              </div>
            ),
          })}
        >
          <Icon name="cross" width={24} height={24} />
        </Button>
      </div>
      <div className="infoContainer">
        <p className="cardtitle">
          Title
        </p>
        <p className="cardsubtitle">Sub Title</p>
      </div>
    </div>
  );
}
