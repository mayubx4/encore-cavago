import React from 'react';
import {
  Row, Col,
} from 'antd';
import { useWhichDeviceContext } from '@shared/hooks/whichDeviceContext';
import './_addDate.scss';
import ScrollableDateRangePicker from '../scrollableDateRangePicker/scrollableDateRangePicker';

interface AddDateProps {
  value: string;
  setValue: () => void;
  setShowDateRangePicker: (setDate: boolean) => void;
}

function AddDate({ value, setValue, setShowDateRangePicker }: AddDateProps) {
  const device = useWhichDeviceContext();

  return (
    <Row justify="space-between" align="middle">
      <Col>
        <Row
          justify="center"
          align="top"
          gutter={[0, {
            xs: 6, sm: 6, md: 18, lg: 18, xl: 18,
          }]}
        >
          <Col span={24}><p className="dateHeading">Dates</p></Col>
          <Col span={24}><p className="dateValue">{value}</p></Col>
        </Row>
      </Col>
      {device === 'mobile' && (
        <Col>
          <button className="editButton" onClick={setShowDateRangePicker}>Edit</button>
        </Col>
      )}
    </Row>
  );
}

export default AddDate;
