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
const supertest_1 = __importDefault(require("supertest"));
const faker_1 = require("@faker-js/faker");
const client_1 = __importDefault(require("../../src/client"));
const server_1 = __importDefault(require("../../src/server"));
const request = (0, supertest_1.default)(server_1.default);
const DEFAULT_USER = {
    username: faker_1.faker.internet.userName(),
    password: faker_1.faker.internet.password(),
};
(0, globals_1.describe)('/users test suite', () => {
    (0, globals_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        client_1.default.$disconnect();
    }));
    (0, globals_1.test)('should user create and return new user, account and status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const { text, statusCode } = yield request.post('/users').send(DEFAULT_USER);
        const { data } = JSON.parse(text);
        const { username } = data;
        (0, globals_1.expect)(DEFAULT_USER.username).toStrictEqual(username);
        (0, globals_1.expect)(200).toStrictEqual(statusCode);
    }));
    (0, globals_1.test)('should user error username is required and need minimum three caracteres', () => __awaiter(void 0, void 0, void 0, function* () {
        const { text, statusCode } = yield request.post('/users').send({});
        const { error } = JSON.parse(text);
        const { message } = error;
        (0, globals_1.expect)('Username is required and need minimum three caracteres.').toStrictEqual(message);
        (0, globals_1.expect)(404).toStrictEqual(statusCode);
    }));
    (0, globals_1.test)('should user error password is required', () => __awaiter(void 0, void 0, void 0, function* () {
        const { text, statusCode } = yield request.post('/users').send({ username: 'Nome de Teste' });
        const { error } = JSON.parse(text);
        const { message } = error;
        (0, globals_1.expect)('Password is required.').toStrictEqual(message);
        (0, globals_1.expect)(404).toStrictEqual(statusCode);
    }));
    (0, globals_1.test)('should user error username in use', () => __awaiter(void 0, void 0, void 0, function* () {
        const { text, statusCode } = yield request.post('/users').send(DEFAULT_USER);
        const { error } = JSON.parse(text);
        const { message } = error;
        (0, globals_1.expect)('Username is already in use.').toStrictEqual(message);
        (0, globals_1.expect)(404).toStrictEqual(statusCode);
    }));
});
//# sourceMappingURL=user.test.js.map