import prisma from '../../client';
import { IAccount } from '../interfaces/IAccount';
import { ITransaction } from '../interfaces/ITransaction';

class AccountRepository {
  async find(accountId: number) {
    const result: IAccount | null = await prisma.accounts.findUnique({
      where: {
        id: accountId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          }
        },
      },
    });

    this.disconnect();
    return result;
  }

  async update(accountId: number, creditedAccountId: number, value: number) {
    let result = {
      account: {} as IAccount,
      transaction: {} as ITransaction,
      error: {},
    };

    const updateDebitedAccount = prisma.accounts.update({
      where: {
        id: accountId,
      },
      data: {
        balance: {
          decrement: value,
        },
      },
    });
    const updateCreditedAccount = prisma.accounts.update({
      where: {
        id: creditedAccountId,
      },
      data: {
        balance: {
          increment: value,
        },
      },
    });
    const createTransaction = prisma.transactions.create({
      data: {
        debitedAccountId: accountId,
        creditedAccountId: creditedAccountId,
        value: value,
      },
      include: {
        creditedAccount: {
          select: {
            user: {
              select: {
                username: true,
              }
            }
          }
        },
        debitedAccount: {
          select: {
            user: {
              select: {
                username: true,
              }
            }
          }
        },
      },
    });
    await prisma.$transaction([
      updateDebitedAccount,
      createTransaction,
      updateCreditedAccount,
    ]).then((res) => {
      const [ debitedAccount, transaction ] = res;

      if (debitedAccount.balance && (debitedAccount.balance < 0)) {
        throw new Error('Account cannot be negative.');
      }

      result = {
        account: debitedAccount,
        transaction,
        error: {}
      };
    }).catch((err) => {
      return result = {
        account: {} as IAccount,
        transaction: {} as ITransaction,
        error: err.message,
      };
    });

    this.disconnect();
    return result;
  }

  disconnect() {
    prisma.$disconnect();
  }
}

export default new AccountRepository();
