import { Action, ActionsUnion, createAction } from '../../Store/Base/actionHelper';
import { ILoginRequest } from '../../Data/interface/Auth/ILoginRequest';
import { ILoginResponse } from '../../Data/interface/Auth/IloginResponse';
import { ISgininRequest } from '../../Data/interface/Auth/ISigninRequest';
import { IUserInfo } from '../../Data/interface/User/IUserInfo';

export enum AuthActionKeys {
  AUTH_SIGNIN_REQUEST = 'AUTH_SIGNIN_REQUEST',
  AUTH_SIGNIN_SUCCESS = 'AUTH_SIGNIN_SUCCESS',
  AUTH_SIGNIN_FAILURE = 'AUTH_SIGNIN_FAILURE',

  AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST',
  AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS',
  AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE',

  AUTH_LOGOUT = 'AUTH_LOGOUT',
}

export const AuthActions = {
  signin: (request: ISgininRequest): SigninAction =>
    createAction(AuthActionKeys.AUTH_SIGNIN_REQUEST, request),
  signinSuccess: (response: IUserInfo): SigninActionSuccess =>
    createAction(AuthActionKeys.AUTH_SIGNIN_SUCCESS, response),
  signinFailure: (error: string): SigninActionFailure =>
    createAction(AuthActionKeys.AUTH_SIGNIN_FAILURE, error),

  login: (request: ILoginRequest): LoginAction =>
    createAction(AuthActionKeys.AUTH_LOGIN_REQUEST, request),
  loginSuccess: (response: ILoginResponse): LoginActionSuccess =>
    createAction(AuthActionKeys.AUTH_LOGIN_SUCCESS, response),
  loginFailure: (error: string): LoginActionFailure =>
    createAction(AuthActionKeys.AUTH_LOGIN_FAILURE, error),

  logout: (isLogged: boolean): LogoutAction =>
    createAction(AuthActionKeys.AUTH_LOGOUT, isLogged),
};

export type AuthActionUnion = ActionsUnion<typeof AuthActions>;

export type SigninAction = Action<AuthActionKeys.AUTH_SIGNIN_REQUEST, ISgininRequest>;
export type SigninActionSuccess = Action<AuthActionKeys.AUTH_SIGNIN_SUCCESS, IUserInfo>;
export type SigninActionFailure = Action<AuthActionKeys.AUTH_SIGNIN_FAILURE, string>;

export type LoginAction = Action<AuthActionKeys.AUTH_LOGIN_REQUEST, ILoginRequest>;
export type LoginActionSuccess = Action<AuthActionKeys.AUTH_LOGIN_SUCCESS, ILoginResponse>;
export type LoginActionFailure = Action<AuthActionKeys.AUTH_LOGIN_FAILURE, string>;

export type LogoutAction = Action<AuthActionKeys.AUTH_LOGOUT, boolean>;
