import React, { useEffect, useState } from 'react';
import {
  Col, Row,
} from 'antd';
import { z } from 'zod';
import currencySymbolMap from 'currency-symbol-map';
import NumberStepper from '@shared/components/common/numberStepper/numberStepper';
import { useWhichDeviceContext } from '@shared/hooks/whichDeviceContext';
import { ActivityAddOns } from '@shared/api/home/schemas';
import './_addOnItem.scss';
import Icon from '../icons';

interface BookingCardProps {
  item: z.infer<typeof ActivityAddOns>;
  updateQuantity: (id: number, quantity: number) => void;
  currency: string;
}

function AddOnItem({ item, updateQuantity, currency }: BookingCardProps) {
  const [quantity, setQuantity] = useState<number>(item.mandatory_status === 1 ? 1 : 0);
  const device = useWhichDeviceContext();

  useEffect(() => {
    updateQuantity(item.id, quantity);
  }, [quantity]);

  return (
    <Row justify="space-between" align="middle" style={{ padding: '10px 0' }}>
      <Col xs={18} sm={18} md={12} lg={12} xl={12}>
        <Row>
          <Col span={24}>
            <p className="addOnText">
              {item.title}
              {device === 'mobile' && (
                <span style={{ fontWeight: 600 }}>
                  &nbsp;&nbsp;
                  {currencySymbolMap(currency)}
                  {Number(item.price).toFixed(2)}
                </span>
              )}
            </p>
          </Col>
          <Col><p className="addOnDescription">{item.description || ''}</p></Col>
        </Row>
      </Col>
      {device === 'desktop' && (
        <Col span={6}>
          <p className="addOnText">
            +
            {currencySymbolMap(currency)}
            {Number(item.price).toFixed(2)}
          </p>
        </Col>
      )}
      <Col span={6}>
        <div className="stepperWrapper">
          {quantity > 0 || device === 'desktop' ? (
            <NumberStepper
              min={item.mandatory_status === 1 ? 1 : 0}
              value={quantity}
              onChange={setQuantity}
            />
          ) : (
            <button type="button" onClick={() => setQuantity(1)} className="plusButton">
              <Icon name="plus" width={12} height={12} />
            </button>
          )}
        </div>
      </Col>
    </Row>
  );
}

export default AddOnItem;
