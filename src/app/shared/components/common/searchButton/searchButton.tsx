import React from 'react';
import { Button, Typography } from 'antd';
import Icon from '@shared/components/common/icons';
import './_searchButton.scss';
import { useHomeFiltersContext } from '@shared/hooks/homeFiltersContext';
import { useRouter, useSearchParams } from 'next/navigation';

const { Text } = Typography;

interface SearchButtonProps {
  searchCategory: 'Location' | 'Activity' | 'Host';
  name: string;
  setShowSearchScreen: (value: boolean) => void;
}

function SearchButton({ searchCategory, name, setShowSearchScreen }: SearchButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setSearch } = useHomeFiltersContext();

  return (
    <div className="searchButtonContainer">
      <Button
        type="link"
        className="searchButton"
        onClick={
          () => {
            setSearch(name);
            setShowSearchScreen(false);
            const currentParams = new URLSearchParams(searchParams.toString());
            currentParams.set('search', name);
            currentParams.set('searchCategory', searchCategory);
            router.push(`?${currentParams}`);
          }
        }
      >
        <div className="iconContainer">
          <Icon name={searchCategory.toLowerCase()} width={24} height={24} />
        </div>
        <Text className="searchButtonText">
          {name}
        </Text>
      </Button>
    </div>
  );
}

export default SearchButton;
