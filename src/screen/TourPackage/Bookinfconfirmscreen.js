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
import styles from "./Bookinfconfirmscreenstyle";


const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const Bookinfconfirmscreen = (props) => {

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
                            }}>{"Maldives"}</Text>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_16,
                                color: COLOR.DEFALUTCOLOR,
                                marginBottom: 10
                            }}>{"4N/5D"}</Text>
                            <View style={{ marginBottom: 10, flexDirection: KEY.COLUMN }}>

                                <Text style={{}}>{"Date: "}</Text>
                                <Text style={{ marginBottom: 10, color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_MEDIAM, fontFamily: FONT.FONT_BOLD }}>{"Fri, 1 Sep 2022-Mon, 5 Sep 2022"}</Text>
                                <Text style={{}}>{"Starting from: "} </Text>
                                <Text style={{ color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_MEDIAM, fontFamily: FONT.FONT_BOLD }}>{"Surat"}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.maincard1}>
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
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.DEFALUTCOLOR, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{"Total"}</Text>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.DEFALUTCOLOR, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{"$3800"}</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.paymentbutton} onPress={() => onPresstoHomeScreen()}>
                            <Text style={styles.buttontext}>{"Ok"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Bookinfconfirmscreen;