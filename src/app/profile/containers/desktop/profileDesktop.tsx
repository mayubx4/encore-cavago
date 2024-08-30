import MinimalHeader from '@shared/components/desktop/header/minimalHeader';
import { Col, Row } from 'antd';
import React from 'react';
import './_profileDesktop.scss';
import Icon, { IconType } from '@shared/components/common/icons';
import colors from '@shared/theme/colors';
import Link from 'next/link';
import { withAuth } from '@shared/hooks/authenticationContext';

function ProfileDesktop() {
  const links: { title: string, subtitle: string, icon: IconType, link: string }[] = [
    {
      title: 'Personal Information',
      icon: 'userDark',
      subtitle: 'Edit your personal information',
      link: '/profile/personalInformation',
    },
    {
      title: 'Login and Security',
      icon: 'securityLock',
      subtitle: 'Edit your personal information',
      link: '/profile/loginAndSecurity',
    },
  ];

  return (
    <>
      <div className="header-desktop">
        <div className="headerParent">
          <MinimalHeader />
        </div>
      </div>
      <div className="profileContainer">
        <Row justify="center">
          <Col sm={22}>
            <div className="contentContainer">
              <h2 className="title">Your Profile</h2>
              <p className="subTitle">Make changes to your personal information and account settings.</p>
              <div className="options">
                {links.map((l) => (
                  <Link key={l.title} className="profileOption" href={l.link}>
                    <Icon name={l.icon} width={32} height={32} color={colors.neutrals[500]} />
                    <div>
                      <b className="title">{l.title}</b>
                      <p className="subtitle">{l.subtitle}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default withAuth(ProfileDesktop);
