import { describe, test, expect, afterAll } from '@jest/globals';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import prisma from '../../src/client';
import app from '../../src/server';
const request = supertest(app);

const DEFAULT_USER = {
  username: faker.internet.userName(),
  password: faker.internet.password(),
};

describe('/users test suite', () => {
  afterAll(async () => {
    prisma.$disconnect();
  });
  test('should user create and return new user, account and status 200', async () => {
    const { text, statusCode } = await request.post('/users').send(DEFAULT_USER);
    const { data } = JSON.parse(text);
    const { username } = data;

    expect(DEFAULT_USER.username).toStrictEqual(username);
    expect(200).toStrictEqual(statusCode);
  });
  test('should user error username is required and need minimum three caracteres', async () => {
    const { text, statusCode } = await request.post('/users').send({});
    const { error } = JSON.parse(text);
    const { message } = error;

    expect('Username is required and need minimum three caracteres.').toStrictEqual(message);
    expect(404).toStrictEqual(statusCode);
  });
  test('should user error password is required', async () => {
    const { text, statusCode } = await request.post('/users').send({ username: 'Nome de Teste' });
    const { error } = JSON.parse(text);
    const { message } = error;

    expect('Password is required.').toStrictEqual(message);
    expect(404).toStrictEqual(statusCode);
  });
  test('should user error username in use', async () => {
    const { text, statusCode } = await request.post('/users').send(DEFAULT_USER);
    const { error } = JSON.parse(text);
    const { message } = error;

    expect('Username is already in use.').toStrictEqual(message);
    expect(404).toStrictEqual(statusCode);
  });
});
