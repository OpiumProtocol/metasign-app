import React, { Fragment } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Vibration,
  Button,
  Text, TouchableOpacity, Image,
} from 'react-native'
import { inject, observer } from 'mobx-react'
import { RNCamera } from 'react-native-camera'
import isURL from 'validator/lib/isURL'
// @ts-ignore
// import Subtract from "../../assets/images/Subtract.svg";
const Subtract = require("../../assets/images/Subtract.png");

// Utils
import {goToConfirmation, goToInfo} from '../../utils/navigation'
import { ViewProps } from '../../utils/views'
import {colors} from "../../constants/colors";
import {translate} from "../../constants/i18n";
import {sizes} from "../../constants/sizes";


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
  };

  getRandom = () => {
    this.handleBarCodeRead({
      data: `https://metastamp-be.herokuapp.com/${Date.now()%4}`,
      type: '',
      bounds: '',
    })
  };

  getInfo = () => {
    goToInfo(this.props.componentId);
  };

  render() {
    return (
      <Fragment>
        <StatusBar barStyle='light-content' />
        <SafeAreaView>
          <RNCamera
            style={styles.camera}
            captureAudio={false}
            onBarCodeRead={this.handleBarCodeRead}
          >
            {/*<Button title={"get random"} onPress={this.getRandom}>*/}
            {/*  <Text>{translate('Scan.info')}</Text>*/}
            {/*</Button>*/}
            {/*<Subtract style={styles.subtract} width={"100%"} height={"100%"}*/}
            {/*          preserveAspectRatio="xMidYMid slice"*/}
            {/*>*/}
            <Image source={Subtract} style={styles.subtract}/>
            <Text style={styles.description}>{translate('Scan.description')}</Text>

            <TouchableOpacity
                style={styles.moreInfo}
                onPress={this.getInfo}
            >
              <Text style={styles.moreInfoText}>{translate('Scan.info')}</Text>
            </TouchableOpacity>
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
  },

  description: {
    position: "absolute",
    top: "60%",
    color: colors.default.white,
    fontSize: sizes.fonts.h1,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
  },

  moreInfo: {
    position: "absolute",
    top: "70%",
    width: "100%",
    textAlign: "center",
  },
  moreInfoText: {
    position: "absolute",
    color: colors.light.link,
    fontSize: sizes.fonts.h3,
    width: "100%",
    textAlign: "center",
  },

  subtract: {
    width: "100%",
    height: "100%",
  }
});

export default inject('store')(observer(Scan))
