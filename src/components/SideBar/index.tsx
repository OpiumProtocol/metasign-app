import React, {Component, Fragment} from "react";
import {View, StyleSheet, TouchableOpacity, Text, StatusBar} from "react-native";
import {translate} from "../../constants/i18n";
import {colors} from "../../constants/colors";
import {normalize} from "../../utils/size";
import {sizes} from "../../constants/sizes";
// @ts-ignore
import CloseMenuIcon from "../../assets/images/CloseMenu.svg";
import {goToInfo} from "../../utils/navigation";
import ee from "../../utils/events";
// @ts-ignore
import Dialog from "react-native-dialog";

export default class SideBar extends Component<{
    componentId: any,
    onCloseSideBar: Function,
}, {
    disclaimerVisible: boolean,
}> {

    constructor(props: any) {
        super(props);
        this.state = {
            disclaimerVisible: false,
        }
    }

    closeMenu = () => {
        this.props.onCloseSideBar();
    };

    closeApp = () => {
        this.closeMenu();
    };

    deregisterAccount = () => {
        this.showDisclaimer();
        this.closeMenu();
    };

    doDeregister = () => {
        ee.emit("logout");
    };

    showDisclaimer = () => {
        this.setState({
            disclaimerVisible: true,
        });
    };

    hideDisclaimer = () => {
        this.setState({
            disclaimerVisible: false,
        });
    };

    getInfo = () => {
        this.closeMenu();
        goToInfo(this.props.componentId);
    };

    getDisclaimer = () => {
        return (
            <View>
                <Dialog.Container visible={this.state.disclaimerVisible}>
                    <Dialog.Title/>
                    <View style={styles.dialogTitle}>
                        <Text style={styles.important}>
                            {translate('Disclaimer.title')}
                        </Text>
                        <TouchableOpacity
                            style={styles.dialogCloseButton}
                            onPress={this.hideDisclaimer}
                        >
                            <CloseMenuIcon width={normalize(30)} height={normalize(30)}/>
                        </TouchableOpacity>
                    </View>
                    <Dialog.Description>
                        <Text style={styles.dialogMessage}>
                            {translate('Disclaimer.message')}
                        </Text>
                    </Dialog.Description>
                    <Dialog.Button label={translate('Disclaimer.cancel')} onPress={this.hideDisclaimer} bold={true} />
                    <Dialog.Button label={translate('Disclaimer.accept')} onPress={this.doDeregister} />
                </Dialog.Container>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.sideBar}>
                <View style={styles.accountInfo}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={this.closeMenu}
                    >
                        <CloseMenuIcon width={normalize(30)} height={normalize(30)}/>
                    </TouchableOpacity>
                    <Text style={styles.accountDescription}>{translate('SideMenu.account')}</Text>
                    <Text style={styles.accountAddress}>{"GA57127881DFR57181028"}</Text>
                </View>

                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={this.closeApp}
                >
                    <Text style={styles.itemName}>{translate('SideMenu.closeApp')}</Text>
                    <Text style={styles.itemDescription}>{translate('SideMenu.closeAppDesc')}</Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={this.deregisterAccount}
                >
                    <Text style={styles.itemName}>{translate('SideMenu.deregisterAccount')}</Text>
                    <Text style={styles.itemDescription}>{translate('SideMenu.deregisterAccountDesc')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={this.getInfo}
                >
                    <Text style={styles.itemName}>{translate('SideMenu.info')}</Text>
                </TouchableOpacity>

                {this.getDisclaimer()}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    sideBar: {
        flex: 1,
        backgroundColor: colors.default.white,

    },
    accountInfo: {
        display: "flex",
        flexDirection: "column",
        height: normalize(150),
        backgroundColor: colors.light.pageContentBackground,
        borderColor: colors.light.pageContentBorder,
        justifyContent: "space-around",
        padding: sizes.padding.normal,
    },
    accountAddress: {
        fontSize: sizes.fonts.normal,
        color: colors.light.grey,
    },
    accountDescription: {
        fontSize: sizes.fonts.normal,
        color: colors.default.black,
    },

    menuItem: {
        backgroundColor: colors.default.white,
        borderColor: colors.light.pageContentBorder,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        padding: sizes.padding.normal,
        borderWidth: 1,
    },

    itemName: {
        fontSize: sizes.fonts.normal,
        color: colors.light.blue,
    },
    itemDescription: {
        fontSize: sizes.fonts.small,
        color: colors.light.lightGrey,
    },

    important: {
        fontSize: sizes.fonts.small,
        color: colors.light.rejected,
    },
    dialogTitle: {
        position: "absolute",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: sizes.padding.normal,
    },
    dialogMessage: {
        color: colors.default.grey,
        padding: sizes.padding.small,
        fontSize: sizes.fonts.small,
        textAlign: "left",
    },
    dialogCloseButton: {
        alignSelf: "center",
    },
    closeButton: {
        marginLeft: -5,
    },
});
