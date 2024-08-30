'use client';

import { Button, Select } from 'antd';
import React from 'react';
import './_fullDayActivity.scss';
import Icon from '@shared/components/common/icons';

export default function FullDayActivityDateChoices() {
  return (
    <div className="dateChoices">
      <span className="placeholder">
        DATES
      </span>
      <Select
        className="selector"
        defaultValue="4th July"
        suffixIcon={<Icon name="arrowDown" width={24} height={24} />}
        options={[
          { value: '1', label: '1st July' },
          { value: '2', label: '2nd July' },
          { value: '3', label: '3rd July' },
          { value: '4', label: '4th July' },
          { value: '5', label: '5th July' },
          { value: '6', label: '6th July' },
          { value: '7', label: '7th July' },
          { value: '8', label: '8th July' },
          { value: '9', label: '9th July' },
          { value: '10', label: '10th July' },
        ]}
      />
      <Button type="primary" className="button">Book now</Button>
    </div>
  );
}
