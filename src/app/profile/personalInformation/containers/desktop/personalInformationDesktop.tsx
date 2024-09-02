import MinimalHeader from '@shared/components/desktop/header/minimalHeader';
import { Button, Col, Row } from 'antd';
import './_personalInformationDesktop.scss';
import React from 'react';
import Icon from '@shared/components/common/icons';
import ProfileForm from '@app/profile/components/desktop/profileForm/profileForm';
import { useRouter } from 'next/navigation';

export default function PersonalInformationDesktop() {
  const nav = useRouter();

  return (
    <>
      <div className="header-desktop">
        <div className="headerParent">
          <MinimalHeader />
        </div>
      </div>
      <div className="container">
        <Row justify="center">
          <Col sm={22}>
            <div className="contentContainer">
              <Button onClick={() => nav.back()} type="link" style={{ alignSelf: 'baseline' }}>
                <Icon name="caretLeft" width={35} height={35} style={{ marginTop: 44 }} />
              </Button>
              <div className="titleContainer">
                <h2 className="title">Personal Information</h2>
                <p className="subTitle">Edit your personal information here</p>
              </div>
              <div className="form">
                <ProfileForm />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
