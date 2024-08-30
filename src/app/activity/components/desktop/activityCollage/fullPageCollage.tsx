import React from 'react';
import {
  Row, Col, Image,
} from 'antd';

import './_activityCollage.scss';

export default function FullPageCollage(
  {
    img1,
    img2,
    img3,
    img4,
    img5,
  } : {
    img1: string;
    img2: string;
    img3: string;
    img4: string;
    img5: string;
  },
) {
  const fallback = 'https://placehold.jp/150x150.png';

  return (
    <>
      <Row gutter={[12, 12]} className="first_row">
        <Col span={24}>
          <Image
            width="100%"
            src={img1}
            alt="image1"
            preview={false}
            className="image"
            fallback={fallback}
          />
        </Col>
      </Row>
      <Row gutter={[12, 12]} className="second_row" style={{ marginTop: 10 }}>
        <Col span={12}>
          <Image
            src={img2}
            width="100%"
            alt="image2"
            preview={false}
            className="image"
            fallback={fallback}
          />
        </Col>
        <Col span={12}>
          <Image
            src={img3}
            width="100%"
            alt="image3"
            preview={false}
            className="image"
            fallback={fallback}
          />
        </Col>
      </Row>
      <Row gutter={[12, 12]} className="first_row" style={{ marginTop: 10 }}>
        <Col span={24}>
          <Image
            src={img4}
            width="100%"
            alt="image4"
            preview={false}
            className="image"
            fallback={fallback}
          />
        </Col>
      </Row>
      <Row gutter={[12, 12]} className="first_row" style={{ marginTop: 10 }}>
        <Col span={24}>
          <Image
            src={img5}
            preview={false}
            width="100%"
            alt="image5"
            className="image"
            fallback={fallback}
          />
        </Col>
      </Row>
    </>
  );
}
