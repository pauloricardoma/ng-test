import { ThemeKeys, ThemeUnion } from './Theme.action';
import light from '../../Assets/styles/themes/light';
import { IThemeState } from './interface/IThemeState';

const initialState: IThemeState = {
  theme: light,
  themeString: JSON.parse(localStorage.getItem('theme') || '') || 'light',
};

const themeReducer = (state = initialState, action: ThemeUnion): IThemeState => {
  switch (action.type) {
  case ThemeKeys.TOOGLE_THEME:
    return {
      ...state,
      theme: action.payload,
    };
  case ThemeKeys.TOOGLE_THEME_STRING:
    return {
      ...state,
      themeString: action.payload,
    };

  default:
    return state;
  }
};

export default themeReducer;
