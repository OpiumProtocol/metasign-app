import React, { Fragment } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Vibration,
  Button,
  Text,
} from 'react-native'
import { inject, observer } from 'mobx-react'
import { RNCamera } from 'react-native-camera'
import isURL from 'validator/lib/isURL'

// Utils
import { goToConfirmation } from '../../utils/navigation'
import { ViewProps } from '../../utils/views'


interface BarCodeEvent {
  data: string,
  rawData?: any,
  type: any,
  bounds: any
}

class Scan extends React.Component<ViewProps> {
  state = {
    isProcessing: false
  }

  setProcessing = (isProcessing: boolean) => {
    this.setState({
      isProcessing
    })
  }

  handleBarCodeRead = (event: BarCodeEvent) => {
    if (!isURL(event.data)) {
      return
    }

    const { isProcessing } = this.state
    if (isProcessing) {
      return
    }

    this.setProcessing(true)
    Vibration.vibrate(250)
    fetch(event.data)
      .then(res => res.json())
      .then(data => goToConfirmation(this.props.componentId, data))
      .catch((e) => {
        this.setProcessing(false)
      })
  }

  getRandom = () => {
    this.handleBarCodeRead({
      data: `https://metastamp-be.herokuapp.com/${Date.now()%4}`,
      type: '',
      bounds: '',
    })
  }

  render() {
    const { theme } = this.props.store.settings
    return (
      <Fragment>
        <StatusBar barStyle='dark-content' />
        <SafeAreaView>
          <RNCamera
            style={styles.camera}
            captureAudio={false}
            onBarCodeRead={this.handleBarCodeRead}
          >
            <Button title={"get random"} onPress={this.getRandom}>
              <Text>get random</Text>
            </Button>
          </RNCamera>
        </SafeAreaView>
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  camera: {
    width: '100%',
    height: '100%'
  }
})

export default inject('store')(observer(Scan))
