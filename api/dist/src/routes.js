"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const accountController_1 = __importDefault(require("./app/controllers/accountController"));
const authController_1 = __importDefault(require("./app/controllers/authController"));
const transactionController_1 = __importDefault(require("./app/controllers/transactionController"));
const usersController_1 = __importDefault(require("./app/controllers/usersController"));
const authMiddleware_1 = __importDefault(require("./app/middlewares/authMiddleware"));
exports.router = (0, express_1.Router)();
// create User
exports.router.post('/users', usersController_1.default.createAccount);
// auth login
exports.router.post('/login', authController_1.default.authenticated);
// show Account
exports.router.get('/account', authMiddleware_1.default, accountController_1.default.index);
// cash-out Account
exports.router.post('/account', authMiddleware_1.default, accountController_1.default.cashOut);
// list Transactions - filter(createdAt, cash-out, cash-in)
exports.router.get('/transactions', authMiddleware_1.default, transactionController_1.default.list);
//# sourceMappingURL=routes.js.map