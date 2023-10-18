declare namespace Express {
  export interface Request {
    user: {
      id?: number | null;
      username: string;
      accountId?: number | null;
    }
  }
}
