import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import prisma from '../../src/client';
import app from '../../src/server';
import { IUser } from '../../src/app/interfaces/IUser';
const request = supertest(app);

const DEFAULT_USER = {
  username: faker.internet.userName(),
  password: faker.internet.password(),
};
const CREDITED_USER = {
  username: faker.internet.userName(),
  password: faker.internet.password(),
};
const DEFAULT_INITIAL_VALUE = 100;
let token = '';
let user = {} as IUser;
let creditedUser = {} as IUser;

describe('/account test suite', () => {
  beforeAll(async () => {
    await request.post('/users').send(DEFAULT_USER);
    const { text } = await request.post('/login').send(DEFAULT_USER);
    const { data } = JSON.parse(text);
    user = data.user;
    token = data.token;
    const { text: textCred } = await request.post('/users').send(CREDITED_USER);
    const { data: dataCred } = JSON.parse(textCred);
    creditedUser = dataCred;
  });
  afterAll(async () => {
    prisma.$disconnect();
  });
  test('should return account and status 200', async () => {
    const { text, statusCode } = await request.get('/account').set('Authorization', `Bearer ${token}`);
    const { data } = JSON.parse(text);

    expect(user.accountId).toStrictEqual(data.id);
    expect(200).toStrictEqual(statusCode);
  });
  test('should cash-out account return status 200, account and transaction information', async () => {
    const debitedValue = 10;
    const { text, statusCode } = await request.post('/account').set('Authorization', `Bearer ${token}`).send({
      creditedUsername: creditedUser.username,
      value: debitedValue,
    });
    const { data } = JSON.parse(text);
    const { account, transaction } = data;

    expect(DEFAULT_INITIAL_VALUE - debitedValue).toStrictEqual(account.balance);
    expect(user.accountId).toStrictEqual(transaction.debitedAccountId);
    expect(creditedUser.accountId).toStrictEqual(transaction.creditedAccountId);
    expect(200).toStrictEqual(statusCode);
  });
  test('should error credited account not exist.', async () => {
    const debitedValue = 10;
    const { text, statusCode } = await request.post('/account').set('Authorization', `Bearer ${token}`).send({
      creditedUsername: 'jdqiwjdijwqj́dwdwqdwqdqwdwqqjdjw',
      value: debitedValue,
    });
    const { error } = JSON.parse(text);
    const { message } = error;

    expect('Credited account not exist.').toStrictEqual(message);
    expect(404).toStrictEqual(statusCode);
  });
  test('should error debited invalid quantity value', async () => {
    const { text, statusCode } = await request.post('/account').set('Authorization', `Bearer ${token}`).send({
      creditedUsername: creditedUser.username,
      value: 1000,
    });

    const { error } = JSON.parse(text);
    const { message } = error;

    expect('Transaction error.').toStrictEqual(message);
    expect(404).toStrictEqual(statusCode);
  });
  test('should error debited account is equal credited account', async () => {
    const debitedValue = 10;
    const { text, statusCode } = await request.post('/account').set('Authorization', `Bearer ${token}`).send({
      creditedUsername: user.username,
      value: debitedValue,
    });
    const { error } = JSON.parse(text);
    const { message } = error;

    expect('Cash-out operation invalid.').toStrictEqual(message);
    expect(404).toStrictEqual(statusCode);
  });
  test('should error debited invalid value', async () => {
    const { text, statusCode } = await request.post('/account').set('Authorization', `Bearer ${token}`).send({
      creditedUsername: user.username,
    });
    const { error } = JSON.parse(text);
    const { message } = error;

    expect('Cash-out operation need valid value.').toStrictEqual(message);
    expect(404).toStrictEqual(statusCode);
  });
});
