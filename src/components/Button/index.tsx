import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native'

import { normalize } from '../../utils/size'
import { colors } from '../../constants/colors'
import { sizes } from '../../constants/sizes'

interface Props {
  text: String,
  background?: string,
  onPress: () => void,
  type?: string,
  loading?: boolean,
  icon?: Element,
  bold?: boolean
}

const Button = ({ text, onPress, background, type, loading = false, icon, bold = false }: Props) => {
  const style = styles({ background, type, bold })
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <View style={style.button}>
        { icon &&
          <View style={style.icon}>
            { icon }
          </View>
        }
        <Text style={style.text}>
          {loading && <ActivityIndicator size="small" color="#ffffff" />} {text}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

interface ButtonStyles {
  background?: string,
  type?: string,
  bold: boolean
}

const circleStyles = {

}

const styles = ({ background, type, bold }: ButtonStyles) => {
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
        },
        icon: {

        }
      })
    default:
      return StyleSheet.create({
        button: {
          backgroundColor: background || colors.default.grey,
          borderRadius: normalize(10),
          paddingHorizontal: normalize(30),
          paddingVertical: normalize(20),
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row'
        },
        text: {
          color: '#fff',
          fontSize: normalize(20),
          fontWeight: bold ? 'bold' : 'normal'
        },
        icon: {
          marginRight: sizes.margin.small
        }
      })
  }
}

export default Button
