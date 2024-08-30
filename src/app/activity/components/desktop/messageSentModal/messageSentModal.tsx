import React from 'react';
import {
  Divider, Modal, Button,
  Row,
  Col,
} from 'antd';
import Title from '@shared/wrappers/Title';
import colors from '@shared/theme/colors';
import './_messageSentModal.scss';

export default function MessageSentModal({
  open,
  toggleModal,
} : {
  open: boolean;
  toggleModal: () => void;
}) {
  return (
    <Modal
      title={(
        <>
          <Title level={3} style={{ margin: 0 }} color={colors.neutrals[600]}>Message Sent!</Title>
          <p className="modalText">The host will get back to you soon</p>
        </>
      )}
      onCancel={toggleModal}
      open={open}
      footer={null}
    >
      <div className="mainModalDiv">
        <Divider />
        <Divider />
        <Row justify="space-between" align="middle">
          <Col span={11}>
            <Button size="large" className="secondaryBtn">Go to Messages</Button>
          </Col>
          <Col span={11}>
            <Button type="primary" size="large" className="messageBtn">Explore More</Button>
          </Col>
        </Row>
      </div>
    </Modal>
  );
}
