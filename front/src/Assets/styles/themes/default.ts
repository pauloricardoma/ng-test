export interface IDefaultTheme {
  colors?: {
    confirmation: {
      main: string;
      background: string;
    },
    error: {
      main: string;
      background: string;
    },
  },
}

export const common = {
  colors: {
    confirmation: {
      main: '#34C38F',
      background: 'rgba(52, 195, 143, 0.2)',
    },
    error: {
      main: '#DF3938',
      background: 'rgba(245, 74, 72, 0.2)',
    },
  },
} as IDefaultTheme;

export interface IColorsTheme extends IDefaultTheme{
  background: string;
  text: string;
  backgroundCard: string;
  border: string;
  opacity: string;
}
