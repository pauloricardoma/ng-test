import jwt from 'jsonwebtoken';
import PasswordHashHelper from '../helpers/passwordHashHelper';
import { IAuth } from '../interfaces/IAuth';
import UsersRepository from '../repositories/usersRepository';

class AuthUseCase {
  async authenticated(data: IAuth) {
    const { username, password } = data;

    if (!username) {
      throw new Error('Username is required.');
    }

    if (!password) {
      throw new Error('Password is required.');
    }

    const userExist = await UsersRepository.findByName(username);
    if (!userExist?.password) {
      throw new Error('User not exist.');
    }

    const isValidPassword = await PasswordHashHelper.comparePassword(password, userExist.password);
    if (!isValidPassword) {
      throw new Error('Password invalid.');
    }

    const token = jwt.sign({ id: userExist.id, username: userExist.username, accountId: userExist.accountId }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });

    return {
      data: {
        user: userExist,
        token,
      },
      error: {}
    };
  }
}

export default new AuthUseCase();
