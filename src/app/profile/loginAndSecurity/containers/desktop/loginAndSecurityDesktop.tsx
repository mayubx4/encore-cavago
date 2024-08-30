import MinimalHeader from '@shared/components/desktop/header/minimalHeader';
import { Button, Col, Row } from 'antd';
import './_loginAndSecurityDesktop.scss';
import React from 'react';
import Icon from '@shared/components/common/icons';
import Link from 'next/link';
import DisconnectSocial from '@shared/components/disconnectSocial/disconnectSocial';
import { useAuthenticationContext } from '@shared/hooks/authenticationContext';
import moment from 'moment';

export default function LoginAndSecurityDesktop() {
  const { user } = useAuthenticationContext();

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
              </div>
              <div className="form">
                <div className="textInputField">
                  <div className="fieldHeader">
                    <span className="fieldLabel" style={{ alignItems: 'center', flexDirection: 'row', gap: 4 }}>
                      Password
                    </span>
                  </div>
                  <div className="fieldValue">
                    <span className="fieldValueText">
                      Last updated {moment(user.password_updated_at).fromNow()}
                    </span>
                    <Link href="/profile/updatePassword" className="updatePasswordLink">
                      Change Password
                    </Link>
                  </div>
                  {(user?.google_id || user?.apple_id) && (

                    <div className="socials">
                      <p className="title">Social accounts</p>
                      {user?.google_id && (
                        <div className="socialLineItem">
                          <Icon name="googleOutlined" width={34} height={34} />
                          <div className="title">
                            <div>
                              <p className="socialName">
                                Google
                              </p>
                              <p className="socialVal">
                                {user?.email}
                              </p>
                            </div>
                            <DisconnectSocial provider="google" />
                          </div>
                        </div>
                      )}
                      <div className="dividor" />
                      {user?.apple_id && (
                        <div className="socialLineItem">
                          <Icon name="apple" width={32} height={32} />
                          <div className="title">
                            <div>
                              <p className="socialName">
                                Apple
                              </p>
                              <p className="socialVal">
                                {user?.email}
                              </p>
                            </div>
                            <DisconnectSocial provider="apple" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
