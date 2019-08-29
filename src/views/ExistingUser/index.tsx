import React, { Fragment } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  InteractionManager,
} from 'react-native'
import { inject, observer } from 'mobx-react'

// Components
import Button from '../../components/Button'

// Utils
import { goToHistory } from '../../utils/navigation'
import { ViewProps } from '../../utils/views'
import engine from '../../utils/engine'

// Constants
import { translate } from '../../constants/i18n'
import { colors } from '../../constants/colors'
import { sizes } from '../../constants/sizes'

class ExistingUser extends React.Component<ViewProps> {
  state = {
    seed: 'roast afford main fall cheese notable want eyebrow scheme direct blouse trial'
  }

  handleImportAccount = () => {
    InteractionManager.runAfterInteractions(async () => {
      await engine.restoreVault(this.state.seed)
      this.props.store.settings.setLoggedIn(true)
      goToHistory()
    })
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
            <Text style={[styles.h1, styles.widthed]}>{translate('ExistingUser.welcome')}</Text>
            <View style={styles.widthed}>
              <Text>{translate('ExistingUser.text1')}</Text>
            </View>
            <View style={styles.widthed}>
              <View style={styles.seedPhraseBox}>
                <Text>{this.state.seed}</Text>
              </View>
              <Button
                text={translate('general.importAccount')}
                background={colors[theme].green}
                onPress={this.handleImportAccount}
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

export default inject('store')(observer(ExistingUser))
