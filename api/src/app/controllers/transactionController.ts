import { Request, Response } from 'express';
import { IOrderOrFilter } from '../interfaces/ITransaction';
import TransactionUseCase from '../useCases/transactionUseCase';

class TransactionController {
  async list(request: Request, response: Response) {
    try {
      const { accountId } = request.user;
      const {
        orderBy,
        filterByDebited,
        filterByCredited,
        begin,
        end,
        limit,
      } = request.query as IOrderOrFilter;

      const result = await TransactionUseCase.list({
        accountId,
        orderBy,
        filterByDebited,
        filterByCredited,
        begin,
        end,
        limit,
      } as IOrderOrFilter);

      if (result.length <= 0) {
        throw new Error('Transactions not found.');
      }

      return response.status(200).json({
        data: result,
        error: {}
      });

    } catch (error: any) {
      return response.status(404).json({
        data: {},
        error: {
          message: error.message,
        }
      });
    }
  }
}

export default new TransactionController();
