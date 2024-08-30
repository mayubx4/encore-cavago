import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Modal, Button,
  Row, Col,
} from 'antd';
import FilterContent from '@shared/components/common/filterContent/filterContent';
import Title from '@shared/wrappers/Title';
import { FilterType, useHomeFiltersContext } from '@shared/hooks/homeFiltersContext';
import { DEFAULT_CATEGORY_ID, FiltersVisibility } from '@shared/constants/home';
import './_filterModal.scss';

interface FiltersModalProps {
  open: boolean;
  toggleOpen: () => void,
}

function FiltersModal({ open, toggleOpen }: FiltersModalProps) {
  const router = useRouter();
  const [filterValues, setFilterValues] = useState<FilterType>();
  const { setFilter } = useHomeFiltersContext();
  const [title, setTitle] = useState<string>('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const newFilter = { main_category_id: DEFAULT_CATEGORY_ID };
    const filterKeys = [
      'main_category_id', 'sub_category_id', 'from_date', 'to_date',
      'min_price', 'max_price', 'duration_in_hours', 'duration_in_days',
      'rider_ability', 'booking_method',
    ];

    filterKeys.forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        if (key === 'sub_category_id' || key === 'rider_ability') {
          newFilter[key] = value.split(',').map(Number);
        } else if (key === 'main_category_id') {
          newFilter[key] = Number(value);
        } else {
          newFilter[key] = value;
        }
      }
    });

    setFilterValues(newFilter);
    if (newFilter.to_date && (newFilter?.from_date === newFilter?.to_date)) {
      newFilter.to_date = null;
    }
    setFilter(newFilter);

  }, [searchParams]);

  const applyFilters = () => {
    const filterKeys: { [key: string]: keyof typeof FiltersVisibility } = {
      max_price: 'priceRange',
      min_price: 'priceRange',
      from_date: 'dateRange',
      to_date: 'dateRange',
      booking_method: 'bookingOptions',
      rider_ability: 'ridingAbility',
      duration_in_days: 'durationInDays',
      duration_in_hours: 'durationInHours',
    };
    const newFilters = { ...filterValues };

    const params = new URLSearchParams(searchParams.toString());
    params.set('filter', 'true');

    newFilters.main_category_id ??= DEFAULT_CATEGORY_ID;
    params.set('main_category_id', newFilters.main_category_id.toString());

    if (newFilters.sub_category_id) {
      params.set('sub_category_id', newFilters.sub_category_id.toString());
    } else {
      params.delete('sub_category_id');
    }

    for (const key in filterKeys) {
      const filterValue = filterValues[key as keyof typeof filterValues];
      const visibilityKey = filterKeys[key];

      if (filterValue && FiltersVisibility[visibilityKey]?.includes(title)) {
        newFilters[key as keyof typeof newFilters] = filterValue;
        params.set(key, filterValue);
      } else {
        delete newFilters[key as keyof typeof newFilters];
        params.delete(key);
      }
    };

    if (newFilters.to_date && newFilters.from_date === newFilters.to_date) {
      newFilters.to_date = null;
    }

    setFilter(newFilters);

    router.push(`?${params}`);
  };

  return (
    <Modal
      open={open}
      onOk={() => toggleOpen()}
      onCancel={() => toggleOpen()}
      onClose={() => toggleOpen()}
      footer={[
        <Row justify="space-between" align="middle" className="filterFooter" key="filterFooter">
          <Col>
            <Button
              type="link"
              className="clearButton"
              onClick={() => {
                toggleOpen();
                setFilterValues({ main_category_id: DEFAULT_CATEGORY_ID });
                router.replace('/home');
              }}
            >
              Clear all
            </Button>
          </Col>
          <Col className="filterButtonContainer">
            <Button
              className="filterButton"
              onClick={() => {
                applyFilters();
                toggleOpen();
              }}
            >
              Show Listing
            </Button>
          </Col>
        </Row>,
      ]}
      width={959}
      styles={{
        content: { padding: 0 },
      }}
      style={{ top: 5 }}
    >
      <div className="filterDesktopContainer">
        <div className="filterHeaderContainer">
          <Title level={4} className="filterHeading">Filters</Title>
        </div>
        <div className="filterContent">
          <FilterContent title={title} setTitle={setTitle} filterValues={filterValues} setFilterValues={setFilterValues} />
        </div>
      </div>
    </Modal>
  );
}

export default FiltersModal;
