import { ITransaction } from '../../../Data/interface/Transaction/ITransactions';
import { IReducerStateBase } from '../../../Store/Base/interface/IReducerStateBase';

export interface ITransactionState extends IReducerStateBase {
  transactions?: ITransaction[];
}
