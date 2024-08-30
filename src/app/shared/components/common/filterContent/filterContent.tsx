import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Row, Col, Divider, Form,
} from 'antd';
import PriceRangePicker from '@shared/components/common/priceRangePicker/priceRangePicker';
import homeApi from '@shared/api/home/homeApi';
import RidingAbility from '@shared/components/common/ridingAbility/ridingAbility';
import { FilterType } from '@shared/hooks/homeFiltersContext';
import BookingOptions from '@shared/components/common/bookingOptions/bookingOptions';
import DurationFilter from '@shared/components/common/durationFilter/durationFilter';
import MainCategoryFilter from '@shared/components/common/mainCategoryFilter/mainCategoryFilter';
import SubCategoryFilter from '@shared/components/common/subCategoryFilter/subCategoryFilter';
import DateRangePickerMobile from '@shared/components/mobile/dateRangePicker/dateRangePicker';
import DateRangePickerDesktop from '@shared/components/desktop/dateRangePicker/dateRangePicker';
import { useWhichDeviceContext } from '@shared/hooks/whichDeviceContext';
import './_filterContent.scss';
import { FiltersVisibility } from '@shared/constants/home';
import { Dayjs } from 'dayjs';

interface FilterContentProps {
  onStepIncrement?: () => void;
  title: string;
  setTitle: (value: string) => void;
  filterValues: FilterType;
  setFilterValues: (value: FilterType) => void;
}

function FilterContent({
  title, setTitle, setFilterValues, filterValues, onStepIncrement = () => { },
}: FilterContentProps) {
  const searchParams = useSearchParams();
  const device = useWhichDeviceContext();

  const query = homeApi.getCategories.useQuery();
  const { data } = query;

  const [subCategories, setSubCategories] = useState<{
    id: number;
    title: string;
    equine_main_activity_id: number;
  }[]>([]);

  useEffect(() => {
    if (data) {
      const defaultSubCategories = data.find((d) => d.id === filterValues?.main_category_id)?.sub_categories || [];
      setSubCategories(defaultSubCategories);
      setTitle(data.find((d) => d.id === filterValues?.main_category_id)?.title || '');
    }
  }, [data, filterValues?.main_category_id]);

  const onChangeSelectedCategoryId = (id: number) => {
    const newFilters = {
      ...filterValues,
      main_category_id: id,
    };
    delete newFilters.sub_category_id;
    setFilterValues(newFilters);
  };

  const onChangeFilter = (key: string, value: string | number) => {
    setFilterValues({
      ...filterValues,
      [key]: value,
    });
  };

  return (
    <div className="filterContentContainer">
      <Form onFinish={() => { }}>
        <Row gutter={[0, {
          xs: 24, sm: 24, md: 40, lg: 40, xl: 40,
        }]}
        >
          <Col span={24}>
            <MainCategoryFilter
              categories={data}
              selectedCategoryId={filterValues?.main_category_id}
              onChangeSelectedCategoryId={onChangeSelectedCategoryId}
            />
          </Col>
          <Col span={24}>
            <Divider style={{ margin: 0 }} />
          </Col>
          <Col span={24}>
            <SubCategoryFilter
              mainCategoryTitle={title}
              subCategories={subCategories}
              selectedSubCategories={filterValues?.sub_category_id}
              onChangeSubCategory={(value: number[]) => { onChangeFilter('sub_category_id', value); }}
            />
          </Col>

          {FiltersVisibility.dateRange.includes(title) && (
            <>
              <Col span={24}>
                <Divider style={{ margin: 0 }} />
              </Col>
              <Col span={24}>
                {device === 'desktop' ? (
                  <DateRangePickerDesktop
                    onChange={(dates: [Dayjs, Dayjs]) => {
                      setFilterValues({
                        ...filterValues,
                        from_date: dates[0]?.format('YYYY-MM-DD'),
                        to_date: dates[1]?.format('YYYY-MM-DD'),
                      });
                    }}
                    fromDate={filterValues?.from_date}
                    toDate={filterValues?.to_date}
                  />
                ) : (
                  <DateRangePickerMobile onStepIncrement={onStepIncrement} fromDate={filterValues?.from_date} toDate={filterValues?.to_date} />
                )}
              </Col>
            </>
          )}
          {FiltersVisibility.priceRange.includes(title) && (
            <>
              <Col span={24}>
                <Divider style={{ margin: 0 }} />
              </Col>
              <Col span={24}>
                <PriceRangePicker
                  minPrice={filterValues?.min_price}
                  maxPrice={filterValues?.max_price}
                  onChange={(min: number | undefined, max: number | undefined) => {
                    setFilterValues({
                      ...filterValues,
                      min_price: min || filterValues?.min_price || 0,
                      max_price: max || filterValues?.max_price || 0,
                    });
                  }}
                />
              </Col>
            </>
          )}
          {FiltersVisibility.durationInHours.includes(title) && (
            <>
              <Col span={24}>
                <Divider style={{ margin: 0 }} />
              </Col>
              <Col span={24}>
                <DurationFilter
                  title="Maximum duration (in hours)"
                  values={['1', '2', '3', '4', '5', '6', '7', '8+']}
                  value={filterValues?.duration_in_hours}
                  onChange={(value: string) => { onChangeFilter('duration_in_hours', value); }}
                />
              </Col>
            </>
          )}
          {FiltersVisibility.durationInDays.includes(title) && (
            <>
              <Col span={24}>
                <Divider style={{ margin: 0 }} />
              </Col>
              <Col span={24}>
                <DurationFilter
                  title="Maximum duration (in days)"
                  values={['1', '2', '3', '4', '5', '6', '7', '8+']}
                  value={filterValues?.duration_in_days}
                  onChange={(value: string) => { onChangeFilter('duration_in_days', value); }}
                />
              </Col>
            </>
          )}
          {FiltersVisibility.ridingAbility.includes(title) && (
            <>
              <Col span={24}>
                <Divider style={{ margin: 0 }} />
              </Col>
              <Col span={24}>
                <RidingAbility
                  selectedRidingAbility={filterValues?.rider_ability}
                  onChangeRidingAbility={(value: number[]) => {
                    onChangeFilter('rider_ability', value);
                  }}
                />
              </Col>
            </>
          )}
          {FiltersVisibility.bookingOptions.includes(title) && (
            <>
              <Col span={24}>
                <Divider style={{ margin: 0 }} />
              </Col>
              <Col span={24}>
                <BookingOptions
                  value={filterValues?.booking_method ? Number(filterValues.booking_method) : 0}
                  onChange={(value: boolean) => {
                    onChangeFilter('booking_method', value ? 1 : 0);
                  }}
                />
              </Col>
            </>
          )}
        </Row>
      </Form>
    </div>
  );
}

export default FilterContent;
