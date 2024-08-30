import MinimalHeader from '@shared/components/desktop/header/minimalHeader';
import { Col, Row } from 'antd';
import './_updatePasswordDesktop.scss';
import '@app/profile/loginAndSecurity/containers/desktop/_loginAndSecurityDesktop.scss';
import React from 'react';
import Icon from '@shared/components/common/icons';
import UpdatePasswordForm from '@app/profile/components/desktop/updatePasswordForm/updatePasswordForm';
import { UpdatePasswordFormData } from '@shared/api/authentication/schemas';

export default function UpdatePasswordDesktop({ onSubmit, isSubmitting }:
  { onSubmit: (u: UpdatePasswordFormData) => void; isSubmitting: boolean }) {
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
                <h2 className="title">Login and Security</h2>
                <p className="subTitle">Add a payment method using our secure payment system, then start planning your next trip.</p>
                <div className="dividor" />
              </div>
              <UpdatePasswordForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
