import React, { Component } from 'react';
import { View, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import Loader from '../components/Loader';
import { YellowBox } from 'react-native';
import { connect } from "react-redux";
import store from "../store";
import axios from 'axios';
import t from 'tcomb-form-native';
import { sendIdology} from "../actions/WalletActActions";
import {WEB_SERVER_API_IDENTITIES } from "../components/settings";
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Setting a timer for a long period of time']);

const _ = require('lodash');
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.textbox.normal.color = 'black';
stylesheet.textbox.normal.backgroundColor = 'white';
stylesheet.controlLabel.normal.color = 'silver';

const Form = t.form.Form;

const User = t.struct({
  edgeAccount: t.String,
  organizationName: t.String,
  firstName: t.String,
  lastName: t.String,
  address: t.String,
  zip: t.Number,
});

const options = {
  // auto: 'placeholders',
  label:<Text style={{fontSize: 30, color: 'white'}}>KYC/AML</Text>,
  fields: {
    edgeAccount: {
      hidden: true,
    },
    organizationName: {
      label: 'Organization Name',
      error: 'This is required',
      stylesheet: stylesheet
    },
    firstName: {
      label: 'First Name',
      error: 'This is required.',
      stylesheet: stylesheet
    },
    lastName: {
      label: 'Last Name',
      error: 'This is required.',
      stylesheet: stylesheet
    },
    address: {
      label: 'Address',
      error: 'This is required.',
      stylesheet: stylesheet
    },
    zip: {
      label: 'Zip Code',
      error: 'This is required.',
      stylesheet: stylesheet
    },
  },
};

const formStyles = {
  ...Form.stylesheet,
  controlLabel: {
    normal: {
      color: 'blue',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
}

class IdologyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false
    };
  }
  componentDidMount(){
    //check if navigation params redirect is true, if true alert, "Identity could not be verified."
    const { navigation } = this.props;
    const redirectFlag = navigation.getParam('redirect', false);
    console.log(redirectFlag, "======= chance redirect boolean")
    if (redirectFlag){
      Alert.alert("Identity could not be verified. Please try again.")
    }
  }

  _sendToIdology(formBody){
    const { navigate } = this.props.navigation;

    axios.post(WEB_SERVER_API_IDENTITIES, formBody)
      .then(response => {
        console.log(response, "=====idology server response")
        this.setState({loading: false}, () => {
          response.data === true ? navigate('MenuOptions') : navigate('IdologyForm', {"redirect": true})
        })
      })
      .catch(error => {console.log(error)})
  }

  handleSubmit = () => {
    this.setState({loading: true})
    const value = this._form.getValue();
    let formBody = [];
    for (let property in value) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(value[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    this._sendToIdology(formBody)
  }

  render() {
    var defaultValues = {
      edgeAccount: this.props.username,
    };

    return (
      <View style={localStyles.container}>
      <Loader
        loading={this.state.loading} />
        <Form
          ref={c => this._form = c}
          type={User}
          value={defaultValues}
          options={options}
        />
        <TouchableOpacity onPress={this.handleSubmit} style={localStyles.buttonContainer}>
          <Text style={localStyles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#091141",
    padding: 40,
  },
  hercLogo: {
    height: 100,
    width: "100%",
    resizeMode: "contain",
    marginBottom: "10%",
  },
  buttonContainer: {
    backgroundColor: "white",
    paddingVertical: 5,
    marginTop: 60,
    borderRadius: 2,
    borderColor: "gold",
    borderWidth: 1,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20
  }
});

const mapStateToProps = (state) => ({
    organizationName: state.WalletActReducers.organizationName,
    username: state.WalletActReducers.edge_account
});

const mapDispatchToProps = (dispatch) => ({
    sendIdology: (idologyForm) =>
      dispatch(sendIdology(idologyForm)),
})
export default connect(mapStateToProps, mapDispatchToProps)(IdologyForm);
