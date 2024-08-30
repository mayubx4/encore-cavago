'use Client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import './_hostProfileDesktop.scss';
import HostProfile from '@assets/images/man.png';
import hostApi from '@shared/api/host/hostApi';
import { useParams, useSearchParams } from 'next/navigation';
import ActivityCard, { parseActivityPropsFromSchema } from '@shared/components/common/activityCard/activityCard';
import QueryHandler from '@shared/components/common/queryHandler/queryHandler';
import homeApi from '@shared/api/home/homeApi';
import Accordion from '@shared/components/common/accordion/accordion';
import { Modal } from 'antd';
import { useBottomSheet } from '@shared/components/mobile/bottomSheet/BottomSheet';
import { HostProfileType } from '@shared/api/host/schemas';
import LocationMap from '@shared/components/desktop/locationMap/locationMap';
import { getHostIdFromHostSlug } from '@shared/utils/urlUtils';
import HostMessageModal from '../../components/hostMessageModal/hostMessageModal';

export default function HostProfileDesktop() {
  const params = useSearchParams();
  const { hostId: hostSlug } = useParams();
  const hostId = getHostIdFromHostSlug(hostSlug.toString());
  const [showMessage, setShowMessage] = useState(params.get('message') === 'true');
  const getHostProfileQuery = hostApi.getHostProfile.useQuery(hostId);
  const {
    data: hostProfile,
  } = getHostProfileQuery;
  const viewActivitiesSectRef = useRef();

  const toggleMessage = (e) => {
    e.preventDefault();
    setShowMessage(!showMessage);
  };

  return (
    <QueryHandler queries={[getHostProfileQuery]}>
      {hostProfile && (
        <div>
          <div className="host-profile-banner">
            <img src={hostProfile?.facility_images?.img_1_url} alt="HostProfile" />
            <Gallery host={hostProfile} />
          </div>
          <div className="host-main-content">
            <div className="host-profile-info">
              <div className="profile-info">
                <div className="img-holder">
                  <Image src={HostProfile} alt="HostProfile" />
                </div>
                <div className="info">
                  <div className="head">
                    <h2>
                      {hostProfile.facility_user.first_name}
                      {' '}
                      {hostProfile.facility_user.last_name}
                    </h2>
                    {/* <div className="ratting-info">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M4.06197 17.3734C3.62773 17.5962 3.13498 17.2058 3.22273 16.7074L4.15647 11.3862L0.19311 7.61068C-0.177014 7.25743 0.0153601 6.61168 0.511484 6.54193L6.02172 5.75894L8.47871 0.891073C8.70034 0.452325 9.29996 0.452325 9.52158 0.891073L11.9786 5.75894L17.4888 6.54193C17.9849 6.61168 18.1773 7.25743 17.8061 7.61068L13.8438 11.3862L14.7776 16.7074C14.8653 17.2058 14.3726 17.5962 13.9383 17.3734L8.99846 14.8354L4.06197 17.3734Z" fill="white" />
                    </svg>
                    4.90
                  </div> */}
                  </div>
                  <ul className="info-list">
                    <li>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M17.5 8.33398C17.5 14.1673 10 19.1673 10 19.1673C10 19.1673 2.5 14.1673 2.5 8.33398C2.5 6.34486 3.29018 4.43721 4.6967 3.03068C6.10322 1.62416 8.01088 0.833984 10 0.833984C11.9891 0.833984 13.8968 1.62416 15.3033 3.03068C16.7098 4.43721 17.5 6.34486 17.5 8.33398Z" stroke="#566573" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 10.834C11.3807 10.834 12.5 9.7147 12.5 8.33398C12.5 6.95327 11.3807 5.83398 10 5.83398C8.61929 5.83398 7.5 6.95327 7.5 8.33398C7.5 9.7147 8.61929 10.834 10 10.834Z" stroke="#566573" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {hostProfile.city}
                      {', '}
                      {hostProfile.country}
                    </li>
                    {hostProfile.activities_for_all_skill_levels && (
                      <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M10.6226 7.81152C10.6226 7.99694 10.5677 8.1782 10.4646 8.33237C10.3616 8.48654 10.2152 8.6067 10.0439 8.67766C9.87261 8.74862 9.68411 8.76718 9.50225 8.73101C9.32039 8.69484 9.15335 8.60555 9.02223 8.47444C8.89112 8.34332 8.80183 8.17628 8.76566 7.99442C8.72949 7.81256 8.74805 7.62406 8.81901 7.45276C8.88997 7.28145 9.01013 7.13503 9.1643 7.03202C9.31847 6.92901 9.49973 6.87402 9.68515 6.87402C9.93379 6.87402 10.1722 6.9728 10.3481 7.14861C10.5239 7.32443 10.6226 7.56288 10.6226 7.81152ZM18.1226 10.1146C18.0875 12.2196 17.2389 14.2291 15.7548 15.7222C14.2708 17.2154 12.2664 18.0761 10.1617 18.124H9.99218C7.99964 18.138 6.07235 17.4145 4.58124 16.0928C4.45692 15.9822 4.3816 15.8268 4.37186 15.6608C4.36212 15.4947 4.41875 15.3315 4.52929 15.2072C4.63983 15.0829 4.79523 15.0076 4.9613 14.9978C5.12737 14.9881 5.29051 15.0447 5.41483 15.1553C5.88572 15.5766 6.41453 15.9284 6.98515 16.1998L9.06015 13.3459C7.28046 12.5779 5.35155 12.9045 4.26327 13.0889C3.80267 13.1684 3.32898 13.1166 2.89649 12.9393C2.464 12.762 2.09021 12.4665 1.81796 12.0865L1.79452 12.0529L0.717959 10.3342C0.674301 10.2643 0.644897 10.1864 0.631438 10.1051C0.617979 10.0238 0.620732 9.94068 0.639539 9.86044C0.658345 9.78021 0.692833 9.70449 0.741018 9.63763C0.789203 9.57078 0.850133 9.51411 0.920303 9.4709L8.74765 4.6498V2.49902C8.74765 2.33326 8.81349 2.17429 8.93071 2.05708C9.04792 1.93987 9.20689 1.87402 9.37265 1.87402H9.99765C11.0744 1.87391 12.1405 2.08784 13.1339 2.50337C14.1273 2.9189 15.0282 3.52775 15.7842 4.29451C16.5402 5.06128 17.1362 5.97067 17.5377 6.96983C17.9391 7.96898 18.138 9.03797 18.1226 10.1146ZM16.8726 10.0975C16.8857 9.18637 16.7175 8.28178 16.3778 7.43627C16.0382 6.59076 15.5338 5.82121 14.8941 5.17234C14.2544 4.52348 13.4921 4.00825 12.6515 3.65661C11.8109 3.30497 10.9088 3.12393 9.99765 3.12402V4.99902C9.99758 5.10574 9.97019 5.21066 9.91809 5.30379C9.86598 5.39692 9.7909 5.47516 9.69999 5.53105L2.11171 10.2014L2.84296 11.3732C2.98088 11.5589 3.16785 11.7025 3.38287 11.7878C3.59789 11.8731 3.83243 11.8967 4.06015 11.8561C5.31015 11.6451 7.8703 11.2123 10.1594 12.4951C10.9588 12.4526 11.7114 12.1053 12.2626 11.5248C12.8138 10.9442 13.1216 10.1745 13.1226 9.37402C13.1226 9.20826 13.1885 9.04929 13.3057 8.93208C13.4229 8.81487 13.5819 8.74902 13.7476 8.74902C13.9134 8.74902 14.0724 8.81487 14.1896 8.93208C14.3068 9.04929 14.3726 9.20826 14.3726 9.37402C14.3711 10.477 13.9536 11.5388 13.2034 12.3474C12.4532 13.156 11.4256 13.6517 10.3258 13.7357L8.2078 16.6482C8.8374 16.8115 9.48643 16.8875 10.1367 16.874C11.9171 16.8325 13.6125 16.104 14.868 14.8409C16.1236 13.5779 16.8419 11.8781 16.8726 10.0975Z" fill="#566573" />
                        </svg>
                        Activities for all riding skill levels
                      </li>
                    )}
                    <li>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M15.436 10.0828L11.404 8.59844L9.91958 4.56328C9.83168 4.32448 9.67264 4.11838 9.46393 3.9728C9.25521 3.82722 9.00687 3.74917 8.75239 3.74917C8.49792 3.74917 8.24958 3.82722 8.04086 3.9728C7.83215 4.11838 7.67311 4.32448 7.58521 4.56328L6.09927 8.59375L2.06411 10.0781C1.82531 10.166 1.61921 10.3251 1.47363 10.5338C1.32806 10.7425 1.25 10.9908 1.25 11.2453C1.25 11.4998 1.32806 11.7481 1.47363 11.9568C1.61921 12.1656 1.82531 12.3246 2.06411 12.4125L6.0938 13.9062L7.57818 17.9391C7.66608 18.1779 7.82512 18.384 8.03383 18.5295C8.24255 18.6751 8.49089 18.7532 8.74536 18.7532C8.99983 18.7532 9.24818 18.6751 9.45689 18.5295C9.66561 18.384 9.82465 18.1779 9.91255 17.9391L11.3969 13.907L15.4321 12.4227C15.6709 12.3348 15.877 12.1757 16.0226 11.967C16.1681 11.7583 16.2462 11.5099 16.2462 11.2555C16.2462 11.001 16.1681 10.7527 16.0226 10.5439C15.877 10.3352 15.6709 10.1762 15.4321 10.0883L15.436 10.0828ZM10.968 12.7344C10.7991 12.7964 10.6457 12.8944 10.5185 13.0216C10.3913 13.1488 10.2933 13.3022 10.2313 13.4711L8.74693 17.4914L7.26568 13.468C7.20364 13.3 7.10594 13.1474 6.9793 13.0208C6.85266 12.8941 6.70009 12.7964 6.53208 12.7344L2.51177 11.25L6.53208 9.76562C6.70009 9.70359 6.85266 9.60589 6.9793 9.47925C7.10594 9.35261 7.20364 9.20004 7.26568 9.03203L8.75005 5.01172L10.2344 9.03203C10.2964 9.20093 10.3944 9.35431 10.5216 9.48153C10.6489 9.60875 10.8022 9.70676 10.9711 9.76875L14.9915 11.2531L10.968 12.7344ZM11.2501 3.125C11.2501 2.95924 11.3159 2.80027 11.4331 2.68306C11.5503 2.56585 11.7093 2.5 11.8751 2.5H13.1251V1.25C13.1251 1.08424 13.1909 0.925268 13.3081 0.808058C13.4253 0.690848 13.5843 0.625 13.7501 0.625C13.9158 0.625 14.0748 0.690848 14.192 0.808058C14.3092 0.925268 14.3751 1.08424 14.3751 1.25V2.5H15.6251C15.7908 2.5 15.9498 2.56585 16.067 2.68306C16.1842 2.80027 16.2501 2.95924 16.2501 3.125C16.2501 3.29076 16.1842 3.44973 16.067 3.56694C15.9498 3.68415 15.7908 3.75 15.6251 3.75H14.3751V5C14.3751 5.16576 14.3092 5.32473 14.192 5.44194C14.0748 5.55915 13.9158 5.625 13.7501 5.625C13.5843 5.625 13.4253 5.55915 13.3081 5.44194C13.1909 5.32473 13.1251 5.16576 13.1251 5V3.75H11.8751C11.7093 3.75 11.5503 3.68415 11.4331 3.56694C11.3159 3.44973 11.2501 3.29076 11.2501 3.125ZM19.3751 6.875C19.3751 7.04076 19.3092 7.19973 19.192 7.31694C19.0748 7.43415 18.9158 7.5 18.7501 7.5H18.1251V8.125C18.1251 8.29076 18.0592 8.44973 17.942 8.56694C17.8248 8.68415 17.6658 8.75 17.5001 8.75C17.3343 8.75 17.1753 8.68415 17.0581 8.56694C16.9409 8.44973 16.8751 8.29076 16.8751 8.125V7.5H16.2501C16.0843 7.5 15.9253 7.43415 15.8081 7.31694C15.6909 7.19973 15.6251 7.04076 15.6251 6.875C15.6251 6.70924 15.6909 6.55027 15.8081 6.43306C15.9253 6.31585 16.0843 6.25 16.2501 6.25H16.8751V5.625C16.8751 5.45924 16.9409 5.30027 17.0581 5.18306C17.1753 5.06585 17.3343 5 17.5001 5C17.6658 5 17.8248 5.06585 17.942 5.18306C18.0592 5.30027 18.1251 5.45924 18.1251 5.625V6.25H18.7501C18.9158 6.25 19.0748 6.31585 19.192 6.43306C19.3092 6.55027 19.3751 6.70924 19.3751 6.875Z" fill="#566573" />
                      </svg>
                      Guest favourite in May 2024 (todo)
                    </li>
                  </ul>
                </div>
              </div>
              <div className="links-arae">
                <span onClick={() => viewActivitiesSectRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="display-block btn-primary ">View all activities</span>
                <a href="#" className="btn-outline" onClick={toggleMessage}>Message host</a>
              </div>
            </div>
            <div className="host-content">
              <Accordion
                title={hostProfile?.overview_quick_view.specialities_title}
                body={(
                  <div
                    dangerouslySetInnerHTML={{
                      __html: hostProfile?.overview_quick_view.specialities_descrioption,
                    }}
                  />
                )}
              />
              <Accordion
                title={hostProfile?.overview_quick_view.cavago_extras_heading}
                body={(
                  <div
                    dangerouslySetInnerHTML={{
                      __html: hostProfile?.overview_quick_view.cavago_extras,
                    }}
                  />
                )}
              />
              <Accordion
                title={hostProfile?.overview_quick_view.brief_description_heading}
                body={(
                  <div
                    dangerouslySetInnerHTML={{
                      __html: hostProfile?.overview_quick_view.brief_description,
                    }}
                  />
                )}
              />
              <Accordion
                ref={viewActivitiesSectRef}
                title="Activities with this host"
                body={(
                  <HostActivities facilityId={hostProfile.facility_user.facility_id} />
                )}
              />
              <Accordion
                title="Location"
                body={(
                  <>
                    {hostProfile.facility_transports.map((l) => (
                      <>
                        <h3>{l.transport_mode}</h3>
                        <p>
                          {l.description}
                        </p>
                      </>
                    ))}
                    <div className="map-holder">
                      <LocationMap
                        pos={{
                          lat: Number(hostProfile?.overview_quick_view?.latitude),
                          lng: Number(hostProfile?.overview_quick_view?.longitude),
                        }}
                        header={false}
                      />
                    </div>
                  </>
                )}
              />
              {/* <section className="content-holder">
            <div className="
            review-head
            er">
              <ul className="review-list-info">
                <li>
                  <div className="ratting">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12.0001 2.00049L15.0901 8.26049L22.0001 9.27049L17.0001 14.1405L18.1801 21.0205L12.0001 17.7705L5.82012 21.0205L7.00012 14.1405L2.00012 9.27049L8.91012 8.26049L12.0001 2.00049Z" stroke="#2C3F50" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    4.90
                  </div>
                </li>
                <li>
                  <a href="#">12 reviews</a>
                </li>
              </ul>
              <h2>What people are saying</h2>
            </div>
            <div className="review-slider">
              <ReviewCard />
              <ReviewCard />
              <ReviewCard />
            </div>
          </section> */}
            </div>
          </div>
          <HostMessageModal
            data={hostProfile}
            open={showMessage}
            toggleModal={toggleMessage}
          />
        </div>
      )}
    </QueryHandler>
  );
}
export function HostActivities({ facilityId }: { facilityId: number }) {
  const activitiesQuery = homeApi.getActivities.useInfiniteQuery(
    {
      facility_id: facilityId,
      limit: 10,
    },
    { enabled: !!facilityId },
  );

  return (
    <QueryHandler queries={[activitiesQuery]}>
      <div className="activities-list">
        {activitiesQuery.data?.map((a) => (
          <div style={{ margin: 62 }}>
            <ActivityCard {...parseActivityPropsFromSchema(a)} />
          </div>
        ))}
      </div>
    </QueryHandler>
  );
}

function Gallery({
  host,
}: {
  host: HostProfileType
}) {
  const bottomSheet = useBottomSheet();

  return (
    <>
      <span onClick={() => bottomSheet.setOpen(true)} className="banner-overlay">
        <div className="container">
          <span
            className="see-all-photo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
              <path d="M15.75 13.25H5.25V2.75H15.75M15.75 1.25H5.25C4.85218 1.25 4.47064 1.40804 4.18934 1.68934C3.90804 1.97064 3.75 2.35218 3.75 2.75V13.25C3.75 13.6478 3.90804 14.0294 4.18934 14.3107C4.47064 14.592 4.85218 14.75 5.25 14.75H15.75C16.1478 14.75 16.5294 14.592 16.8107 14.3107C17.092 14.0294 17.25 13.6478 17.25 13.25V2.75C17.25 2.35218 17.092 1.97064 16.8107 1.68934C16.5294 1.40804 16.1478 1.25 15.75 1.25ZM2.25 4.25H0.75V16.25C0.75 16.6478 0.908035 17.0294 1.18934 17.3107C1.47064 17.592 1.85218 17.75 2.25 17.75H14.25V16.25H2.25M11.97 8.2175L9.9075 10.8725L8.4375 9.1025L6.375 11.75H14.625L11.97 8.2175Z" fill="#2C3F50" />
            </svg>
            See all photos
          </span>
        </div>
      </span>
      <Modal
        open={bottomSheet.open}
        footer={null}
        width={900}
        onCancel={() => bottomSheet.setOpen(false)}
      >
        <div className="host-all-images">
          <div className="all-images-head">
            <div className="links-area">
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3.33398 10V16.6667C3.33398 17.1087 3.50958 17.5326 3.82214 17.8452C4.1347 18.1577 4.55862 18.3333 5.00065 18.3333H15.0007C15.4427 18.3333 15.8666 18.1577 16.1792 17.8452C16.4917 17.5326 16.6673 17.1087 16.6673 16.6667V10" stroke="#566573" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13.3327 4.99984L9.99935 1.6665L6.66602 4.99984" stroke="#566573" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 1.6665V12.4998" stroke="#566573" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Share
              </a>
              <a href="#">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 20.5133C11.907 20.5134 11.8156 20.4895 11.7345 20.4441C10.083 19.4768 8.53312 18.3458 7.10813 17.0682C3.98394 14.2564 2.3999 11.4543 2.3999 8.73968C2.40022 7.61611 2.7607 6.52222 3.42843 5.61858C4.09616 4.71494 5.03597 4.04914 6.10991 3.7189C7.18386 3.38866 8.33539 3.41137 9.39548 3.78371C10.4556 4.15604 11.3684 4.85839 12 5.78765C12.6315 4.85839 13.5444 4.15604 14.6045 3.78371C15.6645 3.41137 16.8161 3.38866 17.89 3.7189C18.964 4.04914 19.9038 4.71494 20.5715 5.61858C21.2392 6.52222 21.5997 7.61611 21.6 8.73968C21.6 11.4543 20.016 14.2564 16.8918 17.0682C15.4668 18.3458 13.9169 19.4768 12.2655 20.4441C12.1844 20.4895 12.0929 20.5134 12 20.5133ZM7.65277 4.57362C6.54824 4.57487 5.48931 5.01419 4.7083 5.79521C3.92728 6.57623 3.48795 7.63516 3.4867 8.73968C3.4867 13.9315 10.5315 18.4536 12 19.3394C13.4684 18.4536 20.5132 13.9315 20.5132 8.73968C20.513 7.77677 20.1794 6.84363 19.5689 6.09893C18.9585 5.35423 18.109 4.84393 17.1648 4.65479C16.2207 4.46565 15.2402 4.60935 14.39 5.06145C13.5398 5.51356 12.8724 6.24616 12.5014 7.1347C12.46 7.2336 12.3904 7.31807 12.3012 7.37748C12.2119 7.43689 12.1072 7.46859 12 7.46859C11.8928 7.46859 11.788 7.43689 11.6988 7.37748C11.6096 7.31807 11.5399 7.2336 11.4986 7.1347C11.1827 6.3753 10.6487 5.72663 9.96418 5.27076C9.27962 4.81488 8.47523 4.57227 7.65277 4.57362Z" fill="#566573" />
                </svg>
                Wishlist
              </a>
            </div>
            <h2>
              {host.facility_user.first_name}
              {' '}
              {host.facility_user.last_name}
            </h2>
          </div>
          <div className="host-images">
            {host?.facility_images?.img_1_url && (
              <div className="img-holder">
                <img src={host?.facility_images?.img_1_url} alt="HostProfile" />
              </div>
            )}
            <div className="img-row">
              {host?.facility_images?.img_2_url && (
                <div className="img-holder">
                  <img src={host?.facility_images?.img_2_url} alt="HostProfile" />
                </div>
              )}
              {host?.facility_images?.img_3_url && (
                <div className="img-holder">
                  <img src={host?.facility_images?.img_3_url} alt="HostProfile" />
                </div>
              )}
            </div>
            {host?.facility_images?.img_4_url && (
              <div className="img-holder">
                <img src={host?.facility_images?.img_4_url} alt="HostProfile" />
              </div>
            )}
            <div className="img-row">
              {host?.facility_images?.img_5_url && (
                <div className="img-holder">
                  <img src={host?.facility_images?.img_5_url} alt="HostProfile" />
                </div>
              )}
              {host?.facility_images?.img_6_url && (
                <div className="img-holder">
                  <img src={host?.facility_images?.img_6_url} alt="HostProfile" />
                </div>
              )}
            </div>
            {host?.facility_images?.img_7_url && (
              <div className="img-holder">
                <img src={host?.facility_images?.img_7_url} alt="HostProfile" />
              </div>
            )}
            <div className="img-row">
              {host?.facility_images?.img_8_url && (
                <div className="img-holder">
                  <img src={host?.facility_images?.img_8_url} alt="HostProfile" />
                </div>
              )}
              {host?.facility_images?.img_9_url && (
                <div className="img-holder">
                  <img src={host?.facility_images?.img_9_url} alt="HostProfile" />
                </div>
              )}
            </div>
            {host?.facility_images?.img_10_url && (
              <div className="img-holder">
                <img src={host?.facility_images?.img_10_url} alt="HostProfile" />
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
function ReviewCard() {
  return (
    <div className="slide">
      <div className="slide-review-head">
        <span className="name">Claudia</span>
        <span className="dot">•</span>
        <ul className="ratting">
          <li className="active">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
              <path d="M3.16127 14.0131C2.82352 14.1863 2.44027 13.8827 2.50852 13.4951L3.23478 9.35631L0.15215 6.41981C-0.135725 6.14506 0.0138999 5.64281 0.399775 5.58856L4.68552 4.97956L6.59653 1.19344C6.7689 0.852188 7.23527 0.852188 7.40765 1.19344L9.31865 4.97956L13.6044 5.58856C13.9903 5.64281 14.1399 6.14506 13.8512 6.41981L10.7694 9.35631L11.4957 13.4951C11.5639 13.8827 11.1806 14.1863 10.8429 14.0131L7.00077 12.0391L3.16127 14.0131Z" fill="#233240" />
            </svg>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
              <path d="M3.16127 14.0131C2.82352 14.1863 2.44027 13.8827 2.50852 13.4951L3.23478 9.35631L0.15215 6.41981C-0.135725 6.14506 0.0138999 5.64281 0.399775 5.58856L4.68552 4.97956L6.59653 1.19344C6.7689 0.852188 7.23527 0.852188 7.40765 1.19344L9.31865 4.97956L13.6044 5.58856C13.9903 5.64281 14.1399 6.14506 13.8512 6.41981L10.7694 9.35631L11.4957 13.4951C11.5639 13.8827 11.1806 14.1863 10.8429 14.0131L7.00077 12.0391L3.16127 14.0131Z" fill="#233240" />
            </svg>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
              <path d="M3.16127 14.0131C2.82352 14.1863 2.44027 13.8827 2.50852 13.4951L3.23478 9.35631L0.15215 6.41981C-0.135725 6.14506 0.0138999 5.64281 0.399775 5.58856L4.68552 4.97956L6.59653 1.19344C6.7689 0.852188 7.23527 0.852188 7.40765 1.19344L9.31865 4.97956L13.6044 5.58856C13.9903 5.64281 14.1399 6.14506 13.8512 6.41981L10.7694 9.35631L11.4957 13.4951C11.5639 13.8827 11.1806 14.1863 10.8429 14.0131L7.00077 12.0391L3.16127 14.0131Z" fill="#233240" />
            </svg>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
              <path d="M3.16127 14.0131C2.82352 14.1863 2.44027 13.8827 2.50852 13.4951L3.23478 9.35631L0.15215 6.41981C-0.135725 6.14506 0.0138999 5.64281 0.399775 5.58856L4.68552 4.97956L6.59653 1.19344C6.7689 0.852188 7.23527 0.852188 7.40765 1.19344L9.31865 4.97956L13.6044 5.58856C13.9903 5.64281 14.1399 6.14506 13.8512 6.41981L10.7694 9.35631L11.4957 13.4951C11.5639 13.8827 11.1806 14.1863 10.8429 14.0131L7.00077 12.0391L3.16127 14.0131Z" fill="#233240" />
            </svg>
          </li>
        </ul>
      </div>
      <blockquote>
        <q>
          Riding through the breathtaking beauty of Doñana on horseback
          was an absolute dream come true – every moment felt like a
          page out of a fairytale
        </q>
        <span className="date">2 weeks ago</span>
      </blockquote>
    </div>
  );
}
