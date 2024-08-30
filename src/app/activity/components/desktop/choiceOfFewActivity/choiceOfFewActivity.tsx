import React from 'react';

import {
  Button, Col, Divider, Row,
  Space,
} from 'antd';
import { PriceJsonSchema, TicketSchema } from '@shared/api/home/schemas';
import { z } from 'zod';
import Icon from '@shared/components/common/icons';
import { toast } from 'sonner';
import './_choiceOfFewActivity.scss';

function IndividualTicket(
  { ticket, currency, maxTickets, incActualTicket }
  : { ticket: z.infer<typeof TicketSchema>, currency: string, maxTickets: number, incActualTicket: (type: string, count: number) => void },
) {
  const [ticketCount, setTicketCount] = React.useState(ticket.user_selected_quantity);

  const inCount = () => {
    if (ticketCount < maxTickets && ticketCount < Number(ticket.quantity_available)) {
      setTicketCount(ticketCount + 1);
      incActualTicket(ticket.type, ticketCount + 1);
    } else {
      toast.error('You can not select more than available tickets');
    }
  };

  const deCount = () => {
    if (ticketCount > 0) {
      setTicketCount(ticketCount - 1);
      incActualTicket(ticket.type, ticketCount - 1);
    }
  };

  return (
    <Row justify="space-between" align="middle">
      <Col span={16}>
        <Space direction="vertical" size={10}>
          <Space size={5}>
            <p className="title">
              {ticket.type}
            </p>
            <Divider type="vertical" />
            <p>
              {`${ticket.quantity_available} left`}
            </p>
          </Space>
          <p className="title">
            {`${currency} ${ticket.price}`}
          </p>
        </Space>
      </Col>
      <Col span={6}>
        <Space size={6} className="btnSpace" align="center">
          <Button shape="circle" size="small" icon={<Icon name="plus" />} onClick={inCount} />
          <span>{ticketCount}</span>
          <Button shape="circle" size="small" icon={<Icon name="minus" />} onClick={deCount} />
        </Space>
      </Col>
      <Divider />
    </Row>
  );
}

export default function ChoiceOfFewActivity({
  priceJson,
  currency,
  maxTickets,
  incActualTicket,
}: {
  priceJson: z.infer<typeof PriceJsonSchema>,
  currency: string,
  maxTickets: number,
  incActualTicket: (type: string, count: number) => void,
}) {
  return (
    <div className="choiceOfFew">
      {priceJson.tickets.map((ticket) => (
        <IndividualTicket
          ticket={ticket}
          currency={currency}
          maxTickets={maxTickets}
          incActualTicket={incActualTicket}
        />
      ))}
    </div>
  );
}
