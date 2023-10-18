import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import prisma from '../../src/client';
import app from '../../src/server';
const request = supertest(app);

const DEFAULT_USER = {
  username: faker.internet.userName(),
  password: faker.internet.password(),
};

describe('/login test suite', () => {
  beforeAll(async () => {
    await request.post('/users').send(DEFAULT_USER);
  });
  afterAll(async () => {
    prisma.$disconnect();
  });
  test('should login and get access token', async () => {
    const { text, statusCode } = await request.post('/login').send(DEFAULT_USER);
    const { data } = JSON.parse(text);

    expect(data.user.username).toStrictEqual(DEFAULT_USER.username);
    expect(data.token.length).toBeGreaterThan(20);
    expect(200).toStrictEqual(statusCode);
  });
  test('should login error username is required', async () => {
    const { text, statusCode } = await request.post('/login').send({ password: DEFAULT_USER.password });
    const { error } = JSON.parse(text);
    const { message } = error;

    expect('Username is required.').toStrictEqual(message);
    expect(401).toStrictEqual(statusCode);
  });
  test('should login error password is required', async () => {
    const { text, statusCode } = await request.post('/login').send({ username: DEFAULT_USER.username });
    const { error } = JSON.parse(text);
    const { message } = error;

    expect('Password is required.').toStrictEqual(message);
    expect(401).toStrictEqual(statusCode);
  });
  test('should login error user not exist', async () => {
    const { text, statusCode } = await request.post('/login').send({ username: 'Nome invalido' , password: DEFAULT_USER.password });
    const { error } = JSON.parse(text);
    const { message } = error;

    expect('User not exist.').toStrictEqual(message);
    expect(401).toStrictEqual(statusCode);
  });
  test('should login error password invalid', async () => {
    const { text, statusCode } = await request.post('/login').send({ username: DEFAULT_USER.username , password: 'invalido' });
    const { error } = JSON.parse(text);
    const { message } = error;

    expect('Password invalid.').toStrictEqual(message);
    expect(401).toStrictEqual(statusCode);
  });
});
