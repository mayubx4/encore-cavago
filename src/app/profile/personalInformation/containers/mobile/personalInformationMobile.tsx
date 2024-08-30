import React from 'react';
import './_personalInformationMobile.scss';
// import ProfileForm from '@app/profile/components/mobile/profileForm /profileForm';
import ProfileHeader from '@app/profile/components/mobile/profileHeader/profileHeader';

export default function PersonalInformationMobile() {
  return (
    <div className="personalInformationContainer">
      <ProfileHeader title="Personal information" />
      {/* <ProfileForm /> */}
    </div>
  );
}
