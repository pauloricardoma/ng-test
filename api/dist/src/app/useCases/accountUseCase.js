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
const accountRepository_1 = __importDefault(require("../repositories/accountRepository"));
const usersRepository_1 = __importDefault(require("../repositories/usersRepository"));
class AccountUseCase {
    find(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!accountId) {
                throw new Error('Account number invalid.');
            }
            const result = yield accountRepository_1.default.find(accountId);
            if (!result) {
                throw new Error('Account not exist.');
            }
            return result;
        });
    }
    cashOut(accountId, username, creditedUsername, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!accountId) {
                throw new Error('Account number invalid.');
            }
            if (!creditedUsername) {
                throw new Error('Credited account username invalid.');
            }
            const creditedAccount = yield usersRepository_1.default.findByName(creditedUsername);
            if (!(creditedAccount === null || creditedAccount === void 0 ? void 0 : creditedAccount.accountId)) {
                throw new Error('Credited account not exist.');
            }
            if (!value) {
                throw new Error('Cash-out operation need valid value.');
            }
            if (username === creditedUsername) {
                throw new Error('Cash-out operation invalid.');
            }
            const result = yield accountRepository_1.default.update(accountId, creditedAccount.accountId, value);
            if (JSON.stringify(result.error) !== '{}') {
                throw new Error('Transaction error.');
            }
            return result;
        });
    }
}
exports.default = new AccountUseCase();
//# sourceMappingURL=accountUseCase.js.map