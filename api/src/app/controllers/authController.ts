import { Request, Response } from 'express';
import AuthUseCase from '../useCases/authUseCase';

class AuthController {
  async authenticated(request: Request, response: Response) {
    try {
      const { username, password } = request.body;

      const result = await AuthUseCase.authenticated({
        username,
        password,
      });

      delete result.data.user.password;

      return response.status(200).json(result);

    } catch (error: any) {
      return response.status(401).json({
        data: {},
        error: {
          message: error.message,
        }
      });
    }
  }
}

export default new AuthController();
