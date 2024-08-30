import React, { useState } from 'react';
import {
  Drawer, Button, Typography, Col, Row,
} from 'antd';
import Icon from '@shared/components/common/icons';
import './_paymentFailedPopup.scss';

const { Title, Paragraph, Text } = Typography;

function PaymentFailedPopup() {
  const [open, setOpen] = useState(true);

  const handleUpdatePaymentMethod = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      title={null}
      placement="bottom"
      closable={false}
      onClose={handleClose}
      open={open}
      styles={{ content: { borderRadius: '30px 30px 0 0' } }}
      height="auto"
    >
      <div className="failedPaymentPropContent">
        <div className="mainContent">
          <Icon name="alert" className="alertIcon" />
          <Title level={5} className="paymentFailedHeading">Payment Failed</Title>

          <Paragraph className="explanationText">
            We tried to charge your card but something went wrong.
            Please update your payment method below to continue.
          </Paragraph>
        </div>
        <Button
          type="primary"
          onClick={handleUpdatePaymentMethod}
          className="updatePaymentButton"
        >
          <Text className="text">Update payment method</Text>
        </Button>
      </div>
    </Drawer>
  );
}

export default PaymentFailedPopup;
