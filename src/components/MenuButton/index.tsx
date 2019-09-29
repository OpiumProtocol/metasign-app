import React from "react";
import {
    Image, TouchableOpacity,
} from 'react-native'

const menu = require("../../assets/images/menu.png");

export default class MenuButton extends React.Component {

    openMenu = () => {
        console.log("open menu");
    };

    render() {
        return <TouchableOpacity
            onPress={this.openMenu}
        >
            <Image
                source={menu}
                width={20}
                height={20}
                style={{width:20, height:20}}
            />
        </TouchableOpacity>;
    }
}
