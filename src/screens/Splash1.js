// const { navigate } = this.props.navigation;
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
  Alert,
  Platform,
  StatusBar,
} from "react-native";
import { createStackNavigator } from "react-navigation";
import { STATUS_BAR_HEIGHT } from "../constants";
import { connect } from "react-redux";
import Button from "react-native-button";
import styles from "../assets/styles";
import create from "../assets/createNewAssetButton.png";
import supplyChain from "../assets/supplyChain.png";
import { getAssetDef, selectAsset, deleteAsset } from "../actions/AssetActions";
import addIcon from "../components/buttons/addIcon.png";
import supplyChainIcon from "../assets/supplyChainIcon.png";

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

class Splash1 extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle:
      <View style={headerStyles.header__container}>
        <View style={headerStyles.header__container__centeredBox}>
          <View style={headerStyles.header__image__box}>
            {/* <TouchableHighlight style={{justifyContent: "center"}} onPress={() => navigation.navigate("MenuOptions")}>
            </TouchableHighlight> */}
            <Image
              style={headerStyles.assetHeaderLogo}
              source={supplyChainIcon}
            />
          </View>
          <View style={headerStyles.header__text__box}>
            <Text style={headerStyles.headerText}>Supply Chain</Text>
          </View>
        </View>
      </View>,
  });

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    StatusBar.setBackgroundColor("white");
    StatusBar.setBarStyle("dark-content", true);
    console.log(this.props.assets, "brand new assets from IPFS!")

  }

  // _onDelete = key => {
  //   const { navigate } = this.props.navigation;
  //   this.props.deleteAsset(key);
  //   navigate("MenuOptions");
  // };

  _renderAssets = () => {
    let list = this.props.assets.map((asset, index) => {
      console.log(asset, "mapping for assetList in splash1")
      // console.log(asset, "asset mapping in splash1", asset.Name, asset.CoreProps)
      return (
        <TouchableHighlight style={{ borderRadius: 2 }} key={index} onPress={() => this._onPress(asset)}>
          <View style={localStyles.menuItemField}>
            {/* <Button onPress={() => this._onDelete(asset.key)} style={styles.assetDeleteButton}>Delete</Button> */}
            <Image style={localStyles.assetLogo} source={{ uri: asset.Logo }} />
            <View style={localStyles.menuItemField__textBox}>
              <Text style={localStyles.assetLabel}>{asset.Name}</Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    });
    return list;
  }

  _onPress = asset => {
    const { navigate } = this.props.navigation;

    this.props.selectAsset(asset);
    this.props.getAssetDef(asset.ipfsHash);


    navigate("Splash2", { logo: asset.Logo, name: asset.Name });

  }

  render() {

    const { navigate } = this.props.navigation;


    return (
      <View style={styles.container}>
        <View style={[styles.containerCenter, { paddingTop: 25 }]}>
          <ScrollView contentContainerStyle={styles.scrollView}>

            {this._renderAssets()}

            <TouchableHighlight onPress={() => navigate("Create")}>

              <View style={localStyles.createNew__Box}>
                <Image style={localStyles.assetLogo} source={addIcon} />
                <Text style={localStyles.createNewText}>Create New</Text>
              </View>

            </TouchableHighlight>

          </ScrollView>
        </View>
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  createNew__Box: {
    flexDirection: "row",
    width: 200,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 2,
    alignItems: "center",
    alignContent: "center",
    marginTop: 100,
    paddingLeft: 5,
    // justifyContent: "space-between"
  },
  createNewText: {
    // borderWidth: 3,
    // borderColor: "purple",
    flex: 1,
    color: "black",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "normal",
    margin: 5,
    // marginLeft: "20%",
    fontFamily: "dinPro"
  },
  menuItemField: {
    display: "flex",
    flexDirection: "row",
    width: 200,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 3,
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
});

const mapStateToProps = state => ({
  assets: state.AssetReducers.assets
});

const mapDispatchToProps = dispatch => ({
  selectAsset: asset => dispatch(selectAsset(asset)),
  getAssetDef: assetIpfsHash => dispatch(getAssetDef(assetIpfsHash)),
  deleteAsset: key => dispatch(deleteAsset(key))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Splash1);
