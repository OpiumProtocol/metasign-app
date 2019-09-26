import React, { Fragment } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView
} from 'react-native'
import { inject, observer } from 'mobx-react'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
import Accordion from 'react-native-collapsible/Accordion'

// Components
import Button from '../../components/Button'

// Utils
import { goToHistory } from '../../utils/navigation'
import { ViewProps } from '../../utils/views'
import engine from '../../utils/engine'

// Constants
import { translate } from '../../constants/i18n'
import { colors, Theme } from '../../constants/colors'
import { sizes } from '../../constants/sizes'
import { SignatureStatus } from '../../constants/statuses'

// Stores
import { IHistoryData } from '../../stores/history/models/HistoryData'
import SeedPhrase from '../../components/SeedPhrase'

interface ProtocolDataProps {
  data: IHistoryData
}

class Confirmation extends React.Component<ViewProps & ProtocolDataProps> {
  state = {
    activeSections: []
  }

  handleStatusPress = (status: SignatureStatus, data: IHistoryData) => async () => {
    ReactNativeHapticFeedback.trigger('selection', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: true
    })
    if (status == SignatureStatus.confirmed) {
      const signature = await engine.signTypedData({
        from: engine.accounts[0],
        data: JSON.stringify(data.data)
      })
      const res = await fetch(data.hook, {
        method: 'POST',
        body: JSON.stringify({
          id: data.id,
          signature
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (res.status != 200) {
        console.warn(res.status)
        return
      }
    }
    this.props.store.history.addNew(status, data)
    goToHistory()
  }

  handleLinkPress = (link: string) => () => {
    Linking.openURL(`https://${link}`)
  }

  _renderHeader = content => <Text style={styles.header}>{content.header}</Text>

  _renderContent = content => <View style={styles.content}>{content.content}</View>

  _renderSectionTitle = () => null

  _updateSections = (activeSections: Array<any>) => {
    this.setState({ activeSections })
  }
  
  render() {
    const { theme } = this.props.store.settings
    const data = this.props.data
    const themedStyle = themedStyles(theme)
    const SECTIONS = [{
      header: translate('Confirmation.advancedData')+' \u25be',
      content: (
        <SeedPhrase
          seed={
            JSON.stringify(data.data.domain, null, 2) + '\n' + JSON.stringify(data.data.message, null, 2)
          }
        />
      )
    }]
    return (
      <Fragment>
        <StatusBar barStyle='dark-content' />
        <SafeAreaView>
          <View style={styles.container}>
            <ScrollView
              style={styles.body}
            >
              <Text style={styles.text}>{translate('Confirmation.explanation')}</Text>
              <View style={styles.application}>
                <View>
                  <Text style={styles.text}>{translate('general.application')}</Text>
                  <TouchableOpacity
                    onPress={this.handleLinkPress(data.domain)}
                  >
                    <Text
                      style={themedStyle.link}
                    >
                      {data.domain}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Image
                  source={{
                    uri: data.logo
                  }}
                  style={styles.image}
                  resizeMode={'contain'}
                />
              </View>
              <Text style={styles.text}>{translate('Confirmation.description')}{' ' + data.domain}</Text>
              <SeedPhrase
                seed={data.description}
              />
              <Accordion
                activeSections={this.state.activeSections}
                sections={SECTIONS}
                renderHeader={this._renderHeader}
                renderSectionTitle={this._renderSectionTitle}
                renderContent={this._renderContent}
                onChange={this._updateSections}
                touchableComponent={TouchableOpacity}
              />
            </ScrollView>
            <View style={styles.buttons}>
              <View style={styles.button}>
                <Button
                  text={translate('Confirmation.reject')}
                  background={colors[theme].rejected}
                  onPress={this.handleStatusPress(SignatureStatus.rejected, data)}
                />
              </View>
              <View style={styles.button}>
                <Button 
                  text={translate('Confirmation.confirm')}
                  background={colors[theme].confirmed}
                  onPress={this.handleStatusPress(SignatureStatus.confirmed, data)}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%'
  },
  body: {
    paddingVertical: sizes.padding.small,
    paddingHorizontal: sizes.padding.big
  },
  application: {
    paddingVertical: sizes.padding.tiny,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: sizes.images.logo,
    height: sizes.images.logo
  },
  buttons: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  header: {
    width: '100%',
    textAlign: 'center',
    padding: sizes.padding.normal,
    fontSize: sizes.fonts.normal
  },
  content: {
    width: '100%'
  },
  text: {
    fontSize: sizes.fonts.normal,
    textAlign: 'center',
    marginBottom: sizes.margin.small
  },
  button: {
    width: '45%'
  }
})

const themedStyles = (theme: Theme) => StyleSheet.create({
  link: {
    color: colors[theme].blue,
    textDecorationLine: 'underline',
    fontSize: sizes.fonts.normal,
  },
  box: {
    marginVertical: sizes.margin.small,
    width: '100%',
    height: sizes.boxes.normal,
    paddingVertical: sizes.padding.normal,
    paddingHorizontal: sizes.padding.small,
    backgroundColor: colors[theme].grey
  }
})

export default inject('store')(observer(Confirmation))
