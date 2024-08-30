import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Button, Col, Row, Spin,
} from 'antd';
import moment from 'moment';
import Icon from '@shared/components/common/icons';
import BookingCard from '@shared/components/desktop/bookingCard/bookingCard';
import BookingDetails from 'app/checkout/components/desktop/bookingDetails/bookingDetails';
import PaymentDetails from 'app/checkout/components/desktop/paymentDetails/paymentDetails';
import './_checkoutDesktop.scss';
import ActivityApi from '@shared/api/activity/ActivityApi';
import checkoutApi from '@shared/api/checkout/checkoutApi';
import { PromoCodeType } from '@shared/api/checkout/schemas';
import { useAuthenticationContext } from '@shared/hooks/authenticationContext';
import { useActivitySelectedDetailsContext } from '@shared/hooks/activityDetailsContext';

interface AddOnsQuantity {
  id: number;
  quantity: number;
  price: number;
}

function CheckoutDesktop() {
  const router = useRouter();
  const authContext = useAuthenticationContext();

  const {
    adults, children, basePrice, date, time, activityId, actualTickets,
  } = useActivitySelectedDetailsContext();

  const [numberOfAdults, setNumberOfAdults] = useState(adults ? Number(adults) : 0);
  const [numberOfChildren, setNumberOfChildren] = useState(children ? Number(children) : 0);
  const [addOns, setAddOns] = useState<AddOnsQuantity[] | null>(null);
  const [promoCode, setPromoCode] = useState<string>();
  const [promoCodeData, setPromoCodeData] = useState<PromoCodeType>();
  const [isPromoCodeCorrect, setIsPromoCodeCorrect] = useState<boolean | undefined>();

  const activityQuery = ActivityApi.getActivity.useQuery(activityId || '0');
  const activity = activityQuery.data;
  const getActivityRatingQuery = ActivityApi.getActivityRating.useQuery(activityId || '0');
  const activityRating = getActivityRatingQuery.data;
console.log(activity,'activity');

  const applyPromoCodeQuery = checkoutApi.applyPromoCode.useMutation({
    onSuccess: (data) => {
      setPromoCodeData(data);
      setIsPromoCodeCorrect(true);
    },
    onError: () => {
      setIsPromoCodeCorrect(false);
    },
  });

  const createSessionQuery = checkoutApi.createSession.useMutation({
    onSuccess: (data) => {
      router.replace(data.url);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  useEffect(() => {
    setAddOns(
      activity?.activity_add_ons?.map((item) => ({
        id: item.id,
        price: Number(item.price),
        quantity: item.mandatory_status === 1 ? 1 : 0,
      })) || null,
    );
  }, [activity]);

  useEffect(() => {
    if (promoCode && isPromoCodeCorrect) {
      const updatedPromoCodeData: any = {
        ...promoCodeData,
        discounted_amount: (activityCharges.price + addOnCharges.price) * ((promoCodeData?.discounted_percentage || 0) / 100),
      };
      setPromoCodeData(updatedPromoCodeData);
    }
  }, [numberOfAdults, numberOfChildren, addOns]);

  const onApplyPromoCode = () => {
    if (promoCode) {
      applyPromoCodeQuery.mutate({
        sub_activity_id: Number(activityId),
        sub_total: activityCharges.price,
        add_on: addOnCharges.price,
        vat: vat.price,
        promo_code: promoCode,
      });
    }
  };

  // if (!activityId) {
  //   return (
  //     <Spin />
  //   );
  // }

  // if (!activity) {
  //   return (
  //     <Spin />
  //   );
  // }

  const activityCharges = {
    description:'asd' ,
    // activity.activity_types !== 4 ? `Activity charges x ${numberOfAdults} adults${numberOfChildren > 0 ? ` x ${numberOfChildren} children` : ''}` : 'Course fee',
    price:'asd'
    //  (basePrice * numberOfAdults) + (basePrice * numberOfChildren),
  };

  const addOnCharges = {
    description: 'Add-on',
    price: addOns?.reduce((acc, item) => acc + (item.price * item.quantity), 0) || 0,
  };

  const vat = {
    description:'xzc', 
    // `Vat (${activity?.facility_details?.vat_percentage || 0}%)`,
    price:'asd' 
    // (activityCharges.price + addOnCharges.price) * ((activity?.facility_details?.vat_percentage || 0) / 100),
  };

  const totalCharges = [activityCharges, vat];
  // if (activity.activity_add_ons && activity.activity_add_ons.length) {
  //   totalCharges.splice(1, 0, addOnCharges);
  // }
  const totalPrice =123 
  // activityCharges.price + addOnCharges.price + vat.price - (promoCodeData?.discounted_amount || 0);

  const updateQuantity = (id: number, quantity: number) => {
    if (addOns) {
      const updatedAddOns = addOns?.map((item) => {
        if (item.id === id) {
          return { ...item, quantity };
        }

        return item;
      }) || null;
      setAddOns(updatedAddOns);
    }
  };
  const onPayment = () => {
    if (authContext && authContext.user && activity) {
      let [fromDate, toDate] = date?.split('|') || [];
      if (fromDate === toDate) {
        toDate = null;
      }
      if (fromDate) {
        fromDate = moment(fromDate).toISOString();
      }
      if (toDate) {
        toDate = moment(toDate).toISOString();
      }

      // createSessionQuery.mutate({
      //   line_items: [
      //     {
      //       name: activity.name,
      //       description: activity.name,
      //       amount: Math.round(totalPrice * 100),
      //       currency: activity.facility_details.base_currency,
      //       quantity: 1,
      //     }],
      //   customer_email: authContext?.user?.email,
      //   success_url: `${window.location.origin}/checkout/payment-success`,
      //   cancel_url: `${window.location.origin}/checkout/payment-cancelled`,
      //   metadata: {
      //     activity_id: activity.id,
      //     payment_details: {
      //       voucher_id: promoCodeData?.voucher_id,
      //       sub_total: activityCharges.price + addOnCharges.price,
      //       grand_total: totalPrice,
      //       vat: vat.price,
      //       discounted_amount: promoCodeData?.discounted_amount,
      //     },
      //     currency_details: {
      //       currency_code: activity.facility_details.base_currency,
      //       exchange_rate: 0,
      //     },
      //     from_date: fromDate,
      //     to_date: toDate,
      //     time_slots: time ? [{
      //       name: time,
      //     }] : null,
      //     activity_qty: numberOfAdults + numberOfChildren,
      //   },
      // });
    }
  };

  return (
    <div className="checkoutRoot">
      <div className="checkoutHeadingContainer">
        <Button type="link" onClick={router.back}>
          <Icon name="backArrow" />
        </Button>
        <h2 className="checkoutHeading">Checkout and pay</h2>
      </div>
      <div className="checkoutContainer">
        <Row justify="space-between">
          <Col span={24} md={24} lg={24} xl={10}>
            <BookingDetails
              date={date || ''}
              time={time || ''}
              activity={activity}
              adults={numberOfAdults}
              child={numberOfChildren}
              promoCode={promoCode}
              onApplyPromoCode={onApplyPromoCode}
              setAdults={setNumberOfAdults}
              setChildren={setNumberOfChildren}
              setPromoCode={setPromoCode}
              isPromoCodeCorrect={isPromoCodeCorrect}
              setIsPromoCodeCorrect={setIsPromoCodeCorrect}
              basePrice={basePrice}
              updateQuantity={updateQuantity}
            />
          </Col>
          <Col span={24} md={24} lg={24} xl={12}>
            <BookingCard
              imageSrc={activity?.img_1_url || ''}
              rating={activityRating?.rating || 0}
              title={activity?.name}
              currency={activity.facility_details.base_currency}
              location={`${activity.facility_details.facility_name} ${activity.facility_details.country}`}
              totalCharges={totalCharges}
              promoCode={promoCode}
              promoCodeData={promoCodeData}
              totalPrice={totalPrice}
            />
          </Col>
        </Row>
        <PaymentDetails onPayment={onPayment} isLoading={createSessionQuery.isLoading} />
      </div>
    </div>
  );
}

export default CheckoutDesktop;
