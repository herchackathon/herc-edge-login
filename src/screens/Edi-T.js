import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableHighlight, Image, Picker, ScrollView } from 'react-native';
import { connect } from "react-redux";
import { StackNavigator } from 'react-navigation';
import { STATUS_BAR_HEIGHT } from '../constants';
import styles from '../assets/styles';
import edits from '../reducers/Edi-T-Sets';
import { setSet } from '../actions/AssetActions';


class EditSets extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
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

        return {
            headerTitle: (
                <View style={headerStyles.header__container}>
                    <View style={headerStyles.header__container__centeredBox}>
                        <View style={headerStyles.header__image__box}>
                            {/* <TouchableHighlight style={{justifyContent: "center"}} onPress={() => navigation.navigate("MenuOptions")}>
                     </TouchableHighlight> */}
                            <Image
                                style={headerStyles.assetHeaderLogo}
                                source={{ uri: params.logo }}
                            />
                        </View>
                        <View style={headerStyles.header__text__box}>
                            <Text style={headerStyles.headerText}>{params.name}</Text>
                        </View>
                    </View>
                </View>
            )
        }
    }
    constructor(props) {
        super(props);
        state = {};
    }
    _setEdit = (item) => {

        console.log(item);
        this.props.setSet(item);

        this.props.navigation.navigate('Splash3', { logo: this.props.logo, name: this.props.name });

    }


    render() {
        console.log(edits)
        let arrayOfSets = edits.map((item, idx) => {
            return (
                <TouchableHighlight style={{ justifyContent: "center" }} key={idx} onPress={() => this._setEdit(item)}>
                    <View style={localStyles.editField}>
                        <Text style={localStyles.editName}>{item.name.trim()}</Text>
                        <Text style={localStyles.editName}>{item.value}</Text>

                    </View>
                </TouchableHighlight>
            )
        });
        return (
            <View style={styles.container}>
                <View style={[styles.containerCenter, { paddingTop: 20 }]}>
                    <ScrollView style={{ alignSelf: "center", width: "100%", paddingRight: 7 }}>
<Text style={localStyles.editLabel}>EDI-T Sets</Text>
                        {arrayOfSets}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    name: state.AssetReducers.selectedAsset.Name,
    logo: state.AssetReducers.selectedAsset.Logo
});

const mapDispatchToProps = (dispatch) => ({
    setSet: (item) => dispatch(setSet(item))

});

export default connect(mapStateToProps, mapDispatchToProps)(EditSets);

const localStyles = StyleSheet.create({

    headerField: {
        flexDirection: "row",
        width: 200,
        justifyContent: "space-around",
        alignItems: "center"
    },
    hercLogoHeader: {
        height: 45,
        width: 45,
        borderRadius: 45 / 2,
        resizeMode: "contain",
        alignSelf: "center",
        marginBottom: 3,
    },
    registerHeaderText: {
        fontFamily: "dinPro",
        height: 50,
        fontSize: 30,
        alignSelf: "center",
        fontWeight: "bold",
        color: "black",
        textAlign: "center"
    },
    editLabel: {
        fontFamily: "dinPro",
        fontSize: 21,
        color: "yellow",
        margin: 5,
        alignSelf: "center",
        // height: 30
    },
    editTouch: {
        height: 85,
        margin: 5,
        width: "75%"
    },
    editField: {
        height: 50,
        width: "75%",
        // flexDirection: "row",
        justifyContent: "center",
        padding: 3,
        margin: 5,
        alignSelf: "center",
        // textAlign:'center',
        // textAlignVertical: 'center',
        backgroundColor: "#ffffff"
    },
    editName: {
        fontFamily: "dinPro",
        fontSize: 18,
        color: "black",
        margin: 2,
        alignSelf: "center",
        height: 20,
        justifyContent: "center",
        textAlign: "center"
    },

})