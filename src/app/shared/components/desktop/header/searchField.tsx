import React, {
  useRef, ChangeEvent, FocusEvent, useState, useEffect, useCallback,
} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { debounce } from 'lodash';
import { Button, Input, InputRef } from 'antd';
import colors from '@shared/theme/colors';
import SearchScreen from '@shared/components/common/searchScreen/searchScreen';
import { useHomeFiltersContext } from '@shared/hooks/homeFiltersContext';
import Icon from '../../common/icons';

export default function SearchField() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchBy, setSearchBy] = useState();
  const [showSearchScreen, setShowSearchScreen] = useState(false);

  const {
    setSearch, searchCategory, setSearchCategory,
  } = useHomeFiltersContext();
  const [searchInput, setSearchInput] = useState<string>(searchParams.get('search') ?? '');

  const inputRef = useRef<InputRef>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const debouncedSetSearch = useCallback(
    debounce((value: string) => setSearchBy(value), 500),
    [],
  );

  useEffect(() => {
    setSearchInput(searchParams.get('search') ?? '');
    setSearchCategory(searchParams.get('searchCategory') ?? 'All');
    setSearch(searchParams.get('search') ?? '');
  }, [searchParams]);

  useEffect(() => {
    debouncedSetSearch(searchInput);

    return () => {
      debouncedSetSearch.cancel();
    };
  }, [searchInput, debouncedSetSearch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    if (!showSearchScreen) {
      setShowSearchScreen(true);
    }
  };

  const handleFocus = () => {
    if (!showSearchScreen) {
      setShowSearchScreen(true);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget) && modalRef.current && !modalRef.current.contains(e.relatedTarget as Node)) {
      setShowSearchScreen(false);
    }
  };

  return (
    <div className="searchField" onBlur={handleBlur}>
      <Input
        ref={inputRef}
        value={searchInput}
        onChange={handleInputChange}
        onFocus={handleFocus}
        className="searchField__input"
        placeholder="Discover locations, hosts, or activities"
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
      <button className="searchField__button">
        <Icon name="lookingGlass" color={colors.white[100]} width={20} height={20} />
      </button>
      {showSearchScreen && (
        <div
          ref={modalRef}
          className="searchModal"
        >
          <SearchScreen searchBy={searchBy} setShowSearchScreen={setShowSearchScreen} />
        </div>
      )}
    </div>
  );
}
