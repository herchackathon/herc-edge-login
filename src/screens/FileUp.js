import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, Alert } from 'react-native';

import { STATUS_BAR_HEIGHT } from '../constants';
import { StackNavigator } from 'react-navigation';
import styles from '../assets/styles';
import { connect } from 'react-redux';
import newOriginator from "../components/buttons/originatorButton.png";
import newRecipient from "../components/buttons/recipientButton.png";
import submit from "../components/buttons/submit.png";
import uploadImage from "../components/buttons/uploadImage.png";
import takePhoto from "../components/buttons/takePhoto.png";
import { addPhoto } from '../actions/AssetActions';

var ImagePicker = require('react-native-image-picker');

class FileUp extends Component {
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
        </View>,

      // headerStyle: {
      //   height: Platform.OS === 'android' ? 100 + STATUS_BAR_HEIGHT : 100,
      //   backgroundColor: '#ffff',

      // },
      headerTitleStyle: {
        marginTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        textAlign: 'center',
        alignSelf: 'center',
        // textAlignVertical: 'center',
        backgroundColor: '#021227',

      },
      headerRight: <View></View>,
    }
  }
  constructor(props){
    super(props)
    this.setImage = this.setImage.bind(this);
    this.state = {
      image: null,
    }

  }

  async componentWillMount() {
    // const { status } = await Permissions.askAsync(Permissions.CAMERA).then(await Permissions.askAsync(Permissions.CAMERA_ROLL));
    // this.setState({ permissionsGranted: 'granted' });
  }

  setImage = (imgObj) => {
    if(imgObj) console.log("trying to set the Image");

    this.setState({
      image: imgObj.string,
      size: imgObj.size,
      uri: imgObj.path
    })

  }
  _pickImage = () => {
    console.log("picking image")
   
    ImagePicker.launchImageLibrary({}, (response) => {
     
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
     
        this.setState({
          image: "data:image/jpg;base64," + response.data,
          size: response.fileSize,
          uri: source
        });
      }
    });
  }
  _takePic = () => {
    const { navigate } = this.props.navigation;
    console.log("takingpic")
    navigate('Camera',{ setPic: this.setImage})

  }

  _onSubmit = () => {
    const { navigate } = this.props.navigation;
    let image = this.state;
    this.props.addPhoto(image);
    navigate('Splash3', { logo: this.props.logo, name: this.props.name })
  };

  render() {
    let image = this.state;
    console.log(Object.keys(image), 'should be this state');
    let transInfo = this.props.transInfo;
    let locationImage = this.props.transInfo.location === 'recipient' ? newRecipient : newOriginator;
    let logo = this.props.logo;

    return (
      <View style={styles.container} >
        <View style={styles.containerCenter} >
          <View style={{ margin: 25 }}></View>
          <Image source={locationImage} style={[localStyles.assetLocationLabel, { marginTop: 5, marginBottom: 50 }]} />

          {
            image &&
            <Image source={{ uri: image.image }} style={{ width: 200, height: 200, margin: 10 }} />
          }
         
          <TouchableHighlight onPress={() => this._pickImage()}>
            <Image style={styles.menuButton} source={uploadImage} />
          </TouchableHighlight>

          <TouchableHighlight onPress={() => this._takePic()}>
            <Image style={styles.menuButton} source={takePhoto} />
          </TouchableHighlight>

          <TouchableHighlight onPress={() => this._onSubmit()}>
            <Image source={submit} style={localStyles.submitButton} />
          </TouchableHighlight>

        </View >
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

  addPhoto: (image) =>
    dispatch(addPhoto(image)),

})

export default connect(mapStateToProps, mapDispatchToProps)(FileUp);


const localStyles = StyleSheet.create({
  
  submitButton: {
    height: 40,
    width: 175,
    resizeMode: "contain",
    marginTop: 20,
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
});