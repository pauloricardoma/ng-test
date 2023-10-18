import { Request, Response } from 'express';
import AccountUseCase from '../useCases/accountUseCase';

class AccountController {
  async index(request: Request, response: Response) {
    try {
      const { accountId } = request.user;

      const result = await AccountUseCase.find(accountId);

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

  async cashOut(request: Request, response: Response) {
    try {
      const { accountId, username } = request.user;
      const { creditedUsername, value } = request.body;

      const result = await AccountUseCase.cashOut(
        accountId,
        username,
        creditedUsername,
        value,
      );

      return response.status(200).json({
        data: {
          account: result.account,
          transaction: result.transaction,
        },
        error: {},
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

export default new AccountController();
