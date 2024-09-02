'use client';

import {
  Button, Form,
  Input, InputProps,
} from 'antd';
import React, { ReactNode, useMemo, useState } from 'react';
import './_profileForm.scss';
import Icon from '@shared/components/common/icons';
import DropDown from '@shared/components/mobile/dropDown/dropDown';
import BottomSheet, { useBottomSheet } from '@shared/components/mobile/bottomSheet/BottomSheet';
import { useAuthenticationContext } from '@shared/hooks/authenticationContext';
import authApi from '@shared/api/authentication/authenticationApi';
import countries from '@shared/constants/countries';
import { ridingAbilities } from '@app/authentication/components/desktop/signUpDesktopStep3';

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
    <div className="profileFormContainer">
      {auth.user && (
        <Form
          form={form}
          initialValues={auth.user}
          onFinish={updateProfileMutation.mutate}
        >
          <Form.Item noStyle name="email" rules={[{ required: true }]} className="profileFormItem">
            <FormInputField
              label="Email"
              editMode={editMode === 'email'}
              setEditMode={() => setEditMode('email')}
              onSubmit={form.submit}
              onCancel={onReset}
              fieldComponent={(
                <Form.Item name="email" rules={[{ required: true }]} className="profileFormItem">
                  <InputField label="Email" />
                </Form.Item>
              )}
            />
          </Form.Item>
          <Form.Item noStyle name="first_name" rules={[{ required: true }]} className="profileFormItem">
            <FormInputField
              label="First name"
              isEditable
              editMode={editMode === 'first_name'}
              setEditMode={() => setEditMode('first_name')}
              onSubmit={form.submit}
              onCancel={onReset}
              loading={updateProfileMutation.isLoading}
              fieldComponent={(
                <Form.Item name="first_name" rules={[{ required: true }]} className="profileFormItem">
                  <InputField />
                </Form.Item>
              )}
            />
          </Form.Item>
          <Form.Item noStyle name="last_name" rules={[{ required: true }]} className="profileFormItem">
            <FormInputField
              label="Last name"
              isEditable
              editMode={editMode === 'last_name'}
              setEditMode={() => setEditMode('last_name')}
              onSubmit={form.submit}
              onCancel={onReset}
              loading={updateProfileMutation.isLoading}
              fieldComponent={(
                <Form.Item name="last_name" rules={[{ required: true }]} className="profileFormItem">
                  <InputField label="Last Name" />
                </Form.Item>
              )}
            />
          </Form.Item>
          <Form.Item noStyle name={['user_profile', 'phone']} rules={[{ required: true }]} className="profileFormItem">
            <PhoneField onSubmit={form.submit} />
          </Form.Item>
          <Form.Item noStyle name={['user_profile', 'country']} rules={[{ required: true }]} className="profileFormItem">
            <CountryField onSubmit={form.submit} />
          </Form.Item>
          <Form.Item noStyle name={['user_profile', 'ability']} rules={[{ required: true }]} className="profileFormItem">
            <RidingAbility onSubmit={form.submit} />
          </Form.Item>
        </Form>
      )}
    </div>
  );
}

function PhoneField(props: InputProps & { onSubmit: () => void }) {
  const bottomsheet = useBottomSheet();

  const onChange = (c, v) => {
    props.onChange?.(`${c || ''}-${v || ''}`);
  };

  return (
    <div className="textInputField">
      <div className="fieldHeader">
        <span className="fieldLabel" style={{ alignItems: 'center', flexDirection: 'row', gap: 4 }}>
          Phone number
        </span>
        <Button
          onClick={() => bottomsheet.setOpen(true)}
          type="link"
          className="editButton"
        >
          Edit
        </Button>
      </div>
      <p className="fieldValueText">{props?.value}</p>
      <BottomSheet
        title="Enter new phone number"
        bottomButtons={[{
          title: 'Save',
          onClick: () => {
            props?.onSubmit?.();
            bottomsheet.setOpen(false);
          },
        }]}
        className="profileFormContainer"
        {...bottomsheet}
      >
        <div className="textInputField phoneFieldContainer">
          <div className="fieldHeader">
            <span className="fieldLabel" style={{ alignItems: 'center', flexDirection: 'row', gap: 4 }}>
              Phone number
            </span>
          </div>
          <div className="phoneTextFieldOuter">
            <DropDown
              onChange={(v) => onChange(v, (props.value || '').split?.('-')?.[1])}
              value={(props.value || '').split?.('-')?.[0]}
              title="Country code"
              options={countries.filter((c) => c.dial_code).map((c) => ({ label: `${c.name} ( ${c.dial_code} )`, value: c.dial_code }))}
            >
              <Button className="countryCode">
                {(props.value || '').split?.('-')?.[0]}
              </Button>
            </DropDown>
            <Input className="textField" value={(props.value || '').split?.('-')?.[1]} onChange={(v) => onChange((props.value || '').split?.('-')?.[0], v.target.value)} />
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}

function CountryField(props: InputProps & { onSubmit: () => void }) {
  const country = useMemo(() => countries.find((c) => c.code === props.value)?.name, [props.value]);

  return (
    <DropDown
      {...props}
      title="Select country"
      options={countries.map((c) => ({ label: c.name, value: c.code }))}
      onChange={(v) => {
        props?.onChange?.(v);
        props?.onSubmit?.(v);
      }}
    >
      <div className="textInputField">
        <div className="fieldHeader">
          <span className="fieldLabel" style={{ alignItems: 'center', flexDirection: 'row', gap: 4 }}>
            Country
          </span>
          <Button
            type="link"
            className="editButton"
          >
            Edit
          </Button>
        </div>
        <p className="fieldValueText">{country}</p>
      </div>
    </DropDown>
  );
}

function RidingAbility(props: InputProps & { onSubmit: () => void }) {
  return (
    <DropDown
      {...props}
      title="Your riding ability"
      options={ridingAbilities}
      onChange={(v) => {
        props?.onChange?.(v);
        props?.onSubmit?.(v);
      }}
    >
      <div className="textInputField">
        <div className="fieldHeader">
          <span className="fieldLabel" style={{ alignItems: 'center', flexDirection: 'row', gap: 4 }}>
            Riding Ability
          </span>
          <Button
            type="link"
            className="editButton"
          >
            Edit
          </Button>
        </div>
        <p className="fieldValueText">{props?.value}</p>
      </div>
    </DropDown>
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
    editMode: boolean;
    setEditMode: (v: boolean) => void;
    info?: string;
    loading?: boolean;
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
              setEditMode(!editMode);
              if (editMode) onCancel();
            }}
          >
            {editMode ? 'Cancel' : 'Edit'}
          </Button>
        )}
      </div>
      {editMode ? (
        <div style={{ position: 'relative' }}>
          {fieldComponent}
          <Button
            className="saveButton"
            htmlType="submit"
            shape="circle"
            loading={loading}
            onClick={() => {
              onSubmit();
              setEditMode(false);
            }}
          >
            <Icon name="check" width={24} height={24} />
          </Button>
        </div>
      ) : (
        <p className="fieldValueText">
          {formatValue ? formatValue(rest.value) : rest.value}
        </p>
      )}
    </div>
  );
}

function InputField(props: InputProps) {
  return (
    <div className="inputContainer">
      <Input {...props} />
    </div>
  );
}
