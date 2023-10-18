"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const util_1 = require("util");
const hashAsync = (0, util_1.promisify)(bcrypt_1.default.hash);
const compareAsync = (0, util_1.promisify)(bcrypt_1.default.compare);
class PasswordHashHelper {
    static hashPassword(password) {
        return hashAsync(password, Number(process.env.PWD_SALT) || 5);
    }
    static comparePassword(password, hash) {
        return compareAsync(password, hash);
    }
}
exports.default = PasswordHashHelper;
//# sourceMappingURL=passwordHashHelper.js.map