import React, { Fragment } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  InteractionManager,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { inject, observer } from 'mobx-react'
import { observable } from 'mobx'

// Components
import Button from '../../components/Button'

// Utils
import { goToHistory } from '../../utils/navigation'
import { ViewProps } from '../../utils/views'

// Constants
import { translate } from '../../constants/i18n'
import { colors } from '../../constants/colors'
import { sizes } from '../../constants/sizes'
import SeedPhrase from '../../components/SeedPhrase'

class ExistingUser extends React.Component<ViewProps> {
  state = {
    seed: ''
  }

  @observable appStore = this.props.store
  @observable screenStore = this.appStore.existingUserScreen

  handleImportAccount = () => {
    if (this.screenStore.loading) {
      return
    }
    
    InteractionManager.runAfterInteractions(async () => {
      try {
        await this.screenStore.registerNewSeed(this.state.seed)
        goToHistory()
      } catch (e) {
        Alert.alert(this.screenStore.error)
      }
    })
  }

  handleSeedChange = (seed: string) => {
    this.setState({ seed })
  }

  render() {
    const { theme } = this.appStore.settings
    const { loading, error } = this.screenStore
    return (
      <Fragment>
        <StatusBar barStyle='dark-content' />
        <SafeAreaView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAvoidingView
            style={styles.body}
            behavior="padding" enabled
          >
              <Text style={[styles.h1, styles.widthed]}>{translate('ExistingUser.welcome')}</Text>
              <View style={styles.widthed}>
                <Text style={styles.text}>{translate('ExistingUser.text1')}</Text>
              </View>
              <View style={styles.widthed}>
                <SeedPhrase
                  seed={this.state.seed}
                  editable
                  onChange={this.handleSeedChange}
                  placeholder={translate('ExistingUser.placeholder')}
                />
              </View>
              <View style={styles.widthed}>
                <Button
                  text={translate('general.importAccount')}
                  background={colors[theme].blue}
                  onPress={this.handleImportAccount}
                  loading={loading}
                />
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  h1: {
    marginTop: sizes.margin.big,
    fontSize: sizes.fonts.h1
  },
  widthed: {
    width: '90%'
  },
  text: {
    fontSize: sizes.fonts.normal
  }
})

export default inject('store')(observer(ExistingUser))
