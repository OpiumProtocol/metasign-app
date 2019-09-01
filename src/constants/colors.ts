export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export const colors = {
  default: {
    white: '#ffffff',
    grey: '#909596',
    lightGrey: '#b2b2b2',
    black: '#000000',
  },
  [Theme.LIGHT]: {
    blue: '#4285f4',
    green: '#34a853',
    confirmed: '#34a853',
    rejected: '#ea4335',
    itemSplitter: '#3d3d3d',
    grey: '#909596',
  },
  [Theme.DARK]: {
    blue: '#4285f4',
    green: '#34a853',
    confirmed: '#34a853',
    rejected: '#ea4335',
    itemSplitter: '#d8d8d8',
    grey: '#909596',
  }
}
