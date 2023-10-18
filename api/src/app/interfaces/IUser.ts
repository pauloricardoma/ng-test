import { IAccount } from './IAccount';

export interface IUser {
  id?: number;
  username: string;
  password?: string | null;
  account?: IAccount | null;
  accountId?: number | null;
}
