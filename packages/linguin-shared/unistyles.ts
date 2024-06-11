import { UnistylesRegistry } from 'react-native-unistyles'
import { breakpoints } from './breakpoints'
import { defaultTheme } from './themes'

type AppBreakpoints = typeof breakpoints
type AppThemes = {
  default: typeof defaultTheme,
}

declare module 'react-native-unistyles' {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}

UnistylesRegistry
  .addBreakpoints(breakpoints)
  .addThemes({
    default: defaultTheme
  })
  .addConfig({
    initialTheme: 'default'
  })