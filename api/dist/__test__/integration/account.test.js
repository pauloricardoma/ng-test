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
const CREDITED_USER = {
    username: faker_1.faker.internet.userName(),
    password: faker_1.faker.internet.password(),
};
const DEFAULT_INITIAL_VALUE = 100;
let token = '';
let user = {};
let creditedUser = {};
(0, globals_1.describe)('/account test suite', () => {
    (0, globals_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield request.post('/users').send(DEFAULT_USER);
        const { text } = yield request.post('/login').send(DEFAULT_USER);
        const { data } = JSON.parse(text);
        user = data.user;
        token = data.token;
        const { text: textCred } = yield request.post('/users').send(CREDITED_USER);
        const { data: dataCred } = JSON.parse(textCred);
        creditedUser = dataCred;
    }));
    (0, globals_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        client_1.default.$disconnect();
    }));
    (0, globals_1.test)('should return account and status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const { text, statusCode } = yield request.get('/account').set('Authorization', `Bearer ${token}`);
        const { data } = JSON.parse(text);
        (0, globals_1.expect)(user.accountId).toStrictEqual(data.id);
        (0, globals_1.expect)(200).toStrictEqual(statusCode);
    }));
    (0, globals_1.test)('should cash-out account return status 200, account and transaction information', () => __awaiter(void 0, void 0, void 0, function* () {
        const debitedValue = 10;
        const { text, statusCode } = yield request.post('/account').set('Authorization', `Bearer ${token}`).send({
            creditedUsername: creditedUser.username,
            value: debitedValue,
        });
        const { data } = JSON.parse(text);
        const { account, transaction } = data;
        (0, globals_1.expect)(DEFAULT_INITIAL_VALUE - debitedValue).toStrictEqual(account.balance);
        (0, globals_1.expect)(user.accountId).toStrictEqual(transaction.debitedAccountId);
        (0, globals_1.expect)(creditedUser.accountId).toStrictEqual(transaction.creditedAccountId);
        (0, globals_1.expect)(200).toStrictEqual(statusCode);
    }));
    (0, globals_1.test)('should error credited account not exist.', () => __awaiter(void 0, void 0, void 0, function* () {
        const debitedValue = 10;
        const { text, statusCode } = yield request.post('/account').set('Authorization', `Bearer ${token}`).send({
            creditedUsername: 'jdqiwjdijwqj́dwdwqdwqdqwdwqqjdjw',
            value: debitedValue,
        });
        const { error } = JSON.parse(text);
        const { message } = error;
        (0, globals_1.expect)('Credited account not exist.').toStrictEqual(message);
        (0, globals_1.expect)(404).toStrictEqual(statusCode);
    }));
    (0, globals_1.test)('should error debited invalid quantity value', () => __awaiter(void 0, void 0, void 0, function* () {
        const { text, statusCode } = yield request.post('/account').set('Authorization', `Bearer ${token}`).send({
            creditedUsername: creditedUser.username,
            value: 1000,
        });
        const { error } = JSON.parse(text);
        const { message } = error;
        (0, globals_1.expect)('Transaction error.').toStrictEqual(message);
        (0, globals_1.expect)(404).toStrictEqual(statusCode);
    }));
    (0, globals_1.test)('should error debited account is equal credited account', () => __awaiter(void 0, void 0, void 0, function* () {
        const debitedValue = 10;
        const { text, statusCode } = yield request.post('/account').set('Authorization', `Bearer ${token}`).send({
            creditedUsername: user.username,
            value: debitedValue,
        });
        const { error } = JSON.parse(text);
        const { message } = error;
        (0, globals_1.expect)('Cash-out operation invalid.').toStrictEqual(message);
        (0, globals_1.expect)(404).toStrictEqual(statusCode);
    }));
    (0, globals_1.test)('should error debited invalid value', () => __awaiter(void 0, void 0, void 0, function* () {
        const { text, statusCode } = yield request.post('/account').set('Authorization', `Bearer ${token}`).send({
            creditedUsername: user.username,
        });
        const { error } = JSON.parse(text);
        const { message } = error;
        (0, globals_1.expect)('Cash-out operation need valid value.').toStrictEqual(message);
        (0, globals_1.expect)(404).toStrictEqual(statusCode);
    }));
});
//# sourceMappingURL=account.test.js.map