import React, { Component } from 'react';
import { StyleSheet, Platform, TextInput, Text, View, Image, ScrollView, TouchableHighlight, Alert, TouchableNativeFeedback } from 'react-native';
import { STATUS_BAR_HEIGHT } from '../constants';
import { StackNavigator } from 'react-navigation';
import Swiper from '../components/TxSwiper';
import { connect } from "react-redux";
import styles from '../assets/styles';



class TransSwiper extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        let headerStyles = StyleSheet.create({
            header__container: {
              // borderColor: "green",
              // borderWidth: 3,
              display: "flex",
            //   resizeMode: "contain",
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
            ),
            // headerTitleStyle: {
            //   height: 50,
            //   width: 200,
            //   alignSelf: "center",
            //   justifyContent: "center",
            //   flexDirection: "row",
            //   marginLeft: 20
            // }
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            transactions: Object.values(this.props.asset.transactions) || ["Data Loading","Please Be Patient"]
        }
    }
    componentDidMount() {
        // console.log(this.props.transactions, 'Swiper Here');
       
    }
    // _renderCards() {
    //     if(this.props.asset.hasOwnProperty('transactions')){
    //         this.setState({
    //             transactions: Object.values(this.props.assets.transactions)
    //         })
    //     }
    //     this.setState({
    //         transactions: ["Data Loading","Please Be Patient"]
    //     })
    // }


    render() {
    

        return (
         
                <Swiper hercId={this.props.asset.hercId} cards={this.state.transactions} />
         
        )
    }

}

const mapStateToProps = (state) => ({
    asset: state.AssetReducers.selectedAsset
})

export default connect(mapStateToProps)(TransSwiper);

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
        fontWeight: "normal",
        color: "black",
        textAlign: "center"
    },
    createButton: {
        width: 150,
        height: 50,
        borderColor: "#f3c736",
        borderWidth: 1,


        // resizeMode: "contain"
    },
    imageButtons: {
        height: 40,
        width: 175,
        // resizeMode: "contain",
        alignSelf: "center",
        margin: 7

    },
})