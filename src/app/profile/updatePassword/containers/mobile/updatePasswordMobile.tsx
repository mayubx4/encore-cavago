import './_updatePasswordMobile.scss';
import '@app/profile/loginAndSecurity/containers/desktop/_loginAndSecurityDesktop.scss';
import React from 'react';
import UpdatePasswordForm from '@app/profile/components/mobile/updatePasswordForm/updatePasswordForm';
import ProfileHeader from '@app/profile/components/mobile/profileHeader/profileHeader';
import { UpdatePasswordFormData } from '@shared/api/authentication/schemas';

export default function UpdatePasswordMobile({ onSubmit, isSubmitting }:
  { onSubmit: (u: UpdatePasswordFormData) => void; isSubmitting: boolean }) {
  return (
    <div className="updatePasswordContainer">
      <ProfileHeader title="Change your password" subtitle="Enter your new password." />
      <UpdatePasswordForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
    </div>
  );
}
