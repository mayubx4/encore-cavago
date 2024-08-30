import React from 'react';
import { Button } from 'antd';
import './_numberStepper.scss';
import Icon from '../icons';

interface NumberStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

function NumberStepper({
  value, onChange, min = 0, max = Infinity,
}: NumberStepperProps) {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <div className="numberStepperContainer">
      <Button className="stepperButtonGroup">
        <div onClick={handleDecrement} className="stepperButtons">
          <Icon name="minus" width={12} height={12} />
        </div>
        <span className="stepperText">{value}</span>
        <div onClick={handleIncrement} className="stepperButtons">
          <Icon name="plus" width={12} height={12} />
        </div>
      </Button>
    </div>
  );
}

export default NumberStepper;
