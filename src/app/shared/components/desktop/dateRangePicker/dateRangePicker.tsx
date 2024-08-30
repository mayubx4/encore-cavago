import React, { useEffect, useState } from 'react';
import {
  Typography, DatePicker, Row, Col,
} from 'antd';
import './_dateRangePicker.scss';
import dayjs, { Dayjs } from 'dayjs';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

function DateRangePicker({ fromDate, toDate, onChange }: {
  fromDate?: string | null | undefined,
  toDate?: string | null | undefined,
  onChange: (dates: [Dayjs, Dayjs]) => void,
}) {
  const [range, setRange] = useState<[Dayjs, Dayjs] | null>(
    (fromDate || toDate) ? [dayjs(fromDate), dayjs(toDate)] : null,
  );

  const handleRangeChange = (dates: [Dayjs, Dayjs] | null) => {
    setRange(dates);
    if (dates) {
      onChange(dates);
    }
  };

  useEffect(() => {
    setRange((fromDate || toDate) ? [dayjs(fromDate), dayjs(toDate)]: null);
  }, [fromDate, toDate]);

  return (
    <div className="dateRangeContainer">
      <Title level={5} className="dateRangeHeading">Dates</Title>
      <Row gutter={[0, 12]} className="dateRangeInputContainer">
        <Col span={12}>
          <Text className="dateRangeInputLabel">Start Date</Text>
        </Col>
        <Col span={12}>
          <Text className="dateRangeInputLabel">End Date</Text>
        </Col>
        <Col span={24}>
          <RangePicker
            id="range-picker"
            value={range}
            placeholder={['DD-MM-YYYY', 'DD-MM-YYYY']}
            onChange={handleRangeChange}
          />
        </Col>
      </Row>
    </div>
  );
}

export default DateRangePicker;
