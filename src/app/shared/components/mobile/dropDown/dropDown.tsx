'use client';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { Button, Drawer, InputProps } from 'antd';
import React, { ReactNode, useState } from 'react';
import './_dropDown.scss';
import RoundedIconedInputField from '../inputFields/roundedIconedInputField';
import BottomSheet, { useBottomSheet } from '../bottomSheet/BottomSheet';

export default function DropDown({
  children, value, onChange, title, options = [],
}: {
  children: ReactNode, title: string, options:
  { label: string, value: string }[]
} & InputProps) {
  const bottomsheet = useBottomSheet();

  return (
    <>
      <div onClick={() => bottomsheet.setOpen(true)}>
        {children}
      </div>
      <BottomSheet
        title={title}
        {...bottomsheet}
      >
        <RoundedIconedInputField icon="magnifyingGlass" />
        <div className="ddContainer_list">
          {options.map((o, index) => (
            <span
              key={index}
              className={`option ${value === o.value ? 'active' : ''}`}
              onClick={() => {
                onChange?.(o.value as any);
                bottomsheet.setOpen(false);
              }}
            >
              {o.label}
            </span>
          ))}
        </div>
      </BottomSheet>
    </>
  );
}
