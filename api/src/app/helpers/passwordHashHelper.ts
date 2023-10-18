import bcrypt from 'bcrypt';
import { promisify } from 'util';

const hashAsync = promisify(bcrypt.hash);
const compareAsync = promisify(bcrypt.compare);

class PasswordHashHelper {
  static hashPassword(password: string) {
    return hashAsync(password, Number(process.env.PWD_SALT) || 5);
  }
  static comparePassword(password: string, hash: string) {
    return compareAsync(password, hash);
  }
}

export default PasswordHashHelper;
