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
// @ts-ignore
import ExpandIcon from "../../assets/images/Expand.svg";
// @ts-ignore
import CollapseIcon from "../../assets/images/Collapse.svg";

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
import {normalize} from "../../utils/size";
import stripLow from "validator/lib/stripLow";

interface ProtocolDataProps {
  data: IHistoryData
}

const rejectButton = StyleSheet.create({
  button: {
    backgroundColor: colors.light.pageContentBackground,
    paddingHorizontal: normalize(30),
    paddingVertical: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: "100%"
  },
  text: {
    color: colors.light.blue,
    fontSize: normalize(16),
    fontWeight: 'bold',
    textAlign: "center",
    width: "100%"
  },
  icon: {
    marginRight: sizes.margin.small
  }
});

const confirmButton = StyleSheet.create({
  button: {
    backgroundColor: colors.light.blue,
    paddingHorizontal: normalize(30),
    paddingVertical: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: "100%"
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

  _renderHeader = (content: any, index: number, isActive: boolean) =>(<View style={styles.header}>
    <Text style={styles.headerText}>{content.header}</Text>
    {
      isActive ?
          <CollapseIcon style={styles.collapseIndicator}/>
          :
          <ExpandIcon style={styles.collapseIndicator}/>
    }
  </View>)

  _renderContent = (content: any) => <View style={styles.content}>{content.content}</View>

  _renderSectionTitle = () => <View/>

  _updateSections = (activeSections: Array<any>) => {
    this.setState({ activeSections })
  }

  render() {
    const { theme } = this.props.store.settings
    const data = this.props.data
    const themedStyle = themedStyles(theme)
    const SECTIONS = [{
      header: translate('Confirmation.advancedData'),
      content: (
        <SeedPhrase
            customStyle={{
              color: colors.light.grey,
              fontSize: sizes.fonts.small,
              height: "auto",
              borderWidth: 0,
            }}
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
              <Text style={styles.explanation}>{translate('Confirmation.explanation')}</Text>
              <View style={styles.application}>
                <View>
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
              <Text style={styles.descriptionTitle}>{translate('Confirmation.description')}</Text>
              <Text style={styles.description}>{data.domain}</Text>
              <Accordion
                activeSections={this.state.activeSections}
                sections={SECTIONS}
                renderHeader={this._renderHeader}
                renderSectionTitle={this._renderSectionTitle}
                renderContent={this._renderContent}
                onChange={this._updateSections}
                touchableComponent={TouchableOpacity}
                containerStyle={styles.accordion}
              />
            </ScrollView>
            <View style={styles.buttons}>
              <View style={styles.button}>
                <Button
                  text={translate('Confirmation.reject')}
                  customStyle={rejectButton}
                  onPress={this.handleStatusPress(SignatureStatus.rejected, data)}
                />
              </View>
              <View style={styles.button}>
                <Button
                  text={translate('Confirmation.confirm')}
                  customStyle={confirmButton}
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
    width: "100%",
  },
  application: {
    paddingVertical: sizes.padding.tiny,
    paddingHorizontal: sizes.padding.normal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: sizes.images.bigLogo,
    height: sizes.images.bigLogo
  },
  buttons: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  header: {
    width: '100%',
    backgroundColor: colors.light.pageContentBackground,
    paddingHorizontal: sizes.padding.normal,
    paddingVertical: sizes.padding.normal,
    fontSize: sizes.fonts.normal,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  collapseIndicator: {
    marginRight: sizes.padding.small,
    alignSelf: "center",
  },
  headerText: {
    textAlign: 'left',
    fontSize: sizes.fonts.small,
    color: colors.light.grey,
    fontWeight: "bold",
  },
  content: {
    width: '100%'
  },
  explanation: {
    fontSize: sizes.fonts.h1,
    fontWeight: "bold",
    textAlign: 'left',
    marginBottom: sizes.margin.small,
    color: colors.default.black,
    paddingHorizontal: sizes.padding.normal,
  },
  descriptionTitle: {
    fontSize: sizes.fonts.normal,
    fontWeight: "bold",
    textAlign: 'left',
    color: colors.light.grey,
    paddingHorizontal: sizes.padding.normal,
  },
  description: {
    fontSize: sizes.fonts.normal,
    textAlign: 'left',
    marginBottom: sizes.margin.small,
    color: colors.light.grey,
    paddingHorizontal: sizes.padding.normal,
  },
  text: {
    fontSize: sizes.fonts.normal,
    textAlign: 'center',
    marginBottom: sizes.margin.small
  },
  button: {
    width: '50%'
  },
  accordion: {
    width: "100%",
  }
});

const themedStyles = (theme: Theme) => StyleSheet.create({
  link: {
    color: colors[theme].blue,
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
