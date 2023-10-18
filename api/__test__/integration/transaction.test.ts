import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import prisma from '../../src/client';
import app from '../../src/server';
import { IUser } from '../../src/app/interfaces/IUser';
import { ITransaction } from '../../src/app/interfaces/ITransaction';
const request = supertest(app);

const DEFAULT_USER = {
  username: 'Paulo',
  password: 'Teste188',
};
const CREDITED_USER = {
  username: faker.internet.userName(),
  password: faker.internet.password(),
};
const EMPTY_TRANSACTION_USER = {
  username: faker.internet.userName(),
  password: faker.internet.password(),
};
let token = '';
let user = {} as IUser;
let credToken = '';
let creditedUser = {} as IUser;
let emptToken = '';
let emptUser = {} as IUser;

describe('/transactions test suite', () => {
  beforeAll(async () => {
    await request.post('/users').send(DEFAULT_USER);
    const { text } = await request.post('/login').send(DEFAULT_USER);
    const { data } = JSON.parse(text);
    user = data.user;
    token = data.token;
    await request.post('/users').send(CREDITED_USER);
    const { text: textCred } = await request.post('/login').send(CREDITED_USER);
    const { data: dataCred } = JSON.parse(textCred);
    creditedUser = dataCred.user;
    credToken = dataCred.token;

    await request.post('/users').send(EMPTY_TRANSACTION_USER);
    const { text: userEmptText } = await request.post('/login').send(EMPTY_TRANSACTION_USER);
    const { data: dataEmptText } = JSON.parse(userEmptText);
    emptUser = dataEmptText.user;
    emptToken = dataEmptText.token;

    await request.post('/account').set('Authorization', `Bearer ${token}`).send({
      creditedUsername: creditedUser.username,
      value: 4,
    });
    await request.post('/account').set('Authorization', `Bearer ${credToken}`).send({
      creditedUsername: user.username,
      value: 5,
    });
  });
  afterAll(async () => {
    prisma.$disconnect();
  });
  test('should list all transactions with status 200', async () => {
    const { text, statusCode } = await request.get('/transactions').set('Authorization', `Bearer ${token}`);
    const { data } = JSON.parse(text);

    expect(0).toBeLessThan(data.length);
    expect(200).toStrictEqual(statusCode);
  });
  test('should list transactions by debited filter with status 200', async () => {
    const { text, statusCode } = await request.get('/transactions').set('Authorization', `Bearer ${token}`)
      .query({filterByDebited: true});
    const { data } = JSON.parse(text);
    const expected = data.every((item: ITransaction) => item.debitedAccountId === user.id);

    expect(true).toStrictEqual(expected);
    expect(200).toStrictEqual(statusCode);
  });
  test('should list transactions by crebited filter with status 200', async () => {
    const { text, statusCode } = await request.get('/transactions').set('Authorization', `Bearer ${token}`)
      .query({filterByCredited: true});
    const { data } = JSON.parse(text);
    const expected = data.every((item: ITransaction) => item.creditedAccountId === user.id);

    expect(true).toStrictEqual(expected);
    expect(200).toStrictEqual(statusCode);
  });
  test('should list transactions by range date filter with status 200', async () => {
    const { text, statusCode } = await request.get('/transactions').set('Authorization', `Bearer ${token}`)
      .query({
        begin: '11-15-2022',
        end: '12-02-2022'
      });
    const { data } = JSON.parse(text);

    expect(0).toBeLessThan(data.length);
    expect(200).toStrictEqual(statusCode);
  });
  test('should error transaction not found', async () => {
    const { text, statusCode } = await request.get('/transactions').set('Authorization', `Bearer ${emptToken}`);
    const { error } = JSON.parse(text);
    const { message } = error;

    expect('Transactions not found.').toStrictEqual(message);
    expect(404).toStrictEqual(statusCode);
  });
});
