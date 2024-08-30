import MinimalHeader from '@shared/components/desktop/header/minimalHeader';
import { Col, Row } from 'antd';
import './_createPasswordDesktop.scss';
import '@app/profile/loginAndSecurity/containers/desktop/_loginAndSecurityDesktop.scss';
import React from 'react';
import Icon from '@shared/components/common/icons';
import CreatePasswordForm from 'app/profile/components/desktop/createPasswordForm/createPasswordForm';

export default function CreatePasswordDesktop() {
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
              <Icon name="caretLeft" width={35} height={35} style={{ marginTop: 44 }} />
              <div className="titleContainer">
                <h2 className="title">Create a new password</h2>
                <p className="subTitle">You can set up a new password now</p>
                <div className="dividor" />
              </div>
              <CreatePasswordForm />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
