import React, { useState } from "react";
import { View, Text, Dimensions, SafeAreaView, Image, StatusBar, ScrollView, Platform, TouchableOpacity } from "react-native";
import languageConfig from "../../languages/languageConfig";
import * as SCREEN from "../../context/screen/screenName";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import Loader from '../../components/loader/index';
import styles from "./TourPackagesliststyle";

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const TourPackageListScreen = (props) => {
    const onPresstoTourScreen = async () => {
        props.navigation.navigate(SCREEN.TOURPAKAGESCREEN);
    }
    const onPresstoPackageBooking = async () => {
        props.navigation.navigate(SCREEN.PAKAGEBOOKINGSCREEN);
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={false} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.DARK_CONTENT} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View>
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
                            }} onPress={() => onPresstoTourScreen()}>
                                <Feather name="arrow-left" size={24} color={COLOR.BLACK} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                        <View style={styles.maincard}>
                            <View style={{ marginLeft: 10, marginTop: 10, marginBottom: 10, flexDirection: KEY.COLUMN }}>
                                <Text style={styles.titletext}>{"Maldives"}</Text>
                                <Text style={[styles.titletext, { color: COLOR.DEFALUTCOLOR }]}>{"4N/5D"}</Text>
                                <View>
                                    <Text style={styles.texttitle}>{"OverView"}</Text>
                                    <Text style={{ fontSize: FONT.FONT_SIZE_16, lineHeight: 20 }}>{"Bonjour Mon Ami! Paris needs no formal introduction - synonymous with culture, architecture, food and fashion. That je ne sais quoi of the French capital makes it the dream destination for many. So would you want to leave Paris 'Before Sunset' or would you take our word and spend a 'Midnight in Paris'?! The mesmerizing wrought-iron spire of the Eiffel Tower piercing the skyline, the Arc de Triomphe guarding the most glamorous avenue, the Champs Elysees, the regal Notre Dame cathedral, lamp lit bridges spanning the Seine and art nouveau cafes spilling onto wicker-chair-lined terraces."}</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 10, marginBottom: 10, flexDirection: KEY.COLUMN, }}>
                                <View style={{ justifyContent: KEY.SPACEBETWEEN, flex: 1, flexDirection: KEY.ROW, marginLeft: 10, marginRight: 10 }}>
                                    <Text style={styles.texttitle}>{"Photo Gallery"}</Text>
                                    <TouchableOpacity>
                                        <Text style={{
                                            fontSize: FONT.FONT_SIZE_14,
                                            color: COLOR.DEFALUTCOLOR,
                                            marginBottom: 5
                                        }}>{"View all"}</Text>
                                    </TouchableOpacity>
                                </View>
                                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                                    <View style={{ flexDirection: KEY.ROW, marginLeft: 5, marginRight: 5 }}>
                                        <View style={{ flexDirection: KEY.COLUMN }}>
                                            <Image style={styles.photogallerystyle}
                                                source={IMAGE.TRAVEL1}
                                            />
                                            <Text style={styles.decriptiontext}>{"Adaran Prestige Vadoo"}</Text>
                                        </View>
                                        <View style={{ flexDirection: KEY.COLUMN }}>
                                            <Image style={styles.photogallerystyle}
                                                source={IMAGE.TRAVEL1}
                                            />
                                            <Text style={styles.decriptiontext}>{"Adaran Prestige Vadoo"}</Text>
                                        </View>
                                        <View style={{ flexDirection: KEY.COLUMN }}>
                                            <Image style={styles.photogallerystyle}
                                                source={IMAGE.TRAVEL1}
                                            />
                                            <Text style={styles.decriptiontext}>{"Adaran Prestige Vadoo"}</Text>
                                        </View>
                                        <View style={{ flexDirection: KEY.COLUMN, marginBottom: 10 }}>
                                            <Image style={styles.photogallerystyle}
                                                source={IMAGE.TRAVEL1}
                                            />
                                            <Text style={styles.decriptiontext}>{"Adaran Prestige Vadoo"}</Text>
                                        </View>
                                    </View>
                                </ScrollView>

                                <View style={{ marginLeft: 10 }}>
                                    <Text style={styles.texttitle}>{"Inclusions"}</Text>
                                    <View style={{ flexDirection: KEY.ROW }}>
                                        <Feather name="check" size={25} color={COLOR.LIGHT_GREEN} />
                                        <Text style={{ fontSize: FONT.FONT_SIZE_16, marginLeft: 5 }}>{"Admission ticket to the experience"}</Text>
                                    </View>
                                    <View style={{ flexDirection: KEY.ROW }}>
                                        <Feather name="check" size={25} color={COLOR.LIGHT_GREEN} />
                                        <Text style={{ fontSize: FONT.FONT_SIZE_16, marginLeft: 5 }}>{"Access to all rides"}</Text>
                                    </View>
                                    <View style={{ flexDirection: KEY.ROW }}>
                                        <Feather name="check" size={25} color={COLOR.LIGHT_GREEN} />
                                        <Text style={{ fontSize: FONT.FONT_SIZE_16, marginLeft: 5 }}>{"Parking charges"}</Text>
                                    </View>
                                    <View style={{ flexDirection: KEY.ROW }}>
                                        <Feather name="check" size={25} color={COLOR.LIGHT_GREEN} />
                                        <Text style={{ fontSize: FONT.FONT_SIZE_16, marginLeft: 5, width: WIDTH / 1.50 }}>{"Free Entry to children less than 85 cm in height"}</Text>
                                    </View>
                                    <View style={{ flexDirection: KEY.ROW }}>
                                        <Feather name="check" size={25} color={COLOR.LIGHT_GREEN} />
                                        <Text style={{ fontSize: FONT.FONT_SIZE_16, marginLeft: 5, width: WIDTH / 1.50 }}>{"Offer prices are inclusive of all taxes and service charges."}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                <View style={styles.blackcard}>
                                    <View style={{ justifyContent: KEY.SPACEBETWEEN, flex: 1, flexDirection: KEY.ROW }}>
                                        <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10 }}>
                                            <Text style={{ color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_16, fontWeight: FONT.FONT_WEIGHT_MEDIAM, fontFamily: FONT.FONT_BOLD }}>{"$20,000"}</Text>
                                            <Text style={{ color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_16 }}>{"per person"}</Text>
                                        </View>
                                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginRight: 10, }}>
                                            <TouchableOpacity style={styles.continuebutton} onPress={() => onPresstoPackageBooking()}>
                                                <Text style={{ fontSize: FONT.FONT_SIZE_18, color: COLOR.WHITE, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{"Continue"}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default TourPackageListScreen;