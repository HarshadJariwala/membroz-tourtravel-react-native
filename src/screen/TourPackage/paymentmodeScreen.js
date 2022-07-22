import React, { useState } from "react";
import { View, Text, Dimensions, SafeAreaView, Image, StatusBar, ScrollView, Platform, TouchableOpacity } from "react-native";
import languageConfig from "../../languages/languageConfig";
import * as SCREEN from "../../context/screen/screenName";
import AntDesign from 'react-native-vector-icons/AntDesign';
import CalendarStrip from 'react-native-calendar-strip';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import Loader from '../../components/loader/index';
import styles from "./PaymentModestyle";
import style from "react-native-datepicker/style";

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const paymentmodeScreen = (props) => {
    const PacakageDetailsList = props.route.params === undefined ? null : props.route.params.item;
    const [pacakagedetails, setPacakageDetails] = useState(PacakageDetailsList);

    const onPresstopricedetails = async () => {
        props.navigation.navigate(SCREEN.PACKAGEPRICEDETAILS);
    }

    const onPresstobookingconfirm = async (item) => {
        item = pacakagedetails;
        props.navigation.navigate(SCREEN.BOOKINFCONFIRMSCREEN, { item });
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={false} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.DARK_CONTENT} />
            <View style={{ justifyContent: KEY.SPACEBETWEEN, flexDirection: KEY.ROW, marginTop: 5, marginLeft: 10, marginRight: 10 }}>
                <TouchableOpacity onPress={() => onPresstopricedetails()}>
                    <AntDesign name="arrowleft" size={28} color={COLOR.BLACK} />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: FONT.FONT_SIZE_18, color: COLOR.BLACK, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{"Select Payment Mode"}</Text>
                </View>
                <View></View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={styles.maincontainer}>
                    <View style={styles.maincard}>
                        <View style={{ marginLeft: 10, marginTop: 5, marginBottom: 5, flexDirection: KEY.COLUMN }}>
                            <Text style={{ fontSize: FONT.FONT_SIZE_20, color: COLOR.BLACK, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}> {"Maldives"} </Text>
                            <Text style={{ color: COLOR.DEFALUTCOLOR, fontSize: FONT.FONT_SIZE_16, marginBottom: 5, marginLeft: 5 }}>{"4N/5D"}</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: 15, alignSelf: KEY.FLEX_START }}>
                        <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{"Payment Options"}</Text>
                    </View>
                    <View style={styles.maincard}>
                        <View style={{ flexDirection: KEY.ROW }}>
                            <TouchableOpacity style={styles.round}>
                                <FontAwesome name="circle" size={16} color={COLOR.DEFALUTCOLOR} />
                            </TouchableOpacity>
                            <View style={{ marginLeft: 15, marginTop: 8 }}>
                                <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_MEDIAM, fontFamily: FONT.FONT_BOLD }}>{"Cash"}</Text>
                                {/* <Text style={{ width: WIDTH / 1.30, color: COLOR.LIGHT_BLACK }}>{"Instant payment via UPI/Debit/Creadit card Using Any bank accoount"}</Text> */}
                            </View>
                        </View>
                        {/* <View style={{
                            borderWidth: 0.2, marginTop: 5, borderColor: COLOR.BRIGHT_GRAY,
                            marginRight: 15, marginLeft: 15, width: WIDTH - 60, marginBottom: 10, marginTop: 10
                        }} /> */}
                        {/* <View style={{ flexDirection: KEY.ROW, marginBottom: 10 }}>
                            <TouchableOpacity style={styles.round}>
                                <FontAwesome name="circle" size={16} color={COLOR.DEFALUTCOLOR} />
                            </TouchableOpacity>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 15 }}>
                                <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK, fontWeight: FONT.FONT_WEIGHT_MEDIAM, fontFamily: FONT.FONT_BOLD }}>{"Paytm"}</Text>
                                <Text style={{ width: WIDTH / 1.30, color: COLOR.LIGHT_BLACK }}>{"Instant payment via UPI/Debit/Creadit card using any bank account"}</Text>
                            </View>
                        </View> */}
                    </View>
                    <View style={{ marginTop: WIDTH / 1 }}>
                        <TouchableOpacity style={styles.paymentbutton} onPress={() => onPresstobookingconfirm()}>
                            <Text style={styles.buttontext}>{"Proceed to Pay $ 3800"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default paymentmodeScreen;