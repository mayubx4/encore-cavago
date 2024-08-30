import React, { ChangeEvent, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Row, Col, Button, Typography, Divider,
  Space,
  Image,
  Spin,
} from 'antd';
import moment from 'moment';
import { toast } from 'sonner';
import currencySymbolMap from 'currency-symbol-map';
import { useAuthenticationContext } from '@shared/hooks/authenticationContext';
import ActivityApi from '@shared/api/activity/ActivityApi';

import NumberStepper from '@shared/components/common/numberStepper/numberStepper';
import AddOnItem from '@shared/components/common/addOnItem/addOnItem';
import PromoCodeField from '@shared/components/common/promoCodeField/promoCodeField';
import Icon from '@shared/components/common/icons';
import CourseSchedulePicker from '@shared/components/common/courseSchedulePicker/courseSchedulePicker';

import CollapsedText from '@shared/components/mobile/collapsedText/collapsedText';
import ScrollableDateRangePicker from '@shared/components/common/scrollableDateRangePicker/scrollableDateRangePicker';
import PaymentBreakDown from '@app/checkout/components/mobile/paymentBreakDown/paymentBreakDown';
import checkoutApi from '@shared/api/checkout/checkoutApi';
import { PromoCodeType } from '@shared/api/checkout/schemas';
import './_checkoutMobile.scss';

const { Title, Text } = Typography;

function CheckoutMobile() {
  const router = useRouter();
  const authContext = useAuthenticationContext();
  const searchParams = useSearchParams();
  const activityId = searchParams.get('activityId');

  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');

  const activityQuery = ActivityApi.getActivity.useQuery(activityId || '0');
  const activity = activityQuery.data;

  const getActivityRatingQuery = ActivityApi.getActivityRating.useQuery(activityId || '0');
  const activityRating = getActivityRatingQuery.data;

  const [numberOfAdults, setNumberOfAdults] = useState<number>(1);
  const [numberOfChildren, setNumberOfChildren] = useState<number>(0);
  const [showDate, setShowDate] = useState<boolean>(false);
  const [showCourse, setCourse] = useState<boolean>(false);
  const [addOns, setAddOns] = useState<{ id: number; quantity: number; price: number; }[]>();
  const [basePrice, setBasePrice] = useState<number>(0);

  const [promoCode, setPromoCode] = useState<string>();
  const [promoCodeData, setPromoCodeData] = useState<PromoCodeType>();
  const [isPromoCodeCorrect, setIsPromoCodeCorrect] = useState<boolean | undefined>();

  useEffect(() => {
    setBasePrice(Number(activity?.base_price || 0));
    if (activity && activity.activity_add_ons) {
      setAddOns(
        activity.activity_add_ons.map((item) => ({
          id: item.id,
          price: Number(item.price),
          quantity: item.mandatory_status === 1 ? 1 : 0,
        })),
      );
    }
  }, [activity]);

  useEffect(() => {
    const updatedPromoCodeData: any = { ...promoCodeData };
    if (promoCode && isPromoCodeCorrect) {
      updatedPromoCodeData.discounted_amount = (activityCharges.price + addOnCharges.price) * ((promoCodeData?.discounted_percentage || 0) / 100);
      setPromoCodeData(updatedPromoCodeData);
    }
  }, [numberOfAdults, numberOfChildren, addOns]);

  const activityCharges = {
    description: activity?.activity_types !== 4 ? `Activity charges x ${numberOfAdults} adults${numberOfChildren > 0 ? ` x ${numberOfChildren} children` : ''}` : 'Course fee',
    price: (basePrice * numberOfAdults) + (basePrice * numberOfChildren),
  };
  const addOnCharges = {
    description: 'Add-on',
    price: addOns?.reduce((acc, item) => acc + (item.price * item.quantity), 0) || 0,
  };
  const vat = {
    description: `Vat (${activity?.facility_details?.vat_percentage || 0}%)`,
    price: (activityCharges?.price + addOnCharges.price) * ((activity?.facility_details?.vat_percentage || 0) / 100),
  };

  const totalPrice = activityCharges.price + addOnCharges.price + vat.price - (promoCodeData?.discounted_amount || 0);

  const paymentBreakDownItems: { description: string; price: number; percentage?: number; }[] = [activityCharges, vat];

  if (activity?.activity_add_ons?.length) {
    paymentBreakDownItems.push(addOnCharges);
  }

  if (activity?.activity_add_ons && activity?.activity_add_ons.length) {
    paymentBreakDownItems.splice(1, 0, addOnCharges);
  }

  if (promoCodeData) {
    paymentBreakDownItems.push({
      description: promoCode ?? '',
      price: promoCodeData.discounted_amount,
      percentage: promoCodeData.discounted_percentage,
    });
  }

  const applyPromoCodeQuery = checkoutApi.applyPromoCode.useMutation({
    onSuccess: (data) => {
      setPromoCodeData(data);
      setIsPromoCodeCorrect(true);
    },
    onError: () => {
      setIsPromoCodeCorrect(false);
    },
  });

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

  const updateQuantity = (id: number, quantity: number) => {
    if (addOns) {
      const updatedAddOns = addOns.map((item) => {
        if (item.id === id) {
          return { ...item, quantity };
        }

        return item;
      });
      setAddOns(updatedAddOns);
    }
  };

  const createSessionQuery = checkoutApi.createSession.useMutation({
    onSuccess: (data) => {
      router.replace(data.url);
    },
    onError: () => {
      toast.error('Error occured while proceeding for payment.');
    },
  });

  const onPayment = () => {
    if (authContext && authContext.user && activity) {
      let [fromDate, toDate]: string[] | null[] = date?.split('|') || [];
      if (fromDate === toDate) {
        toDate = null;
      }
      if (fromDate) {
        fromDate = moment(fromDate).toISOString();
      }
      if (toDate) {
        toDate = moment(toDate).toISOString();
      }

      createSessionQuery.mutate({
        line_items: [
          {
            name: activity?.name,
            amount: Math.round(totalPrice * 100),
            currency: activity?.facility_details.base_currency,
            quantity: 1,
          }],
        customer_email: authContext?.user?.email,
        success_url: `${window.location.origin}/checkout/payment-success`,
        cancel_url: `${window.location.origin}/checkout/payment-cancelled
        `,
        metadata: {
          activity_id: activity?.id,
          payment_details: {
            voucher_id: promoCodeData?.voucher_id,
            sub_total: activityCharges.price + addOnCharges.price,
            grand_total: totalPrice,
            vat: vat.price,
            discounted_amount: promoCodeData?.discounted_amount,
          },
          currency_details: {
            currency_code: activity?.facility_details.base_currency,
            exchange_rate: 0,
          },
          from_date: fromDate,
          to_date: toDate,
          time_slots: time ? [{
            name: time,
          }] : null,
          activity_qty: numberOfAdults + numberOfChildren,
        },
      });
    }
  };

  if (!activityId) {
    router.back();
  }

  if (!activity) {
    <Spin />;
  }

  return (
    <>
      {showDate && (
        <ScrollableDateRangePicker
          onStepDecrement={() => setShowDate(false)}
          availablityFrom={activity?.availablity_from}
          availablityTo={activity?.availablity_to}
          activityTypeHours={activity?.activity_type_hours}
          availableSpecificTimeStatus={activity?.available_specific_time_status}
          availableFromTime={activity?.available_from_time}
          availableToTime={activity?.available_to_time}
          availableTimeSlots={activity?.available_time_slots}
          daysDisabled={activity?.days_disabled}
          seasonalRates={activity?.seasonal_rates}
          exceptionDates={activity?.exception_dates}
          setSelectedDate={setDate}
          setSelectedTimeSlot={setTime}
          selectedDate={date ?? ''}
          selectedTimeSlot={time ?? ''}
          setBasePrice={setBasePrice}
          minRange={activity?.activity_type_days}
          maxRange={activity?.activity_type_days}
          packageSpecificDate={activity?.package_specific_date}
        />
      )}
      {showCourse && (
        <CourseSchedulePicker
          setCourse={setCourse}
          options={[
            {
              id: 1,
              disabled: false,
              date: 'Sunday 30th March',
              venue: 'Diamond Hall, Pakistan',
            },
            {
              id: 2,
              disabled: true,
              date: 'Monday 31th March',
              venue: 'Diamond Hall, Pakistan',
            },
            {
              id: 3,
              disabled: true,
              date: 'Tuesday 1st April',
              venue: 'Diamond Hall, Pakistan',
            },
            {
              id: 4,
              disabled: false,
              date: 'Wednesday 2nd April',
              venue: 'Diamond Hall, Pakistan',
            },
          ]}
        />
      )}
      {!showDate && !showCourse && (
        <div className="activityDetailsContainer">
          <Icon
            name="backArrow"
            width={24}
            height={24}
            style={{ flexShrink: 0 }}
            onClick={() => {
              router.back();
            }}
          />
          <h4 className="heading">Make a booking</h4>
          <Row gutter={[0, 24]}>
            <Row gutter={16} style={{ columnGap: 16 }}>
              <Col>
                <div>
                  <Image
                    src={activity?.img_1_url || ''}
                    alt="A horserider"
                    className="image"
                    preview={false}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className="activityDetails">
                  <div className="metadata">
                    <Text className="text">{activity?.name}</Text>
                    <Text className="secondaryText">
                      {activity?.facility_details?.facility_name}
                      {' '}
                      {activity?.facility_details?.country}
                    </Text>
                  </div>

                  <div className="reviewContainer">
                    <Icon name="yellowStar" width={12} height={12} />
                    <Text className="secondaryText">
                      {activityRating?.rating}
                    </Text>
                    <Text className="secondaryText">
                      •
                    </Text>
                    <Text className="secondaryText">
                      {activityRating?.review_count}
                      &nbsp;
                      reviews
                    </Text>
                  </div>
                </div>
              </Col>
            </Row>

            <Divider style={{ margin: 0 }} />
            {activity?.activity_types !== 4 && (
              <>
                <Col span={24}>
                  <Row gutter={[0, 16]}>
                    <Col span={24}>
                      <Title level={5} className="text">Your activity</Title>
                    </Col>
                    <Col span={24}>
                      <Row justify="space-between">
                        <Col span={18}>
                          <Space direction="vertical" size={1}>
                            <Title level={5} className="text">Dates</Title>
                            <Text className="secondaryText">
                              {date !== '' && activity?.package_specific_date_status === 1 && `${moment(date).format('ddd, DD MMM')} - ${moment(date).add((activity?.activity_type_days || 1) - 1, 'days').format('ddd, DD MMM')}`}
                              {date !== '' && activity?.package_specific_date_status !== 1 && `${moment(date).format('ddd, DD MMM')}`}
                              {time !== '' && ` • ${time}`}
                              {date === '' && (activity?.activity_types === 1 ? 'Add your date and time' : 'Add your date')}
                            </Text>
                          </Space>
                        </Col>
                        <Col span={6} style={{ textAlign: 'right' }}>
                          <Title
                            level={5}
                            className="text"
                            onClick={() => setShowDate(true)}
                            style={{ textDecoration: 'underline', cursor: 'pointer' }}
                          >
                            {`${activity?.activity_types === 1 ? 'Add date and time' : 'Add date'}`}
                          </Title>
                        </Col>
                      </Row>
                    </Col>
                    {activity?.activity_types === 5 && (
                      <Col span={24}>
                        <Row justify="space-between">
                          <Col span={18}>
                            <Space direction="vertical" size={1}>
                              <Title level={5} className="text">Course Date & Venue</Title>
                              <Text className="secondaryText">Sunday 30th March - Diamond Hall, Pakistan</Text>
                            </Space>
                          </Col>
                          <Col span={6} style={{ textAlign: 'right' }}>
                            <Title
                              level={5}
                              className="text"
                              onClick={() => setCourse(true)}
                              style={{ textDecoration: 'underline' }}
                            >
                              Edit
                            </Title>
                          </Col>
                        </Row>
                      </Col>
                    )}
                    <Col span={24}>
                      <Row justify="space-between" align="middle">
                        <Col>
                          <Title level={5} className="text">Adults</Title>

                          <Text className="secondaryText" style={{ color: '#808C96' }}>
                            {currencySymbolMap(activity?.facility_details?.base_currency)}
                            {basePrice}
                          </Text>
                          <Text className="secondaryText">
                            {` x ${numberOfAdults}`}
                          </Text>
                        </Col>
                        <Col>
                          <NumberStepper
                            min={1}
                            value={numberOfAdults}
                            onChange={setNumberOfAdults}
                          />
                        </Col>
                      </Row>
                    </Col>
                    {(activity?.age_both_status === 1 || activity?.age_child_status === 1) && (
                      <Col span={24}>
                        <Row justify="space-between" align="middle">
                          <Col>
                            <Title level={5} className="text">Children</Title>

                            <Text className="secondaryText" style={{ color: '#808C96' }}>
                              {currencySymbolMap(activity?.facility_details?.base_currency)}
                              {basePrice}
                            </Text>
                            <Text className="secondaryText">
                              {` x ${numberOfChildren}`}
                            </Text>
                          </Col>
                          <Col>
                            <NumberStepper
                              min={0}
                              value={numberOfChildren}
                              onChange={setNumberOfChildren}
                            />
                          </Col>
                        </Row>
                      </Col>
                    )}
                  </Row>
                </Col>
                <Divider style={{ margin: 0 }} />
              </>
            )}
            {activity?.activity_add_ons && activity?.activity_add_ons.length > 0 && (
              <>
                <Col span={24}>
                  <Row gutter={[0, 16]}>
                    <Col span={24}>
                      <Title level={5} className="text">Choose add-ons</Title>
                    </Col>
                    <Col span={24}>
                      <Row>
                        {activity?.activity_add_ons.map((item, idx) => (
                          <Col span={24}>
                            <AddOnItem key={`add-on-${idx}`} item={item} updateQuantity={updateQuantity} currency={activity?.facility_details?.base_currency} />
                          </Col>
                        ))}
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Divider style={{ margin: 0 }} />
              </>
            )}
            {activity?.cancellation_policy && (
              <div className="policyContainer">
                <Row gutter={[0, {
                  xs: 16, sm: 16, md: 24, lg: 24, xl: 24,
                }]}
                >
                  <Col span={12}>
                    <p className="policyHeading">Cancellation Policy</p>
                  </Col>
                </Row>
                <CollapsedText
                  limit={15}
                  side="left"
                  description={activity?.cancellation_policy}
                />
                <Divider style={{ margin: 0 }} />
              </div>
            )}
            <Col span={24}>
              <div className="breakDownMContainer">
                <Row gutter={[0, 20]}>
                  <Col span={24}>
                    <Title level={5} className="breakdownHeading">Payment breakdown</Title>
                  </Col>
                  <Col span={24}>
                    <Row gutter={[0, 12]}>
                      {paymentBreakDownItems?.map((item) => (
                        <Col span={24}>
                          <PaymentBreakDown
                            price={item.price}
                            description={item.description}
                            promoCode={!!item?.percentage}
                            currency={activity?.facility_details?.base_currency ?? 'GBP'}
                          />
                        </Col>
                      ))}
                      <Col span={24}>
                        <Row justify="space-between" style={{ padding: '10px 0' }}>
                          <Col span={16}>
                            <Text className="totalPriceText">Total</Text>
                          </Col>
                          <Col span={8} style={{ textAlign: 'right' }}>
                            <Text className="totalPriceText">
                              {currencySymbolMap(activity?.facility_details?.base_currency)}
                              {totalPrice?.toFixed(2) || 0}
                            </Text>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
            <Divider style={{ margin: 0 }} />

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

            <Col span={24}>
              <div className="termsAndConditionsContainer">
                <p className="termsAndConditions">
                  By clicking the button below, I accept the&nbsp;
                  <span style={{ textDecorationLine: 'underline' }}>terms and conditions</span>
                  &nbsp;of Cavago's&nbsp;
                  <span style={{ textDecorationLine: 'underline' }}>booking and refunds policies.</span>
                </p>
              </div>
            </Col>
            <Col span={24}>
              <div className="paymentButtonContainer">
                <Button
                  type="primary"
                  className="paymentButton"
                  onClick={onPayment}
                  disabled={createSessionQuery.isLoading}
                  loading={createSessionQuery.isLoading}
                >
                  <Text className="paymentButtonText">Proceed to Payment</Text>
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default CheckoutMobile;
