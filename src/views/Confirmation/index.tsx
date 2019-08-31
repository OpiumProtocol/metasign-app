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

// Components
import Button from '../../components/Button'

// Utils
import { goToHistory } from '../../utils/navigation'
import { ViewProps } from '../../utils/views'

// Constants
import { translate } from '../../constants/i18n'
import { colors, Theme } from '../../constants/colors'
import { sizes } from '../../constants/sizes'
import { SignatureStatus } from '../../constants/statuses'

// Stores
import { IHistoryData } from '../../stores/history/models/HistoryData'

interface ProtocolDataProps {
  data: IHistoryData
}

class Confirmation extends React.Component<ViewProps & ProtocolDataProps> {
  handleStatusPress = (status: SignatureStatus, data: IHistoryData) => async () => {
    if (status == SignatureStatus.confirmed) {
      const res = await fetch(data.hook, {
        method: 'POST',
        body: JSON.stringify({
          id: data.id,
          signature: '0x13371488'
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
  
  render() {
    const { theme } = this.props.store.settings
    const data = this.props.data
    const themedStyle = themedStyles(theme)
    return (
      <Fragment>
        <StatusBar barStyle='dark-content' />
        <SafeAreaView>
          <View
            style={styles.body}
          >
            <View style={styles.application}>
              <View style={styles.applicationInner}>
                <Text>{translate('general.application') + ': '}</Text>
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
            <Text>{translate('Confirmation.message')}:</Text>
            <ScrollView style={themedStyle.box}>
              <Text>{JSON.stringify(data.data.domain, null, 2)}</Text>
              <Text>{JSON.stringify(data.data.message, null, 2)}</Text>
            </ScrollView>
            <Text>{translate('Confirmation.description')}:</Text>
            <ScrollView style={themedStyle.box}>
              <Text>{data.description}</Text>
            </ScrollView>
            <View style={styles.buttons}>
              <Button
                text={translate('Confirmation.reject')}
                background={colors[theme].rejected}
                onPress={this.handleStatusPress(SignatureStatus.rejected, data)}
              />
              <Button 
                text={translate('Confirmation.confirm')}
                background={colors[theme].confirmed}
                onPress={this.handleStatusPress(SignatureStatus.confirmed, data)}
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
    paddingVertical: sizes.padding.small,
    paddingHorizontal: sizes.padding.big
  },
  application: {
    paddingVertical: sizes.padding.tiny,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  applicationInner: {
    flexDirection: 'row',
  },
  image: {
    width: sizes.images.logo,
    height: sizes.images.logo
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  }
})

const themedStyles = (theme: Theme) => StyleSheet.create({
  link: {
    color: colors[theme].blue,
    textDecorationLine: 'underline'
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
