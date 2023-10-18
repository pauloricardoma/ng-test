import { IUserInfo } from '../../../Data/interface/User/IUserInfo';
import { IReducerStateBase } from '../../../Store/Base/interface/IReducerStateBase';

export interface IAuthState extends IReducerStateBase {
  acessToken?: string;
  isLogged: boolean;
  user?: IUserInfo;
}
