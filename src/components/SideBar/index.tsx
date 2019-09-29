import React, {Component} from "react";
import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import Button from "../Button";
import {translate} from "../../constants/i18n";
import {colors} from "../../constants/colors";
import {normalize} from "../../utils/size";
import {sizes} from "../../constants/sizes";
// @ts-ignore
import CloseMenuIcon from "../../assets/images/CloseMenu.svg";
import {goToFirstScreen} from "../../utils/navigation";
import ee from "../../utils/events";

const menuButton = StyleSheet.create({
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

export default class SideBar extends Component<{
    componentId: any,
    onCloseSideBar: Function,
}, {}> {

    closeMenu = () => {
        this.props.onCloseSideBar();
    };

    closeApp = () => {
        this.props.onCloseSideBar();
    };

    deregisterAccount = () => {
        this.props.onCloseSideBar();
        ee.emit("logout");
    };

    getInfo = () => {

    };

    handleAddProfile = async () => {
        this.props.onCloseSideBar();
    };

    render() {
        return (
            <View style={styles.sideBar}>

                <View style={styles.accountInfo}>
                    <TouchableOpacity
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
});
