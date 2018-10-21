import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableHighlight } from 'react-native';
import { STATUS_BAR_HEIGHT } from '../constants';
import styles from "../assets/styles";
import originator from "../components/buttons/originatorButton.png";
import recipient from "../components/buttons/recipientButton.png";
import { StackNavigator, } from 'react-navigation';
import { connect } from "react-redux";
import { addProps } from "../actions/AssetActions";
import review from "../components/buttons/reviewBtn.png";

class InputMan extends Component {

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
                            <TouchableHighlight style={{ justifyContent: "center" }} onPress={() => navigation.navigate("MenuOptions")}>
                                <Image
                                    style={headerStyles.assetHeaderLogo}
                                    source={{ uri: params.logo }}
                                />
                            </TouchableHighlight>
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
        this.state = {};
    }
    componentDidMount() {
      console.log('inside InputMan.js')
    }

    _onSubmit = () => {
        const { navigate } = this.props.navigation;
        let attributes = this.state;
        console.log(this.state, "stateInputesfilled?");
        this.props.addProps(attributes);
        console.log("justaddedPRoperties");
        navigate('Confirm', { logo: this.props.logo, name: this.props.name });
    }
    render() {

        let locationImage = this.props.location === 'originator' ? originator : recipient;
        let logo = this.props.logo;

        let list = Object.keys(this.props.coreProps).map((propName, idx) => {
            let name = propName;
            return (

                <View key={idx} style={localStyles.assetMetricInputField}>
                    <Text style={localStyles.text}>{name}</Text>
                    <TextInput
                        style={localStyles.input}
                        onChangeText={text => this.setState({ [propName]: text })}
                        placeholder={name}
                    />
                </View>

            )

        })

        return (
            <View style={styles.container}>
                <View style={[styles.containerCenter, { paddingRight: 5 }]}>
                    <ScrollView style={{ alignSelf: "center", width: "100%" }}>


                        <Image style={localStyles.assetLocationSmall} source={locationImage} />


                        {list}

                        <TouchableHighlight style={{ marginTop: 15 }} onPress={() => this._onSubmit()}>
                            <Image style={localStyles.nextButtonContainer} source={review} />
                        </TouchableHighlight>

                    </ScrollView>
                </View>
            </View>)
    }
}

const mapStateToProps = (state) => ({
    name: state.AssetReducers.selectedAsset.Name,
    logo: state.AssetReducers.selectedAsset.Logo,
    location: state.AssetReducers.trans.header.tXLocation,
    coreProps: state.AssetReducers.selectedAsset.ipfsDef.CoreProps,
});

const mapDispatchToProps = (dispatch) => ({
    addProps: (attributes) =>
        dispatch(addProps(attributes),
        )
})
export default connect(mapStateToProps, mapDispatchToProps)(InputMan);


const localStyles = StyleSheet.create({

    assetLocationSmall: {
        height: 30,
        width: 150,
        resizeMode: "contain",
        marginTop: 10,
        alignSelf: "center"
        // marginRight: 10
    },
    assetHeaderLogo: {
        height: 35,
        width: 35,
        borderRadius: 35 / 2,
        resizeMode: "contain",

    },
    headerTitle: {
        fontFamily: "dinPro",
        height: 33,
        fontSize: 20,
        alignSelf: "center",
        fontWeight: "bold",
        color: "black",
        textAlign: "center"
    },
    assetMetricInputField: {
        height: 40,
        flexDirection: "row",
        width: "100%",
        borderColor: "blue",
        justifyContent: "space-between",
        margin: 5,
        marginTop: 10,
        marginBottom: 10

    },
    text: {
        color: "white",
        alignSelf: "center",
        fontSize: 16,
        fontWeight: "normal",
        margin: 5,
        fontFamily: "dinPro"
    },
    input: {
        width: "53%",
        height: 36,
        textAlign: "center",
        backgroundColor: "#ffffff",

        // margin: .5,
        fontSize: 15,
        fontWeight: "200",
        borderColor: "blue",
        color: "black",
        borderWidth: 1,
        alignSelf: "center",
        borderRadius: 3
    },

    nextButtonContainer: {
        height: 40,
        width: 150,
        alignSelf: "center",
        resizeMode: "contain"
    }
})
