import React from 'react';
import { numberToMoney } from '../../Utils/Money';
import { Card } from './styles';

interface ITransactionsCard {
  isCashOut?: boolean;
  name?: string;
  value?: number;
  date?: Date;
}

function TransactionsCard({
  isCashOut,
  name,
  value,
  date,
}: ITransactionsCard) {
  const formatDate = new Date(date || '').toLocaleString();

  return (
    <Card>
      <p>
        {`${isCashOut ? 'Enviou para' : 'Recebeu de'}: ${name}`}
      </p>

      <p>
        {`Valor de: ${numberToMoney(value || 0)}`}
      </p>

      <small>
        {formatDate}
      </small>
    </Card>
  );
}

export default TransactionsCard;
