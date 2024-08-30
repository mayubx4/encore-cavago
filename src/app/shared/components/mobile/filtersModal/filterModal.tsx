import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Drawer, Button,
  Row, Col,
  Divider,
  Typography,
} from 'antd';
import ScrollableDateRangePicker from '@shared/components/common/scrollableDateRangePicker/scrollableDateRangePicker';
import FilterContent from '@shared/components/common/filterContent/filterContent';
import { FilterType, useHomeFiltersContext } from '@shared/hooks/homeFiltersContext';
import { DEFAULT_CATEGORY_ID, FiltersVisibility } from '@shared/constants/home';
import './_filterModal.scss';

interface FiltersModalProps {
  open: boolean;
  toggleOpen: () => void,
}

function FiltersModal({ open, toggleOpen }: FiltersModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { setFilter } = useHomeFiltersContext();
  const [filterValues, setFilterValues] = useState<FilterType>();

  const [steps, setSteps] = useState(0);
  const [fromDate, setFromDate] = useState<string>();
  const [toDate, setToDate] = useState<string>();
  const [title, setTitle] = useState<string>('');
  const onStepIncrement = () => {
    setSteps(steps + 1);
  };

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
    if (newFilter?.to_date && (newFilter?.from_date === newFilter?.to_date)) {
      newFilter.to_date = null;
    }
    setFilter(newFilter);

  }, [searchParams]);

  useEffect(() => {
    setFromDate(filterValues?.from_date);
    setToDate(filterValues?.to_date);
  }, [filterValues?.from_date, filterValues?.to_date]);

  const onStepDecrement = () => {
    if (steps > 0) {
      setSteps(steps - 1);
    }
  };

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
    }

    if (newFilters.to_date && newFilters.from_date === newFilters.to_date) {
      newFilters.to_date = null;
    }

    setFilter(newFilters);
    router.push(`?${params}`);
  };

  return (
    <Drawer
      placement="bottom"
      title={null}
      closable={!(steps > 0)}
      onClose={() => toggleOpen()}
      open={open}
      styles={{
        content: { maxHeight: '95vh' },
        header: { border: 'none', paddingBottom: 0 },
        body: { padding: 0 },
      }}
      height="auto"
      footer={[
        <div className="saveButtonContainer" key="filterFooter">
          <Button
            type="primary"
            className="saveButton"
            onClick={() => {
              if (steps > 0) {
                setSteps(steps - 1);
                setFilterValues({
                  ...filterValues,
                  from_date: fromDate,
                  to_date: toDate,
                });
              } else {
                applyFilters();
                toggleOpen();
              }
            }}
          >
            <p>Save</p>
          </Button>
        </div>,
      ]}
    >
      <div className="filterMobileContainer">
        {steps == 0 ? (
          <div className="filterContent">
            <Row justify="space-between" align="middle" className="filterHeader">
              <Col>
                <Typography.Title level={4} className="filterHeading">Filters</Typography.Title>
              </Col>
              <Col>
                <Button
                  onClick={() => {
                    toggleOpen();
                    setFilterValues({ main_category_id: DEFAULT_CATEGORY_ID });
                    router.replace('/home');
                  }}
                  className="clearFilterButton"
                >
                  Clear filters
                </Button>
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />
            <FilterContent onStepIncrement={onStepIncrement} title={title} setTitle={setTitle} filterValues={filterValues} setFilterValues={setFilterValues} />
          </div>
        ) : (
          <>
            <ScrollableDateRangePicker
              onStepDecrement={onStepDecrement}
              hideSaveButton
              selectedFromDate={fromDate ?? filterValues?.from_date ?? undefined}
              setSelectedFromDate={setFromDate}
              selectedToDate={toDate ?? filterValues?.to_date ?? undefined}
              setSelectedToDate={setToDate}
            />
            <Divider style={{ margin: 0 }} />
          </>
        )}
      </div>
    </Drawer>
  );
}

export default FiltersModal;
