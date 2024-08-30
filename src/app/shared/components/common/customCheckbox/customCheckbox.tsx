import React, { useEffect, useState } from 'react';
import {
  Row, Col, Typography, Checkbox,
} from 'antd';
import type { CheckboxProps } from 'antd';
import './_customCheckbox.scss';

const { Text } = Typography;

interface CustomCheckboxProps {
  id: number;
  title: string;
  value: boolean | undefined;
  onChange: (value: number, remove?: boolean) => void;
  spaceBetween?: boolean;
}

function CustomCheckbox({
  title, id, value, onChange, spaceBetween = true,
}: CustomCheckboxProps) {
  const [checked, setChecked] = useState(!!value);

  useEffect(() => {
    setChecked(!!value);
  }, [value]);

  const handleLabelClick = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onChange(id, !newChecked);
  };

  const handleCheckboxChange: CheckboxProps['onChange'] = (e) => {
    setChecked(e.target.checked);
    onChange(id, !e.target.checked);
  };

  return (
    <div className="customCheckboxContainer">
      {spaceBetween ? (
        <Row justify="space-between">
          <Col span={18}>
            <Text
              onClick={handleLabelClick}
              className={`customCheckboxLabel ${checked ? 'checkedCustomCheckboxLabel' : ''}`}
            >
              {title}
            </Text>
          </Col>
          <Col>
            <Checkbox
              checked={checked}
              onChange={handleCheckboxChange}
            />
          </Col>
        </Row>
      ) : (
        <Checkbox checked={checked} onChange={handleCheckboxChange} className="antCheckbox">
          <Text className="checkboxText">{title}</Text>
        </Checkbox>
      )}
    </div>
  );
}

export default CustomCheckbox;
