import { Request, Response } from 'express';
import UsersUseCase from '../useCases/usersUseCase';

class UsersController {
  async createAccount(request: Request, response: Response) {
    try {
      const { username, password } = request.body;

      const result = await UsersUseCase.createAccount({
        username,
        password,
      });

      delete result.data.password;

      return response.status(200).json(result);

    } catch (error: any) {
      return response.status(404).json({error: {
        message: error.message,
      }});
    }
  }
}

export default new UsersController();
