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
            <Text style={styles.h1} >{translate('First.welcome')}</Text>

            <View style={styles.widthed}>
              <Text style={styles.label}>{translate('First.labelNewUser')}</Text>
              <Button
                text={translate('First.iAmNew')}
                background={colors[theme].blue}
                onPress={this.handleNewUser}
              />
            </View>

            <View style={styles.widthed}>
              <Text style={styles.label}>{translate('First.labelOldUser')}</Text>
              <TouchableOpacity
                onPress={this.handleExistingUser}
              >
                <Text style={styles.link}>
                  {translate('general.importAccount')}
                </Text>
              </TouchableOpacity>
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
  label: {
    marginBottom: sizes.margin.small,
    fontSize: sizes.fonts.normal
  },
  link: {
    fontSize: sizes.fonts.h3,
    color: colors['light'].blue,
    textDecorationLine: 'underline'
  }
})

export default inject('store')(observer(First))
