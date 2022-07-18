import React, { useState } from "react";
import { View, Text, Dimensions, SafeAreaView, Image, StatusBar, ScrollView, Platform, TouchableOpacity } from "react-native";
import languageConfig from "../../languages/languageConfig";
import * as SCREEN from "../../context/screen/screenName";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import Loader from '../../components/loader/index';
import styles from "./Activitytourdetailstyle";

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const Avtivittourdetails = (props) => {

    const onPresstoAvtivitiyScreen = async () => {
        props.navigation.navigate(SCREEN.ACTIVITYSCREEN);
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={false} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.DARK_CONTENT} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                    <Image
                        style={{
                            width: WIDTH, height: HEIGHT * 0.4,
                            borderBottomRightRadius: 20,
                            borderBottomLeftRadius: 20,
                            resizeMode: KEY.COVER
                        }}
                        source={IMAGE.TRAVEL2}
                    />
                    <View style={{ alignSelf: KEY.FLEX_START, position: KEY.ABSOLUTE, top: 0, marginTop: 20, marginLeft: 15 }}>
                        <TouchableOpacity style={{
                            width: 35, height: 35, borderRadius: 100,
                            backgroundColor: COLOR.WHITE, justifyContent: KEY.CENTER, alignItems: KEY.CENTER,
                        }} onPress={() => onPresstoAvtivitiyScreen()}>
                            <Feather name="arrow-left" size={24} color={COLOR.BLACK} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.maincard}>
                    <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10, marginRight: 10 }}>
                        <Text style={styles.titletext}>{"Imagicaa Theme Park"}</Text>
                        <View style={{ flexDirection: KEY.ROW, marginBottom: 10 }}>
                            <Ionicons name="location-outline" size={18} color={COLOR.DEFALUTCOLOR} style={{ marginTop: 2 }} />
                            <Text style={styles.texttitle}>{"Lonavala"}</Text>
                            <Feather name="clock" size={18} color={COLOR.DEFALUTCOLOR} style={{ marginLeft: 10, marginTop: 2 }} />
                            <Text style={styles.texttitle}>{"11 Hours"}</Text>
                        </View>
                        <View style={{ flexDirection: KEY.COLUMN, marginBottom: 10 }}>
                            <Text style={[styles.texttitle, { fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM, marginBottom: 5 }]}>{"OverView"}</Text>
                            <Text style={styles.texttitle}>{"Bonjour Mon Ami! Paris needs no formal introduction - synonymous with culture, architecture, food and fashion. That je ne sais quoi of the French capital makes it the dream destination for many. So would you want to leave Paris 'Before Sunset' or would you take our word and spend a 'Midnight in Paris'?! The mesmerizing wrought-iron spire of the Eiffel Tower piercing the skyline, the Arc de Triomphe guarding the most glamorous avenue, the Champs Elysees, the regal Notre Dame cathedral, lamp lit bridges spanning the Seine and art nouveau cafes spilling onto wicker-chair-lined terraces."}</Text>
                        </View>
                        <View style={{ flexDirection: KEY.COLUMN, marginBottom: 5 }}>
                            <Text style={[styles.texttitle, { fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM, marginBottom: 5 }]}>{"Highlights"}</Text>
                        </View>
                        <View style={{ flexDirection: KEY.ROW, marginBottom: 5 }}>
                            <Entypo name="star" size={20} color={COLOR.DEFALUTCOLOR} style={{ marginTop: 5 }} />
                            <Text style={[styles.texttitle, { width: WIDTH / 1, lineHeight: 30, marginLeft: 5 }]}>{"One Of the most popular and top-selling Amusement Parks in Bangalore"}</Text>
                        </View>
                        <View style={{ flexDirection: KEY.ROW, marginBottom: 5 }}>
                            <Entypo name="star" size={20} color={COLOR.DEFALUTCOLOR} style={{ marginTop: 5 }} />
                            <Text style={[styles.texttitle, { width: WIDTH / 1, lineHeight: 30, marginLeft: 5 }]}>{"One Of the most popular and top-selling Amusement Parks in Bangalore"}</Text>
                        </View>
                        <View style={{ flexDirection: KEY.ROW, marginBottom: 5 }}>
                            <Entypo name="star" size={20} color={COLOR.DEFALUTCOLOR} style={{ marginTop: 5 }} />
                            <Text style={[styles.texttitle, { width: WIDTH / 1, lineHeight: 30, marginLeft: 5 }]}>{"One Of the most popular and top-selling Amusement Parks in Bangalore"}</Text>
                        </View>
                    </View>
                    {/* <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                        <View style={styles.blackcard}>
                            <View style={{ justifyContent: KEY.SPACEBETWEEN, flex: 1, flexDirection: KEY.ROW }}>
                                <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10 }}>
                                    <Text style={{ color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_16, fontWeight: FONT.FONT_WEIGHT_MEDIAM, fontFamily: FONT.FONT_BOLD }}>{"$20,000"}</Text>
                                    <Text style={{ color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_16 }}>{"per person"}</Text>
                                </View>
                                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginRight: 10 }}>
                                    <TouchableOpacity style={styles.continuebutton}>
                                        <Text style={{ fontSize: FONT.FONT_SIZE_18, color: COLOR.WHITE, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{"Continue"}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View> */}
                </View>

            </ScrollView>
        </SafeAreaView >
    )
}

export default Avtivittourdetails;