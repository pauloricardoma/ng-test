import { AuthActionKeys, AuthActionUnion } from './Auth.action';
import { IAuthState } from './interface/IAuthState';

const token = localStorage.getItem('accessToken') || undefined;

const initialState: IAuthState = {
  isLoading: false,
  acessToken: token || undefined,
  isLogged: !!token,
  user: undefined,
};

const authReducer = (state = initialState, action: AuthActionUnion): IAuthState => {
  switch (action.type) {
  case AuthActionKeys.AUTH_SIGNIN_REQUEST:
    return {
      ...state,
      user: undefined,
      isLoading: true,
      error: undefined,
    };
  case AuthActionKeys.AUTH_SIGNIN_SUCCESS:
    return {
      ...state,
      user: action.payload,
      isLoading: false,
      error: undefined,
    };
  case AuthActionKeys.AUTH_SIGNIN_FAILURE:
    return {
      ...state,
      user: undefined,
      isLoading: false,
      error: action.payload,
    };

  case AuthActionKeys.AUTH_LOGIN_REQUEST:
    return {
      ...state,
      acessToken: undefined,
      isLoading: true,
      isLogged: false,
      user: undefined,
      error: undefined,
    };
  case AuthActionKeys.AUTH_LOGIN_SUCCESS:
    localStorage.setItem('accessToken', action.payload.token);
    return {
      ...state,
      acessToken: action.payload.token,
      isLoading: false,
      isLogged: true,
      user: action.payload.user,
      error: undefined,
    };
  case AuthActionKeys.AUTH_LOGIN_FAILURE:
    return {
      ...state,
      acessToken: undefined,
      isLoading: false,
      isLogged: false,
      user: undefined,
      error: action.payload,
    };

  case AuthActionKeys.AUTH_LOGOUT:
    localStorage.removeItem('accessToken');
    return {
      ...state,
      isLogged: action.payload,
      acessToken: undefined,
      user: undefined,
    };

  default:
    return state;
  }
};

export default authReducer;
