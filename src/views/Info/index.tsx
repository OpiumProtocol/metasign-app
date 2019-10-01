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
import { ViewProps } from '../../utils/views'

// Constants
import { translate } from '../../constants/i18n'
import { colors, Theme } from '../../constants/colors'
import { sizes } from '../../constants/sizes'

// Stores
import { IHistoryData } from '../../stores/history/models/HistoryData'
import SeedPhrase from '../../components/SeedPhrase'

interface ProtocolDataProps {
  data: IHistoryData
}

class Info extends React.Component<ViewProps & ProtocolDataProps> {
  state = {
    activeSections: []
  };

  _renderHeader = (content: any, index: number, isActive: boolean) =>(<View style={styles.header}>
    <Text style={styles.headerText}>{content.header}</Text>
    {
      isActive ?
          <CollapseIcon style={styles.collapseIndicator}/>
          :
          <ExpandIcon style={styles.collapseIndicator}/>
    }
  </View>);

  _renderContent = (content: any) => <View style={styles.content}>{content.content}</View>;

  _renderSectionTitle = () => <View/>;

  _updateSections = (activeSections: Array<any>) => {
    this.setState({ activeSections })
  };

  render() {
    const SECTIONS = [
      {
        header: translate('Info.section1'),
        content: (
            <SeedPhrase
                customStyle={styles.answer}
                seed={translate('Info.content1')}
            />
        )
      },
      {
        header: translate('Info.section2'),
        content: (
            <SeedPhrase
                customStyle={styles.answer}
                seed={translate('Info.content2')}
            />
        )
      },
      {
        header: translate('Info.section3'),
        content: (
            <SeedPhrase
                customStyle={styles.answer}
                seed={translate('Info.content3')}
            />
        )
      },
    ];

    return (
      <Fragment>
        <StatusBar barStyle='light-content' />
        <SafeAreaView>
          <View style={styles.container}>
            <ScrollView
              style={styles.body}
            >
              <Text style={styles.explanation}>{translate('Info.description')}</Text>
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
    width: '100%',
    backgroundColor: colors.default.white,
  },
  explanation: {
    fontSize: sizes.fonts.small,
    fontWeight: "bold",
    textAlign: 'left',
    marginVertical: sizes.margin.normal,
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
  },
  answer: {
    color: colors.default.grey,
    backgroundColor: colors.default.white,
    fontSize: sizes.fonts.small,
    height: "auto",
    borderWidth: 0,
    flex: 1,
    flexWrap: 'wrap',
  },
});

export default inject('store')(observer(Info))
