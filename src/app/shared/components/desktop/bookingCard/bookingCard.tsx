'use client';

import React from 'react';
import {
  Divider, Image, Space,
} from 'antd';
import Icon from '@shared/components/common/icons';
import currencySymbolMap from 'currency-symbol-map';
import './_bookingCard.scss';
import { PromoCodeType } from '@shared/api/checkout/schemas';

interface AddOnType {
  description: string,
  price: number,
}

interface BookingCardProps {
  imageSrc: string;
  rating: number;
  title: string;
  location: string;
  totalCharges: AddOnType[];
  promoCode: string | undefined;
  promoCodeData: PromoCodeType | undefined;
  totalPrice: number;
  currency: string;
}

function BookingCard({
  imageSrc, rating, title, location, totalCharges, totalPrice, promoCodeData, promoCode, currency,
}: BookingCardProps) {
  return (
    <div className="card">
      <div className="details">
        <div>
          <Image src={imageSrc} alt="A horserider" className="image" />
        </div>
        <Space direction="vertical" style={{ gap: 12 }}>
          <h4 className="text">{title}</h4>
          <p className={location}>
            {location}
          </p>
          <div className="review">
            <Icon name="outlinedStar" />
            <span className="text" style={{ fontSize: 18 }}>
              {rating?.toFixed(2)}
            </span>
          </div>
        </Space>
      </div>
      <div className="priceBreakDownContainer">

        <div className="headingContainer">
          <h4 className="heading">Price breakdown</h4>
        </div>
        <div className="priceDetails">
          {
            totalCharges.map(({ description, price }, i) => (
              <div className="subDetails" key={i}>
                <p className="text">{description}</p>
                <p className="priceValue">
                  {`${price < 0 ? '-' : ''}${currencySymbolMap(currency)}${Math.abs(price).toFixed(2)}`}
                </p>
              </div>
            ))
          }
          {promoCodeData && (
            <div className="subDetails">
              <p className="text promoText">{promoCode}</p>
              <p className="priceValue promoText">
                {`-${currencySymbolMap(currency)}${Math.abs(promoCodeData.discounted_amount).toFixed(2)}`}
              </p>
            </div>
          )}
        </div>
      </div>
      <Divider className="divider" />
      <div className="grandTotal">
        <p className="grandTotalText">
          Grand Total
        </p>
        <p className="grandTotalText" style={{ textAlign: 'right' }}>
          {`${currencySymbolMap(currency)}${totalPrice?.toFixed(2)}`}
        </p>
      </div>
    </div>
  );
}

export default BookingCard;
