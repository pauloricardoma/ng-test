declare namespace NodeJs {
  export interface ProcessEnv {
    DATABASE_URL: string;
    PWD_SALT: string;
    JWT_SECRET: string;
  }
}
