import { IAuthState } from '../../../Store/Auth/interface/IAuthState';
import { IAccountState } from '../../Account/interface/IAccountState';
import { IThemeState } from '../../Theme/interface/IThemeState';
import { ITransactionState } from '../../Transaction/interface/ITransactionState';

export interface IGlobalReducerState {
  auth: IAuthState;
  account: IAccountState;
  transaction: ITransactionState;
  theme: IThemeState;
}
