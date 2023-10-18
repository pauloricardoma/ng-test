"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../client"));
class AccountRepository {
    find(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield client_1.default.accounts.findUnique({
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
        });
    }
    update(accountId, creditedAccountId, value) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = {
                account: {},
                transaction: {},
                error: {},
            };
            const updateDebitedAccount = client_1.default.accounts.update({
                where: {
                    id: accountId,
                },
                data: {
                    balance: {
                        decrement: value,
                    },
                },
            });
            const updateCreditedAccount = client_1.default.accounts.update({
                where: {
                    id: creditedAccountId,
                },
                data: {
                    balance: {
                        increment: value,
                    },
                },
            });
            const createTransaction = client_1.default.transactions.create({
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
            yield client_1.default.$transaction([
                updateDebitedAccount,
                createTransaction,
                updateCreditedAccount,
            ]).then((res) => {
                const [debitedAccount, transaction] = res;
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
                    account: {},
                    transaction: {},
                    error: err.message,
                };
            });
            this.disconnect();
            return result;
        });
    }
    disconnect() {
        client_1.default.$disconnect();
    }
}
exports.default = new AccountRepository();
//# sourceMappingURL=accountRepository.js.map