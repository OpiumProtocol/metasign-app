import React, { Fragment } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native'
import { Navigation } from 'react-native-navigation'
import { inject, observer } from 'mobx-react'

// Components
import Button from '../../components/Button'

// Utils
import { goToExistingUser, goToHistory } from '../../utils/navigation'
import { ViewProps } from '../../utils/views'
import gaba from '../../utils/gaba'

// Constants
import { translate } from '../../constants/i18n'
import { colors } from '../../constants/colors'
import * as Screens from '../../constants/screenIds'
import { sizes } from '../../constants/sizes'

class First extends React.Component<ViewProps> {
  handleNewUser = async () => {
    await gaba.createVault()
    goToHistory()
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

            <View>
              <Text style={styles.label}>{translate('First.labelNewUser')}</Text>
              <Button
                text={translate('First.iAmNew')}
                background={colors[theme].blue}
                onPress={this.handleNewUser}
              />
            </View>

            <View>
              <Text style={styles.label}>{translate('First.labelOldUser')}</Text>
              <Button
                text={translate('general.importAccount')}
                background={colors[theme].green}
                onPress={this.handleExistingUser}
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
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: '100%'
  },
  h1: {
    fontSize: sizes.fonts.h1
  },
  label: {
    marginBottom: sizes.margin.small
  }
})

export default inject('store')(observer(First))
