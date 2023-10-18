import { Http } from '../Utils/Http';
import { AxiosResponse } from 'axios';
import { IAccount } from './interface/Account/IAccount';
import { ICashOutResponse } from './interface/Account/ICashOutResponse';
import { ICashOutRequest } from './interface/Account/ICashOutRequest';

export class AccountApi {
  static async show(): Promise<AxiosResponse<IAccount>> {
    const axios = await Http.axios();
    return axios.get('/account');
  }
  static async cashOut(request: ICashOutRequest): Promise<AxiosResponse<ICashOutResponse>> {
    const axios = await Http.axios();
    return axios.post('/account', request);
  }
}
