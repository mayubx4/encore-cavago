import React from 'react';
import { Button, Col, Row } from 'antd';
import { useRouter } from 'next/navigation';
import Icon from '@shared/components/common/icons';
import { useWhichDeviceContext } from '@shared/hooks/whichDeviceContext';
import './_paymentCancelled.scss';

function PaymentCancelled() {
  const router = useRouter();
  const device = useWhichDeviceContext();
  const size = device === 'desktop' ? 200 : 100;
  const icon = device === 'desktop' ? 'creditCardCry' : 'creditCardCryMobile';

  return (
    <div className="paymenCancelledRoot">
      <Button type="link" onClick={router.back}>
        <Icon name="backArrow" />
      </Button>
      <Row justify="center" gutter={[0, 60]} className="paymenCancelledContainer">
        <Col span={24}><h1 className="heading">Uh oh! Payment Cancelled!</h1></Col>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Icon name={icon} width={size} height={size} />
        </Col>
        <Col span={22}>
          <p className="text">Your payment was not completed. Please try again.</p>
        </Col>
      </Row>
    </div>
  );
}

export default PaymentCancelled;
