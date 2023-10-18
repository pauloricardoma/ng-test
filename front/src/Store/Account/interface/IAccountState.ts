import { IAccount } from '../../../Data/interface/Account/IAccount';
import { ITransaction } from '../../../Data/interface/Transaction/ITransactions';
import { IUserInfo } from '../../../Data/interface/User/IUserInfo';
import { IReducerStateBase } from '../../../Store/Base/interface/IReducerStateBase';

export interface IAccountState extends IReducerStateBase {
  user?: IUserInfo;
  account?: IAccount;
  transaction?: ITransaction;
}
