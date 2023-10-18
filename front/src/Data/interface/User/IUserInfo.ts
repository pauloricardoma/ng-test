import { IAccount } from '../Account/IAccount';

export interface IUserInfo {
  id?: number;
  username: string;
  accountId?: number;
  account?: IAccount;
}
