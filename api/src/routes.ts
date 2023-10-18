import { Router } from 'express';
import Accountcontroller from './app/controllers/accountController';
import Authcontroller from './app/controllers/authController';
import TransactionController from './app/controllers/transactionController';
import UsersController from './app/controllers/usersController';
import authMiddleware from './app/middlewares/authMiddleware';

export const router = Router();

// create User
router.post('/users', UsersController.createAccount);

// auth login
router.post('/login', Authcontroller.authenticated);

// show Account
router.get('/account', authMiddleware, Accountcontroller.index);

// cash-out Account
router.post('/account', authMiddleware, Accountcontroller.cashOut);

// list Transactions - filter(createdAt, cash-out, cash-in)
router.get('/transactions', authMiddleware, TransactionController.list);
