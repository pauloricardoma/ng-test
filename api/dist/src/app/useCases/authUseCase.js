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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passwordHashHelper_1 = __importDefault(require("../helpers/passwordHashHelper"));
const usersRepository_1 = __importDefault(require("../repositories/usersRepository"));
class AuthUseCase {
    authenticated(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = data;
            if (!username) {
                throw new Error('Username is required.');
            }
            if (!password) {
                throw new Error('Password is required.');
            }
            const userExist = yield usersRepository_1.default.findByName(username);
            if (!(userExist === null || userExist === void 0 ? void 0 : userExist.password)) {
                throw new Error('User not exist.');
            }
            const isValidPassword = yield passwordHashHelper_1.default.comparePassword(password, userExist.password);
            if (!isValidPassword) {
                throw new Error('Password invalid.');
            }
            const token = jsonwebtoken_1.default.sign({ id: userExist.id, username: userExist.username, accountId: userExist.accountId }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
            return {
                data: {
                    user: userExist,
                    token,
                },
                error: {}
            };
        });
    }
}
exports.default = new AuthUseCase();
//# sourceMappingURL=authUseCase.js.map