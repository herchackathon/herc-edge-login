import {
    Image,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from "react-native";
import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import backArrow from "../assets/icon_backarrow.png";

import Anthem from "../screens/Anthem";
import BlockScanner from "../screens/BlockScanner";
import Camera from "../screens/Camera";
import Confirm from "../screens/Confirm";
import Create from "../screens/Create";
import Digi from "../screens/DigiViewer";
import DocUp from "../screens/DocUp";
import EdiT from "../screens/Edi-T";
import FileUp from "../screens/FileUp";
import Hipr from "../screens/Hipr";
import HiprAssets from "../screens/HiprAssets";
import IdologyForm from "../screens/IdologyForm";
import IdologyQuestions from "../screens/IdologyQuestions";
import InputMan from "../screens/InputMan";
import Login from "../screens/Login";
import MenuOptions from "../screens/MenuOptions";
import NewAssetConfirm from "../screens/NewAssetConfirm";
import PreDigi from "../screens/PreDigiView";
import PreHipr from "../screens/PreHIPR";
import SpaceScreen from "../screens/SpaceScreen";
import Splash1 from "../screens/Splash1";
import Splash2 from "../screens/Splash2";
import Splash3 from "../screens/Splash3";
import Tee from "../screens/Tee";
import TransAssetList from "../screens/TransAssetList";
import TransSwiper from "../screens/TransSwiper";
import Wallet from "../screens/Wallet";
import Settings from "../screens/Settings";
import roundImage from "../assets/round.png"
import QRCapture from "../screens/QRCapture";
import QRCapture2 from "../screens/QRCapture2";
import styles from "../assets/styles";
import DrawerIcon from "../assets/icons/drawerIcon.png";


let headerStyles = StyleSheet.create({
    header__container: {
        // borderColor: "green",
        // borderWidth: 3,
        display: "flex",
        // resizeMode: "contain",
        height: 80,
        alignSelf: "center",
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        marginTop: 40,
        paddingBottom: 20

    },
    header__container__centeredBox: {
        // borderColor: "purple",
        // borderWidth: 3,
        height: "100%",
        alignItems: "center",
        flexDirection: 'row'
    },
    header__text__box: {
        // borderColor: "blue",
        // borderWidth: 3,
        height: "100%",
        marginBottom: 5,
        marginLeft: 12,

    },
    header__image__box: {
        // borderColor: "yellow",
        // borderWidth: 3,
        height: "100%",
        borderRadius: 100
        // width: 50
    },
    assetHeaderLogo: {
        height: 35,
        width: 35,
        borderRadius: 50,
        // resizeMode: "contain",
    },
    headerText: {
        fontFamily: "dinPro",
        fontSize: 26,
        alignSelf: "center",
        fontWeight: "normal",
        color: "black",
        textAlign: "center",
        marginTop: 2,
        // paddingTop: 5
    },
})


const MainNavigator = StackNavigator({ //this will be "createStackNavigator" after upgrading react-navigation
    Login: { screen: Login },
    MenuOptions: { screen: MenuOptions },
    Identity: { screen: IdologyForm },
    IdologyQuestions: { screen: IdologyQuestions },
    Create: { screen: Create },
    Tee: { screen: Tee },
    Digi: { screen: Digi },
    Anthem: { screen: Anthem },
    PreHipr: { screen: PreHipr },
    HiprAssets: { screen: HiprAssets },
    Hipr: { screen: Hipr },
    BlockScanner: { screen: BlockScanner },
    TransSwiper: { screen: TransSwiper },
    TransAssetList: { screen: TransAssetList },
    Splash1: { screen: Splash1 },
    Splash2: { screen: Splash2 },
    Splash3: { screen: Splash3 },
    InputMan: { screen: InputMan },
    FileUp: { screen: FileUp },
    DocUp: { screen: DocUp },
    Confirm: { screen: Confirm },
    NewAssetConfirm: { screen: NewAssetConfirm },
    EdiT: { screen: EdiT },
    PreDigi: { screen: PreDigi },
    SpaceScreen: { screen: SpaceScreen },
    QRCapture: { screen: QRCapture },
    QRCapture2: { screen: QRCapture2 },
    Wallet: { screen: Wallet },
    Settings: { screen: Settings },
    Camera: { screen: Camera }

}, {
        initialRouteName: 'Login',
        navigationOptions: ({ navigation }) => ({

            headerTitle:
                <View style={headerStyles.header__container}>
                    <View style={headerStyles.header__container__centeredBox}>
                        <View style={headerStyles.header__image__box}>
                            {/* <TouchableHighlight style={{justifyContent: "center"}} onPress={() => navigation.navigate("MenuOptions")}>
                            </TouchableHighlight> */}
                            <Image
                                style={headerStyles.assetHeaderLogo}
                                source={roundImage}
                            />
                        </View>
                        <View style={headerStyles.header__text__box}>
                            <Text style={headerStyles.headerText}>Main Options </Text>
                        </View>
                    </View>
                </View>,

            headerStyle: {
                height: Platform.OS === 'android' ? 60 : 100,
                backgroundColor: 'white',

            },
            headerTitleStyle: {
                marginTop: Platform.OS === 'android' ? 20 : 0,
                textAlign: 'center',
                textAlignVertical: 'center',
                backgroundColor: 'white',
                alignSelf: 'center',

            },
            headerRight: <TouchableHighlight onPress={() => navigation.navigate("Settings")}>
            <Image source={DrawerIcon} style={styles.drawerIcon} />
          </TouchableHighlight>
          ,
            headerLeft: <TouchableHighlight onPress={() => navigation.goBack()}>
                <Image source={backArrow} style={styles.backArrow} />
            </TouchableHighlight>

        })
    })

export default MainNavigator;
