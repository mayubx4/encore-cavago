'use client';

import Header from '@shared/components/desktop/header/header';
import React, { useEffect, useState } from 'react';
import './_home.scss';
import ActivityCard, { parseActivityPropsFromSchema } from '@shared/components/common/activityCard/activityCard';
import Footer from '@shared/components/desktop/footer/footer';
import homeApi from '@shared/api/home/homeApi';
import QueryHandler from '@shared/components/common/queryHandler/queryHandler';
import { useHomeFiltersContext } from '@shared/hooks/homeFiltersContext';
import { useRouter, useSearchParams } from 'next/navigation';
import InfiniteScroll from 'react-infinite-scroll-component';
import Animations from '@shared/components/common/animations';
import Icon from '@shared/components/common/icons';

export default function HomeDesktop() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const popular = !!searchParams.get('popular');
  const showCategoryLinks = !searchParams.get('filter');
  const showPopularActivites = !searchParams.get('filter') && !searchParams.get('search') && !popular;

  const {
    subCategoryIds, categoryId, filter, search,
  } = useHomeFiltersContext();

  const allActivitiesQuery = homeApi.getActivities.useInfiniteQuery({
    categoryId: categoryId ?? undefined,
    subCategoryIds: subCategoryIds ?? undefined,
    limit: 40,
    filters: showCategoryLinks ? undefined : filter,
    search: search ?? undefined,
    popular: popular ?? false,
  });

  return (
    <>
      {showCategoryLinks && <CategoryLinks />}
      <div className="activitiesContainer">
        {showPopularActivites ? <PopularActivities /> : (
          <div className="backIcon"><Icon name="backArrow" onClick={router.back} /></div>
        )}
        <div className="activities-holder">
          {showPopularActivites && (
            <div className="head">
              <h2>
                All activities
              </h2>
            </div>
          )}
          <InfiniteScroll
            dataLength={allActivitiesQuery.data?.length || 0}
            next={allActivitiesQuery.fetchNextPage}
            hasMore={!!allActivitiesQuery.hasNextPage}
            loader={<Animations name="cavagoLoader" style={{ width: 100, height: 100 }} />}
            scrollThreshold={1}
          >
            <div className="activitiesScroller all-activities">
              <QueryHandler queries={[allActivitiesQuery]}>
                {allActivitiesQuery.data?.length
                  ? allActivitiesQuery.data.map((activity, i) => (
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
                  )) : (
                    <h4>No results found</h4>
                  )}
              </QueryHandler>
            </div>
          </InfiniteScroll>
        </div>
      </div>
      <Footer />
    </>
  );
}

export function CategoryLinks() {
  const query = homeApi.getCategories.useQuery();
  const { data } = query;

  const {
    subCategoryIds, categoryId, setCategoryId, setSubCategoryIds,
  } = useHomeFiltersContext();

  const [subCategories, setSubCategories] = useState<{
    id: number;
    title: string;
    equine_main_activity_id: number;
  }[]>([]);

  useEffect(() => {
    if (data) {
      const defaultSubCategories = data.find((d) => d.id === categoryId)?.sub_categories || [];
      setSubCategories(defaultSubCategories);
    }
  }, [data, categoryId]);

  return (
    <QueryHandler queries={[query]}>
      <div className="categoriesContainer">
        <div className="cat-holder">
          {data?.map((link, i) => (
            <button
              key={i}
              className={`btn-text ${link.id === categoryId && 'active'}`}
              onClick={() => {
                setCategoryId(link.id);
                setSubCategoryIds(undefined);
              }}
            >
              {link.title}
            </button>
          ))}
        </div>
      </div>
      {!!subCategories?.length && (
        <div className="subCategoriesContainer">
          <div className="cat-holder">
            <button className={`btn-outline ${!subCategoryIds?.length ? 'active' : ''}`} onClick={() => setSubCategoryIds(undefined)}>
              View all
            </button>
            {subCategories.map((sc) => (
              <button
                key={sc.id}
                className={`btn-outline ${subCategoryIds?.includes(sc.id) && 'active'}`}
                onClick={() => {
                  let updatedSelection;
                  if (subCategoryIds?.includes(sc.id)) {
                    updatedSelection = subCategoryIds?.filter((element) => element !== sc.id) || [];
                  } else {
                    updatedSelection = subCategoryIds ? [...subCategoryIds, sc.id] : [sc.id];
                  }
                  setSubCategoryIds(updatedSelection);
                }}
              >
                {sc.title.toLowerCase()}
                {subCategoryIds?.includes(sc.id) && <Icon name="cross" className="icon" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </QueryHandler>
  );
}

export function PopularActivities() {
  const router = useRouter();

  const {
    subCategoryIds, categoryId,
  } = useHomeFiltersContext();

  const popularActivitiesQuery = homeApi.getActivities.useInfiniteQuery({
    categoryId: categoryId ?? undefined,
    subCategoryIds: subCategoryIds ?? undefined,
    limit: 40,
    popular: true,
  });

  return (
    <div className="activities-holder">
      <div className="head">
        <h2>
          Popular
        </h2>
        <button className="btn-text seeAllBtn" onClick={() => router.push('?popular=true')}>
          See All
        </button>
      </div>
      <div className="activitiesScroller">
        <QueryHandler queries={[popularActivitiesQuery]}>
          {popularActivitiesQuery.data?.map((activity, i) => (
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
    </div>
  );
}
