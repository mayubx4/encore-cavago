'use client';

import React, { ChangeEvent } from 'react';
import {
  Row, Col,
  Divider,
} from 'antd';
import AddOnItem from '@shared/components/common/addOnItem/addOnItem';
import PromoCodeField from '@shared/components/common/promoCodeField/promoCodeField';
import './_bookingDetails.scss';
import moment from 'moment';
import { z } from 'zod';
import { ActivitySchema } from '@shared/api/home/schemas';
import CustomDropDownSelector from '@app/activity/components/desktop/customDropdownSelector/customDropdownSelector';

function BookingDetails({
  date,
  time,
  adults,
  child,
  promoCode,
  setPromoCode,
  onApplyPromoCode,
  setAdults,
  setChildren,
  activity,
  basePrice,
  updateQuantity,
  isPromoCodeCorrect,
  setIsPromoCodeCorrect,
}: {
  date: string;
  time: string;
  activity: z.infer<typeof ActivitySchema>;
  adults: number;
  child: number;
  promoCode: string | undefined;
  setAdults: (value: number) => void;
  setChildren: (value: number) => void;
  setPromoCode: (value: string) => void;
  basePrice: number;
  updateQuantity: (id: number, quantity: number) => void;
  onApplyPromoCode: () => void;
  isPromoCodeCorrect: boolean | undefined;
  setIsPromoCodeCorrect: (value: boolean | undefined) => void;
}) {
  const formattedDate = activity?.activity_types === 2 ? date.split('|') : [];

  return (
    <div className="bookingRootContainer">
      <Row gutter={[0, 32]}>
        <Row gutter={[0, 60]}>
          <Col span={24}>
            <h4 className="text">Your booking</h4>
          </Col>

          <Row gutter={[0, 52]}>
            <Col span={24}>
              <h5 className="text" style={{ fontSize: 20 }}>
                {activity?.activity_types === 1 ? 'Date and time' : 'Dates'}
              </h5>
              <p className="dateValue">
                {activity?.activity_types === 1 && `${moment(date).format('ddd, MMM D, YYYY')} • ${time}`}
                {activity?.activity_types === 2 && `${moment(formattedDate[0]).format('ddd, MMM D, YYYY')} - ${moment(formattedDate[1]).format('ddd, MMM D, YYYY')}`}
              </p>
            </Col>

            <Row gutter={[0, 18]}>
              <Col span={24}>
                <p className="text" style={{ fontSize: 20 }}>Number of Guests</p>
              </Col>
              <Col span={24}>
                <CustomDropDownSelector
                  adultsCount={adults}
                  childrenCount={child}
                  setAdultsCount={setAdults}
                  setChildrenCount={setChildren}
                  adult={activity.age_adult_status || 0}
                  child={activity.age_child_status || 0}
                  both={activity.age_both_status || 0}
                  minAge={activity.age_minimum || '12'}
                  basePrice={`$${basePrice}`}
                />
              </Col>
            </Row>
          </Row>
        </Row>
        <Divider style={{ margin: 0 }} />
        {activity.activity_add_ons && activity.activity_add_ons.length > 0 && (
          <>
            <Col span={24}>
              <Row gutter={[0, 18]}>
                <Col span={24}>
                  <p className="text" style={{ fontSize: 18 }}>Choose add-ons</p>
                </Col>
                <Col span={24}>
                  <Row gutter={[0, 12]}>
                    {activity.activity_add_ons.map((item, idx) => (
                      <Col span={24} key={`add-on-${idx}`}>
                        <AddOnItem item={item} updateQuantity={updateQuantity} currency={activity.facility_details.base_currency} />
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </Col>
            <Divider style={{ margin: 0 }} />
          </>
        )}
        <Col span={24}>
          <PromoCodeField
            value={promoCode}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setIsPromoCodeCorrect(undefined);
              setPromoCode(e.target.value);
            }}
            onApply={onApplyPromoCode}
            isCorrect={isPromoCodeCorrect}
          />
        </Col>
        <Divider style={{ margin: 0 }} />
      </Row>
    </div>
  );
}

export default BookingDetails;
