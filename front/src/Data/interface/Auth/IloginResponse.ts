import { IUserInfo } from '../User/IUserInfo';

export interface ILoginResponse {
  token: string;
  user: IUserInfo;
}
