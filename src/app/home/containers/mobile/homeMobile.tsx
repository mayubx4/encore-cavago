import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import './_homeMobile.scss';
import Link from 'next/link';
import {
  Button, Col, Divider, Row,
} from 'antd';
import ActivityCard, { parseActivityPropsFromSchema } from '@shared/components/common/activityCard/activityCard';
import { useHomeFiltersContext } from '@shared/hooks/homeFiltersContext';
import homeApi from '@shared/api/home/homeApi';
import QueryHandler from '@shared/components/common/queryHandler/queryHandler';
import SearchScreen from '@shared/components/common/searchScreen/searchScreen';
import useToggle from '@shared/hooks/useToggle';
import FiltersModal from '@shared/components/mobile/filtersModal/filterModal';
import SearchField from '@shared/components/mobile/searchField/searchField';
import { CategoryLinks, PopularActivities } from '../desktop/homeDesktop';
import Icon from '@shared/components/common/icons';
import { SearchCategories } from '@shared/constants/home';

export default function HomeMobile() {
  const router = useRouter();
  const [openFilter, toggleOpenFilter] = useToggle();
  const searchParams = useSearchParams();
  const [showSearchScreen, setShowSearchScreen] = useState(false);
  const popular = !!searchParams.get('popular');
  const showCategoryLinks = !searchParams.get('filter') && !showSearchScreen;
  const showPopularActivites = !searchParams.get('filter') && !searchParams.get('search') && !popular;

  const [searchBy, setSearchBy] = useState('');

  const {
    subCategoryIds, categoryId, filter, search, searchCategory,
  } = useHomeFiltersContext();

  console.log(search, categoryId, searchCategory);

  const allActivitiesQuery = homeApi.getActivities.useInfiniteQuery({
    categoryId: categoryId ?? undefined,
    subCategoryIds: subCategoryIds ?? undefined,
    limit: 40,
    filters: showCategoryLinks ? undefined : filter,
    search: (searchCategory === SearchCategories.Location && search ? search?.split(',')[0] : search) || undefined,
    popular: popular ?? false,
  });

  const onChangeSearchBy = (value: string) => {
    setSearchBy(value);
  };

  return (
    <div className="mobilePageContainer">
      <div className="headerNav">
        <Link href="#" className="link active">Experiences</Link>
        {/* <Link href="#" className="link">Holidays by Cavago</Link> */}
      </div>
      <div className="headerContainer">
        <SearchField
          onChangeSearchBy={onChangeSearchBy}
          toggleOpenFilter={toggleOpenFilter}
          showSearchScreen={showSearchScreen}
          setShowSearchScreen={setShowSearchScreen}
        />
        {showCategoryLinks && <CategoryLinks />}
        <FiltersModal open={openFilter} toggleOpen={toggleOpenFilter} />
      </div>
      {showSearchScreen ? (
        <div className="searchScreenContainerHome">
          <SearchScreen searchBy={searchBy} setShowSearchScreen={setShowSearchScreen} />
        </div>
      ) : (
        <div className="listingContainer">
          {showPopularActivites ? <PopularActivities /> : (
            <div className="backIcon"><Icon name="backArrow" onClick={router.back} /></div>
          )}
          <div>
            {!allActivitiesQuery.isLoading && (
              search && (
                <p className="searchResultText">
                  {allActivitiesQuery.data?.length ? `Showing ${allActivitiesQuery.data?.length} results for "${search}"` : 'No results found'}
                </p>
              ))}
            {showPopularActivites && (
              <Row justify="center">
                <Col xs={24}>
                  <div className="title">
                    <h2>
                      All activities
                    </h2>
                  </div>
                </Col>
              </Row>
            )}
            <Row justify="center" gutter={[0, 20]}>
              <Col xs={24}>
                <div className="activitiesScrollerVert">
                  <QueryHandler queries={[allActivitiesQuery]}>
                    {allActivitiesQuery.data?.map((activity, i) => (
                      <ActivityCard
                        key={i}
                        {...parseActivityPropsFromSchema(activity)}
                        onFvrt={
                          () => {
                            homeApi.getActivities.setData(undefined, ((old) => (old).map((o) => {
                              if (o.id === activity.id) {
                                o.is_favourite = !o.is_favourite;
                              }

                              return o;
                            })));
                          }
                        }
                      />
                    ))}
                  </QueryHandler>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      )
      }
    </div >
  );
}
