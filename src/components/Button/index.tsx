import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import { normalize } from '../../utils/size'
import { colors } from '../../constants/colors'

interface Props {
  text: String,
  background?: string,
  onPress: () => void,
  type?: string
}

const Button = ({ text, onPress, background, type }: Props) => {
  const style = styles({ background, type })
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <View
        style={style.button}
      >
        <Text style={style.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

interface ButtonStyles {
  background?: string,
  type?: string
}

const circleStyles = {

}

const styles = ({ background, type }: ButtonStyles) => {
  switch (type) {
    case 'circle': 
      return StyleSheet.create({
        button: {
          backgroundColor: background || colors.default.grey,
          borderRadius: normalize(45),
          minHeight: normalize(90),
          maxHeight: normalize(90),
          minWidth: normalize(90),
          maxWidth: normalize(90),
          justifyContent: 'center',
          alignItems: 'center'
        },
        text: {
          color: '#fff',
          fontSize: normalize(30)
        }
      })
    default:
      return StyleSheet.create({
        button: {
          backgroundColor: background || colors.default.grey,
          borderRadius: normalize(10),
          paddingHorizontal: normalize(30),
          paddingVertical: normalize(10),
          justifyContent: 'center',
          alignItems: 'center'
        },
        text: {
          color: '#fff',
          fontSize: normalize(20)
        }
      })
  }
}

export default Button
