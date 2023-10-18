import axios, { AxiosInstance } from 'axios';

export class Http {
  static async axios(): Promise<AxiosInstance> {
    return new Promise((resolve) => {
      const authorization = localStorage.getItem('accessToken');
      const headers = authorization ? { Authorization: `Bearer ${authorization}` } : undefined;

      const instance = axios.create({
        baseURL: 'http://localhost:4000',
        headers,
      });

      instance.interceptors.response.use(undefined, Http.resolveErros);

      return resolve(instance);
    });
  }

  static resolveErros(err: any) {
    const res = err.response;
    let serverError = {};
    switch (res.status) {
    case 500:
      serverError = {
        error: { message: 'Erro inesperado no servidor' },
      };
      throw serverError;
    default:
      throw err.response.data;
    }
  }
}
