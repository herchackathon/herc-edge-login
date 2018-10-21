import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
  Alert,
  TouchableNativeFeedback,
  StatusBar,
} from "react-native";
// import { STATUS_BAR_HEIGHT } from "../constants";
import { createStackNavigator } from "react-navigation";
import styles from "../assets/styles";
import { connect } from "react-redux";
import { startTrans } from "../actions/AssetActions";
import newOriginator from "../components/buttons/originatorButton.png";
import newRecipient from "../components/buttons/recipientButton.png";


class Splash2 extends Component {
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
        // <View style={styles.assetHeaderTitle}>
        //   <TouchableHighlight style={{justifyContent: "center"}} onPress={() => navigation.navigate("MenuOptions")}>
        //     <Image
        //       style={styles.assetHeaderLogo}
        //       source={{ uri: params.logo }}
        //     />
        //   </TouchableHighlight>
        //   <Text style={styles.headerText}>{params.name}</Text>
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

      ),
      headerTitleStyle: {
        height: 50,
        width: 200,
        alignSelf: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginLeft: 20
      }
    };
  };
  constructor(props) {
    super(props);
  }
  _onPress = place => {
    const { navigate } = this.props.navigation;

    let trans = {
      header: {
        name: this.props.asset.Name,
        tXLocation: place,
        price: 0.000125, //this is the bare starter price i'm going with which is (128b / 1024) x 0.001
      },
      data: {
        dTime: new Date().toDateString(),
        images: {},
        documents: {}
      }
    };
    console.log(trans, "trans base");

    this.props.startTrans(trans);

    navigate("Splash3", {
      logo: this.props.asset.Logo,
      name: this.props.asset.Name
    });
  };
  componentDidMount() {
    StatusBar.setBackgroundColor("white");
    StatusBar.setBarStyle("dark-content", true);
  }
  render() {
    console.log("this is splash2")
    return (
      ///  I'm consistancizing all the button sizes to 50x200 or about 53%
      /// the styles for the location images (originator/recipient) is located at styles.locationImage

      <View style={styles.container}>
        <View style={styles.containerCenter}>
          <TouchableHighlight
            style={{ marginTop: 50 }}
            onPress={() => this._onPress("originator")}
          >
            <Image style={styles.menuButton} source={newOriginator} />
          </TouchableHighlight>

          <TouchableHighlight onPress={() => this._onPress("recipient")}>
            <Image style={styles.menuButton} source={newRecipient} />
          </TouchableHighlight>

        </View>
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  header__container: {
    // borderColor: "green",
    // borderWidth: 3,
    display: "flex",
    resizeMode: "contain",
    height: 60,
    alignSelf: "center",
    flex: 1,
    alignContent: "center",
    alignItems: "center",
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
  },
  header__image__box: {
    // borderColor: "green",
    // borderWidth: 3,
    height: "100%",
    width: 50
  },
});

const mapStateToProps = state => ({
  asset: state.AssetReducers.selectedAsset
});
const mapDispatchToProps = dispatch => ({
  startTrans: trans => dispatch(startTrans(trans))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Splash2);
