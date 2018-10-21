import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, Alert, StatusBar, } from 'react-native';
// import { DocumentPicker } from 'expo';
import { connect } from 'react-redux';
import styles from '../assets/styles';
import { addDoc } from '../actions/AssetActions';
import newOriginator from "../components/buttons/originatorButton.png";
import newRecipient from "../components/buttons/recipientButton.png";
import submit from "../components/buttons/submit.png";

import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
class DocUp extends Component {

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

      headerTitle:
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

    }
  }
  state = {

    name: null,
    uri: null,
    size: null
  }


  _onSubmit = () => {
    const { navigate } = this.props.navigation;
    let uri = this.state.uri;
    let docName = this.state.name;
    let docSize = this.state.size;
    let doc = Object.assign({}, this.state, {
      uri: uri,
      size: docSize,
      name: docName
    }
    )
    console.log(doc, "onsubmitcsv")
    this.props.addDoc(doc);

    navigate('Splash3', { logo: this.props.logo, name: this.props.name });
  };


  _pickDocument = () => {
    console.log("picking Doc")
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.allFiles()],
    }, (error, res) => {
      if (error) Alert.alert("Something Went Wrong! Error: " + error);
      console.log(res);
      // Android
      this.setState({
        uri: res.uri,
        name: res.fileName,
        size: res.fileSize
      });
    });
  }
  // iPad
  // const {pageX, pageY} = event.nativeEvent;

  // DocumentPicker.show({
  //   top: pageY,
  //   left: pageX,
  //   filetype: ['public.image'],
  // }, (error, url) => {
  //   alert(url);
  // });
  render() {
    const { navigate } = this.props.navigation;

    let locationImage = this.props.transInfo.location === 'recipient' ? newRecipient : newOriginator;

    return (
      <View style={styles.container}>
        <View style={styles.containerCenter}>
          <View style={{ margin: 25 }}></View>
          <Image source={locationImage} style={[localStyles.assetLocationLabel, { marginTop: 5, marginBottom: 50 }]} />

          <TouchableHighlight onPress={() => this._pickDocument()}>
            <View style={localStyles.menuItemField}>
              <View style={localStyles.menuItemField__textBox}>
                <Text style={localStyles.assetLabel}>Upload Document</Text>
              </View>
            </View>
          </TouchableHighlight>

          {this.state && <View style={localStyles.docContainer}>
            <Text style={localStyles.transRevTime}>Documents</Text>
            <Text style={localStyles.text}>{this.state.name}</Text>
            <Text style={localStyles.text}>{(this.state.size / 1024).toFixed(3)} kb</Text>
          </View>
          }

          <TouchableHighlight onPress={() => this._onSubmit()}>
            <Image source={submit} style={localStyles.submitButton} />
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}
const mapStateToProps = (state) => ({
  transInfo: state.AssetReducers.trans.header,
  logo: state.AssetReducers.selectedAsset.Logo,
  name: state.AssetReducers.selectedAsset.Name

});
const mapDispatchToProps = (dispatch) => ({

  addDoc: (doc) =>
    dispatch(addDoc(doc)),

})

const localStyles = StyleSheet.create({
  submitButton: {
    height: 40,
    width: 175,
    resizeMode: "contain",
    marginTop: 80,
    alignSelf: "center"
  },
  assetLocationLabel: {
    // borderColor: "yellow",
    // borderWidth: 3,
    height: 30,
    width: 150,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 80
  },
  menuItemField: {
    display: "flex",
    flexDirection: "row",
    width: 200,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 2,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    margin: 10,
    paddingLeft: 3
  },
  assetLabel: {
    color: "black",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "normal",
    margin: 2,
    fontFamily: "dinPro"
  },
  menuItemField__textBox: {
    // borderColor: "orange",
    // borderWidth: 3,
    flex: 1
  },
  docContainer: {
    // backgroundColor: "blue",
    width: "100%",
    height: 75,
  },
  text: {
    color: "white",
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "normal",
    margin: 2,
    fontFamily: "dinPro"
  },
  transRevTime: {
    color: "#f3c736",
    fontFamily: "dinPro",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  },


});
export default connect(mapStateToProps, mapDispatchToProps)(DocUp);
