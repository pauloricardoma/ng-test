import prisma from '../../client';
import { ITransaction } from '../interfaces/ITransaction';

class TransactionRepository {
  async listAll(
    accountId: number,
    orderBy?: string,
    total?: number,
  ) {
    const result: ITransaction[] = await prisma.transactions.findMany({
      where: {
        OR: [
          {
            debitedAccountId: accountId,
          },
          {
            creditedAccountId: accountId,
          }
        ],
      },
      orderBy: {
        createdAt: orderBy ? (orderBy === 'desc' ? 'desc' : 'asc') : undefined,
      },
      take: total,
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

    this.disconnect();
    return result;
  }

  async filterByDebited(
    accountId: number,
    orderBy?: string,
    total?: number,
  ) {
    const result: ITransaction[] = await prisma.transactions.findMany({
      where: {
        debitedAccountId: accountId,
      },
      orderBy: {
        createdAt: orderBy ? (orderBy === 'desc' ? 'desc' : 'asc') : undefined,
      },
      take: total,
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

    this.disconnect();
    return result;
  }

  async filterByCredited(
    accountId: number,
    orderBy?: string,
    total?: number,
  ) {
    const result: ITransaction[] = await prisma.transactions.findMany({
      where: {
        creditedAccountId: accountId,
      },
      orderBy: {
        createdAt: orderBy ? (orderBy === 'desc' ? 'desc' : 'asc') : undefined,
      },
      take: total,
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

    this.disconnect();
    return result;
  }

  async filterByRangeDate(
    accountId: number,
    begin: Date | string,
    end: Date | string,
    orderBy?: string,
    total?: number,
  ) {
    const result: ITransaction[] = await prisma.transactions.findMany({
      where: {
        OR: [
          {
            debitedAccountId: accountId,
          },
          {
            creditedAccountId: accountId,
          }
        ],
        createdAt: {
          gte: begin,
          lte: end,
        },
      },
      orderBy: {
        createdAt: orderBy ? (orderBy === 'desc' ? 'desc' : 'asc') : undefined,
      },
      take: total,
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

    this.disconnect();
    return result;
  }

  disconnect() {
    prisma.$disconnect();
  }
}

export default new TransactionRepository();
