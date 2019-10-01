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
import {types as t} from "mobx-state-tree";
import {number} from "mobx-state-tree/dist/types/primitives";

import {reverse, sortBy, assign} from "lodash";

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
        <View style={themedStyle.verticalItem}>
            {
                item.hook.length ? <Text style={themedStyle.timeGroup} key={item.timestamp}>{item.hook}</Text> : <View/>
            }
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
        <Text style={styles.emptyListInfo}>{translate('History.listEmpty')}</Text>
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
      let dataSortedByTime: any = [];
      for (var i = 0; i < data.length; i++) {
          dataSortedByTime.push(assign({}, data[i]));
      }
      dataSortedByTime = reverse(sortBy(dataSortedByTime, ["timestamp"]));
      // const dataSortedByTime = reverse(sortBy(data, ["timestamp"]));

      const timeNow = Number(Date.now()) / 1000;
      let lastTime = "";
      const day = 60 * 60 * 24;
      for (var i = 0; i < data.length; i++) {
          if (Number(dataSortedByTime[i].timestamp) > timeNow - day) {
              dataSortedByTime[i].hook = translate("History.today");
          } else if (Number(dataSortedByTime[i].timestamp) > timeNow - 2 * day) {
              dataSortedByTime[i].hook = translate("History.yesterday");
          } else if (Number(dataSortedByTime[i].timestamp) > timeNow - 7 * day) {
              dataSortedByTime[i].hook = translate("History.week");
          } else if (Number(dataSortedByTime[i].timestamp) > timeNow - 31 * day) {
              dataSortedByTime[i].hook = translate("History.month");
          } else if (Number(dataSortedByTime[i].timestamp) > timeNow - 365 * day) {
              dataSortedByTime[i].hook = translate("History.year");
          } else {
              dataSortedByTime[i].hook = translate("History.all");
          }
          if (lastTime === dataSortedByTime[i].hook) {
              dataSortedByTime[i].hook = "";
          } else {
              lastTime = dataSortedByTime[i].hook;
          }
      }

    return (
        <SideMenu menu={sideBar}
                  isOpen={this.state.isOpenSideBar}
                  menuPosition={"right"}
                  componentId={this.props.componentId}
                  onChange={(isOpen: boolean) => this.onChangeSideBarState(isOpen)}
        >
          <Fragment>
            <StatusBar barStyle='light-content' />
            <SafeAreaView>
              <View
                style={styles.body}
              >
                  <View style={styles.scanZoneBackground}>
                      <TouchableOpacity
                          style={styles.scanZone}
                          onPress={this.handleScanPress}
                      >
                          <ScanIcon styles={styles.scanIcon}/>
                          <Text style={styles.description}>{translate('History.description')}</Text>
                      </TouchableOpacity>
                  </View>
                <FlatList
                  style={styles.list}
                  data={dataSortedByTime}
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
    borderRadius: 40,
      alignSelf: "center"
  },

  scanIcon: {
    width: normalize(111),
    height: normalize(111),
    padding: sizes.padding.normal
  },

  scanZoneBackground: {
    backgroundColor: colors.default.white,
    height: normalize(220),
    width: "100%",
  },

  scanZone: {
    backgroundColor: colors.default.white,
    height: "100%",
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

  emptyListInfo: {
    marginTop: normalize(100),
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
  },
    timeGroup: {
        paddingVertical: sizes.padding.small,
        paddingHorizontal: sizes.padding.small,
        color: colors[theme].lightGrey,
    },
    verticalItem: {
        flexDirection: 'column',
    },
});

export default inject('store')(observer(History))
