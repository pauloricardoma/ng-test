import AccountRepository from '../repositories/accountRepository';
import UsersRepository from '../repositories/usersRepository';

class AccountUseCase {
  async find(accountId?: number | null) {
    if (!accountId) {
      throw new Error('Account number invalid.');
    }

    const result = await AccountRepository.find(accountId);

    if (!result) {
      throw new Error('Account not exist.');
    }

    return result;
  }

  async cashOut(
    accountId?: number | null,
    username?: string,
    creditedUsername?: string,
    value?: number,
  ) {
    if (!accountId) {
      throw new Error('Account number invalid.');
    }


    if (!creditedUsername) {
      throw new Error('Credited account username invalid.');
    }
    const creditedAccount = await UsersRepository.findByName(creditedUsername);
    if (!creditedAccount?.accountId) {
      throw new Error('Credited account not exist.');
    }

    if (!value) {
      throw new Error('Cash-out operation need valid value.');
    }

    if (username === creditedUsername) {
      throw new Error('Cash-out operation invalid.');
    }

    const result = await AccountRepository.update(
      accountId,
      creditedAccount.accountId,
      value
    );

    if (JSON.stringify(result.error) !== '{}') {
      throw new Error('Transaction error.');
    }

    return result;
  }
}

export default new AccountUseCase();
