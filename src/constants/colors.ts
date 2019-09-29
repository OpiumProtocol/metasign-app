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
    red: '#FF5A5A',
  },
  [Theme.LIGHT]: {
    blue: '#197CD8',
    green: '#34a853',
    confirmed: '#36D69C',
    rejected: '#FF5A5A',
    itemSplitter: '#C4C4C4',
    grey: '#4B4B4E',
    pageContentBackground: '#E5E5E5',
    pageContentBorder: '#EDEDF0',
    lightGrey: '#A5A5A7',
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
