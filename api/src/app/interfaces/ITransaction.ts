import { IAccount } from './IAccount';

export interface ITransaction {
  id?: number;
  debitedAccountId: number;
  debitedAccount?: IAccount | ITransactionAccountformat;
  creditedAccountId: number;
  creditedAccount?: IAccount | ITransactionAccountformat;
  value: number;
  createdAt: Date;
}

export interface IOrderOrFilter {
  accountId?: number,
  orderBy?: string,
  filterByDebited?: string,
  filterByCredited?: string,
  begin?: Date | string,
  end?: Date | string,
  limit?: string,
}

interface ITransactionAccountformat {
  user: {
    username: string;
  } | null;
}
