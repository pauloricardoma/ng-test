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
class UsersRepository {
    create(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = {
                data: {},
                error: {}
            };
            const userCreate = client_1.default.users.create({
                data: {
                    username,
                    password,
                }
            });
            const accountCreate = client_1.default.accounts.create({
                data: {}
            });
            yield client_1.default.$transaction([userCreate, accountCreate]).then((res) => __awaiter(this, void 0, void 0, function* () {
                const [newUser, newAccount] = res;
                const newData = yield client_1.default.users.update({
                    where: {
                        id: newUser.id,
                    },
                    data: {
                        accountId: newAccount.id,
                    },
                    include: {
                        account: true,
                    }
                });
                result.data = newData;
            })).catch((err) => {
                throw new Error(err.meta.cause);
            });
            this.disconnect();
            return result;
        });
    }
    findByName(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield client_1.default.users.findUnique({
                where: {
                    username,
                },
                include: {
                    account: true,
                }
            });
            this.disconnect();
            return result;
        });
    }
    disconnect() {
        client_1.default.$disconnect();
    }
}
exports.default = new UsersRepository();
//# sourceMappingURL=usersRepository.js.map