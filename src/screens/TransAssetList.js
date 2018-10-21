import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, Alert, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { STATUS_BAR_HEIGHT } from '../constants';
// import track from '../components/buttons/blockScannerBtn.png';
import { connect } from 'react-redux';
import styles from '../assets/styles';
import { selectAsset } from '../actions/AssetActions';
import logo from "../assets/round.png";

class TransAssetList extends Component {
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
        // <View style={localStyles.headerField}>
        //   <Image
        //     style={localStyles.hercLogoHeader}
        //     source={logo}
        //   />
        //   <Text style={localStyles.registerHeaderText}>Track</Text>
        // </View>

        <View style={headerStyles.header__container}>
          <View style={headerStyles.header__container__centeredBox}>
            <View style={headerStyles.header__image__box}>
              {/* <TouchableHighlight style={{justifyContent: "center"}} onPress={() => navigation.navigate("MenuOptions")}>
           </TouchableHighlight> */}
              <Image
                style={headerStyles.assetHeaderLogo}
                source={logo}
              />
            </View>
            <View style={headerStyles.header__text__box}>
              <Text style={headerStyles.headerText}>Track</Text>
            </View>
          </View>
        </View>

      )
    }
  }
  _onPress = (asset) => {
    const { navigate } = this.props.navigation;

    console.log("going to the trans")
    this.props.selectAsset(asset);
    navigate('SpaceScreen', { name: asset.name, logo: asset.logo });

  }



  render() {
    // console.log(this.props)
    let list = this.props.assets.map((asset, index) => {
      // console.log(asset);
      return (
        <TouchableHighlight key={index} onPress={() => this._onPress(asset)}>
          <View style={localStyles.menuItemField}>
            {/* <Button onPress={() => this._onDelete(asset.key)} style={styles.assetDeleteButton}>Delete</Button> */}
            <Image style={localStyles.assetLogo} source={{ uri: asset.logo }} />
            <View style={localStyles.menuItemField__textBox}>
              <Text style={localStyles.assetLabel}>{asset.name}</Text>
            </View>
          </View>
        </TouchableHighlight>
      );

    });

    return (
      <View style={styles.container}>
        <View style={[styles.containerCenter, { paddingTop: 15 }]}>

          {list}

        </View>
      </View>


    )
  };
}

//need to write GET_TRANS

const mapStateToProps = (state) => ({
  assets: state.Assets,

});
const mapDispatchToProps = (dispatch) => ({

  selectAsset: (asset) =>
    dispatch(selectAsset(asset)),
  //   deleteAsset: (key) =>
  //     dispatch(deleteAsset(key))

})
export default connect(mapStateToProps, mapDispatchToProps)(TransAssetList)

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
  menuItemField: {
    display: "flex",
    flexDirection: "row",
    width: 240,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 2,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    margin: 15,
    // marginTop: 10,
    paddingLeft: 3,
    // borderWidth: 2,
    // borderColor: "black"
  },
  assetLogo: {
    // borderColor: "green",
    // borderWidth: 3,
    height: 25,
    width: 25,
    marginLeft: 2,
    borderRadius: 25 / 2,
    alignSelf: "center"
    // resizeMode: "contain"
  },
  assetLabel: {
    color: "black",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "normal",
    margin: 2,
    // marginLeft: "20%",
    fontFamily: "dinPro"
  },
  menuItemField__textBox: {
    // borderColor: "orange",
    // borderWidth: 3,
    flex: 1
  },
})