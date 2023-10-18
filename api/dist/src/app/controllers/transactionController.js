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
const transactionUseCase_1 = __importDefault(require("../useCases/transactionUseCase"));
class TransactionController {
    list(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { accountId } = request.user;
                const { orderBy, filterByDebited, filterByCredited, begin, end, limit, } = request.query;
                const result = yield transactionUseCase_1.default.list({
                    accountId,
                    orderBy,
                    filterByDebited,
                    filterByCredited,
                    begin,
                    end,
                    limit,
                });
                if (result.length <= 0) {
                    throw new Error('Transactions not found.');
                }
                return response.status(200).json({
                    data: result,
                    error: {}
                });
            }
            catch (error) {
                return response.status(404).json({
                    data: {},
                    error: {
                        message: error.message,
                    }
                });
            }
        });
    }
}
exports.default = new TransactionController();
//# sourceMappingURL=transactionController.js.map