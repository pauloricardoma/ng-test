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
const transactionRepository_1 = __importDefault(require("../repositories/transactionRepository"));
class TransactionUseCase {
    list({ accountId, orderBy, filterByDebited, filterByCredited, begin, end, limit, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!accountId) {
                throw new Error('Account number invalid.');
            }
            let total = undefined;
            if (limit) {
                total = parseInt(limit);
            }
            if (filterByDebited) {
                return yield transactionRepository_1.default.filterByDebited(accountId, orderBy, total);
            }
            if (filterByCredited) {
                return yield transactionRepository_1.default.filterByCredited(accountId, orderBy, total);
            }
            if (begin && end) {
                const formatBegin = new Date(begin);
                const formatEnd = new Date(end);
                return yield transactionRepository_1.default.filterByRangeDate(accountId, formatBegin, formatEnd, orderBy, total);
            }
            return yield transactionRepository_1.default.listAll(accountId, orderBy, total);
        });
    }
}
exports.default = new TransactionUseCase();
//# sourceMappingURL=transactionUseCase.js.map