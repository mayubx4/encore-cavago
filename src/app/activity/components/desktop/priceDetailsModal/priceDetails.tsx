'use client';

import React from 'react';
import {
  Divider,
  Modal,
  Row,
  Col,
} from 'antd';
import Title from '@shared/wrappers/Title';
import colors from '@shared/theme/colors';
import Text from '@shared/wrappers/Text';
import './_priceDetails.scss';

export default function PriceDetailsModal({
  vat,
  price,
  open,
  days,
  toggleModal,
} : {
  vat: number | null | undefined;
  price: string;
  open: boolean;
  days: number;
  toggleModal: () => void;
}) {
  return (
    <Modal
      title={(
        <Title level={3} color={colors.neutrals[500]} style={{ textAlign: 'center' }}>
          Price details
        </Title>
      )}
      onCancel={toggleModal}
      open={open}
      footer={null}
    >
      <div className="mainModalDiv">
        <Divider />
        <Row justify="space-between">
          <Col span={12}>
            <Text strong color={colors.neutrals[500]}>Adults</Text>
          </Col>
          <Col span={12} style={{ textAlign: 'center' }}>
            <Text strong color={colors.neutrals[500]}>{price}</Text>
          </Col>
        </Row>
        <Row justify="space-between">
          <Col span={12}>
            <Text strong color={colors.neutrals[500]}>Children (ages 5 - 12)</Text>
          </Col>
          <Col span={12} style={{ textAlign: 'center' }}>
            <Text strong color={colors.neutrals[500]}>{price}</Text>
          </Col>
        </Row>
        <Text className="notes">Any Additional Notes</Text>
        <Divider />
        <Row justify="space-between">
          <Col span={12}>
            <Text strong color={colors.neutrals[500]}>VAT</Text>
          </Col>
          <Col span={12} style={{ textAlign: 'center' }}>
            <Text strong>
              {vat}
              %
            </Text>
          </Col>
        </Row>
        <Text className="notes">Any Additional Notes</Text>
        {days && (
          <>
            <Divider />
            <div>
              <Text strong color={colors.neutrals[500]}>Days and Timings</Text>
              <p>
                <Text className="notes">{`This is a ${days} day activity`}</Text>
              </p>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
