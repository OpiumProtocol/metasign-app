import React from 'react'
import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native'

import { colors } from '../../constants/colors'
import { sizes } from '../../constants/sizes';

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
        style={styles.seedPhraseBox}
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
        style={styles.seedPhraseBox}
      >
        {seed}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  seedPhraseBox: {
    borderColor: colors.default.lightGrey,
    borderRadius: sizes.borders.radius.small,
    borderWidth: sizes.borders.small,
    padding: sizes.padding.small,
    backgroundColor: colors.default.white,
    marginBottom: sizes.margin.small,
    minHeight: sizes.boxes.seedHeight,
    color: colors.default.black,
    textAlignVertical: 'top',
    fontSize: sizes.fonts.h3,
  }
})

export default SeedPhrase
