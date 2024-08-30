import React from 'react';
import {
  Typography, Button,
} from 'antd';
import './_dateRangePicker.scss';
import moment from 'moment';

const { Title } = Typography;

function DateRangePicker({ onStepIncrement, fromDate, toDate }: {
  onStepIncrement: () => void;
  fromDate: string | null | undefined;
  toDate: string | null | undefined;
}) {
  return (
    <div className="dateRangePickerMContainer">
      <Title level={5} className="heading">When</Title>
      <Button className="dateRangePickerButton" onClick={() => onStepIncrement()}>
        <p>
          {fromDate && toDate
            ? `${moment(fromDate).format('ddd, MMM D')} - ${moment(toDate).format('ddd, MMM D')}`
            : 'Any week'}
        </p>
      </Button>
    </div>
  );
}

export default DateRangePicker;
