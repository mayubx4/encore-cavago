import React, { useMemo } from 'react';
import { Row, Col, Button } from 'antd';
import { useHomeFiltersContext } from '@shared/hooks/homeFiltersContext';
import SearchButton from '@shared/components/common/searchButton/searchButton';
import Text from '@shared/wrappers/Text';
import homeApi from '@shared/api/home/homeApi';
import { SearchCategories } from '@shared/constants/home';
import QueryHandler from '../queryHandler/queryHandler';
import './_searchScreen.scss';

type SearchResultsType = {
  Host?: string | null | undefined;
  Location?: string | null | undefined;
  Activity?: string | null | undefined;
}

function SearchScreen({ searchBy, setShowSearchScreen }: {
  searchBy: string | undefined | null;
  setShowSearchScreen: (value: boolean) => void;
}) {
  const { searchCategory, setSearchCategory } = useHomeFiltersContext();

  return (
    <div className="searchScreenContainer">
      <Row gutter={[0, {
        xs: 20, sm: 20, md: 18, lg: 18, xl: 18,
      }]}
      >
        <Col span={24}>
          <div className="searchCategoriesContainer">
            {Object.keys(SearchCategories).map((category, i) => (
              <Button
                type="link"
                key={i}
                className={`searchCategoryLink ${category === searchCategory && 'active'}`}
                onClick={() => setSearchCategory(category)}
              >
                {category}
              </Button>
            ))}
            <div className="line" />
          </div>
        </Col>
        <Col span={24}>
          <div className="searchButtonsContainer">
            {!searchBy ? (
              <>
                <Text className="topSearchText">Top Searches</Text>
                <TopSearches selectedSearchCategory={searchCategory ?? SearchCategories.All} setShowSearchScreen={setShowSearchScreen} />
              </>
            ) : (
              <SuggestedSearches
                search={(searchCategory === SearchCategories.Location && searchBy ? searchBy.split(',')[0] : searchBy) || ''}
                selectedSearchCategory={searchCategory ?? SearchCategories.All}
                setShowSearchScreen={setShowSearchScreen}
              />
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

function TopSearches({
  selectedSearchCategory,
  setShowSearchScreen,
}: {
  selectedSearchCategory: string;
  setShowSearchScreen: (value: boolean) => void;
}) {
  const popularActivitiesQuery = homeApi.getActivities.useInfiniteQuery({
    limit: 15,
    popular: true,
  });
  const { data: popularActivities } = popularActivitiesQuery;

  const topSearches: SearchResultsType[] = useMemo(
    () => {
      const locations: string[] = [];
      const hosts: string[] = [];
      const activities: string[] = [];

      const result = popularActivities?.map((activity) => {
        const search: SearchResultsType = {};

        const location = activity.facility_details?.city && activity.facility_details?.country
          && `${activity.facility_details.city}, ${activity.facility_details.country}`;
        if (location && !(locations.includes(location))) {
          locations.push(location);
          search.Location = location;
        }

        const acitivity = activity?.name;
        if (acitivity && !(activities.includes(acitivity))) {
          activities.push(acitivity);
          search.Activity = acitivity;
        }

        const host = activity?.facility_details?.facility_name;
        if (host && !(hosts.includes(host))) {
          hosts.push(host);
          search.Host = host;
        }

        return search;
      });

      return result;
    },
    [popularActivities],
  );

  return (
    <>
      <QueryHandler queries={[popularActivitiesQuery]}>
        {topSearches?.map((search) => (
          Object.keys(search).map((key, index) => {
            if (selectedSearchCategory != SearchCategories.All && selectedSearchCategory != key) {
              return;
            }
            const searchCategory = key as keyof typeof search;

            return (search[searchCategory]
              && (
                <SearchButton
                  key={index}
                  searchCategory={searchCategory}
                  name={search[searchCategory]}
                  setShowSearchScreen={setShowSearchScreen}
                />
              )
            );
          })
        ))}
      </QueryHandler>
    </>
  );
}

function SuggestedSearches({ selectedSearchCategory, search, setShowSearchScreen }: {
  selectedSearchCategory: string,
  search: string,
  setShowSearchScreen: (value: boolean) => void;
}) {
  const searchSuggestionsQuery = homeApi.getSearchSuggestions.useQuery({
    search: search ?? undefined,
  });
  const { data: suggestions } = searchSuggestionsQuery;

  const suggestedSearches: SearchResultsType[] | undefined = useMemo(
    () => {
      const locations: string[] = [];
      const hosts: string[] = [];
      const activities: string[] = [];

      const result = suggestions?.map((activity) => {
        const searchResult: SearchResultsType = {};
        if ([SearchCategories.All, SearchCategories.Location].includes(selectedSearchCategory)) {
          const hostDetails = activity?.facility_details;
          const location = hostDetails?.city && hostDetails?.country
            && `${hostDetails.city}, ${hostDetails.country}`;

          if (location && !(locations.includes(location))
            && location.toLowerCase().includes(search.toLowerCase())) {
            locations.push(location);
            searchResult.Location = location;
          }
        }

        if ([SearchCategories.All, SearchCategories.Activity].includes(selectedSearchCategory)) {
          const activityName = activity?.name;
          if (activityName && !(activities.includes(activityName))
            && activityName.toLowerCase().includes(search.toLowerCase())) {
            activities.push(activityName);
            searchResult.Activity = activityName;
          }
        }

        if ([SearchCategories.All, SearchCategories.Host].includes(selectedSearchCategory)) {
          const host = activity?.facility_details?.facility_name;
          if (host && !(hosts.includes(host))
            && host.toLowerCase().includes(search.toLowerCase())) {
            hosts.push(host);
            searchResult.Host = host;
          }
        }

        return searchResult;
      });

      if (selectedSearchCategory === SearchCategories.Location) {
        const countries = new Set<string>();
        suggestions?.forEach((activity) => {
          const country = activity?.facility_details?.country;
          if (country && !countries.has(country)) {
            countries.add(country);
            result?.unshift({ Location: country } as SearchResultsType);
          }
        });
      }

      return result?.filter((obj) => Object.keys(obj).length > 0);
    },
    [suggestions, selectedSearchCategory],
  );

  return (
    <>
      <QueryHandler queries={[searchSuggestionsQuery]}>
        {suggestedSearches && suggestedSearches.length ? (
          suggestedSearches.map((suggestion) => (
            Object.keys(suggestion).map((key, index) => {
              const searchCategory = key as keyof typeof suggestion;

              return (
                <SearchButton
                  key={index}
                  searchCategory={searchCategory}
                  name={suggestion[searchCategory] ?? ''}
                  setShowSearchScreen={setShowSearchScreen}
                />
              );
            })
          ))) : (
          <Text className="topSearchText">No results found</Text>
        )}
      </QueryHandler>
    </>
  );
}

export default SearchScreen;
