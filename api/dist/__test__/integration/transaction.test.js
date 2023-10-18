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
    username: 'Paulo',
    password: 'Teste188',
};
const CREDITED_USER = {
    username: faker_1.faker.internet.userName(),
    password: faker_1.faker.internet.password(),
};
const EMPTY_TRANSACTION_USER = {
    username: faker_1.faker.internet.userName(),
    password: faker_1.faker.internet.password(),
};
let token = '';
let user = {};
let credToken = '';
let creditedUser = {};
let emptToken = '';
let emptUser = {};
(0, globals_1.describe)('/transactions test suite', () => {
    (0, globals_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield request.post('/users').send(DEFAULT_USER);
        const { text } = yield request.post('/login').send(DEFAULT_USER);
        const { data } = JSON.parse(text);
        user = data.user;
        token = data.token;
        yield request.post('/users').send(CREDITED_USER);
        const { text: textCred } = yield request.post('/login').send(CREDITED_USER);
        const { data: dataCred } = JSON.parse(textCred);
        creditedUser = dataCred.user;
        credToken = dataCred.token;
        yield request.post('/users').send(EMPTY_TRANSACTION_USER);
        const { text: userEmptText } = yield request.post('/login').send(EMPTY_TRANSACTION_USER);
        const { data: dataEmptText } = JSON.parse(userEmptText);
        emptUser = dataEmptText.user;
        emptToken = dataEmptText.token;
        yield request.post('/account').set('Authorization', `Bearer ${token}`).send({
            creditedUsername: creditedUser.username,
            value: 4,
        });
        yield request.post('/account').set('Authorization', `Bearer ${credToken}`).send({
            creditedUsername: user.username,
            value: 5,
        });
    }));
    (0, globals_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        client_1.default.$disconnect();
    }));
    (0, globals_1.test)('should list all transactions with status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const { text, statusCode } = yield request.get('/transactions').set('Authorization', `Bearer ${token}`);
        const { data } = JSON.parse(text);
        (0, globals_1.expect)(0).toBeLessThan(data.length);
        (0, globals_1.expect)(200).toStrictEqual(statusCode);
    }));
    (0, globals_1.test)('should list transactions by debited filter with status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const { text, statusCode } = yield request.get('/transactions').set('Authorization', `Bearer ${token}`)
            .query({ filterByDebited: true });
        const { data } = JSON.parse(text);
        const expected = data.every((item) => item.debitedAccountId === user.id);
        (0, globals_1.expect)(true).toStrictEqual(expected);
        (0, globals_1.expect)(200).toStrictEqual(statusCode);
    }));
    (0, globals_1.test)('should list transactions by crebited filter with status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const { text, statusCode } = yield request.get('/transactions').set('Authorization', `Bearer ${token}`)
            .query({ filterByCredited: true });
        const { data } = JSON.parse(text);
        const expected = data.every((item) => item.creditedAccountId === user.id);
        (0, globals_1.expect)(true).toStrictEqual(expected);
        (0, globals_1.expect)(200).toStrictEqual(statusCode);
    }));
    (0, globals_1.test)('should list transactions by range date filter with status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const { text, statusCode } = yield request.get('/transactions').set('Authorization', `Bearer ${token}`)
            .query({
            begin: '11-15-2022',
            end: '12-02-2022'
        });
        const { data } = JSON.parse(text);
        (0, globals_1.expect)(0).toBeLessThan(data.length);
        (0, globals_1.expect)(200).toStrictEqual(statusCode);
    }));
    (0, globals_1.test)('should error transaction not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const { text, statusCode } = yield request.get('/transactions').set('Authorization', `Bearer ${emptToken}`);
        const { error } = JSON.parse(text);
        const { message } = error;
        (0, globals_1.expect)('Transactions not found.').toStrictEqual(message);
        (0, globals_1.expect)(404).toStrictEqual(statusCode);
    }));
});
//# sourceMappingURL=transaction.test.js.map