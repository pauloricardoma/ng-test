import { PrismaClient } from '@prisma/client';
import PasswordHashHelper from './app/helpers/passwordHashHelper';

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (params.action === 'create' && params.model === 'Users') {
    const user = params.args.data;
    const hash = await PasswordHashHelper.hashPassword(user.password);
    user.password = hash;
    params.args.data = user;
  }
  return next(params);
});

export default prisma;
