import React, {
  ChangeEvent, useCallback, useEffect, useRef, useState,
} from 'react';
import { debounce } from 'lodash';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Input, Button, Row, Col, InputRef,
} from 'antd';
import Icon from '@shared/components/common/icons';
import colors from '@shared/theme/colors';
import { useHomeFiltersContext } from '@shared/hooks/homeFiltersContext';
import './_searchField.scss';

function SearchField({
  onChangeSearchBy, toggleOpenFilter,
  showSearchScreen, setShowSearchScreen,
}: {
  onChangeSearchBy: (searchBy: string) => void;
  toggleOpenFilter: () => void;
  showSearchScreen: boolean;
  setShowSearchScreen: (value: boolean) => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<InputRef>(null);

  const {
    setSearch, searchCategory, setSearchCategory,
  } = useHomeFiltersContext();
  const [searchInput, setSearchInput] = useState<string>(searchParams.get('search') ?? '');

  const debouncedSetSearch = useCallback(
    debounce((value: string) => onChangeSearchBy(value), 500),
    [],
  );
  useEffect(() => {
    debouncedSetSearch(searchInput);

    return () => {
      debouncedSetSearch.cancel();
    };
  }, [searchInput, debouncedSetSearch]);

  useEffect(() => {
    setSearchInput(searchParams.get('search') ?? '');
    setSearch(searchParams.get('search') ?? '');
    setSearchCategory(searchParams.get('searchCategory') ?? 'All');
  }, [searchParams]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleFocus = () => {
    setShowSearchScreen(true);
  };

  return (
    <div className='searchBar'>
      <div className='searchFieldWrapper'>
        <div className="searchFieldContainer">
          <Icon name="lookingGlass" color={colors.neutrals[300]} className='searchIcon'/>
          <Input
            className="searchInputField"
            ref={inputRef}
            placeholder="Discover your next adventure"
            onFocus={handleFocus}
            value={searchInput}
            onChange={handleInputChange}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                setShowSearchScreen(false);
                if (inputRef.current) {
                  inputRef.current.blur();
                }
                setSearch(searchInput);

                const currentParams = new URLSearchParams(searchParams.toString());
                currentParams.set('search', searchInput);
                currentParams.set('searchCategory', searchCategory ?? 'All');
                router.push(`?${currentParams}`);
              }
            }}
          />
          <Button
            shape="circle"
            className="homeFilterIconButton"
            style={{
              borderColor: showSearchScreen ? 'transparent' : colors.neutrals[100],
              boxShadow: 'none'
            }}
          >
            {!showSearchScreen ? (
                <Icon name="funnel" color={colors.neutrals[300]} onClick={() => toggleOpenFilter()} className='funnelSvg'/>
            ) : (
                <Icon name="xCircle" color={colors.neutrals[300]} onClick={() => setSearchInput('')} />
            )}
          </Button>
        </div>
      </div>
      <div className="cancelButtonWrapper">
        {showSearchScreen && (
          <Button
            type="text"
            className="cancelSearchButton"
            onClick={() => { setShowSearchScreen(false); router.push('/home'); }}
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}

export default SearchField;
