import React from 'react'
import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native'

import { colors } from '../../constants/colors'
import { sizes } from '../../constants/sizes';
import {normalize} from "../../utils/size";

interface Props {
  seed: string,
  editable?: boolean,

  // Editable
  onChange?: (seed: string) => void,
  placeholder?: string

  // Non-editable
  onPress?: () => void,
}

const SeedPhrase = ({
  seed,
  editable = false,
  onChange = () => {},
  placeholder = '',
  onPress = () => {},
}: Props) => {
  if (editable) {
    return (
      <TextInput
        style={styles.pageContentBackground}
        onChangeText={onChange}
        value={seed}
        placeholder={placeholder}
        multiline
      />
    )
  }

  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <Text
        style={styles.pageContentBackground}
      >
        {seed}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  pageContentBackground: {
    padding: sizes.padding.normal,
    borderWidth: sizes.borders.small,
    borderColor: colors.light.pageContentBorder,
    backgroundColor: colors.light.pageContentBackground,
    marginBottom: sizes.margin.small,
    height: normalize(152),
    color: colors.light.blue,
    textAlignVertical: 'top',
    fontSize: sizes.fonts.h3,
  }
})

export default SeedPhrase
