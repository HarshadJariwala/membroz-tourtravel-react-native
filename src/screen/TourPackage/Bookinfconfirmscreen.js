import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, SafeAreaView, Image, StatusBar, ScrollView, Platform, TouchableOpacity } from "react-native";
import languageConfig from "../../languages/languageConfig";
import * as SCREEN from "../../context/screen/screenName";
import Feather from 'react-native-vector-icons/Feather';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import * as LocalService from '../../services/LocalService/LocalService';
import Loader from '../../components/loader/index';
import styles from "./Bookinfconfirmscreenstyle";
import axiosConfig from "../../helpers/axiosConfig";


const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const Bookinfconfirmscreen = (props) => {
    const PacakageDetailsList = props.route.params === undefined ? null : props.route.params.item;

    const [pacakagedetails, setPacakageDetails] = useState(PacakageDetailsList);
    console.log("data", pacakagedetails);
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

    useEffect(() => {
    }, [logo, pacakagedetails, loading, customerInfo, currencySymbol]);

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

    const onPresstoHomeScreen = async () => {
        props.navigation.navigate(SCREEN.HOMESCREEN);
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={false} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.DARK_CONTENT} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={styles.maincontainer}>
                    <View style={styles.maincard}>
                        <View style={styles.round}>
                            <Feather name="check" size={40} color={COLOR.GREEN} />
                        </View>
                        <View>
                            <Text style={styles.hedertext}>{"Booking Completed!"}</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, marginBottom: 10 }}>{"Order Number #125420"}</Text>
                        </View>
                    </View>
                    <View style={{ alignSelf: KEY.FLEX_START, marginLeft: 15, marginBottom: 10 }}>
                        <Text style={{ fontSize: FONT.FONT_SIZE_18, color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_MEDIAM, fontFamily: FONT.FONT_BOLD }}>{"Booking details"}</Text>
                    </View>
                    <View style={styles.maincard}>
                        <View style={{ alignSelf: KEY.FLEX_START, marginLeft: 10, marginTop: 10, marginBottom: 10, flexDirection: KEY.COLUMN }}>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_18,
                                color: COLOR.BLACK,
                                fontWeight: FONT.FONT_WEIGHT_MEDIAM,
                                fontFamily: FONT.FONT_BOLD
                            }}>{pacakagedetails && pacakagedetails && pacakagedetails.title}</Text>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_16,
                                color: COLOR.DEFALUTCOLOR,
                                marginBottom: 10
                            }}>{pacakagedetails && pacakagedetails && pacakagedetails.duration}</Text>
                            <View style={{ marginBottom: 10, flexDirection: KEY.COLUMN }}>

                                <Text style={{}}>{"Date: "}</Text>
                                <Text style={{ marginBottom: 10, color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_MEDIAM, fontFamily: FONT.FONT_BOLD }}>{"Fri, 1 Sep 2022-Mon, 5 Sep 2022"}</Text>
                                <Text style={{}}>{"Starting from: "} </Text>
                                <Text style={{ color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_MEDIAM, fontFamily: FONT.FONT_BOLD }}>{"Surat"}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.maincard1}>
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
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.DEFALUTCOLOR, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{"Total"}</Text>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.DEFALUTCOLOR, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{"$3800"}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{ position: "absolute", bottom: 0, justifyContent: KEY.CENTER, alignItems: KEY.CENTER, alignSelf: KEY.CENTER }}>
                <TouchableOpacity style={styles.paymentbutton} onPress={() => onPresstoHomeScreen()}>
                    <Text style={styles.buttontext}>{"Ok"}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Bookinfconfirmscreen;