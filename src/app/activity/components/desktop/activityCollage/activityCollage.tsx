import React from 'react';
import {
  Row, Col, Button, Image,
} from 'antd';
import Icon from '@shared/components/common/icons';
import './_activityCollage.scss';

export default function ActivityCollage(
  {
    img1,
    img2,
    img3,
    img4,
    img5,
    toggleSeePhotos,
  } : {
    img1: string;
    img2: string;
    img3: string;
    img4: string;
    img5: string;
    toggleSeePhotos: () => void;
  },
) {
  const fallback = 'https://placehold.jp/150x150.png';

  return (
    <Row gutter={[12, 12]} className="main_row">
      <Col md={24} lg={12} style={{ padding: '0 0 0 2px' }}>
        <Image
          src={img1}
          preview={false}
          width="100%"
          alt="image1"
          className="image main"
          fallback={fallback}
        />
      </Col>
      <Col md={24} lg={12}>
        <Row gutter={[12, 12]}>
          <Col xs={12}>
            <Image
              src={img2}
              width="100%"
              preview={false}
              alt="image2"
              className="image"
              fallback={fallback}
            />
          </Col>
          <Col xs={12}>
            <Image
              src={img3}
              alt="image3"
              width="100%"
              preview={false}
              style={{
                borderTopRightRadius: '15px',
              }}
              fallback={fallback}
              className="image"
            />
          </Col>
        </Row>
        <Row gutter={[12, 12]} style={{ marginTop: 10 }}>
          <Col xs={12}>
            <Image
              src={img4}
              preview={false}
              alt="image4"
              width="100%"
              fallback={fallback}
              className="image"
            />
          </Col>
          <Col xs={12}>
            <Image
              src={img5}
              alt="image5"
              width="100%"
              fallback={fallback}
              style={{
                borderBottomRightRadius: '15px',
              }}
              preview={false}
              className="image"
            />
            <Button
              icon={<Icon style={{ paddingTop: '4px' }} name="images" />}
              size="middle"
              className="images_button"
              onClick={toggleSeePhotos}
            >
              See all photos
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
