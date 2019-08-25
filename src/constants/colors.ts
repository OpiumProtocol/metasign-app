export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export const colors = {
  default: {
    grey: '#909596'
  },
  [Theme.LIGHT]: {
    blue: '#00b9ff',
    green: '#00d360',
    confirmed: '#00d360',
    rejected: '#b60000',
    itemSplitter: '#3d3d3d',
    grey: '#909596',
  },
  [Theme.DARK]: {
    blue: '#00b9ff',
    green: '#00d360',
    confirmed: '#00d360',
    rejected: '#b60000',
    itemSplitter: '#d8d8d8',
    grey: '#909596',
  }
}
