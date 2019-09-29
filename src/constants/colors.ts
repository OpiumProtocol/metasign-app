export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export const colors = {
  default: {
    white: '#ffffff',
    grey: '#4B4B4E',
    lightGrey: '#A5A5A7',
    black: '#000000',
    red: '#ea4335',
  },
  [Theme.LIGHT]: {
    blue: '#197CD8',
    green: '#34a853',
    confirmed: '#36D69C',
    rejected: '#ea4335',
    itemSplitter: '#3d3d3d',
    grey: '#4B4B4E',
    pageContentBackground: '#EDEEF04d',
    pageContentBorder: '#EDEDF0',
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
