import { IColorsTheme } from '../../Assets/styles/themes/default';
import { Action, ActionsUnion, createAction } from '../Base/actionHelper';

export enum ThemeKeys {
  TOOGLE_THEME = 'TOOGLE_THEME',
  TOOGLE_THEME_STRING = 'TOOGLE_THEME_STRING',
}

export const ThemeActions = {
  toogleTheme: (theme: IColorsTheme): ToogleThemeAction =>
    createAction(ThemeKeys.TOOGLE_THEME, theme),
  toogleThemeString: (themeString: string): ToogleThemeStringAction =>
    createAction(ThemeKeys.TOOGLE_THEME_STRING, themeString),
};

export type ThemeUnion = ActionsUnion<typeof ThemeActions>;

export type ToogleThemeAction =
  Action<ThemeKeys.TOOGLE_THEME, IColorsTheme>;

export type ToogleThemeStringAction =
  Action<ThemeKeys.TOOGLE_THEME_STRING, string>;
