import React from 'react';
import {
  Col, Row, Typography,
} from 'antd';
import currencySymbolMap from 'currency-symbol-map';
import './_paymentBreakDown.scss';

const { Text } = Typography;

function PaymentBreakDown(
  {
    description,
    price,
    currency,
    promoCode = false,
  }
  : {
    description: string;
    price: number;
    promoCode?: boolean;
    currency: string;
  },
) {
  return (
    <Col span={24}>
      <Row justify="space-between" style={{ padding: '10px 0' }}>
        <Col span={16}>
          <Text className={`breakdownText ${promoCode && 'promoCodeText'}`}>{description}</Text>
        </Col>
        <Col>
          <Text className={`breakdownText ${promoCode && 'promoCodeText'}`}>
            {promoCode && '-'}
            {currencySymbolMap(currency)}
            {Math.abs(price).toFixed(2)}
          </Text>
        </Col>
      </Row>
    </Col>
  );
}

export default PaymentBreakDown;
