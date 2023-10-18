import { Http } from '../Utils/Http';
import { AxiosResponse } from 'axios';
import { ITransactionListFilters } from './interface/Transaction/ITransactionListFilters';
import { ITransaction } from './interface/Transaction/ITransactions';

export class TransactionApi {
  static async list(request: ITransactionListFilters): Promise<AxiosResponse<ITransaction[]>> {
    const axios = await Http.axios();
    return axios.get(
      `/transactions?orderBy=${request.orderBy}${request.filterByDebited ? '&filterByDebited=true' : ''}${request.filterByCredited ? '&filterByCredited=true' : ''}${request.begin ? `&begin=${request.begin}` : ''}${request.end ? `&end=${request.end}` : ''}${request.limit ? `&limit=${request.limit}` : ''}`
    );
  }
}
