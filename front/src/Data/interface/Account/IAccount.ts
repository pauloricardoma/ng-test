import { IUserInfo } from '../User/IUserInfo';

export interface IAccount {
  id?: number;
  balance?: number;
  user?: IUserInfo;
}
