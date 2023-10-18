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
const usersUseCase_1 = __importDefault(require("../useCases/usersUseCase"));
class UsersController {
    createAccount(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = request.body;
                const result = yield usersUseCase_1.default.createAccount({
                    username,
                    password,
                });
                delete result.data.password;
                return response.status(200).json(result);
            }
            catch (error) {
                return response.status(404).json({ error: {
                        message: error.message,
                    } });
            }
        });
    }
}
exports.default = new UsersController();
//# sourceMappingURL=usersController.js.map