import React from 'react';
import {
  Button, Col, Typography,
} from 'antd';
import TitleBar from '@shared/components/common/titleBar/titleBar';
import Icon from '@shared/components/common/icons';
import './_paymentSuccessful.scss';
import { useRouter } from 'next/navigation';
import CongratulationsAnimation from './animation/animation';

function PaymentSuccessful() {
  const router = useRouter();

  return (
    <CongratulationsAnimation>
      <div className="paymentConfirmContainer">

        <TitleBar level={1} className="congratulationsHeading">Congratulations!</TitleBar>

        <div>
          <Typography.Text className="congratulationsText">You're on your way to your dream holiday.</Typography.Text>
        </div>
        <div><Icon name="cavagoIcon" width={100} height={100} /></div>

        <div>
          <Typography.Text className="congratulationsSubText">Your booking is confirmed. We hope you have a wonderful experience.</Typography.Text>
        </div>
        <Col>
          <div>
            <Button
              type="primary"
              className="exploreButton"
              onClick={() => router.push('/home')}
            >
              <Typography.Text className="text">Explore more</Typography.Text>
            </Button>
          </div>
        </Col>
      </div>
    </CongratulationsAnimation>
  );
}

export default PaymentSuccessful;
