import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, SafeAreaView, Image, StatusBar, ScrollView, Platform, TouchableOpacity } from "react-native";
import languageConfig from "../../languages/languageConfig";
import * as SCREEN from "../../context/screen/screenName";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import * as LocalService from '../../services/LocalService/LocalService';
import CalendarStrip from 'react-native-calendar-strip';
import getCurrency from '../../services/getCurrencyService/getCurrency';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import Loader from '../../components/loader/index';
import axiosConfig from "../../helpers/axiosConfig";
import styles from "./PakageBookingstyle";


const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const PakageBookingScreen = (props) => {
    const PacakageDetailsList = props.route.params === undefined ? null : props.route.params.item;

    const [pacakagedetails, setPacakageDetails] = useState(PacakageDetailsList);
    const [logo, setLogo] = useState(null);
    const [customerInfo, setCustomerInfo] = useState(null);
    const [currencySymbol, setCurrencySymbol] = useState(null);
    const [loading, setloading] = useState(true);

    const onPresstoPackagepricedetails = async (item) => {
        item = pacakagedetails;
        props.navigation.navigate(SCREEN.PACKAGEPRICEDETAILS, { item });
    }

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

    const onPresstoPackageBooking = async (item) => {
        props.navigation.navigate(SCREEN.PAKAGEBOOKINGSCREEN, { item });
    }

    useEffect(() => {
    }, [logo, pacakagedetails, loading, customerInfo, currencySymbol]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={false} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.DARK_CONTENT} />
            <View style={{ justifyContent: KEY.SPACEBETWEEN, flexDirection: KEY.ROW, marginTop: 5, marginLeft: 10, marginRight: 10 }}>
                <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
                    <AntDesign name="arrowleft" size={28} color={COLOR.BLACK} />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: FONT.FONT_SIZE_18, color: COLOR.BLACK, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{"Your Booking"}</Text>
                </View>
                <View></View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={styles.calendarcardstyle}>
                    <CalendarStrip
                        scrollable
                        style={{
                            height: 90,
                            paddingTop: 20,
                            paddingBottom: 10,
                            marginTop: 0,
                            marginBottom: 0,
                            width: WIDTH - 30,
                            borderRadius: 10,
                            shadowColor: COLOR.BLACK,
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.23,
                            shadowRadius: 2.62,
                            elevation: 3,
                            marginTop: 10,
                            marginBottom: 10,

                        }}
                        daySelectionAnimation={{
                            type: 'background',
                            duration: 200,
                            borderWidth: 1,
                            highlightColor: COLOR.BLACK,
                            textTransform: KEY.CAPITALIZE
                        }}
                        calendarColor={COLOR.WHITE}
                        calendarHeaderStyle={{
                            color: COLOR.BLACK, fontSize: FONT.FONT_SIZE_16,
                            textTransform: KEY.CAPITALIZE, marginTop: -15, marginBottom: 10
                        }} //Header Text
                        dateNumberStyle={styles.dateNumberStyle} //date Number
                        dateNameStyle={styles.dateNameStyle} // date Name                                        
                        highlightDateNumberStyle={{ color: COLOR.DEFALUTCOLOR, fontSize: FONT.FONT_SIZE_14, textTransform: KEY.CAPITALIZE }} //hightlight date Number
                        highlightDateNameStyle={{ color: COLOR.DEFALUTCOLOR, fontSize: FONT.FONT_SIZE_12, textTransform: KEY.CAPITALIZE, fontWeight: FONT.BOLD }} // hightlight  date Name
                        //selectedDate={Date(selectionDate ? selectionDate : today)}
                        iconLeftStyle={styles.iconleftStyle}
                        iconRightStyle={styles.iconrightStyle}
                        onDateSelected={(date) => selectDateToGetClassList(date)}
                        iconStyle={styles.iconStyle}
                    />
                </View>
                <View style={styles.maincontainer}>
                    <View style={{ alignSelf: KEY.FLEX_START, marginLeft: 15, marginTop: 5, marginBottom: 5 }}>
                        <Text style={styles.texttitle}>{"Your Pacakage"}</Text>
                    </View>
                    <View style={styles.maincard}>
                        <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN }}>
                            <View style={{ marginLeft: 10, marginTop: 5, marginBottom: 5 }}>
                                <Text style={{ fontSize: FONT.FONT_SIZE_20, color: COLOR.BLACK, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}> {pacakagedetails && pacakagedetails && pacakagedetails.title} </Text>
                            </View>
                            <TouchableOpacity style={styles.pricebox}>
                                <Text style={styles.pricetext}>{currencySymbol + (pacakagedetails && pacakagedetails && pacakagedetails.items[0].cost)}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginLeft: 15, marginBottom: 10, flexDirection: KEY.COLUMN }}>
                            <Text style={{ color: COLOR.DEFALUTCOLOR, fontSize: FONT.FONT_SIZE_16, marginBottom: 5 }}>{pacakagedetails && pacakagedetails && pacakagedetails.duration}</Text>
                        </View>
                        {/* <View style={{ marginLeft: 15, marginBottom: 10, flexDirection: KEY.COLUMN }}>
                            
                            <Text style={{}}>{"Date: "}
                                <Text style={{ color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_MEDIAM, fontFamily: FONT.FONT_BOLD }}>{"Fri, 1 Sep 2022-Mon, 5 Sep 2022"}</Text>
                            </Text>
                            <Text style={{}}>{"Starting from: "}
                                <Text style={{ color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_MEDIAM, fontFamily: FONT.FONT_BOLD }}>{"Surat"}</Text>
                            </Text>
                        </View> */}
                        {/* <View style={{ justifyContent: KEY.SPACEBETWEEN, flexDirection: KEY.ROW, marginBottom: 10, marginRight: 15 }}>
                            <View style={{ marginLeft: 15, flexDirection: KEY.COLUMN }}>
                                <Text style={styles.texttitle}>{"Adult"}</Text>
                                <Text>{"Height above 140 cm"}</Text>
                            </View>
                            <View style={styles.smallcard}>
                                <TouchableOpacity>
                                    <Feather name="minus" size={14} color={COLOR.BLACK} />
                                </TouchableOpacity>
                                <Text style={{ color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_MEDIAM, fontFamily: FONT.FONT_BOLD }}>{"2"}</Text>
                                <TouchableOpacity>
                                    <Feather name="plus" size={14} color={COLOR.BLACK} />
                                </TouchableOpacity>
                            </View>
                            <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{"$50"}</Text>
                        </View> */}

                        {/* <View style={{ justifyContent: KEY.SPACEBETWEEN, flexDirection: KEY.ROW, marginBottom: 10, marginRight: 15 }}>
                            <View style={{ marginLeft: 15, flexDirection: KEY.COLUMN }}>
                                <Text style={styles.texttitle}>{"Child"}</Text>
                                <Text>{"Height 85 cm-140 cm"}</Text>
                            </View>
                            <View style={styles.smallcard}>
                                <TouchableOpacity>
                                    <Feather name="minus" size={16} color={COLOR.BLACK} />
                                </TouchableOpacity>
                                <Text style={{ color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_MEDIAM, fontFamily: FONT.FONT_BOLD }}>{"2"}</Text>
                                <TouchableOpacity>
                                    <Feather name="plus" size={16} color={COLOR.BLACK} />
                                </TouchableOpacity>
                            </View>
                            <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{"$1350"}</Text>
                        </View> */}
                    </View>


                </View>

            </ScrollView>
            <View style={styles.blackcard}>
                <View style={{ alignSelf: KEY.FLEX_END, marginRight: 10 }}>
                    <TouchableOpacity style={styles.continuebutton} onPress={() => onPresstoPackagepricedetails()}>
                        <Text style={{ fontSize: FONT.FONT_SIZE_18, color: COLOR.WHITE, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{"Continue"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

    )
}

export default PakageBookingScreen;