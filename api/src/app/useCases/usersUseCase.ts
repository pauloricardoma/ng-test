import { IUser } from '../interfaces/IUser';
import UsersRepository from '../repositories/usersRepository';

class UsersUseCase {
  async createAccount(data: IUser) {
    const { username, password } = data;

    if (!username || username.length < 3) {
      throw new Error('Username is required and need minimum three caracteres.');
    }
    if (!password) {
      throw new Error('Password is required.');
    }

    const nameExist = await UsersRepository.findByName(username);

    if (nameExist) {
      throw new Error('Username is already in use.');
    }

    const result = await UsersRepository.create(username, password);

    return result;
  }
}

export default new UsersUseCase();
