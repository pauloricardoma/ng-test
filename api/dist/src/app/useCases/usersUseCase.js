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
const usersRepository_1 = __importDefault(require("../repositories/usersRepository"));
class UsersUseCase {
    createAccount(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = data;
            if (!username || username.length < 3) {
                throw new Error('Username is required and need minimum three caracteres.');
            }
            if (!password) {
                throw new Error('Password is required.');
            }
            const nameExist = yield usersRepository_1.default.findByName(username);
            if (nameExist) {
                throw new Error('Username is already in use.');
            }
            const result = yield usersRepository_1.default.create(username, password);
            return result;
        });
    }
}
exports.default = new UsersUseCase();
//# sourceMappingURL=usersUseCase.js.map