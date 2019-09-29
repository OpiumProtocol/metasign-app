import React, { Fragment } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native'
import { Navigation } from 'react-native-navigation'
import { inject, observer } from 'mobx-react'
import moment from 'moment'

// Utils
import { ViewProps } from '../../utils/views'
import { goToScan, goToFirstScreen } from '../../utils/navigation'

// Assets
// @ts-ignore
import ScanIcon from '../../assets/images/scan.svg'

// Constants
import { translate } from '../../constants/i18n'
import { colors, Theme } from '../../constants/colors'
import { sizes } from '../../constants/sizes'

// Models
import { IHistoryData } from '../../stores/history/models/HistoryData'
import { SignatureStatus } from '../../constants/statuses'

interface RenderItemArgs {
  item: IHistoryData
}

class History extends React.Component<ViewProps> {
  constructor(props: ViewProps) {
    super(props)
    Navigation.events().bindComponent(this)
  }

  // @ts-ignore
  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'logoutButton') {
      // Make good logout
      this.props.store.settings.setLoggedIn(false)
      goToFirstScreen()
    }
  }

  handleLinkPress = (link: string) => () => {
    Linking.openURL(`https://${link}`)
  }

  handleScanPress = () => {
    goToScan(this.props.componentId)
  }

  renderItem = ({ item }: RenderItemArgs) => {
    const { theme } = this.props.store.settings
    const themedStyle = themedStyles(theme)
    return (
      <View style={themedStyle.item}>
        <Image
          source={{
            uri: item.logo
          }}
          style={styles.image}
          resizeMode={'contain'}
        />
        <View style={styles.info}>
          <View style={styles.infoItem}>
            <Text>{translate('general.application') + ': '}</Text>
            <TouchableOpacity
              onPress={this.handleLinkPress(item.domain)}
            >
              <Text
                style={themedStyle.link}
              >
                {item.domain}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.infoItem}>
            {translate('History.date') + ': '}
            {moment.unix(item.timestamp).format('DD.MM.YYYY hh:mm A')}
          </Text>
          <View style={styles.infoItem}>
            <Text>{translate('History.status') + ': '}</Text>
            <Text
              style={
                item.status == SignatureStatus.confirmed ? themedStyle.confirmed : themedStyle.rejected
              }
            >{translate(`History.${item.status}`)}</Text>
          </View>
        </View>
      </View>
    )
  }

  renderSeparator = () => {
    const { theme } = this.props.store.settings
    return (
      <View
        style={themedStyles(theme).separator}
      />
    )
  }

  renderListEmpty = () => {
    return (
      <View style={styles.listEmpty}>
        <Text>{translate('History.listEmpty')}</Text>
      </View>
    )
  }

  keyExtractor = (item: IHistoryData) => item.id.toString()

  render() {
    const { data } = this.props.store.history
    const { theme } = this.props.store.settings
    return (
      <Fragment>
        <StatusBar barStyle='dark-content' />
        <SafeAreaView>
          <View
            style={styles.body}
          >
            <TouchableOpacity
                style={styles.scanZone}
                onPress={this.handleScanPress}
            >
              <ScanIcon/>
              <Text style={styles.description}>{translate('History.description')}</Text>
            </TouchableOpacity>
            <FlatList
              style={styles.list}
              data={data}
              renderItem={this.renderItem}
              ItemSeparatorComponent={this.renderSeparator}
              keyExtractor={this.keyExtractor}
              ListEmptyComponent={this.renderListEmpty}
            />
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
    width: '100%',
  },
  list: {
    width: '100%'
  },
  info: {
    width: '85%'
  },
  infoItem: {
    paddingVertical: sizes.padding.tiny,
    flexDirection: 'row',
  },
  image: {
    width: sizes.images.logo,
    height: sizes.images.logo
  },

  scanZone: {
    backgroundColor: colors.default.white,
    height: "50%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    paddingLeft: 40,
    paddingRight: 40,
  },

  listEmpty: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  description: {
    fontSize: sizes.fonts.normal,
    color: colors.default.grey,
    paddingLeft: sizes.padding.small,
    paddingRight: sizes.padding.small,
    textAlign: "center"
  },
})

const themedStyles = (theme: Theme) => StyleSheet.create({
  item: {
    width: '100%',
    paddingVertical: sizes.padding.tiny,
    paddingHorizontal: sizes.padding.small,
    flexDirection: 'row',
  },
  separator: {
    height: sizes.borders.small,
    width: '100%',
    backgroundColor: colors[theme].itemSplitter
  },
  link: {
    color: colors[theme].blue,
    textDecorationLine: 'underline'
  },
  confirmed: {
    color: colors[theme].confirmed,
  },
  rejected: {
    color: colors[theme].rejected,
  }
})

export default inject('store')(observer(History))
