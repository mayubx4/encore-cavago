import React, { useEffect, useState } from 'react';
import {
  Typography, Row, Col, Slider, InputNumber, Divider,
} from 'antd';
import colors from '@shared/theme/colors';
import './_priceRangePicker.scss';

const { Title, Text } = Typography;

function PriceRangePicker({ onChange, minPrice, maxPrice }: {
  onChange: (min: number | undefined, max: number | undefined) => void,
  minPrice: number | undefined | null,
  maxPrice: number | undefined | null,
}) {
  const [minValue, setMinValue] = useState<number | undefined | null>(minPrice || 0);
  const [maxValue, setMaxValue] = useState<number | undefined | null>(maxPrice || 0);

  const MAXIUMUM_PRICE_RANGE = 100000;
  const MINIMUM_PRICE_RANGE = 0;

  useEffect(() => {
    setMinValue(minPrice || 0);
  }, [minPrice]);

  useEffect(() => {
    setMaxValue(maxPrice || 0);
  }, [maxPrice]);

  const onChangeMin = (value: number | null) => {
    setMinValue(value);
    onChange(value || 0, undefined);
  };

  const onChangeMax = (value: number | null) => {
    setMaxValue(value);
    onChange(undefined, value || 0);
  };

  const onSliderChange = (value: number[]) => {
    setMinValue(value[0]);
    setMaxValue(value[1]);
    onChange(value[0], value[1]);
  };

  return (
    <div className="priceRangePickerContainer">
      <Title level={5} className="priceRangePickerHeading">Price Range</Title>
      <Row gutter={[0, 24]}>
        <Col span={24}>
          <Slider
            range
            min={MINIMUM_PRICE_RANGE}
            max={MAXIUMUM_PRICE_RANGE}
            value={[minValue || 0, maxValue || 0]}
            onChange={onSliderChange}
            trackStyle={[{ backgroundColor: colors.primary[500] }]}
            handleStyle={[{ borderColor: colors.primary[500] }, { borderColor: colors.primary[500] }]}
          />
        </Col>
        <Col span={24}>
          <Row align="middle" justify="space-between">
            <Col span={11}>
              <div className="priceRangeInputContainer">
                <Text className="inputLabel">Minimum</Text>
                <InputNumber
                  min={MINIMUM_PRICE_RANGE}
                  max={maxValue || 0}
                  value={minValue}
                  required
                  onChange={onChangeMin}
                  prefix="£"
                  className="priceRangeInput"
                />
              </div>
            </Col>
            <Col span={2}>
              <Divider />
            </Col>
            <Col span={11}>
              <div className="priceRangeInputContainer">
                <Text className="inputLabel">Maximum</Text>
                <InputNumber
                  min={minValue || 0}
                  max={MAXIUMUM_PRICE_RANGE}
                  value={maxValue}
                  onChange={onChangeMax}
                  prefix="£"
                  className="priceRangeInput"
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default PriceRangePicker;
