'use client';

import React from 'react';
import {
  Button, Divider, Row, Col,
} from 'antd';
import Icon from '@shared/components/common/icons';
import CancellationPolicy from '@shared/components/common/cancellationPolicy/cancellationPolicy';
import './_paymentDetails.scss';

function PaymentDetails({ onPayment, isLoading }: { onPayment: () => void; isLoading: boolean; }) {
  return (
    <div className="paymentDetailsContainers">
      <Row gutter={[0, 32]}>
        <Col span={24}>
          <CancellationPolicy hideShowMore />
        </Col>
        <Divider style={{ margin: 0 }} />
        <Col span={24}>
          <p className="termsAndConditions">
            By clicking the button below, I accept the&nbsp;
            <span style={{ textDecorationLine: 'underline' }}>terms and conditions</span>
            &nbsp;of Cavago's&nbsp;
            <span style={{ textDecorationLine: 'underline' }}>booking and refunds policies.</span>
          </p>
        </Col>
        <Col span={24}>
          <Button type="primary" className="button" onClick={onPayment} disabled={isLoading} loading={isLoading}>
            Proceed to Payment
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default PaymentDetails;
