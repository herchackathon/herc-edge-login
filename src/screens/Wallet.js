import { StyleSheet, Text, TextInput, View, Image, TouchableHighlight, Alert } from 'react-native';
import React from "react";
import styles from "../assets/styles";
import supplyChain from "../assets/supplyChain.png";
import { Button } from "react-native-button";

export class Wallet extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <View style={localStyles.headerBox}><Text style={localStyles.headerText}>Wallet</Text></View>,
  });



  render() {
    const testProfile = {
      username: "Firstuser",
      balance: 500,
      address: "abc12345",
      currentCurrency: "Melange"

    }
    return (
      <View style={styles.container}>
        <View style={[styles.containerCenter, { paddingTop: 25 }]}>
          <Text style={localStyles.text}> Username: {testProfile.username}  </Text>
          <Text style={localStyles.text}> Balance: {testProfile.balance}</Text>
          <Text style={localStyles.text}> Current Currency: {testProfile.currentCurrency}</Text>
          <Text style={localStyles.text}> Currency/Token Select </Text>
          <Text style={localStyles.text}> Address: {testProfile.address}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', height: 200, width: 500, alignContent: 'space-between', justifyContent: 'space-around' }}>
            <View style={{ height: 30, width: 100, backgroundColor: "yellow", borderRadius: 5, }}>
              <Text style={localStyles.buttonText}>Send</Text>
            </View>
            <View style={{ height: 30, width: 100, backgroundColor: "green", borderRadius: 5, }}>
              <Text style={localStyles.buttonText}>Receive</Text>
            </View>
          </View>
          <Text style={localStyles.text}> QR Code Generator/Reader </Text>
        </View>
      </View>
    );
  }
};

const localStyles = StyleSheet.create({
  headerBox: {
    alignItems: "center",
    flex: 1
  },
  headerText: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 26,
    fontWeight: "normal"
  },
  text: {
    color: "white",
    textAlign: "left",
    fontSize: 22,
    fontWeight: "normal",
    margin: 5,
    fontFamily: "dinPro"
  },
  buttonText: {
    textAlign: "left",
    fontSize: 22,
    fontWeight: "normal",
    margin: 5,
    fontFamily: "dinPro"
  },
})
export default Wallet;