import React, { Fragment } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native'
import { Navigation } from 'react-native-navigation'
import { inject, observer } from 'mobx-react'

// Components
import Button from '../../components/Button'

// Utils
import { goToHistory } from '../../utils/navigation'
import { ViewProps } from '../../utils/views'

// Constants
import { translate } from '../../constants/i18n'
import { colors } from '../../constants/colors'
import { sizes } from '../../constants/sizes'

class NewUser extends React.Component<ViewProps> {
  handleSavedThePhrase() {
    goToHistory()
  }

  render() {
    const { theme } = this.props.store.settings
    return (
      <Fragment>
        <StatusBar barStyle='dark-content' />
        <SafeAreaView>
          <View
            style={styles.body}
          >
            <Text style={[styles.h1, styles.widthed]}>{translate('NewUser.welcome')}</Text>
            <View style={styles.widthed}>
              <Text>{translate('NewUser.text1')}</Text>
            </View>
            <View style={styles.widthed}>
              <Text>{translate('NewUser.text2')}</Text>
            </View>
            <View style={styles.widthed}>
              <View style={styles.seedPhraseBox}>
                <Text>trial afford eyebrow trial cheese notable want eyebrow scheme afford blouse want</Text>
              </View>
              <Button
                text={translate('NewUser.savedThePhrase')}
                background={colors[theme].blue}
                onPress={this.handleSavedThePhrase}
              />
            </View>
          </View>
        </SafeAreaView>
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: '100%',
  },
  h1: {
    fontSize: sizes.fonts.h1
  },
  seedPhraseBox: {
    padding: sizes.padding.small,
    backgroundColor: colors.default.grey,
    marginBottom: sizes.margin.small,
  },
  widthed: {
    width: '70%'
  }
})

export default inject('store')(observer(NewUser))
