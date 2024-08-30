import Icon from '@shared/components/common/icons';
import Text from '@shared/wrappers/Text';
import Title from '@shared/wrappers/Title';
import {
  Button,
  Col, Divider, Row, Space,
  Spin,
} from 'antd';
import parse from 'html-react-parser';
import ActivityAttributes from '@shared/components/common/attributes/attribites';
import CollapsedText from 'app/activity/components/desktop/collapsedText/collapsedText';
import CollapsedTextMore from '@shared/components/mobile/collapsedText/collapsedText';
import ActivityCollage from 'app/activity/components/desktop/activityCollage/activityCollage';
import CustomDropDownSelector from 'app/activity/components/desktop/customDropdownSelector/customDropdownSelector';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Man from 'app/assets/images/man.png';
import { ActivitySchema, ActivityType } from '@shared/api/home/schemas';
import { ActivityRatingSchema } from '@shared/api/activity/schemas';
import { z } from 'zod';
import './_activtyDesktop.scss';
import FullPageCollage from 'app/activity/components/desktop/activityCollage/fullPageCollage';
import MoreModal from 'app/activity/components/desktop/moreModal/moreModal';
import PriceDetailsModal from 'app/activity/components/desktop/priceDetailsModal/priceDetails';
import ActivityCard, { parseActivityPropsFromSchema } from '@shared/components/common/activityCard/activityCard';
import FullDayActivity from 'app/activity/components/desktop/fullDayActivity/fullDayActivity';
import FullDayActivityTimeChoices from '@app/activity/components/desktop/fullDayActivity/fullDayActivityTimeChoices';
import LocationMap from '@shared/components/desktop/locationMap/locationMap';
import { getHostSlugFromActivity } from '@shared/utils/urlUtils';
import ActivityDateChoices from '@app/activity/components/desktop/fullDayActivity/activityDateChoices';
import ChoiceOfFewActivity from '@app/activity/components/desktop/choiceOfFewActivity/choiceOfFewActivity';
import QueryHandler from '@shared/components/common/queryHandler/queryHandler';
import homeApi from '@shared/api/home/homeApi';
import ActivityTypes from '@shared/constants/activity';
import { useActivitySelectedDetailsContext } from '@shared/hooks/activityDetailsContext';

export default function ActivityDesktop({
  isLoading,
  activity,
  activityRating,
  onHeart,
}: {
  isLoading: boolean,
  onHeart: () => void,
  activity: ActivityType,
  activityRating: z.infer<typeof ActivityRatingSchema>,
}) {
  const {
    adults, children, basePrice, date, actualTickets, setActivityId,
    setAdults, setChildren, setBasePrice, setDate, setTime, setActualTickets,
  } = useActivitySelectedDetailsContext();
  const [seePhotos, setSeePhotos] = useState(false);
  const [cancellationModal, setCancellationModal] = useState(false);
  const [safetyModal, setSafetyModal] = useState(false);
  const [isPriceModalVisible, setIsPriceModalVisible] = useState(false);

  const [pos, setPos] = useState({ lat: 10, lng: 10 });

  const router = useRouter();

  useEffect(() => {
    setBasePrice(Number(activity?.base_price || 0));
    setActivityId(activity?.id || 0);
    if (activity?.activity_types === 6 && activity.ticket_schedule?.price_json) {
      setBasePrice(Number(activity?.ticket_schedule?.price_json.tickets[0].price) || 0);
      setActualTickets(activity.ticket_schedule.price_json.tickets.map((ticket) => ({
        type: ticket.type,
        quantitySelected: 0,
      })));
    }
  }, [activity]);

  const updateActualTicket = (type: string, amount: number) => {
    const newTickets = actualTickets?.map((ticket) => {
      if (ticket.type === type) {
        return {
          type,
          quantitySelected: amount,
        };
      }

      return ticket;
    }) || [];
    setActualTickets(newTickets);
  };

  const allActivitiesQuery = homeApi.getActivities.useInfiniteQuery({
    facility_id: activity?.facility_id ?? 1,
  });

  const riderAbility = activity?.rider_ability;

  let activityType = 'Hours';
  let categoryType = 'Individual';
  let ridingType = null;
  if (activity) {
    if (activity.activity_types === ActivityTypes.packages) {
      activityType = 'Packages';
    } else if (activity.activity_types === ActivityTypes.virtual) {
      activityType = 'Virtual Courses';
    } else if (activity.activity_types === ActivityTypes.competitions) {
      activityType = 'Competitions';
    } else if (activity.activity_types === ActivityTypes.tickets) {
      activityType = 'Tickets';
    }

    if (activity.category_group_status === 1 && activity.category_individual_status === 1) {
      categoryType = 'Individual, Group';
    } else if (activity.category_group_status === 1) {
      categoryType = 'Group';
    }

    if (riderAbility && riderAbility.length > 0) {
      const start = riderAbility[0];
      if (start === 1) {
        ridingType = 'Beginner';
      } else if (start === 2) {
        ridingType = 'Novice';
      } else if (start === 3) {
        ridingType = 'Intermediate';
      } else if (start === 4) {
        ridingType = 'Strong Intermediate';
      } else if (start === 5) {
        ridingType = 'Advanced';
      }
    }
  }

  const toggleCancellationModal = () => {
    setCancellationModal(!cancellationModal);
  };

  const toggleSafetyModal = () => {
    setSafetyModal(!safetyModal);
  };

  const togglePriceModal = () => {
    setIsPriceModalVisible(!isPriceModalVisible);
  };

  const toggleSeePhotos = () => {
    setSeePhotos(!seePhotos);
  };

  const openCheckout = () => {
    router.push('/checkout');
  };

  useEffect(() => {
    if (activity?.facility_details) {
      setPos({
        lat: Number(activity.latitude || '10'),
        lng: Number(activity.longitude || '10'),
      });
    }
  }, [activity]);

  return (
    <div className="activityDesktop">
      {isLoading && <Spin />}
      {seePhotos && activity && (
        <section className="seePhotosSection">
          <h1>
            <Icon name="back" className="icon" onClick={toggleSeePhotos} />
          </h1>
          <Title level={1} className="title">{activity.name}</Title>
          <Row justify="space-between" align="middle" className="details">
            <Col span={12}>
              <Text>
                {activity.facility_details?.facility_name}
                ,&nbsp;
                {activity.facility_details?.country}
              </Text>
            </Col>
            <Col span={8}>
              <Row justify="end" align="middle" className="actions">
                <Space>
                  <span className="icon">
                    <Icon name="share" />
                    <Text className="share">Share</Text>
                  </span>
                  <span className="icon" onClick={onHeart}>
                    <Icon name={activity?.is_favourite ? 'heartfilled' : 'heart'} />
                    <Text className="wishlist">Wishlist</Text>
                  </span>
                </Space>
              </Row>
            </Col>
          </Row>
          <Divider />
          <FullPageCollage
            img1={activity.img_1_url || ''}
            img2={activity.img_2_url || ''}
            img3={activity.img_3_url || ''}
            img4={activity.img_4_url || ''}
            img5={activity.img_5_url || ''}
          />
        </section>
      )}
      {!seePhotos && activity && (
        <>
          <section>
            <Space direction="vertical" size={1} style={{ width: '100%' }}>
              <Title className="activityHeading">{activity.name}</Title>
              <Text className="activityLocation">
                {activity.facility_details?.facility_name}
                ,&nbsp;
                {activity.facility_details?.country}
              </Text>
              <Row justify="space-between" align="middle" className="header">
                <Col span={12} className="iconDisplay">
                  <Icon name="star" style={{ paddingTop: '2px' }} />
                  {activityRating?.rating}
                </Col>
                <Col span={8}>
                  <Row justify="end" align="middle">
                    <Space>
                      <span className="iconDisplay">
                        <Icon name="share" />
                        <Text>Share</Text>
                      </span>
                      <span className="iconDisplay">
                        <Icon name="heart" />
                        <Text>Wishlist</Text>
                      </span>
                    </Space>
                  </Row>
                </Col>
              </Row>
            </Space>
            <Divider />
            <ActivityCollage
              img1={activity.img_1_url || ''}
              img2={activity.img_2_url || ''}
              img3={activity.img_3_url || ''}
              img4={activity.img_4_url || ''}
              img5={activity.img_5_url || ''}
              toggleSeePhotos={toggleSeePhotos}
            />
          </section>
          <section className="collage">
            <Row justify="space-between">
              <Col md={14} xl={15}>
                <div>
                  <Title className="descriptionHeading">
                    {activity.facility_details?.overview_quick_view?.brief_description_heading}
                  </Title>
                  <CollapsedTextMore
                    maxHeight={80}
                    description={activity?.facility_details?.overview_quick_view?.brief_description || ''}
                    side="left"
                  />
                </div>
                <Divider style={{ marginBottom: 0 }} />
                <Space>
                  <Image
                    src={Man}
                    alt="man"
                    width={40}
                    height={40}
                    className="hostInfo"
                  />
                  <Space direction="vertical">
                    <Link href={`/hosts/${getHostSlugFromActivity(activity)}`}>
                      <Title level={4} className="hostInfoHeading">
                        Hosted by&nbsp;
                        {activity.facility_details?.facility_name}
                      </Title>
                    </Link>
                    <div className="hostInfoSec">
                      <Icon name="message" width={24} height={24} />
                      <Link href={`/hosts/${getHostSlugFromActivity(activity)}?message=true`} style={{ textDecoration: 'none' }}>
                        <p>Message host</p>
                      </Link>
                    </div>
                  </Space>
                </Space>
                <Divider />
                <div className="attributes">
                  <ActivityAttributes icon="activity" name="Activity" description={activity?.eq_main_activity?.title || ''} />
                </div>
                <div className="attributes">
                  <ActivityAttributes icon="type1" name="Activity Type" description={activityType} />
                </div>
                <div className="attributes">
                  <ActivityAttributes icon="list" name="Category" description={categoryType} />
                </div>
                {ridingType && (
                  <div className="attributes">
                    <ActivityAttributes icon="chart" name="Riding Ability" description={ridingType} />
                  </div>
                )}
                <Divider />
                <div>
                  <Title className="descriptionHeading">
                    Session Description
                  </Title>
                  <div>
                    {parse(activity?.session_description || '')}
                  </div>
                </div>
                <Divider style={{ marginBottom: 0 }} />
              </Col>
              <Col md={9} xl={8}>
                <div className="pricingDetails">
                  <Text className="priceText">
                    From&nbsp;
                    <b>
                      $
                      {basePrice}
                    </b>
                    &nbsp;/ per person
                  </Text>
                  <p className="priceDetails" onClick={togglePriceModal}>
                    Show price details
                  </p>
                  <div className="dropdownSelector">
                    {![ActivityTypes.tickets, ActivityTypes.virtual].includes(activity.activity_types || 0) && (
                      <CustomDropDownSelector
                        adultsCount={adults}
                        childrenCount={children}
                        setAdultsCount={setAdults}
                        setChildrenCount={setChildren}
                        adult={activity.age_adult_status || 0}
                        child={activity.age_child_status || 0}
                        both={activity.age_both_status || 0}
                        minAge={activity.age_minimum || '12'}
                        basePrice={`$${basePrice}`}
                      />
                    )}
                    {activity.activity_types && [ActivityTypes.tickets, ActivityTypes.hourly].includes(activity.activity_types) && activity.ticket_schedule?.date_selection_format !== 'date range' && (
                      <FullDayActivityTimeChoices
                        activity={activity}
                        actualDate={date}
                        setBasePrice={setBasePrice}
                        setDate={setDate}
                        setTime={setTime}
                      />
                    )}
                    {activity.activity_types === ActivityTypes.tickets && activity.ticket_schedule?.date_selection_format === 'date range' && (
                      <ActivityDateChoices
                        activity={activity}
                        setDate={setDate}
                      />
                    )}
                    {activity.activity_types === ActivityTypes.tickets && activity.ticket_schedule?.price_json && (
                      <ChoiceOfFewActivity
                        priceJson={activity.ticket_schedule?.price_json}
                        currency={activity.facility_details?.base_currency || 'GBP'}
                        maxTickets={activity.unit || 10}
                        incActualTicket={updateActualTicket}
                      />
                    )}
                    {activity.activity_types === ActivityTypes.packages && (
                      <FullDayActivity
                        activity={activity}
                        setBasePrice={setBasePrice}
                        setDate={setDate}
                      />
                    )}
                    <Button type="primary" className="button" onClick={openCheckout}>Book Now</Button>
                  </div>
                </div>
              </Col>
            </Row>
          </section>
          <section style={{ marginTop: '40px' }}>
            <LocationMap
              title={activity.facility_details?.overview_quick_view?.specialities_title || ''}
              description={activity.facility_details?.overview_quick_view?.specialities_descrioption || ''}
              pos={pos}
              header
            />
            <Divider />
            <div>
              <Title className="descriptionHeading">Things to know</Title>
              <Row justify="center" style={{ marginBottom: '40px' }}>
                <Col span={6}>
                  <Title level={5}>Cancellation Policy</Title>
                  <div style={{ marginLeft: '10px' }}>
                    <CollapsedText
                      description={activity.cancellation_policy || `
                        <ul>
                          <li>OK This is our cancelation policy</li>
                          <li>OK This is our cancelation policy</li>
                          <li>OK This is our cancelation policy</li>
                          <li>OK This is our cancelation policy</li>
                          <li>OK This is our cancelation policy</li>
                          <li>OK This is our cancelation policy</li>
                          <li>OK This is our cancelation policy</li>
                          <li>OK This is our cancelation policy</li>
                        </ul>
                      `}
                      maxHeight={80}
                      side="left"
                      toggleExpand={toggleCancellationModal}
                    />
                  </div>
                </Col>
                <Col span={6}>
                  <Title level={5}>Safety Information & What to bring</Title>
                  <div style={{ marginLeft: '10px' }}>
                    <CollapsedText
                      toggleExpand={toggleSafetyModal}
                      description={activity.eq_tcs?.description || ''}
                      maxHeight={80}
                      side="left"
                    />
                  </div>
                </Col>
              </Row>
            </div>
            <Divider />
            <div>
              <Title className="descriptionHeading">More Activities with this Host</Title>
              <Row justify="center">
                <Col span={22}>
                  <div className="activitiesScroller">
                    <QueryHandler queries={[allActivitiesQuery]}>
                      {allActivitiesQuery.data?.map((activity, i) => (
                        <ActivityCard
                          key={i}
                          {...parseActivityPropsFromSchema(activity)}
                          onFvrt={() => {
                            homeApi.getActivities.setData(undefined, ((old) => (old).map((o) => {
                              if (o.id === activity.id) {
                                o.is_favourite = !o.is_favourite;
                              }

                              return o;
                            })));
                          }}
                        />
                      ))}
                    </QueryHandler>
                  </div>
                </Col>
              </Row>
            </div>
            <MoreModal
              header="Cancellation Policy"
              content={activity.cancellation_policy || `
              <ul>
                <li>OK This is our cancelation policy</li>
                <li>OK This is our cancelation policy</li>
                <li>OK This is our cancelation policy</li>
                <li>OK This is our cancelation policy</li>
                <li>OK This is our cancelation policy</li>
                <li>OK This is our cancelation policy</li>
                <li>OK This is our cancelation policy</li>
                <li>OK This is our cancelation policy</li>
              </ul>
            `}
              toggleModal={toggleCancellationModal}
              open={cancellationModal}
            />
            <MoreModal
              header="Safety Information & What to bring"
              content={activity.eq_tcs?.description || `
              <ul>
                <li>OK This is our safety policy</li>
                <li>OK This is our safety policy</li>
                <li>OK This is our safety policy</li>
                <li>OK This is our safety policy</li>
                <li>OK This is our safety policy</li>
                <li>OK This is our safety policy</li>
                <li>OK This is our safety policy</li>
                <li>OK This is our safety policy</li>
              </ul>
            `}
              toggleModal={toggleSafetyModal}
              open={safetyModal}
            />
            <PriceDetailsModal
              vat={activity.facility_details.vat_percentage}
              price={`$${basePrice}` || ''}
              open={isPriceModalVisible}
              days={activity.activity_type_days || 0}
              toggleModal={togglePriceModal}
            />
          </section>
        </>
      )}
    </div>
  );
}
