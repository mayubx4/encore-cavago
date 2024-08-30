import {
  Button, Col, Modal, Row, Space,
} from 'antd';
import React from 'react';
import './_cancelModal.scss';

export default function CancelModal({
  open,
  toggleModal,
} : {
  open: boolean;
  toggleModal: () => void;
}) {
  return (
    <Modal
      open={open}
      onCancel={toggleModal}
      footer={null}
      title={<p className="cancelTitle">Cancel Booking?</p>}
    >
      <div className="cancelModal">
        <p className="content">Are you sure you want to cancel this booking? You can message the host to find other arrangements for timings.</p>
        <Row justify="space-between" align="middle">
          <Col span={11}>
            <Button size="large" className="red">Yes, cancel my booking</Button>
          </Col>
          <Col span={11}>
            <Button size="large" className="normal">Message Host</Button>
          </Col>
        </Row>
      </div>
    </Modal>
  );
}
