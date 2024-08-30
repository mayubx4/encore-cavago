import React, { useState } from 'react';
import {
  Button, Col, Divider, Radio, Row, Space,
} from 'antd';
import './_courseSchedulePicker.scss';
import Text from '@shared/wrappers/Text';
import Title from '@shared/wrappers/Title';
import colors from '@shared/theme/colors';
import Icon from '../icons';

function CourseSchedulePicker(
  { setCourse, options }
  : { setCourse: (course: boolean) => void, options: any[] },
) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const { Group } = Radio;

  return (
    <div className="courseContainer">
      <Icon
        name="backArrow"
        width={24}
        height={24}
        style={{ flexShrink: 0 }}
        onClick={() => {
          setCourse(false);
        }}
      />
      <Title level={4} color={colors.neutrals[500]}>Upcomming Course Schedule</Title>
      <Text className="secondary">Select the date and venue that suits you</Text>
      <Divider />
      <Group
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        style={{ width: '100%' }}
      >
        <Space direction="vertical" style={{ width: '90%' }}>
          {options.map((option, index) => (
            <Radio value={option.id} key={index} className={`option ${option.disabled && 'disabled'}`} disabled={option.disabled}>
              <Row justify="space-between" style={{ width: '100%' }} align="middle">
                <Col span={option.disabled ? 16 : 24}>
                  <Space direction="vertical" size={1}>
                    <Text className="mainText">{option.date}</Text>
                    <Text className="secondaryText">{option.venue}</Text>
                  </Space>
                </Col>
                {option.disabled && (
                  <Col span={8} style={{ textAlign: 'right' }}>
                    <Text className="soldOut">Sold Out</Text>
                  </Col>
                )}
              </Row>
            </Radio>
          ))}
        </Space>
      </Group>
      <Divider />
      <Button type="primary" className="btn" disabled={!selectedOption} onClick={() => setCourse(false)}>Save</Button>
    </div>
  );
}

export default CourseSchedulePicker;
