import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, View, Image, TouchableHighlight, Alert } from 'react-native';
import { STATUS_BAR_HEIGHT } from '../constants';

import hLogo from "../assets/hercLogoPillar.png";

export default class DigiViewer extends Component {
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

  render() {
    const { navigate } = this.props.navigation;
    // const { params } = navigation.state;
    return (

      <View style={styles.container}>

        <Image source={hLogo} style={styles.walletLabel} />
        <Text style={styles.text}>Need a label for this</Text>

        <View style={styles.walletBalance}>
          <Image source={hLogo} style={styles.icon} />
          <Text style={styles.text}>10,000</Text>
          <View style={styles.feeBalance}>
            <Text style={styles.text}>Fee:</Text>
            <View style={{ alignSelf: 'flex-end', flexDirection: 'row' }}>
              <Text style={styles.text}>1</Text>
              <Image source={hLogo} style={styles.feeLabel} />
            </View>
          </View>
          {/* <Text style={styles.text}>Need a Label</Text> */}
          <TouchableHighlight style={{ marginTop: 5 }} onPress={() => navigate('Anthem')}>
            <Image source={hLogo} style={styles.button} />
          </TouchableHighlight>
        </View>
      </View>





    )
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021227',
    alignItems: 'center',
    justifyContent: 'flex-start',

  },
  walletLabel: {
    width: '70%',
    height: 60,
    resizeMode: 'contain',
  },

  wallet: {
    padding: 3,
    backgroundColor: '#021227',
    height: 150,
    width: '80%',
    justifyContent: 'flex-start',
    alignItems: "center",
    margin: 5
  },
  feeBalance: {
    width: '50%',
    flexDirection: 'row',
    backgroundColor: '#021227',
    padding: 2,
    justifyContent: 'space-between',
    margin: 5

    // height: 

  },
  feeLabel: {
    height: 20,
    width: 40,
    resizeMode: 'contain',
    margin: 5
  },


  text: {

    height: 30,
    textAlign: "center",
    color: "white",
    alignSelf: "center",
    fontSize: 20.2,
    fontWeight: "600",
  },

  icon: {
    height: 50,
    width: 60,
    alignSelf: 'flex-start',
    resizeMode: 'contain',
    marginLeft: 10

  },

  button: {
    width: 250,
    height: 50,
    marginTop: 30
  },
})