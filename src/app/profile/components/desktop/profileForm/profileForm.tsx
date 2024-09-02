'use client';

import {
  Button, Form, Input, InputProps,
  Select,
} from 'antd';
import React, { ReactNode, useState } from 'react';
import './_profileForm.scss';
import Icon from '@shared/components/common/icons';
import Avatar from '@shared/components/common/avatar/avatar';
import FileSelect from '@shared/components/common/fileSelect/fileSelect';
import countries from '@shared/constants/countries';
import { ridingAbilities } from '@app/authentication/components/desktop/signUpDesktopStep3';
import authApi from '@shared/api/authentication/authenticationApi';
import { useAuthenticationContext } from '@shared/hooks/authenticationContext';

export default function ProfileForm() {
  const [form] = Form.useForm();
  const auth = useAuthenticationContext();
  const [editMode, setEditMode] = useState<string | null>(null);

  const updateProfileMutation = authApi.updateProfile.useMutation({
    onSuccess: (data) => {
      authApi.getUser.setData(undefined, () => data.user);
      setEditMode(null);
    },
  });

  const onReset = () => {
    form.resetFields();
    setEditMode(null);
  };

  return (
    <div className="profileWebFormContainer">
      {auth.user && (
        <Form
          form={form}
          initialValues={auth.user}
          onFinish={updateProfileMutation.mutate}
        >
          <div className="formContainer">
            <div className="leftForm">
              <FormInputField
                editMode={editMode === 'email'}
                setEditMode={() => setEditMode('email')}
                onSubmit={form.submit}
                formatValue={() => auth?.user?.email || ''}
                label="Email"
                onCancel={onReset}
                fieldComponent={<></>}
              />
              <FormInputField
                loading={updateProfileMutation.isLoading}
                editMode={editMode === 'first_name'}
                setEditMode={() => setEditMode('first_name')}
                label="Name"
                isEditable
                formatValue={() => `${auth.user?.first_name} ${auth.user?.last_name}`}
                onSubmit={form.submit}
                onCancel={onReset}
                fieldComponent={(
                  <div style={{ flexDirection: 'row', gap: 18 }}>
                    <Form.Item name="first_name" rules={[{ required: true }]} style={{ alignItems: 'flex-start', flex: 1 }}>
                      <InputField label="First Name" />
                    </Form.Item>
                    <Form.Item name="last_name" rules={[{ required: true }]} style={{ alignItems: 'flex-start', flex: 1 }}>
                      <InputField label="Last Name" />
                    </Form.Item>
                  </div>
                )}
              />
              <Form.Item noStyle name={['user_profile', 'phone']} rules={[{ required: true }]} style={{ alignItems: 'flex-start', flex: 1 }}>
                <FormInputField
                  loading={updateProfileMutation.isLoading}
                  key="phone"
                  editMode={editMode === 'phone'}
                  setEditMode={() => setEditMode('phone')}
                  label="Phone Number"
                  isEditable
                  onSubmit={form.submit}
                  onCancel={onReset}
                  fieldComponent={(
                    <Form.Item name={['user_profile', 'phone']} rules={[{ required: true }]} style={{ alignItems: 'flex-start', flex: 1 }}>
                      <PhoneField />
                    </Form.Item>
                  )}
                />
              </Form.Item>
              <Form.Item noStyle name={['user_profile', 'ability']} rules={[{ required: true }]} style={{ alignItems: 'flex-start', flex: 1 }}>
                <FormInputField
                  loading={updateProfileMutation.isLoading}
                  key="ability"
                  editMode={editMode === 'ability'}
                  setEditMode={() => setEditMode('ability')}
                  info="asdasdsads"
                  label="Riding Ability"
                  isEditable
                  onSubmit={form.submit}
                  onCancel={onReset}
                  fieldComponent={(
                    <Form.Item name={['user_profile', 'ability']} rules={[{ required: true }]} style={{ alignItems: 'flex-start', flex: 1 }}>
                      <Select className="dropDown" options={ridingAbilities} />
                    </Form.Item>
                  )}
                />
              </Form.Item>
              <Form.Item noStyle name={['user_profile', 'country']} rules={[{ required: true }]} style={{ alignItems: 'flex-start', flex: 1 }}>
                <FormInputField
                  loading={updateProfileMutation.isLoading}
                  key="country"
                  editMode={editMode === 'country'}
                  setEditMode={() => setEditMode('country')}
                  label="Country"
                  isEditable
                  onSubmit={form.submit}
                  onCancel={onReset}
                  formatValue={(val) => countries.find((c) => c.code === val)?.name || ''}
                  fieldComponent={(
                    <Form.Item name={['user_profile', 'country']} rules={[{ required: true }]} style={{ alignItems: 'flex-start', flex: 1 }}>
                      <Select className="dropDown" options={countries.map((c) => ({ label: c.name, value: c.code }))} />
                    </Form.Item>
                  )}
                />
              </Form.Item>
            </div>
            <div className="rightForm">
              <div className="avatarForm">

                <Avatar radius={210} image={auth.user?.user_profile?.img_1_url ?? undefined} />

                <Form.Item name={['avatar']}>
                  <AddImageButton
                    loading={updateProfileMutation.isLoading}
                    onSubmit={form.submit}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      )}
    </div>
  );
}

function PhoneField(props: InputProps) {
  const onChange = (c, v) => {
    props.onChange?.(`${c || ''}-${v || ''}`);
  };

  return (
    <div className="phoneField">
      <Select
        className="dropDown"
        style={{ width: 200 }}
        onChange={(v) => onChange(v, (props.value || '').split?.('-')?.[1])}
        value={(props.value || '').split?.('-')?.[0]}
      >
        {countries.filter((c) => c.dial_code).map((country) => (
          <Select.Option
            key={country.code}
            label={country.dial_code}
            value={country.dial_code}
          >
            {country.dial_code}
          </Select.Option>
        ))}
      </Select>
      <Input className="dropDown" value={(props.value || '').split?.('-')?.[1]} onChange={(v) => onChange((props.value || '').split?.('-')?.[0], v.target.value)} />
    </div>
  );
}
function AddImageButton(
  { loading, onSubmit, ...props }:
    InputProps & { loading?: boolean, onSubmit: () => void },
) {
  const onChange = (f) => {
    props?.onChange?.(f);
    onSubmit();
  };

  return (
    <FileSelect
      onChange={(file) => onChange(file as React.ChangeEvent<HTMLInputElement>)}
    >
      <Button loading={loading} icon={<Icon name="camera" width={24} height={24} />} className="addImageButton">
        Add
      </Button>
    </FileSelect>
  );
}
function FormInputField({
  fieldComponent, onCancel, onSubmit, label, isEditable, formatValue, info,
  editMode, setEditMode, loading,
  ...rest
}:
  InputProps &
  {
    fieldComponent: ReactNode, onCancel: () => void,
    onSubmit: () => void; label: string; isEditable?: boolean;
    formatValue?: (v: unknown) => string;
    info?: string;
    editMode: boolean;
    loading?: boolean;
    setEditMode: () => void;
  }) {
  return (
    <div className="textInputField">
      <div className="fieldHeader">
        <span className="fieldLabel" style={{ alignItems: 'center', flexDirection: 'row', gap: 4 }}>
          {label}
          {info && <Icon name="info" width={16} height={16} />}
        </span>
        {isEditable && (
          <Button
            type="link"
            className="editButton"
            onClick={() => {
              setEditMode();
              if (editMode) onCancel();
            }}
          >
            {editMode ? 'Cancel' : 'Edit'}
          </Button>
        )}
      </div>
      <div style={{ display: editMode ? 'block' : 'none' }}>
        {fieldComponent}
        <Button
          className="saveButton"
          htmlType="submit"
          shape="round"
          onClick={onSubmit}
          loading={loading ?? false}
        >
          Save
        </Button>
      </div>
      <p className="fieldValueText" style={{ display: editMode ? 'none' : 'block' }}>
        {formatValue ? formatValue(rest.value) : rest.value}
      </p>
    </div>
  );
}

function InputField({ label, ...props }: InputProps & { label: string }) {
  return (
    <div className="inputContainer">
      <span>{label}</span>
      <Input {...props} />
    </div>
  );
}
