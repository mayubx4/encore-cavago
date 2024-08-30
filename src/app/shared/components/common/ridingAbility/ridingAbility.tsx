import React from 'react';
import {
  Typography, Row, Col,
} from 'antd';
import CustomCheckbox from '../customCheckbox/customCheckbox';
import './_ridingAbility.scss';

const { Title } = Typography;

function RidingAbility({ selectedRidingAbility, onChangeRidingAbility }: {
  selectedRidingAbility: number[] | null | undefined,
  onChangeRidingAbility: (value: number[]) => void
}) {
  const ridingAbilities = ['Beginner', 'Novice', 'Intermediate', 'Strong Intermediate', 'Advanced'];

  const handleCheckboxChange = (value: number, remove = false) => {
    if (remove) {
      onChangeRidingAbility(selectedRidingAbility?.filter((element) => element !== value) || []);
    } else {
      onChangeRidingAbility(selectedRidingAbility ? [...selectedRidingAbility, value] : [value]);
    }
  };

  return (
    <Row className="ridingAbilityContainer">
      <Col span={24}>
        <Title level={5} className="ridingAbilityHeading">Riding Ability</Title>
      </Col>
      <Col span={24}>
        <Row justify="space-between">
          {ridingAbilities.map((item, index) => (
            <Col span={24} key={index}>
              <CustomCheckbox
                title={item}
                id={index + 1}
                value={selectedRidingAbility?.includes((index + 1))}
                onChange={handleCheckboxChange}
              />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
}

export default RidingAbility;
