"use strict";
import { StyleSheet } from "react-native";

module.exports = StyleSheet.create({
  headerTitle: {
    // borderColor: "blue",
    // borderWidth: 3,
    // backgroundColor: "blue",
    display: "flex",
    height: 70,
    width: "100%",
    alignSelf: "center",
    // justifyContent: "center",
    alignContent: "center",
    // alignItems: "center"
    // marginLeft: 20,
    // backgroundColor: "green"
  },
  headerLogo: {
    // borderColor: "red",
    // borderWidth: 3,
    resizeMode: "contain",
    height: 50,
    width: 200,
    // borderRadius: 25 / 2,
    alignSelf: "center",
    // justifyContent: "center",
    flex: 1,
    // marginLeft: "16%",
    marginBottom: 15,
    // padding: 10,
    marginTop: 10
    // height: 300,
    // width: 700
  },
  headerText: {
    fontFamily: "dinPro",
    fontSize: 22,
    alignSelf: "center",
    fontWeight: "normal",
    color: "black",
    textAlign: "center"
  },

  backArrow: {
    width: 35,
    height: 30,
    marginLeft: 5
  },
  drawerIcon: {
    width: 30,
    height: 30,
    marginRight: 25,
  },
  assetHeaderLogo: {
    height: 45,
    width: 45,
    borderRadius: 35 / 2,
    resizeMode: "contain",
  },
  assetHeaderTitle: {
    height: 50,
    width: 200,
    alignSelf: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    marginLeft: "16%",

  },

  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center"
  },
  containerCenter: {
    width: "95%",
    height: "100%",
    backgroundColor: "#091141",
    alignItems: "center",
    justifyContent: "flex-start",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    // paddingRight: 10,
    // paddingTop: 25

  },

  locationImage: {
    height: 50,
    width: 200,
    resizeMode: "contain",
    margin: 5,
    alignSelf: "center"
  },

  menuButton: {
    // borderColor: "yellow",
    // borderWidth: 3,
    width: 200,
    height: 45,
    margin: 10,
    resizeMode: "contain",
    borderRadius: 2,
    // borderWidth: 2,
    // borderColor: "black"
  },
  menuItemField: {
    display: "flex",
    flexDirection: "row",
    width: 200,
    height: 45,
    backgroundColor: 'white',
    borderRadius: 2,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    margin: 10,
    // marginTop: 10,
    paddingLeft: 3
  },
  menuItemField__textBox: {
    // borderColor: "orange",
    // borderWidth: 3,
    flex: 1
  },
  assetLogo: {
    // borderColor: "green",
    // borderWidth: 3,
    height: 25,
    width: 25,
    marginLeft: "4%",
    borderRadius: 25 / 2,
    // resizeMode: "contain"
  },
  assetLabel: {
    color: "black",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "normal",
    margin: 5,
    // marginLeft: "20%",
    fontFamily: "dinPro"
  },



  ///I think this is the start of the old styles

  // createParamsLogo: {
  //   resizeMode: "contain",
  //   height: 200,
  //   width: 300
  // },
  // text: {
  //   color: "black",
  //   alignSelf: "center",
  //   fontSize: 15.2,
  //   fontWeight: "normal",
  //   margin: 5,
  //   fontFamily: "dinPro"
  // },
  transReview: {
    // borderColor: "yellow",
    // borderWidth: 3,
    alignSelf: "center",
    // flex: 1,
    color: "red",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "dinPro",
    // justifyContent: "flex-start",
    marginTop: 14
  },
  imagePreview: {
    height: 125,
    width: 125,
    margin: 5
  },

  thumb: {
    borderWidth: 3,
    borderColor: "yellow",
    height: 25,
    width: 25,
    margin: 5,
    resizeMode: "contain"
  },
  feeIconField: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#747893"
  },

  feeIcon: {
    height: 15,
    width: 15,
    // margin: 5,
    resizeMode: "contain",
    backgroundColor: "#747893"
  },
  feeField: {
    flexDirection: "row",
    backgroundColor: "#464c70",
    height: 30,
    width: 200,
    paddingRight: 33,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",

  },

  scrollMenu: {

    height: 200,
    width: "85%",
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#021227",
    paddingTop: 5,
    paddingBottom: 5
  },
  scrollContent: {
    flex: 1,
    padding: 2,
    justifyContent: "space-around"
  },
  inputMenu: {
    width: "110%",
    height: 350,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#021227"
    // paddingTop: 50
    // margin: .5,
  },

  inputView: {
    height: 300,
    width: "95%",
    alignItems: "center"
  },
  smallMenu: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#021227"
    // paddingTop: 50
    // margin: .5,
  },
  menuInputTitle: {
    width: 300,
    height: 50,
    margin: 5
    // marginBottom: 10 
    // marginTop: 10
  },
  noTransLabel: {
    color: "white",
    width: 130,
    fontSize: 20.2,
    fontWeight: "600",
    paddingLeft: 5,
    fontFamily: "dinPro"
  },

  label: {
    color: "white",
    width: 120,
    fontSize: 20.2,
    fontWeight: "600",
    paddingLeft: 5,
    fontFamily: "dinPro"
  },
  transPropLabel: {
    color: "white",
    alignSelf: "center",
    fontWeight: "400",
    fontFamily: "dinPro",
    fontSize: 14
  },

  // transRevName: {
  //   fontFamily: "dinPro",
  //   fontSize: 16,
  //   color: "white",
  //   margin: 2,
  //   textAlign: "left"
  // },
  // transRevTime: {
  //   color: "#f3c736",
  //   fontFamily: "dinPro",
  //   textAlign: "center",
  //   fontSize: 20,
  //   fontWeight: "bold"
  // },
  // revPropField: {
  //   height: 20,
  //   width: 225,
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   padding: 2,
  //   margin: 2,
  //   // textAlign:'center',
  //   // textAlignVertical: 'center',
  //   backgroundColor: "#021227",
  //   alignSelf: "center"
  // },

  // revPropVal: {
  //   fontFamily: "dinPro",
  //   fontSize: 15,
  //   color: "#f3c736",
  //   margin: 2,
  //   textAlign: "right"
  // },
  // editLabel: {
  //   fontFamily: "dinPro",
  //   fontSize: 21,
  //   color: "white",
  //   margin: 5,
  //   alignSelf: "center",
  //   // height: 30
  // },
  // editTouch: {
  //   height: 85,
  //   margin: 5,
  //   width: "75%"
  // },
  // editField: {
  //   height: 75,
  //   width: "75%",
  //   flexDirection: "row",
  //   justifyContent: "flex-start",
  //   padding: 3,
  //   // margin: 5,
  //   // textAlign:'center',
  //   // textAlignVertical: 'center',
  //   backgroundColor: "#021227"
  // },
  // editName: {
  //   fontFamily: "dinPro",
  //   fontSize: 21,
  //   color: "white",
  //   margin: 2,
  //   alignSelf: "center",
  //   height: 75,
  //   justifyContent: "center",
  //   textAlign: "center"
  // },
  // input: {
  //   width: 150,
  //   height: 40,
  //   textAlign: "center",
  //   backgroundColor: "#132c4a",
  //   // margin: .5,
  //   fontSize: 20.2,
  //   fontWeight: "600",
  //   borderColor: "#142535",
  //   color: "white",
  //   borderWidth: 1
  // paddingLeft: 1
  // },
  teeLabel: {
    height: 50,
    width: 300,
    resizeMode: "contain"
  },

  field: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    backgroundColor: "#021227",
    // marginTop: 5,
    // marginBottom: 5,
    alignItems: "center",
    paddingLeft: 5,
    marginBottom: 5
  },

  picker: {
    height: 175,
    backgroundColor: "#021227",
    width: "80%",
    marginTop: 50,
    alignSelf: "center",
    // flexDirection: "row",
    justifyContent: "center",
    // width: "80%",
    // backgroundColor: '#021227',
    // marginTop: 5,
    // marginBottom: 5,
    alignItems: "center",
    paddingLeft: 5
    // backgroundColor: 'blue'
  },


  btnImg: {
    resizeMode: "cover"
  },
  assetMenu: {
    height: 300,
    width: "80%",
    backgroundColor: "#021227",
    justifyContent: "center",
    alignItems: "center",
    padding: 5
  },



  assetDeleteButton: {
    color: "#f3c736",
    fontWeight: "200",
    fontSize: 10,
    textAlign: "center",
    textAlignVertical: "center",
    height: 14,
    width: 50,
    backgroundColor: "#091141"
  },
  assetHeaderLabel: {
    color: "white",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "600",
    // marginLeft: '30%',
    fontFamily: "dinPro"
  },
  assetHeaderImage: {
    height: 100,
    width: 100,
    margin: 5,
    borderRadius: 50
  },
  assetFieldHeader: {
    height: 200,
    // backgroundColor: 'blue',
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    margin: 3
    // marginTop: 15,
    // width: "40%"
  },

  assetMenuLabel: {
    textAlign: "center",
    color: "white",
    width: 300,
    fontSize: 20.2,
    fontWeight: "600",
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#021227",
    margin: 10
  },

  assetLocation: {
    height: 30,
    width: 150,
    resizeMode: "contain",
    marginTop: 50,
    alignSelf: "center"
    // marginRight: 10
  },
  // assetLocationNoTopMargin: {
  //   height: 50,
  //   width: 150,
  //   resizeMode: "contain",
  //   marginTop: 5,
  //   alignSelf: "center"
  //   // marginRight: 10
  // },
  // assetFee: {
  //   height: 50,
  //   width: 150,
  //   // resizeMode: 'cover',
  //   flexDirection: "row",
  //   // justifyContent: 'space-between',
  //   // textAlign: "center",
  //   justifyContent: "center",
  //   alignItems: "center"
  // },
  // assetFeeLabel: {
  //   height: 40,
  //   width: 30,
  //   backgroundColor: "#021227",
  //   resizeMode: "contain",
  //   marginRight: 5

  teePriteePrice: {
    backgroundColor: "#021227",
    textAlign: "center",
    fontSize: 20.2,
    fontWeight: "400",
    // borderColor: "#142535",
    color: "white",
    height: 30
  },
  subHeader: {
    flexDirection: "row",
    width: "80%",
    height: 110,
    backgroundColor: "#021227",
    justifyContent: "space-between",
    padding: 5,
    margin: 5,
    marginTop: 10
  },
  picButton: {
    borderColor: "#F3C736",
    backgroundColor: "#021227",
    borderWidth: 0.5,
    height: 45,
    width: 200,
    margin: 5,
    color: "white",
    justifyContent: "flex-end",
    fontFamily: "dinPro",
    alignItems: "center",
    textAlignVertical: "center",
    alignSelf: "center"
  },
  scrollView: {
    // borderColor: "white",
    // borderWidth: 3,
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    width: "100%",
    justifyContent: "center",
  }
});
