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
import {normalize} from "../../utils/size";

const importButton = StyleSheet.create({
  button: {
    backgroundColor: colors['light'].blue,
    paddingHorizontal: normalize(30),
    paddingVertical: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: "100%",
    height: normalize(56),
  },
  text: {
    color: colors.default.white,
    fontSize: normalize(16),
    fontWeight: 'bold',
    textAlign: "center",
    width: "100%"
  },
  icon: {
    marginRight: sizes.margin.small
  }
});

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
              <Text style={[styles.header]}>{translate('ExistingUser.welcome')}</Text>
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
              <View style={{height: "25%"}}></View>
              <View style={styles.widthed}>
                <Button
                  text={translate('general.importAccount')}
                  customStyle={importButton}
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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    height: '100%',
    paddingTop: sizes.padding.small,
  },
  header: {
    fontSize: sizes.fonts.h1,
    paddingLeft: sizes.padding.small,
    paddingRight: sizes.padding.small,
  },
  widthed: {
    width: '100%'
  },
  text: {
    fontSize: sizes.fonts.normal,
    color: colors.default.grey,
    paddingLeft: sizes.padding.small,
    paddingRight: sizes.padding.small,
  }
})

export default inject('store')(observer(ExistingUser))
