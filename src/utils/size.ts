import {
  Dimensions,
  Platform,
  PixelRatio,
} from 'react-native'

const { width: screen_width } = Dimensions.get('window')

export enum DisplayResolution {
  IPhoneSE = 320,
  IPhoneX = 375,
}

export enum PlatformOS {
  IOS = 'ios',
  Android = 'android',
}

const iPhoneXScale = screen_width / DisplayResolution.IPhoneX

export function normalize(size: number, onlyDown?: boolean) {
  if (onlyDown && iPhoneXScale >= 1) {
    return PixelRatio.roundToNearestPixel(size)
  }

  const newSize = size * iPhoneXScale

  if (Platform.OS === PlatformOS.IOS) {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}
