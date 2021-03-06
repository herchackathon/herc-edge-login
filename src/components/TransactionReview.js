import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableHighlight, Alert, ScrollView, YellowBox, Modal, ActivityIndicator, Button } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import styles from '../assets/styles';
import submit from "./buttons/submit.png";
import { sendTrans } from "../actions/AssetActions";
import fee from "../assets/hercLogoPillar.png";
import newOriginator from "./buttons/originatorButton.png";
import newRecipient from "./buttons/recipientButton.png";
import modalStyle from "../assets/confModalStyles";
import { TOKEN_ADDRESS } from "../components/settings"
import BigNumber from 'bignumber.js';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Setting a timer for a long period of time']);
import store from "../store"

//TODO: Fix the image review and create the price reducers with Julie.

class TransRev extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            loading: false,
            balance: null,
            transactionId: null,
        }
    }
    componentDidMount = () => {
        // this.getPricesFromApi();
        // TODO: this API needs to be updated
        let balance = new BigNumber(this.props.wallet.getBalance({ currencyCode: "HERC" }))
        this.setState({ balance: balance.times(1e-18).toFixed(18) }, () => { console.log(this.state.balance, 'chance herc balance')})
    }

  _onPressSubmit(){
    Alert.alert(
      'Payment Amount: '+ this._getPrices().toString() +' HERC',
      'Current Balance: '+ this.state.balance+ ' HERC \n Do you authorize this payment?' ,
      [
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => this._checkBalance() },
      ],
      { cancelable: false }
    )
  }

  async _checkBalance(){
    if (!this.state.balance) {return}

    let convertingPrice = new BigNumber(this._getPrices()) // don't have to times 1e18 because its already hercs
    console.log(convertingPrice.toString(), 'chance checkig that this is te correct string')
    let balance = new BigNumber(this.state.balance)
    let newbalance = balance.minus(convertingPrice)

    console.log('do you have enough?', newbalance.isPositive())


    if (newbalance.isNegative()){
      Alert.alert(
        'Insufficient Funds',
        'Balance: '+ this.state.balance+ ' HERC' ,
        [
          {text: 'Top Up Hercs', onPress: () => Linking.openURL("https://purchase.herc.one/"), style: 'cancel'},
          {text: 'Ok', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: true }
      )
    } else {
      this.setState({ modalVisible: true })
      const abcSpendInfo = {
        networkFeeOption: 'standard',
        currencyCode: 'HERC',
        metadata: {
          name: 'Transfer From Herc Wallet',
          category: 'Transfer:Wallet:College Fund'
        },
        spendTargets: [
          {
            publicAddress: TOKEN_ADDRESS,
            nativeAmount: convertingPrice.toString()
          }
        ]
      }
      // catch error for "ErrorInsufficientFunds"
      let wallet = this.props.wallet
      let abcTransaction = await wallet.makeSpend(abcSpendInfo)
      await wallet.signTx(abcTransaction)
      await wallet.broadcastTx(abcTransaction)
      await wallet.saveTx(abcTransaction)

      console.log("Sent transaction with ID = " + abcTransaction.txid)
      this.setState({ transactionId: abcTransaction.id }, this._sendTrans())
    }
  }

  _changeModalVisibility = (visible) => {
      this.setState({
          modalVisible: visible
      })
  }

  _sendTrans() {
    this.props.sendTrans(this._getPrices())
    }


    _getPrices = () => {

        let transDat = this.props.transDat;
        let price = 0;
        let imgPrice = 0;
        let docPrice = 0;

        if (transDat.images.size) {
            imgPrice = (((transDat.images.size / 1024) * (.00000002)) / (.4))
            console.log(imgPrice, "imgPrice");
        };

        if (transDat.documents) {
            docPrice = ((.000032) * .4)
        }

        if ((docPrice + imgPrice) !== 0) {
            price = (docPrice + imgPrice) + (.000032);
        }

        return (
            price
        )
    }


    _hasImage = (transObj) => {
        if (transObj.images.size) {
            let imgPrice = ((transObj.images.size / 1024) * (.00000002)) / (.4);
            return (
                <View style={localStyles.imgContainer}>
                    <Text style={localStyles.transRevTime}>Images</Text>
                    <Image style={localStyles.thumb} source={{ uri: transObj.images.image }} />
                    <Text style={localStyles.revPropVal}>{(transObj.images.size / 1024).toFixed(3)} kb</Text>
                    <View style={localStyles.feeContainer}>
                        <Image style={localStyles.hercPillarIcon} source={fee} />
                        <Text style={localStyles.teePrice}>{imgPrice.toFixed(8)}</Text>
                    </View>
                </View>
            );

        }
        return (<Text style={localStyles.revPropVal}>No Images</Text>)
    }

    _hasDocuments = (transObj) => {
        if (transObj.documents.size) {
            let docPrice = (transObj.documents.size * .000032) * .4;
            return (
                <View style={localStyles.docContainer}>
                    <Text style={localStyles.transRevTime}>Documents</Text>
                    <Text style={localStyles.text}>{transObj.documents.name}</Text>
                    <Text style={localStyles.text}>{(transObj.documents.size / 1024).toFixed(3)} kb</Text>
                    <View style={localStyles.feeContainer}>
                        <Image style={localStyles.hercPillarIcon} source={fee} />
                        <Text style={localStyles.teePrice}>{docPrice.toFixed(8)}</Text>
                    </View>
                </View>
            );
            console.log(transInfo.price, "transprice plus docprice", this.state.docPrice)
        }
        return (<Text style={localStyles.revPropVal}>No Documents</Text>)
    }


    _hasList = (transObj) => {
        if (transObj.properties) {
            list = Object.keys(transObj.properties).map((name, idx) => {
                return (
                    <View key={idx} style={localStyles.revPropField}>
                        <Text style={localStyles.transRevName}>{name}:</Text>
                        <Text style={localStyles.revPropVal}>{transObj.properties[name]}</Text>
                    </View>
                )
            });
            return (
                <View style={localStyles.listContainer}>
                    <Text style={localStyles.transRevTime}>Properties</Text>
                    {list}
                </View>
            )
        }
        return (<Text style={localStyles.revPropVal}>No Properties</Text>)
    }

    _goToMenu = () => {
        // const { navigate } = this.props.navigate;
        this._changeModalVisibility(false);

        this.props.navigate('MenuOptions');

    }

    render() {
        let trans = store.getState().AssetReducers.trans;
        let transInfo = trans.header;
        // let fctPrice = this.state ? this.state.fctPrice : "";
        let transDat = trans.data;
        console.log(transInfo, 'transinfo in transreviewrender', transInfo.price, 'transdata')
        let locationImage = this.props.transInfo.tXLocation === 'recipient' ? newRecipient : newOriginator;
        let list, edit;
        let dTime = transDat.dTime;
        let name = this.props.transInfo.name;
        let transPrice = transInfo.price;

        if (transDat.hasOwnProperty('ediT')) {
            edit = (
                <View style={localStyles.editField}>
                    <Text style={localStyles.editLabel}>EDI-T-SET:</Text>
                    <Text style={localStyles.text}>{transDat.ediT.name}</Text>
                    <Text style={localStyles.text}>{transDat.ediT.value}</Text>
                </View>)
        }

        /// I'm using a smaller location image locally. localStyles.assetLocationLabel
        return (

            <View style={localStyles.transactionReviewContainer}>
                <Text style={styles.transReview}>Transaction Review</Text>
                <Text style={{ fontSize: 22, color: "blue", marginTop: 5 }}> {name}  </Text>
                <Image style={localStyles.assetLocationLabel} source={locationImage} />

                <Text style={localStyles.transRevTime}>{dTime}</Text>

                {edit}

                {this._hasImage(transDat)}

                {this._hasDocuments(transDat)}

                {this._hasList(transDat)}

                <TouchableHighlight style={{ margin: 10 }} onPress={() => this._onPressSubmit(transPrice)}>
                    <Image source={submit} style={localStyles.submitButton} />
                </TouchableHighlight>
                <View style={localStyles.feeContainer}>
                    <Image style={localStyles.hercPillarIcon} source={fee} />
                    <Text style={localStyles.teePrice}>{this._getPrices().toFixed(18)}</Text>
                </View>


               <Modal
                    transparent={false}
                    animationType={'none'}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { console.log("modal closed") }}
                >
                    <View style={modalStyle.container}>
                        <View style={modalStyle.modalBackground}>
                          <View style={modalStyle.closeButtonContainer}>
                              <TouchableHighlight
                                style={modalStyle.closeButton}
                                onPress={() => this._changeModalVisibility(false)}>
                              <Text style={{ margin: 5, fontSize: 30, color: '#00000070'} }>X</Text>
                              </TouchableHighlight>
                          </View>
                            {!this.props.transDataFlags.confTransComplete &&

                                <Text style={modalStyle.wordsText}>Your Transaction Information Is Being Written To The Blockchain</Text>
                            }
                            <View style={modalStyle.activityIndicatorWrapper}>
                                <ActivityIndicator
                                    animating={!this.props.transDataFlags.confTransComplete} size="large" color="#091141" />
                            </View>

                            {this.props.transDataFlags.confTransComplete &&
                                <View>
                                    <Text style={modalStyle.wordsText}>Your Transaction Has Completed!</Text>
                                    <TouchableHighlight
                                      style={modalStyle.modalButton}
                                      onPress={() => this._goToMenu()}>
                                    <Text style={{ margin: 5} }>Back to Menu</Text>
                                    </TouchableHighlight>
                                </View>
                            }

                        </View>
                    </View>
                </Modal>

            </View>



        )
    }
}

const localStyles = StyleSheet.create({
    transactionReviewContainer: {
        marginTop: 10,
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    submitButton: {
        height: 40,
        width: 200,
        resizeMode: "contain",
        alignSelf: "center",
    },
    assetLocationLabel: {
        height: 30,
        width: 150,
        resizeMode: "contain",
        marginTop: 10,
        alignSelf: "center"
    },
    teePrice: {
        color: "white"
    },
    docContainer: {
        width: "100%",
        height: 100,
    },
    imgContainer: {
        width: "100%",
        height: 125,
        justifyContent: "center"
    },
    text: {
        color: "white",
        alignSelf: "center",
        fontSize: 16,
        fontWeight: "normal",
        margin: 2,
        fontFamily: "dinPro"
    },
    thumb: {
        height: 50,
        width: 50,
        resizeMode: "cover",
        alignSelf: "center",
        margin: 4
    },
    editField: {
        height: 75,
        width: "100%",
        justifyContent: "center",
        padding: 3,
        margin: 10,
    },
    editLabel: {
        fontFamily: "dinPro",
        fontSize: 21,
        color: "yellow",
        margin: 2,
        alignSelf: "center",
    },
    transRevTime: {
        color: "#f3c736",
        fontFamily: "dinPro",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        flexDirection: "column",
    },
    transRevName: {
        fontFamily: "dinPro",
        fontSize: 16,
        color: "white",
        margin: 2,
        textAlign: "left"
    },

    revPropField: {
        height: 20,
        width: 225,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        margin: 2,
        backgroundColor: "#021227",
        alignSelf: "center"
    },
    revPropVal: {
        fontFamily: "dinPro",
        fontSize: 15,
        color: "white",
        //put this margin  top combat an overlap issue
        // marginTop: 20,
        padding: 2,
        textAlign: "center"
    },
    listContainer: {
        margin: 10,
        flex: 1,
        justifyContent: "center"
    },
    feeContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        margin: 5,
    },
    teePrice: {
        fontSize: 10,
        color: "white",
        backgroundColor: "#091141",
        marginRight: 5
    },
    hercPillarIcon: {
        height: 15,
        width: 15,
        resizeMode: "contain",
        borderRadius: 15 / 2
    }
});


const mapStateToProps = (state) => ({
    transInfo: state.AssetReducers.trans.header,
    transDat: state.AssetReducers.trans.data,
    transDataFlags: state.AssetReducers.transDataFlags,
    wallet: state.WalletActReducers.wallet
    // price: state.dataReducer.prices.list.pricePerHercForFCT
})

const mapDispatchToProps = (dispatch) => ({
    sendTrans: (transPrice) => dispatch(sendTrans(transPrice))
})

export default connect(mapStateToProps, mapDispatchToProps)(TransRev);
