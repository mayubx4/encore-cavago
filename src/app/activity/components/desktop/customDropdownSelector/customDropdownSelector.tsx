import React, { useEffect, useState } from 'react';
import {
  Button, Col, Row, Select, Space,
} from 'antd';
import Icon from '@shared/components/common/icons';
import Text from '@shared/wrappers/Text';
import './_customDropdownSelector.scss';

export default function CustomDropDownSelector({
  adult,
  child,
  both,
  basePrice,
  minAge,
  adultsCount,
  childrenCount,
  setAdultsCount,
  setChildrenCount,
}: {
  adult: number;
  child: number;
  basePrice: string;
  minAge: string;
  adultsCount: number;
  childrenCount: number;
  both: number;
  setAdultsCount: (value: number) => void;
  setChildrenCount: (value: number) => void;
}) {
  const [defaultValue, setDefaultValue] = useState('1 Adult');

  useEffect(() => {
    setDefaultValue(`${adultsCount} Adult${adultsCount > 1 ? 's' : ''}${childrenCount > 0 ? `, ${childrenCount} Child${childrenCount > 1 ? 'ren' : ''}` : ''}`);
  }, [adultsCount, childrenCount]);

  const incAdultCount = () => {
    setAdultsCount(adultsCount + 1);
  };

  const decAdultCount = () => {
    if (adultsCount - 1 > 0) {
      setAdultsCount(adultsCount - 1);
    }
  };

  const incChildCount = () => {
    setChildrenCount(childrenCount + 1);
  };

  const decChildCount = () => {
    if (childrenCount - 1 >= 0) {
      setChildrenCount(childrenCount - 1);
    }
  };

  return (
    <>
      <span className="placeholder">
        GUESTS
      </span>
      <Select
        className="selector"
        placeholder="Guests"
        style={{ width: '100%' }}
        value={defaultValue}
        suffixIcon={<Icon name="arrowDown" width={24} height={24} />}
        dropdownRender={() => (
          <div>
            {(both === 1 || adult === 1) && (
              <Row justify="space-between" align="middle" style={{ padding: '10px' }}>
                <Col span={16}>
                  <Space direction="vertical" size={1}>
                    <Text className="priceHeading">
                      Adults
                      {'  '}
                      +
                      {basePrice}
                    </Text>
                    <Text className="description">
                      Age&nbsp;
                      {minAge}
                      +
                    </Text>
                  </Space>
                </Col>
                <Col span={8}>
                  <Space size={8} className="btnSpace" align="center">
                    <Button shape="circle" size="small" icon={<Icon name="plus" />} onClick={incAdultCount} />
                    <span>{adultsCount}</span>
                    <Button shape="circle" size="small" icon={<Icon name="minus" />} onClick={decAdultCount} />
                  </Space>
                </Col>
              </Row>
            )}
            {(both === 1 || child === 1) && (
              <Row justify="space-between" align="middle" style={{ padding: '10px' }}>
                <Col span={16}>
                  <Space direction="vertical" size={1}>
                    <Text className="priceHeading">
                      Children
                      {'  '}
                      +
                      {basePrice}
                    </Text>
                    <Text className="description">
                      Age&nbsp;
                      {minAge}
                      +
                    </Text>
                  </Space>
                </Col>
                <Col span={8}>
                  <Space size={8} className="btnSpace" align="center">
                    <Button shape="circle" size="small" icon={<Icon name="plus" />} onClick={incChildCount} />
                    <span>{childrenCount}</span>
                    <Button shape="circle" size="small" icon={<Icon name="minus" />} onClick={decChildCount} />
                  </Space>
                </Col>
              </Row>
            )}
          </div>
        )}
      />
    </>
  );
}
