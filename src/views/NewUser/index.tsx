import React, { Fragment } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  InteractionManager,
  TouchableOpacity,
  Clipboard,
} from 'react-native'
import { inject, observer } from 'mobx-react'
import { observable } from 'mobx'
import FlashMessage, { showMessage } from 'react-native-flash-message'

// Components
import Button from '../../components/Button'
import SeedPhrase from '../../components/SeedPhrase'

// Utils
import { goToHistory } from '../../utils/navigation'
import { ViewProps } from '../../utils/views'

// Constants
import { translate } from '../../constants/i18n'
import { colors } from '../../constants/colors'
import { sizes } from '../../constants/sizes'

class NewUser extends React.Component<ViewProps> {
  state = {
    seed: ''
  }

  @observable appStore = this.props.store
  @observable screenStore = this.appStore.newUserScreen

  componentDidMount() {
    InteractionManager.runAfterInteractions(async () => {
      const seed = await this.screenStore.generateNewSeed()
      this.setState({ seed })
    })
  }

  handleSavedThePhrase = () => {
    if (this.screenStore.loading) {
      return
    }
    
    InteractionManager.runAfterInteractions(async () => {
      try {
        await this.screenStore.registerNewSeed(this.state.seed)
        goToHistory()
      } catch (e) {
        console.warn(e)
      }
    })
  }

  handleSeedTouch = () => {
    Clipboard.setString(this.state.seed)
    showMessage({
      message: translate('general.clipboardSuccess'),
      type: 'info'
    })
  }

  render() {
    const { theme } = this.appStore.settings
    const { loading } = this.screenStore
    return (
      <Fragment>
        <StatusBar barStyle='dark-content' />
        <SafeAreaView>
          <View
            style={styles.body}
          >
            <Text style={[styles.h1, styles.widthed]}>{translate('NewUser.welcome')}</Text>
            <View style={styles.widthed}>
              <Text style={styles.text}>{translate('NewUser.text1')}</Text>
            </View>
            <View style={styles.widthed}>
              <Text style={styles.text}>{translate('NewUser.text2')}</Text>
            </View>
            <View style={styles.widthed}>
              <SeedPhrase
                seed={this.state.seed}
                editable={false}
                onPress={this.handleSeedTouch}
              />
            </View>
            <View style={styles.widthed}>
              <Button
                text={translate('NewUser.savedThePhrase')}
                background={colors[theme].blue}
                onPress={this.handleSavedThePhrase}
                loading={loading}
              />
            </View>
          </View>
          <FlashMessage position="top" />
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
    width: '90%'
  },
  text: {
    fontSize: sizes.fonts.normal
  }
})

export default inject('store')(observer(NewUser))
