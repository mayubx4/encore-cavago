import React, { ChangeEvent } from 'react';
import {
  Input, Button, Row, Col,
} from 'antd';
import './_promoCodeField.scss';

interface PromoCodeFieldProps {
  value: string | undefined;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onApply: () => void;
  isCorrect: boolean | undefined;
}

function PromoCodeField({
  value, onChange, onApply, isCorrect,
}: PromoCodeFieldProps) {
  return (
    <div className="promoCodeRoot">
      <Row gutter={[0, 18]}>
        <Col span={24}>
          <p className="promoHeading">
            Have a&nbsp;
            <span style={{ textDecorationLine: 'underline' }}>promo code?</span>
          </p>
        </Col>
        <Col span={24}>
          <div className={`promoInputContainer ${isCorrect !== undefined && (isCorrect ? 'promoInputContainer__correct' : 'promoInputContainer__wrong')}`}>
            <Input
              className={`promoInput ${isCorrect && 'correctPromoText'}`}
              readOnly={isCorrect}
              value={value}
              onChange={onChange}
              placeholder="Enter promo code"
            />
            <Button
              type="text"
              className={`promoApplyButton ${isCorrect !== undefined && (isCorrect ? 'promoApplyButton__correct' : 'promoApplyButton__wrong')}`}
              onClick={onApply}
              disabled={isCorrect || !value}
            >
              {isCorrect ? 'Applied' : 'Apply'}
            </Button>
          </div>
        </Col>
        {isCorrect === false && (
          <Col span={24}>
            <p className="wrongPromoCode">
              Uh-oh! Looks like your promo code isn't valid. Try again or
              <span className="wrongPromoCode__link">contact support.</span>
            </p>
          </Col>
        )}

      </Row>
    </div>
  );
}

export default PromoCodeField;
