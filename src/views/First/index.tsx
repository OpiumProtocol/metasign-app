import React, { Fragment } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native'
import { inject, observer } from 'mobx-react'

// Components
import Button from '../../components/Button'

// Utils
import { goToExistingUser, goToNewUser } from '../../utils/navigation'
import { ViewProps } from '../../utils/views'

// Constants
import { translate } from '../../constants/i18n'
import { colors, Theme } from '../../constants/colors'
import { sizes } from '../../constants/sizes'

// @ts-ignore
import Logo from '../../assets/images/Logo.svg';
import {normalize} from "../../utils/size";

const createButton = StyleSheet.create({
  button: {
    backgroundColor: colors['default'].white,
    borderRadius: normalize(10),
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

const importButton = StyleSheet.create({
  button: {
    backgroundColor: colors.light.blue,
    borderRadius: normalize(10),
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

class First extends React.Component<ViewProps> {
  handleNewUser = async () => {
    goToNewUser(this.props.componentId)
  }

  handleExistingUser = () => {
    goToExistingUser(this.props.componentId)
  }

  render() {
    const { theme } = this.props.store.settings
    return (
      <Fragment>
        <StatusBar barStyle='dark-content' />
        <SafeAreaView>
          <View
            style={styles.body}
          >
            <View style={styles.bodyUpsideBackground}>
              <Logo/>

              <Text style={styles.labelNewUser}>{translate('First.labelNewUser')}</Text>
              <Button
                  text={translate('First.iAmNew')}
                  onPress={this.handleNewUser}
                  customStyle={createButton}
              />

            </View>
            <View style={styles.bodyDownsideBackground}>
              <Text style={styles.labelOldUser}>{translate('First.labelOldUser')}</Text>

              <Button
                  text={translate('general.importAccount')}
                  onPress={this.handleExistingUser}
                  customStyle={importButton}
              />

              <Text style={styles.copyright}>
                {translate('First.copyright')}
              </Text>
            </View>

          </View>
        </SafeAreaView>
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%'
  },
  h1: {
    fontSize: sizes.fonts.h1,
    marginTop: sizes.margin.huge,
  },
  widthed: {
    width: '90%',
    alignItems: 'center'
  },
  labelNewUser: {
    marginBottom: sizes.margin.small,
    fontSize: sizes.fonts.normal,
    color: colors['default'].white,
    textAlign: "center",
    marginLeft: -30,
    marginRight: -30,
  },
  labelOldUser: {
    marginBottom: sizes.margin.small,
    fontSize: sizes.fonts.normal,
    color: colors['default'].grey,
    textAlign: "center",
  },
  copyright: {
    fontSize: sizes.fonts.small,
    color: colors['default'].lightGrey,
    textAlign: "center",
  },

  bodyUpsideBackground: {
    backgroundColor: colors.light.blue,
    height: "50%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    paddingLeft: 40,
    paddingRight: 40,
  },
  bodyDownsideBackground: {
    backgroundColor: colors['default'].white,
    height: "50%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingLeft: 40,
    paddingRight: 40,
  },

});

export default inject('store')(observer(First))
