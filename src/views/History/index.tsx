import React, {Fragment} from 'react'
import {
  Button,
  FlatList,
  Image,
  Linking,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {Navigation} from 'react-native-navigation'
import {inject, observer} from 'mobx-react'
import moment from 'moment'
// Utils
import {ViewProps} from '../../utils/views'
import {goToFirstScreen, goToScan} from '../../utils/navigation'
// Assets
// @ts-ignore
import ScanIcon from '../../assets/images/scan.svg'
// Constants
import {translate} from '../../constants/i18n'
import {colors, Theme} from '../../constants/colors'
import {sizes} from '../../constants/sizes'
// Models
import {IHistoryData} from '../../stores/history/models/HistoryData'
import {SignatureStatus} from '../../constants/statuses'
import {normalize} from "../../utils/size";
// @ts-ignore
import SideMenu from 'react-native-side-menu';
import SideBar from "../../components/SideBar";
import ee from "../../utils/events";

interface RenderItemArgs {
  item: IHistoryData,
}

class History extends React.Component<ViewProps, {
  isOpenSideBar: boolean
}> {

  constructor(props: ViewProps) {
    super(props);

    this.state = {
      isOpenSideBar: false
    };

    ee.addListener("open-menu", this.openSideBar);
    ee.addListener("logout", this.logout);
  }

  logout = () => {
    // Make good logout
    this.props.store.settings.setLoggedIn(false);
    goToFirstScreen();
  };

  closeSideBar = () => {
    this.setState({
      isOpenSideBar: false
    });
  };

  openSideBar = () => {
    this.setState({
      isOpenSideBar: true
    });
  };

  onChangeSideBarState = (isOpen: boolean) => {
    this.setState({
      isOpenSideBar: isOpen
    });
  };

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
      <View style={themedStyle.item} key={item.timestamp}>
        <Image
          source={{
            uri: item.logo
          }}
          style={styles.image}
          resizeMode={'contain'}
        />
        <View style={styles.info}>
          <View style={styles.infoItem}>
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
            {moment.unix(item.timestamp).format('DD MMMM, YYYY HH:mm')}
          </Text>
        </View>
          <View style={styles.status}>
              <Text
                  style={
                      item.status == SignatureStatus.confirmed ? themedStyle.confirmed : themedStyle.rejected
                  }
              >{translate(`History.${item.status}`)}</Text>
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
    const sideBar = (
        <SideBar componentId={this.props.componentId}
                 onCloseSideBar={() => {
                   this.closeSideBar()
                 }
                 }
        />
    );
    return (
        <SideMenu menu={sideBar}
                  isOpen={this.state.isOpenSideBar}
                  menuPosition={"right"}
                  onChange={(isOpen: boolean) => this.onChangeSideBarState(isOpen)}
        >
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
                  <ScanIcon styles={styles.scanIcon}/>
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
        </SideMenu>
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
    width: '100%',
      backgroundColor: colors.light.pageContentBackground,
      borderColor: colors.light.pageContentBorder,
  },
  info: {
      flexGrow: 1,
  },
  status: {
      textAlign: "right",
      alignSelf: "center",
      paddingRight: sizes.padding.small
  },
  infoItem: {
      paddingLeft: sizes.padding.normal,
    paddingVertical: sizes.padding.tiny,
    flexDirection: 'row',
      justifyContent: "space-between",
    color: colors.default.lightGrey,
  },
  image: {
    width: sizes.images.logo,
    height: sizes.images.logo,
      alignSelf: "center"
  },

  scanIcon: {
    width: normalize(111),
    height: normalize(111),
    padding: sizes.padding.normal
  },

  scanZone: {
    backgroundColor: colors.default.white,
    height: normalize(220),
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: sizes.padding.normal,
  },

  listEmpty: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  description: {
    fontSize: sizes.fonts.normal,
    color: colors.default.black,
    paddingLeft: sizes.padding.small,
    paddingRight: sizes.padding.small,
    textAlign: "center"
  },
})

const themedStyles = (theme: Theme) => StyleSheet.create({
  item: {
    width: '100%',
    paddingVertical: sizes.padding.small,
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
  },
  confirmed: {
    fontSize: sizes.fonts.small,
    color: colors[theme].confirmed,
  },
  rejected: {
    fontSize: sizes.fonts.small,
    color: colors[theme].rejected,
  }
})

export default inject('store')(observer(History))
