import { describe, test, expect } from '@jest/globals';
import PasswordHashHelper from '../../src/app/helpers/passwordHashHelper';

const PASSWORD = 'Teste188';
const HASH = '$2b$04$ONn0wrTuauGV0AjZJV1jnOg5A9ighj/lIQ3.wIdIoydFgaiEVmc4u';

describe('password hash test suite', () => {
  test('it should generate hash for password', async () => {
    const defaultLength = PASSWORD.length;
    const result = await PasswordHashHelper.hashPassword(PASSWORD);
    const resultLength = result.length;

    expect(defaultLength).toBeLessThan(resultLength);
  });

  test('it should compare password and hash, and return true for success', async () => {
    const result = await PasswordHashHelper.comparePassword(PASSWORD, HASH);

    expect(result).toBeTruthy();
  });
});
