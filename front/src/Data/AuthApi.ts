import { Http } from '../Utils/Http';
import { AxiosResponse } from 'axios';
import { ILoginRequest } from './interface/Auth/ILoginRequest';
import { ILoginResponse } from './interface/Auth/IloginResponse';
import { ISgininRequest } from './interface/Auth/ISigninRequest';

export class AuthApi {
  static async signin(request: ISgininRequest): Promise<AxiosResponse<ILoginResponse>> {
    const axios = await Http.axios();
    return axios.post('/users', request);
  }

  static async login(request: ILoginRequest): Promise<AxiosResponse<ILoginResponse>> {
    const axios = await Http.axios();
    return axios.post('/login', request);
  }
}
