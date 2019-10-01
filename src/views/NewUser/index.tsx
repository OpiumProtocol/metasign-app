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
import FlashMessage, {DefaultFlash, positionStyle, showMessage} from 'react-native-flash-message'

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
import {normalize} from "../../utils/size";


const confirmButton = StyleSheet.create({
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
      type: 'info',
      backgroundColor: colors.light.confirmed
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
            <Text style={[styles.header]}>{translate('NewUser.welcome')}</Text>
            <View style={styles.widthed}>
              <Text style={styles.text}>{translate('NewUser.text1')}</Text>
            </View>
            <View style={styles.widthed}>
              <SeedPhrase
                  seed={this.state.seed}
                  editable={false}
                  onPress={this.handleSeedTouch}
              />
            </View>
            <View style={styles.widthed}>
              <Text style={styles.important}>{translate('NewUser.important')}</Text>
            </View>
            <View style={styles.widthed}>
              <Text style={styles.text2}>{translate('NewUser.text2')}</Text>
            </View>
            <View style={styles.widthed}>
              <Button
                text={translate('NewUser.savedThePhrase')}
                onPress={this.handleSavedThePhrase}
                loading={loading}
                customStyle={confirmButton}
              />
            </View>
          </View>
          <FlashMessage position="top" style={styles.message} />
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
  pageContentBackground: {
    padding: sizes.padding.small,
    backgroundColor: colors.default.grey,
    marginBottom: sizes.margin.small,
  },
  widthed: {
    width: '100%'
  },
  text: {
    fontSize: sizes.fonts.normal,
    color: colors.default.grey,
    paddingLeft: sizes.padding.small,
    paddingRight: sizes.padding.small,
  },
  text2: {
    fontSize: sizes.fonts.small,
    color: colors.default.lightGrey,
    paddingLeft: sizes.padding.small,
    paddingRight: sizes.padding.small,
  },
  important: {
    fontSize: sizes.fonts.small,
    color: colors.default.red,
    paddingLeft: sizes.padding.small,
    paddingRight: sizes.padding.small,
  },

  message: {
    marginTop: -20,
  }
});

export default inject('store')(observer(NewUser))
