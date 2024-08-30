import React, { useEffect, useState } from 'react';
import { Button, Typography } from 'antd';
import './_durationFilter.scss';

const { Title } = Typography;

interface DurationFilterProps {
  title: string;
  values: string[];
  value: string | undefined | null;
  onChange: (value: string) => void;
}

function DurationFilter({
  title, values, value, onChange,
}: DurationFilterProps) {
  const [selectedValue, setSelectedValue] = useState<string | undefined | null>(value);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleClick = (value: string) => {
    setSelectedValue(value);
    if (value === '8+') {
      onChange('-1')
    } else {
      onChange(value);
    }
  };

  return (
    <div className="durationContainer">
      <Title level={5} className="durationHeading">{title}</Title>
      <div className="buttonGroup">
        {values?.map((value: string) => (
          <Button
            key={value}
            type="default"
            onClick={() => handleClick(value)}
            className={selectedValue === value ? 'button activeButton' : 'button'}
          >
            {value}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default DurationFilter;
