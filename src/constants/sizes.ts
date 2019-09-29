import { normalize } from "../utils/size";

export const sizes = {
  margin: {
    huge: normalize(150),
    big: normalize(23),
    small: normalize(10),
  },
  padding: {
    tiny: normalize(5),
    small: normalize(10),
    normal: normalize(20),
    big: normalize(30)
  },
  fonts: {
    h1: normalize(32),
    h3: normalize(25),
    normal: normalize(23),
    small: normalize(16),
  },
  borders: {
    radius: {
      small: normalize(5)
    },
    small: normalize(1)
  },
  images: {
    logo: normalize(100)
  },
  boxes: {
    normal: normalize(200),
    seedHeight: normalize(200),
  }
}
