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
import styles from "./PakageBookingstyle";

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const PakageBookingScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={false} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.DARK_CONTENT} />
            <View style={{ justifyContent: KEY.SPACEBETWEEN, flexDirection: KEY.ROW, marginTop: 5, marginLeft: 10, marginRight: 10 }}>
                <TouchableOpacity>
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
                        // selectedDate={Date(selectionDate ? selectionDate : today)}
                        iconLeftStyle={styles.iconleftStyle}
                        iconRightStyle={styles.iconrightStyle}
                        onDateSelected={(date) => selectDateToGetClassList(date)}
                        iconStyle={styles.iconStyle}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default PakageBookingScreen;