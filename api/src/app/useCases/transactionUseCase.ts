import { IOrderOrFilter } from '../interfaces/ITransaction';
import TransactionRepository from '../repositories/transactionRepository';

class TransactionUseCase {
  async list({
    accountId,
    orderBy,
    filterByDebited,
    filterByCredited,
    begin,
    end,
    limit,
  }: IOrderOrFilter) {
    if (!accountId) {
      throw new Error('Account number invalid.');
    }

    let total: number | undefined = undefined;
    if (limit) {
      total = parseInt(limit);
    }

    if (filterByDebited) {
      return await TransactionRepository.filterByDebited(
        accountId,
        orderBy,
        total,
      );
    }

    if (filterByCredited) {
      return await TransactionRepository.filterByCredited(
        accountId,
        orderBy,
        total,
      );
    }

    if (begin && end) {
      const formatBegin = new Date(begin);
      const formatEnd = new Date(end);

      return await TransactionRepository.filterByRangeDate(
        accountId,
        formatBegin,
        formatEnd,
        orderBy,
        total,
      );
    }

    return await TransactionRepository.listAll(
      accountId,
      orderBy,
      total,
    );
  }
}

export default new TransactionUseCase();
