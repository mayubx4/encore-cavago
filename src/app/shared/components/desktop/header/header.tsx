'use client';

import './_header.scss';
import colors from '@shared/theme/colors';
import useToggle from '@shared/hooks/useToggle';
import FiltersModal from '@shared/components/desktop/filtersModal/filterModal';
import MinimalHeader from './minimalHeader';
import SearchField from './searchField';
import Icon from '../../common/icons';

export default function Header() {
  const [openFilter, toggleOpenFilter] = useToggle();

  return (
    <div className="header-desktop">
      <div className="headerParent">
        <MinimalHeader />
        <div className="serch-head-holder">
          <SearchField />
          <button className="filtersButton btn-outline" onClick={() => toggleOpenFilter()}>
            Filters
            <Icon name="filters" color={colors.neutrals[500]} width={24} height={24} />
          </button>
          <FiltersModal open={openFilter} toggleOpen={toggleOpenFilter} />
        </div>
      </div>
    </div>
  );
}
