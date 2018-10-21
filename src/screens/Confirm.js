import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableHighlight, Alert } from 'react-native';
import { STATUS_BAR_HEIGHT } from '../constants';
import submit from "../components/buttons/submit.png";
import originator from "../components/buttons/originatorButton.png";
import recipient from "../components/buttons/recipientButton.png";
import { StackNavigator } from 'react-navigation';
import { connect } from "react-redux";
import styles from "../assets/styles";
import fee from "../assets/hercLogoPillar.png";
{/* <Image style={styles.assetFee} source={fee} /> */ }



class Confirm extends Component {

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
            fontWeight: "bold",
            color: "black",
            textAlign: "center",
            marginTop: 2,
            // paddingTop: 5
        },
    })

    return {
        // headerStyle: {
        //     padding: 0,
        //     marginTop: -20,
        // },
        // headerTitleStyle:
        // {
        //     justifyContent: "space-around",

        // },
        headerTitle: (
            // <View style={localStyles.headerField}>
            //     <Image
            //         style={localStyles.hercLogoHeader}
            //         source={{ uri: params.logo }}
            //     />
            //     <Text style={localStyles.registerHeaderText}>{params.name}</Text>
            // </View>

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

  }
  state = {};


  componentDidMount() {
    console.log(this.props.newProps, 'thisnewtransinfo')
    // console.log(this.props, 'props')


  }

  render() {
    // let price = this.state.fctPrice;
    const { navigate } = this.props.navigation;
    console.log(this.props.newProps, "txNewProps")

    let locationImage = this.props.location === 'originator' ? originator : recipient;
    let logo = this.props.logo;
    // console.log(this.props.Assets);

    let list = this.props.newProps
      ?
      Object.keys(this.props.newProps).map((propName, idx) => {
        let name = propName;
        return (

          <View key={idx} style={localStyles.assetMetricInputField}>
            <Text style={localStyles.text}>{name}</Text>
            <Text style={localStyles.propVal}>{this.props.newProps[name]}</Text>
          </View>
        )
      })
      :
      "No Props"
      ;

    return (
      <View style={styles.container}>
        <View style={styles.containerCenter}>
          <Image style={localStyles.assetLocationLabel} source={locationImage} />
          <ScrollView style={{ alignSelf: "center", width: "100%", paddingRight: 10 }}>
            {list}
            <TouchableHighlight style={{alignSelf: "center"}} onPress={() => navigate('Splash3', { logo: this.props.logo, name: this.props.name })}>
              <Image style={styles.menuButton} source={submit} />
            </TouchableHighlight>
            {/* <View style={styles.assetFee}>
            <Image style={styles.assetFeeLabel} source={fee} />
            <Text style={styles.teePrice}>{price}</Text>
          </View> */}
          </ScrollView>
        </View>
      </View>




    )
  }
}


const mapStateToProps = (state) => ({
  newProps: state.AssetReducers.trans.data.properties,
  location: state.AssetReducers.trans.header.tXLocation,
  logo: state.AssetReducers.selectedAsset.Logo,
  name: state.AssetReducers.trans.header.name
  // newProperties: state.AssetReducers.selectedAsset.newProperties


});
// const mapDispatchToProps = (dispatch) => ({
//   commitAsset: (asset) =>
//       dispatch(commitAsset(asset)
//       )
// })
export default connect(mapStateToProps)(Confirm);

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
  assetLocationLabel: {
    height: 30,
    width: 150,
    resizeMode: "contain",
    marginTop: 10,
    alignSelf: "center"
    // marginRight: 10
  },

  assetMetricInputField: {
    height: 40,
    flexDirection: "row",
    width: "100%",
    borderColor: "blue",
    justifyContent: "space-between",
    margin: 5,
    marginTop: 10,
    marginBottom: 10,
    paddingRight: 5

  },
  propVal: {
    fontFamily: "dinPro",
    fontSize: 15,
    color: "#f3c736",
    margin: 2,
    textAlign: "right"
  },


    text: {
        color: "white",
        alignSelf: "center",
        fontSize: 16,
        fontWeight: "normal",
        margin: 5,
        fontFamily: "dinPro"
    },

})
