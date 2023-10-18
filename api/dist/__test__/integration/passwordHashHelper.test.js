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
const globals_1 = require("@jest/globals");
const passwordHashHelper_1 = __importDefault(require("../../src/app/helpers/passwordHashHelper"));
const PASSWORD = 'Teste188';
const HASH = '$2b$04$ONn0wrTuauGV0AjZJV1jnOg5A9ighj/lIQ3.wIdIoydFgaiEVmc4u';
(0, globals_1.describe)('password hash test suite', () => {
    (0, globals_1.test)('it should generate hash for password', () => __awaiter(void 0, void 0, void 0, function* () {
        const defaultLength = PASSWORD.length;
        const result = yield passwordHashHelper_1.default.hashPassword(PASSWORD);
        const resultLength = result.length;
        (0, globals_1.expect)(defaultLength).toBeLessThan(resultLength);
    }));
    (0, globals_1.test)('it should compare password and hash, and return true for success', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield passwordHashHelper_1.default.comparePassword(PASSWORD, HASH);
        (0, globals_1.expect)(result).toBeTruthy();
    }));
});
//# sourceMappingURL=passwordHashHelper.test.js.map