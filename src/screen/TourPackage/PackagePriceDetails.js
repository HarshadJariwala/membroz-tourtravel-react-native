import React, { useState } from "react";
import { View, Text, Dimensions, SafeAreaView, Image, StatusBar, ScrollView, Platform, TouchableOpacity } from "react-native";
import languageConfig from "../../languages/languageConfig";
import * as SCREEN from "../../context/screen/screenName";
import AntDesign from 'react-native-vector-icons/AntDesign';
import CalendarStrip from 'react-native-calendar-strip';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import Loader from '../../components/loader/index';
import styles from "./PackagePriceDetailsstyle";


const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const PackagePriceDetails = (props) => {

    const onPresstoPackageBooking = async () => {
        props.navigation.navigate(SCREEN.PAKAGEBOOKINGSCREEN);
    }

    const onPresstopaymentmode = async () => {
        props.navigation.navigate(SCREEN.PAYMENTMODESCREEN);
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
                            <Text style={{ fontSize: FONT.FONT_SIZE_20, color: COLOR.BLACK, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}> {"Maldives"} </Text>
                        </View>
                        <View style={{ marginLeft: 15, marginBottom: 10, flexDirection: KEY.COLUMN, }}>
                            <Text style={{ color: COLOR.DEFALUTCOLOR, fontSize: FONT.FONT_SIZE_16, marginBottom: 5 }}>{"4N/5D"}</Text>
                            <Text>{"Date: "}</Text>
                            <Text style={{ color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_MEDIAM, fontFamily: FONT.FONT_BOLD, marginBottom: 10 }}>{"Fri, 1 Sep 2022-Mon, 5 Sep 2022"}</Text>
                            <Text>{"From: "}</Text>
                            <Text style={{ color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_MEDIAM, fontFamily: FONT.FONT_BOLD }}>{"Surat"}</Text>
                        </View>
                    </View>
                </View>

                <View style={{ marginLeft: 15 }}>
                    <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{"Booking Summary"}</Text>
                </View>
                <View style={styles.maincontainer}>
                    <View style={styles.maincard}>
                        <View style={{ flex: 1, flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 10 }}>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{"2 Adult * $1350"}</Text>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{"$2700"}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{"2 Child * $550"}</Text>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{"$1100"}</Text>
                        </View>
                        <View style={{
                            borderWidth: 0.2, marginTop: 5, borderColor: COLOR.BRIGHT_GRAY,
                            marginRight: 15, marginLeft: 15, width: WIDTH - 60, marginBottom: 10, marginTop: 10
                        }} />
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
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{"$3800"}</Text>
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
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 50, marginBottom: 10 }}>
                        <View style={styles.blackcard}>
                            <View style={{ justifyContent: KEY.SPACEBETWEEN, flex: 1, flexDirection: KEY.ROW }}>
                                <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10 }}>
                                    <Text style={{ color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_16, }}>{"Total Amount"}</Text>
                                    <Text style={{ color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_16, fontWeight: FONT.FONT_WEIGHT_MEDIAM, fontFamily: FONT.FONT_BOLD }}>{"$3800"}</Text>
                                </View>
                                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginRight: 10, }}>
                                    <TouchableOpacity style={styles.continuebutton} onPress={() => onPresstopaymentmode()}>
                                        <Text style={{ fontSize: FONT.FONT_SIZE_18, color: COLOR.WHITE, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{"Continue"}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PackagePriceDetails;