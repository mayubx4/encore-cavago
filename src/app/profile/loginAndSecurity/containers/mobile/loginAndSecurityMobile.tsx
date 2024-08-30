import React from 'react';
import './_loginAndSecurityMobile.scss';
import ProfileHeader from '@app/profile/components/mobile/profileHeader/profileHeader';
import Link from 'next/link';
import Icon from '@shared/components/common/icons';
import { useAuthenticationContext } from '@shared/hooks/authenticationContext';
import moment from 'moment';
import DisconnectSocial from '@shared/components/disconnectSocial/disconnectSocial';

export default function LoginAndSecurityMobile() {
  const { user } = useAuthenticationContext();

  return (
    <div className="loginAndSecurityContainer">
      <ProfileHeader title="Login and security" />
      <div className="content">
        <h2 className="title">Login</h2>
        <div className="field">
          <div className="fieldLeft">
            <div className="fieldInfo">
              <h3 className="fieldLabel" style={{ alignItems: 'center', flexDirection: 'row', gap: 4 }}>
                Password
              </h3>
              {user?.password_updated_at && (
                <p className="fieldValueText">
                  Last updated {moment(user.password_updated_at).fromNow()}
                </p>
              )}
            </div>
          </div>
          <Link href="/profile/updatePassword" className="fieldLink">
            Update Password
          </Link>
        </div>
        {(user?.google_id || user?.apple_id) && (
          <>
            <h2 className="title">Social accounts</h2>
            {user?.google_id && (
              <div className="field">
                <div className="fieldLeft">
                  <Icon name="googleOutlined" width={28} height={28} />
                  <div className="fieldInfo">
                    <h3 className="fieldLabel" style={{ alignItems: 'center', flexDirection: 'row', gap: 4 }}>
                      Google
                    </h3>
                    <p className="fieldValueText">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DisconnectSocial provider="google" />
              </div>
            )}
            {user?.apple_id && (
              <div className="field">
                <div className="fieldLeft">
                  <Icon name="apple" width={28} height={28} />
                  <div className="fieldInfo">
                    <h3 className="fieldLabel" style={{ alignItems: 'center', flexDirection: 'row', gap: 4 }}>
                      Apple
                    </h3>
                    <p className="fieldValueText">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DisconnectSocial provider="apple" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
