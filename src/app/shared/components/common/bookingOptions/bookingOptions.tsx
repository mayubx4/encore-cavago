import React from 'react';
import {
  Typography, Switch,
  Row,
  Col,
} from 'antd';
import './_bookingOptions.scss';

const { Title, Text } = Typography;

function BookingOptions({ onChange, value }: { value: number, onChange: (value: boolean) => void }) {
  return (
    <Row className="bookingOptionsContainer" gutter={[0, 24]}>
      <Col span={24}>
        <Title level={5} className="bookingOptionsHeading">Booking Options</Title>
      </Col>
      <Col span={24}>
        <Row justify="space-between" align="middle">
          <Col span={20}>
            <Row gutter={[0, 12]}>
              <Col span={24}><Text className="instantBookingHeading">Instant booking</Text></Col>
              <Col span={24}>
                <Text className="instantBookingExplanationText">Experiences you can book without waiting for Host approval</Text>
              </Col>
            </Row>
          </Col>
          <Col>
            <Switch checked={!!(value && value === 1)} onChange={onChange} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default BookingOptions;
