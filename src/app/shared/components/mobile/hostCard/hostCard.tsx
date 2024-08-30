import colors from '@shared/theme/colors';
import Title from '@shared/wrappers/Title';
import {
  Card, Col, Row, Space,
} from 'antd';
import Image from 'next/image';
import React from 'react';
import Man from 'app/assets/images/man.png';
import Text from '@shared/wrappers/Text';
import Icon from '@shared/components/common/icons';
import './_hostCard.scss';

export default function HostCard(
  { hostName, rating, reviewsCount, profilePicture }: {
    hostName: string; rating: number; reviewsCount: number, profilePicture?: string,
  },
) {
  return (
    <div className="hostCardContainer">
      <Title level={4} color={colors.neutrals[500]} className="meetHost">Meet your host</Title>
      <Card bordered={false} type="inner" className="hostCard">
        <Row justify="space-between" align="middle">
          <Col span={14}>
            <Space direction="vertical" style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image
                  src={profilePicture ? profilePicture : Man}
                  alt="man"
                  width={80}
                  height={80}
                  className="hostInfo"
                />
              </div>
              <Title level={4} color={colors.neutrals[500]} className="hostName">
                {hostName}
              </Title>
              <Text color={colors.neutrals[400]}>
                <b className="hostText">Host</b>
              </Text>
            </Space>
          </Col>
          <Col span={10}>
            <Space direction="vertical">
              <Space size={1} direction="vertical">
                <Text color={colors.neutrals[500]}>
                  <b className="furtherDetailsValue">3</b>
                </Text>
                <Text color={colors.neutrals[300]} className="furtherDetails">
                  Year's hosting
                </Text>
              </Space>
              <Space size={1} direction="vertical">
                <Row align="bottom" style={{ columnGap: 4 }}>
                  <Col>
                    <Text color={colors.neutrals[500]}>
                      <b className="furtherDetailsValue">{rating}</b>
                    </Text>
                  </Col>
                  <Col>
                    <Icon width={16} height={16} name="goldenStar" />
                  </Col>
                </Row>
                <Text color={colors.neutrals[300]} className="furtherDetails">
                  Rating
                </Text>
              </Space>
              <Space size={1} direction="vertical">
                <Text color={colors.neutrals[500]}>
                  <b className="furtherDetailsValue">{reviewsCount}</b>
                </Text>
                <Text color={colors.neutrals[300]} className="furtherDetails">
                  Reviews
                </Text>
              </Space>
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
