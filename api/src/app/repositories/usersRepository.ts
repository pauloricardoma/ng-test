import prisma from '../../client';
import { IUser } from '../interfaces/IUser';

class UsersRepository {
  async create(username: string, password: string) {
    const result = {
      data: {} as IUser,
      error: {}
    };
    const userCreate = prisma.users.create({
      data: {
        username,
        password,
      }
    });
    const accountCreate = prisma.accounts.create({
      data: {}
    });
    await prisma.$transaction([userCreate, accountCreate]).then(async (res) => {
      const [newUser, newAccount] = res;
      const newData = await prisma.users.update({
        where: {
          id: newUser.id,
        },
        data: {
          accountId: newAccount.id,
        },
        include: {
          account: true,
        }
      });
      result.data = newData;
    }).catch((err) => {
      throw new Error(err.meta.cause);
    });

    this.disconnect();
    return result;
  }

  async findByName(username: string) {
    const result: IUser | null = await prisma.users.findUnique({
      where: {
        username,
      },
      include: {
        account: true,
      }
    });

    this.disconnect();
    return result;
  }

  disconnect() {
    prisma.$disconnect();
  }
}

export default new UsersRepository();
