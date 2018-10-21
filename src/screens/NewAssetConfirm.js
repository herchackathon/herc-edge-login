import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableHighlight, Alert, Button } from 'react-native';
import submit from "../components/buttons/submit.png";
import logo from "../assets/round.png";
import { connect } from "react-redux";
import styles from "../assets/styles";
import hercPillar from "../assets/hercLogoPillar.png";
import { incHercId, confirmAsset } from "../actions/AssetActions"

import firebase from "../constants/Firebase";

class NewAssetConfirm extends Component {
    constructor(props) {
        super(props);
    }
    state = {};
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitleStyle:
            {
                justifyContent: "space-around"
            },
            headerTitle: (
                <View style={localStyles.headerField}>
                    <Image
                        style={localStyles.hercLogoHeader}
                        source={logo}
                    />
                    <Text style={localStyles.registerHeaderText}>Register</Text>
                </View>
            )
        }
    }


    async uploadImageAsync(uri) {

        let newAsset = this.props.newAsset;
        let assetName = newAsset.Name
        const response = await fetch(uri);
        const blob = await response.blob();
        let logoLocation = firebase.storage().ref('assets')
            .child(this.props.edgeAccount)
            .child(assetName)
            .child("Logo");

        let assetLocation = firebase.database().ref('assets')
            .child(this.props.edgeAccount);



        const snapshot = await logoLocation.put(blob);
        let downloadURL = snapshot.downloadURL;
        let fbAsset, ipfsAsset;


        ipfsAsset = Object.assign({}, {
            Name: assetName,
            CoreProps: newAsset.CoreProps,
            hercId: this.props.hercId,
            date: Date.now()
        });

        fbAsset = Object.assign({}, {
            Name: assetName,
            Logo: downloadURL,
        })

      console.log(ipfsAsset, fbAsset, "right before the send")

       this.props.confirmAsset(fbAsset)

        this.props.incHercId(this.props.hercId);
        this.props.navigation.navigate('MenuOptions');
        // const snapshot = await logoLocation.put(blob);
        // console.log(snapshot, 'snapshot')
        // return snapshot.downloadURL ? snapshot.downloadURL : "notingmon";



    }
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    // uploadTask.on(
    //     "state_changed",
    //     function (snapshot) {
    //         // Observe state change events such as progress, pause, and resume
    //         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //         var progress =
    //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //         console.log("Upload is " + progress + "% done");
    //         switch (snapshot.state) {
    //             case firebase.storage.TaskState.PAUSED: // or 'paused'
    //                 console.log("Upload is paused");
    //                 break;
    //             case firebase.storage.TaskState.RUNNING: // or 'running'
    //                 console.log("Upload is running");
    //                 break;
    //         }
    //     },
    //     function (error) {
    //         Alert.alert("Something Went Wrong");
    //         // Handle unsuccessful uploads
    //     },
    //     function () {
    //         // Handle successful uploads on complete
    //         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //         uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
    //             console.log("File available at", downloadURL);

    //             let newAsset = Object.assign({}, this.props.newAsset, {
    //                     Name: this.props.newAsset.Name,
    //                     CoreProps: this.props.newAsset.CoreProps,
    //                     Logo: downloadURL,
    //                     hercId
    //                 })
    //                 console.log(newAsset, 'after fuckery')
    //                 this.props.confirmAsset(newAsset)
    //             })
    //             // setImageinState(downloadURL);
    //         });
    // }




    _onPressSubmit() {
        let hercId = this.props.hercId;
        const { navigate } = this.props.navigation;


        if (this.props.newAsset.Logo) {
            this.uploadImageAsync(this.props.newAsset.Logo.uri)
        } else {
            this.props.confirmAsset(this.props.newAsset);
            navigate('MenuOptions');
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        let price = this.state.fctPrice;
        let hercId = this.props.hercId;
        let newAsset = this.props.newAsset;
        let Logo, Url, list;
        let Name = newAsset.Name;

        console.log(newAsset, "newAsset, look at Logo")
        if (newAsset.Logo) {
            Logo = (<Image style={styles.assetHeaderImage} source={{ uri: newAsset.Logo.uri }} />);
        } else {
            Logo = (<Text style={styles.label}>No Image</Text>)
        }


        if (newAsset.hasOwnProperty('Url')) {
            Url = (<Text style={styles.label}>{newAsset.Url}</Text>);
        } else {
            Url = (<Text style={styles.label}>No Url</Text>)
        }

        if (newAsset.hasOwnProperty('CoreProps')) {
            list = Object.getOwnPropertyNames(newAsset.CoreProps).map((x, i) => {
                let num = (i + 1);
                return (
                    <View key={i} style={localStyles.assetMetricInputField}>
                        <Text style={localStyles.text}>Metric: {num}</Text>
                        <Text style={localStyles.input}>{x}</Text>
                    </View>
                )
            })
        } else {
            list = (<Text style={styles.label}>No Properties</Text>)
        }



        return (
            <View style={styles.container}>
                <View style={styles.containerCenter}>
                    <Text style={styles.assetHeaderLabel}>{Name}</Text>
                    {Logo}
                    <Text style={styles.assetHeaderLabel}>{Url}</Text>
                    <Text style={styles.assetHeaderLabel}>HercID: {hercId}</Text>
                    <ScrollView style={{ paddingRight: 5, alignSelf: "center", width: "100%" }}>

                        {list}

                    </ScrollView>

                    <TouchableHighlight onPress={() => this._onPressSubmit()}>
                        <Image source={submit} style={localStyles.imageButtons} />
                    </TouchableHighlight>

                    <View style={localStyles.newAssetFeeContainer}>
                        <Image style={localStyles.assetFeePillarLogo} source={hercPillar} />
                        <Text style={localStyles.assetFeePrice}>10,000</Text>
                    </View>

                </View>
            </View>

        )
    }


}
const mapStateToProps = (state) => ({
    newAsset: state.AssetReducers.newAsset,
    hercId: state.AssetReducers.hercId,
    edgeAccount: state.AssetReducers.edge_account
});

const mapDispatchToProps = (dispatch) => ({
    confirmAsset: (asset) =>
        dispatch(confirmAsset(asset)),

    incHercId: (hercid) =>
        dispatch(incHercId(hercid))
})
export default connect(mapStateToProps, mapDispatchToProps)(NewAssetConfirm);


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
    assetMetricInputField: {
        height: 40,
        flexDirection: "row",
        width: "100%",
        borderColor: "blue",
        justifyContent: "space-between",
        margin: 5,
        marginTop: 10,
        marginBottom: 10
    },
    text: {
        color: "white",
        alignSelf: "center",
        fontSize: 16,
        fontWeight: "normal",
        margin: 5,
        fontFamily: "dinPro"
    },
    input: {
        width: "53%",
        height: 24,
        textAlign: "center",
        backgroundColor: "#ffffff",
        fontSize: 16,
        fontWeight: "200",
        borderColor: "blue",
        color: "black",
        borderWidth: 1,
        alignSelf: "center",
        borderRadius: 3
    },
    imageButtons: {
        height: 40,
        width: 175,
        resizeMode: "contain",
        alignSelf: "center",
        margin: 7
    },

    newAssetFeeContainer: {
        height: 50,
        width: 125,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    assetFeePillarLogo: {
        height: 40,
        width: 30,
        backgroundColor: "#091141",
        resizeMode: "contain",
    },
    assetFeePrice: {
        backgroundColor: "#091141",
        textAlign: "center",
        fontSize: 20.2,
        fontWeight: "400",
        color: "white",
        height: 30
    },
    wordsText: {
        height: 23,
        fontSize: 20,
        fontWeight: "600",
        color: "white"
    },
    yellowText: {
        height: 23,
        fontSize: 20,
        fontWeight: "600",
        color: "yellow"
    }
})
