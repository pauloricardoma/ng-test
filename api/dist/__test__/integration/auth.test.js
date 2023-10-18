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
(0, globals_1.describe)('/login test suite', () => {
    (0, globals_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield request.post('/users').send(DEFAULT_USER);
    }));
    (0, globals_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        client_1.default.$disconnect();
    }));
    (0, globals_1.test)('should login and get access token', () => __awaiter(void 0, void 0, void 0, function* () {
        const { text, statusCode } = yield request.post('/login').send(DEFAULT_USER);
        const { data } = JSON.parse(text);
        (0, globals_1.expect)(data.user.username).toStrictEqual(DEFAULT_USER.username);
        (0, globals_1.expect)(data.token.length).toBeGreaterThan(20);
        (0, globals_1.expect)(200).toStrictEqual(statusCode);
    }));
    (0, globals_1.test)('should login error username is required', () => __awaiter(void 0, void 0, void 0, function* () {
        const { text, statusCode } = yield request.post('/login').send({ password: DEFAULT_USER.password });
        const { error } = JSON.parse(text);
        const { message } = error;
        (0, globals_1.expect)('Username is required.').toStrictEqual(message);
        (0, globals_1.expect)(401).toStrictEqual(statusCode);
    }));
    (0, globals_1.test)('should login error password is required', () => __awaiter(void 0, void 0, void 0, function* () {
        const { text, statusCode } = yield request.post('/login').send({ username: DEFAULT_USER.username });
        const { error } = JSON.parse(text);
        const { message } = error;
        (0, globals_1.expect)('Password is required.').toStrictEqual(message);
        (0, globals_1.expect)(401).toStrictEqual(statusCode);
    }));
    (0, globals_1.test)('should login error user not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const { text, statusCode } = yield request.post('/login').send({ username: 'Nome invalido', password: DEFAULT_USER.password });
        const { error } = JSON.parse(text);
        const { message } = error;
        (0, globals_1.expect)('User not exist.').toStrictEqual(message);
        (0, globals_1.expect)(401).toStrictEqual(statusCode);
    }));
    (0, globals_1.test)('should login error password invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        const { text, statusCode } = yield request.post('/login').send({ username: DEFAULT_USER.username, password: 'invalido' });
        const { error } = JSON.parse(text);
        const { message } = error;
        (0, globals_1.expect)('Password invalid.').toStrictEqual(message);
        (0, globals_1.expect)(401).toStrictEqual(statusCode);
    }));
});
//# sourceMappingURL=auth.test.js.map