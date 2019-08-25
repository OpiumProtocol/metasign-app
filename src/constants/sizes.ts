import { normalize } from "../utils/size";

export const sizes = {
  margin: {
    small: normalize(10),
  },
  padding: {
    tiny: normalize(5),
    small: normalize(10),
    normal: normalize(20),
    big: normalize(30)
  },
  fonts: {
    h1: normalize(23),
  },
  borders: {
    small: normalize(1)
  },
  images: {
    logo: normalize(100)
  },
  boxes: {
    normal: normalize(200)
  }
}
