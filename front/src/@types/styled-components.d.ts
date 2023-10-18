import 'styled-components'
import { IColorsTheme } from '../Assets/styles/themes/default';

declare module 'styled-components' {
  export interface DefaultTheme extends IColorsTheme {}
}
