import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, SafeAreaView, Image, StatusBar, ScrollView, Platform, TouchableOpacity } from "react-native";
import languageConfig from "../../languages/languageConfig";
import * as SCREEN from "../../context/screen/screenName";
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import * as LocalService from '../../services/LocalService/LocalService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import Loader from '../../components/loader/index';
import styles from "./PackagePriceDetailsstyle";


const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const PackagePriceDetails = (props) => {
    const PacakageDetailsList = props.route.params === undefined ? null : props.route.params.item;
    const [pacakagedetails, setPacakageDetails] = useState(PacakageDetailsList);
    console.log("logo", pacakagedetails);
    const [logo, setLogo] = useState(null);
    const [customerInfo, setCustomerInfo] = useState(null);
    const [currencySymbol, setCurrencySymbol] = useState(null);
    const [loading, setloading] = useState(true);


    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        RemoteController();
        getMemberDeatilsLocalStorage
    }, []);

    //REMOTE DATA FATCH IN LOCAL STORAGE
    const RemoteController = async () => {
        var userData = await LocalService.RemoteServerController();
        if (userData) {
            setLogo(userData.applogo);
        }
    };

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var publicAuthkey = await LocalService.LocalBranchDetails();
        axiosConfig(publicAuthkey._id);
        console.log("publicAuthkey._id", publicAuthkey._id);
        const response = getCurrency(publicAuthkey.branchid.currency);
        setCurrencySymbol(response);
    }

    const onPresstoPackageBooking = async () => {
        props.navigation.navigate(SCREEN.PAKAGEBOOKINGSCREEN);
    }

    const onPresstopaymentmode = async (item) => {
        item = pacakagedetails;
        props.navigation.navigate(SCREEN.PAYMENTMODESCREEN, { item });
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={false} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.DARK_CONTENT} />
            <View style={{ justifyContent: KEY.SPACEBETWEEN, flexDirection: KEY.ROW, marginTop: 5, marginLeft: 10, marginRight: 10 }}>
                <TouchableOpacity onPress={() => onPresstoPackageBooking()}>
                    <AntDesign name="arrowleft" size={28} color={COLOR.BLACK} />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: FONT.FONT_SIZE_18, color: COLOR.BLACK, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{"Price Details"}</Text>
                </View>
                <View></View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={styles.maincontainer}>
                    <View style={styles.maincard}>
                        <View style={{ marginLeft: 10, marginTop: 5, marginBottom: 5 }}>
                            <Text style={{ fontSize: FONT.FONT_SIZE_20, color: COLOR.BLACK, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}> {pacakagedetails && pacakagedetails && pacakagedetails.title} </Text>
                        </View>
                        <View style={{ marginLeft: 15, marginBottom: 10, flexDirection: KEY.COLUMN, }}>
                            <Text style={{ color: COLOR.DEFALUTCOLOR, fontSize: FONT.FONT_SIZE_16, marginBottom: 5 }}>{pacakagedetails && pacakagedetails && pacakagedetails.duration}</Text>
                            <Text>{"Date: "}</Text>
                            <Text style={{ color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_MEDIAM, fontFamily: FONT.FONT_BOLD, marginBottom: 10 }}>{"Fri, 1 Sep 2022-Mon, 5 Sep 2022"}</Text>
                            <Text>{"From: "}</Text>
                            <Text style={{ color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_MEDIAM, fontFamily: FONT.FONT_BOLD }}>{pacakagedetails && pacakagedetails && pacakagedetails.locationname}</Text>
                        </View>
                    </View>
                </View>

                <View style={{ marginLeft: 15 }}>
                    <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{"Payment Summary"}</Text>
                </View>
                <View style={styles.maincontainer}>
                    <View style={styles.maincard}>
                        {/* <View style={{ flex: 1, flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 10 }}>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{"2 Adult * $1350"}</Text>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{"$2700"}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{"2 Child * $550"}</Text>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{"$1100"}</Text>
                        </View> */}
                        {/* <View style={{
                            borderWidth: 0.2, marginTop: 5, borderColor: COLOR.BRIGHT_GRAY,
                            marginRight: 15, marginLeft: 15, width: WIDTH - 60, marginBottom: 10, marginTop: 10
                        }} /> */}
                        <View style={{ flex: 1, flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.GRANITE_GRAY }}>{"Discount"}</Text>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.GRANITE_GRAY }}>{"$0"}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.GRANITE_GRAY }}>{"GST"}</Text>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.GRANITE_GRAY }}>{"$0"}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.GRANITE_GRAY }}>{"Convenience fees"}</Text>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.GRANITE_GRAY }}>{"$0"}</Text>
                        </View>
                        <View style={{
                            borderWidth: 0.2, marginTop: 5, borderColor: COLOR.BRIGHT_GRAY,
                            marginRight: 15, marginLeft: 15, width: WIDTH - 60, marginBottom: 5, marginTop: 10
                        }} />
                        <View style={{ flex: 1, flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 10 }}>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{"Total Payable Amount"}</Text>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{currencySymbol + (pacakagedetails && pacakagedetails && pacakagedetails.items[0].cost)}</Text>
                        </View>

                    </View>
                    <View style={{ flexDirection: KEY.COLUMN, alignSelf: KEY.FLEX_START, marginLeft: 15, }}>
                        <Text style={{ color: COLOR.GRANITE_GRAY, lineHeight: 25 }}>{"By continuing, i confirm that i have read the"}</Text>
                        <Text style={{ color: COLOR.DEFALUTCOLOR, lineHeight: 25 }}>{"User Agreement terms of Services "}
                            <Text style={{ color: COLOR.GRANITE_GRAY }}>{"&"}</Text>
                        </Text>
                        <Text style={{ color: COLOR.DEFALUTCOLOR, lineHeight: 25 }}>{"Cancellation Policy"}
                            <Text style={{ color: COLOR.GRANITE_GRAY }}> {"Of membroz.com"} </Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, }}>
                <View style={styles.blackcard}>
                    <View style={{ justifyContent: KEY.SPACEBETWEEN, flex: 1, flexDirection: KEY.ROW }}>
                        <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10 }}>
                            <Text style={{ color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_16, }}>{"Total Amount"}</Text>
                            <Text style={{ color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_16, fontWeight: FONT.FONT_WEIGHT_MEDIAM, fontFamily: FONT.FONT_BOLD }}>{currencySymbol + (pacakagedetails && pacakagedetails && pacakagedetails.items[0].cost)}</Text>
                        </View>
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginRight: 10, }}>
                            <TouchableOpacity style={styles.continuebutton} onPress={() => onPresstopaymentmode()}>
                                <Text style={{ fontSize: FONT.FONT_SIZE_18, color: COLOR.WHITE, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{"Continue"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default PackagePriceDetails;