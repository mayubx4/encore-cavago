import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import './_cancellationPolicy.scss';

interface CancellationPolicyProps {
  hideShowMore?: boolean;
}

function CancellationPolicy({ hideShowMore = false }: CancellationPolicyProps) {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="policyContainer">
      <Row gutter={[0, {
        xs: 16, sm: 16, md: 24, lg: 24, xl: 24,
      }]}
      >
        <Col span={12}>
          <p className="policyHeading">Cancellation Policy</p>
        </Col>
        <Col>
          <ul style={{ padding: '0 10px' }}>
            <li>Notify at least 48 hours in advance to receive a full refund.</li>
            <li>
              Cancellations made within 48 hours of the scheduled
              activity will incur a 50% cancellation fee.
            </li>
            <li>No-shows will be charged the full amount.</li>
            {(showMore || hideShowMore) && (
              <>
                <li>Notify at least 48 hours in advance to receive a full refund.</li>
                <li>
                  Cancellations made within 48 hours of the scheduled
                  activity will incur a 50% cancellation fee.
                </li>
                <li>No-shows will be charged the full amount.</li>
              </>
            )}
          </ul>
          {!hideShowMore && (
            <Button onClick={toggleShowMore} className="showMoreButton">
              {showMore ? 'See less' : 'See more'}
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default CancellationPolicy;
