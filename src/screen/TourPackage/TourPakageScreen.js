import React from "react";
import { View, Text, Dimensions, SafeAreaView, Image, StatusBar, ScrollView, Platform, TouchableOpacity } from "react-native";
import * as KEY from '../../context/actions/key';
import languageConfig from "../../languages/languageConfig";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as FONT from '../../styles/typography';
import * as SCREEN from "../../context/screen/screenName";
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from "./TourPakagestyle";

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const TourPakageScreen = (props) => {

    //OPEN PAYMENT SCREEN
    const onPresstoTourDetails = async () => {
        props.navigation.navigate(SCREEN.TOURPACKAGELISTSCREEN);
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={false} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.DARK_CONTENT} />
            <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, padding: 10 }}>
                <TouchableOpacity style={{ marginTop: 8 }}>
                    <AntDesign name="arrowleft" size={28} color={COLOR.BLACK} />
                </TouchableOpacity>
                <View style={{ flexDirection: KEY.COLUMN, alignSelf: KEY.FLEX_START, flex: 1, marginLeft: 10 }}>
                    <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK }}>{"Starting from"}</Text>
                    <Text style={{ fontSize: FONT.FONT_SIZE_20, color: COLOR.BLACK, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{"Surat"}</Text>
                </View>
                <TouchableOpacity style={{ flexDirection: KEY.ROW, marginRight: 5, marginLeft: 5, marginTop: 8 }}>
                    <MaterialIcons name="edit" size={24} color={COLOR.DEFALUTCOLOR} />
                    <Text style={styles.changetext}>{"Change"}</Text>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <TouchableOpacity style={styles.maincontainer}>
                    <View style={styles.serachboxstyle}>
                        <Text style={styles.serachtext}>{"Serach"}</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, flexDirection: KEY.COLUMN }}>
                    <Text style={styles.titletext}>{"Travel by Categories"}</Text>
                    <View style={{
                        borderWidth: 0.2, marginTop: 5, borderColor: COLOR.BLACK,
                        marginRight: 15, marginLeft: 15, width: WIDTH * 0.2, marginBottom: 5, marginTop: 10
                    }} />
                </View>
                <View style={{ flexDirection: KEY.ROW, flex: 1, justifyContent: KEY.SPACEBETWEEN, marginLeft: 20, marginRight: 20, marginTop: 10, marginBottom: 10 }}>
                    <TouchableOpacity>
                        <Image
                            style={styles.imagestyle}
                            source={IMAGE.TRAVEL2}
                            resizeMode={KEY.COVER}
                        />
                        <View style={styles.text}>
                            <Text style={styles.cardtext}>{"Goa"}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            style={styles.imagestyle}
                            source={IMAGE.TRAVEL1}
                            resizeMode={KEY.COVER}
                        />
                        <View style={styles.text}>
                            <Text style={styles.cardtext}>{"Hill Station"}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: KEY.ROW, flex: 1, justifyContent: KEY.SPACEBETWEEN, marginLeft: 20, marginRight: 20, marginTop: 10, marginBottom: 10 }}>
                    <TouchableOpacity>
                        <Image
                            style={styles.imagestyle}
                            source={IMAGE.TRAVEL3}
                            resizeMode={KEY.COVER}
                        />
                        <View style={styles.text}>
                            <Text style={styles.cardtext}>{"Beach"}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            style={styles.imagestyle}
                            source={IMAGE.TRAVEL1}
                            resizeMode={KEY.COVER}
                        />
                        <View style={styles.text}>
                            <Text style={styles.cardtext}>{"Goa"}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, flexDirection: KEY.COLUMN }}>
                    <Text style={styles.titletext}>{"Best Holiday Destinations"}</Text>
                    <View style={{
                        borderWidth: 0.2, marginTop: 5, borderColor: COLOR.BLACK,
                        marginRight: 15, marginLeft: 15, width: WIDTH * 0.2, marginBottom: 5, marginTop: 10
                    }} />
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    <View style={{ flexDirection: KEY.ROW, marginLeft: 15, marginRight: 15, marginTop: 5, marginBottom: 10 }}>
                        <TouchableOpacity style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <Image style={styles.imagecard} source={IMAGE.TRAVEL1} />
                            <Text style={styles.text_1}>{"Goa"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <Image style={styles.imagecard} source={IMAGE.TRAVEL2} />
                            <Text style={styles.text_1}>{"Manali"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <Image style={styles.imagecard} source={IMAGE.TRAVEL3} />
                            <Text style={styles.text_1}>{"Hiil Station"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <Image style={styles.imagecard} source={IMAGE.TRAVEL1} />
                            <Text style={styles.text_1}>{"Girnar"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <Image style={styles.imagecard} source={IMAGE.TRAVEL2} />
                            <Text style={styles.text_1}>{"Nainital"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <Image style={styles.imagecard} source={IMAGE.TRAVEL3} />
                            <Text style={styles.text_1}>{"Mumbai"}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, flexDirection: KEY.COLUMN, marginTop: 5 }}>
                    <Text style={styles.titletext}>{"Popular Destination Packages"}</Text>
                    <View style={{
                        borderWidth: 0.2, marginTop: 5, borderColor: COLOR.BLACK,
                        marginRight: 15, marginLeft: 15, width: WIDTH * 0.2, marginTop: 10
                    }} />
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    <View style={{ flexDirection: KEY.ROW, marginLeft: 15, marginRight: 15, marginTop: 10, marginBottom: 5 }}>
                        <TouchableOpacity style={styles.mainstyle} onPress={() => onPresstoTourDetails()}>
                            <View style={styles.imagecardstyle}>
                                <Image source={IMAGE.TRAVEL1} style={styles.imagestyle1} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10 }}>
                                <Text style={styles.titletext}>
                                    {"Maldives"}
                                </Text>
                                <Text style={{ marginTop: 2, color: COLOR.DEFALUTCOLOR, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>
                                    {"4N/5D"}
                                </Text>

                                <Text style={[styles.titletext, {}]}>{"$ 20200"}</Text>
                                <Text>{"per person"}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.mainstyle}>
                            <View style={styles.imagecardstyle}>
                                <Image source={IMAGE.TRAVEL1} style={styles.imagestyle1} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10 }}>
                                <Text style={styles.titletext}>
                                    {"Maldives"}
                                </Text>
                                <Text style={{ marginTop: 2, color: COLOR.DEFALUTCOLOR, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>
                                    {"4N/5D"}
                                </Text>

                                <Text style={[styles.titletext, {}]}>{"$ 20200"}</Text>
                                <Text>{"per person"}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.mainstyle}>
                            <View style={styles.imagecardstyle}>
                                <Image source={IMAGE.TRAVEL1} style={styles.imagestyle1} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10 }}>
                                <Text style={styles.titletext}>
                                    {"Maldives"}
                                </Text>
                                <Text style={{ marginTop: 2, color: COLOR.DEFALUTCOLOR, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>
                                    {"4N/5D"}
                                </Text>

                                <Text style={[styles.titletext, {}]}>{"$ 20200"}</Text>
                                <Text>{"per person"}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, flexDirection: KEY.COLUMN, marginTop: 5 }}>
                    <Text style={styles.titletext}>{"Best Selling Packages"}</Text>
                    <View style={{
                        borderWidth: 0.2, marginTop: 5, borderColor: COLOR.BLACK,
                        marginRight: 15, marginLeft: 15, width: WIDTH * 0.2, marginTop: 10
                    }} />
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    <View style={{ flexDirection: KEY.ROW, marginLeft: 15, marginRight: 15, marginTop: 10, marginBottom: 5 }}>
                        <TouchableOpacity style={styles.mainstyle}>
                            <View style={styles.imagecardstyle}>
                                <Image source={IMAGE.TRAVEL1} style={styles.imagestyle1} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10 }}>
                                <View style={{ flexDirection: KEY.ROW }}>
                                    <Text style={styles.titletext}>
                                        {"Maldives"}
                                    </Text>
                                    <Text style={{ marginLeft: 10, marginTop: 2, color: COLOR.DEFALUTCOLOR, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>
                                        {"4N/5D"}
                                    </Text>
                                </View>
                                <Text style={[styles.titletext, { marginTop: 10 }]}>{"$ 20200"}</Text>
                                <Text>{"per person"}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.mainstyle}>
                            <View style={styles.imagecardstyle}>
                                <Image source={IMAGE.TRAVEL1} style={styles.imagestyle1} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10 }}>
                                <Text style={styles.titletext}>
                                    {"Maldives"}
                                </Text>
                                <Text style={{ marginTop: 2, color: COLOR.DEFALUTCOLOR, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>
                                    {"4N/5D"}
                                </Text>

                                <Text style={[styles.titletext, {}]}>{"$ 20200"}</Text>
                                <Text>{"per person"}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.mainstyle}>
                            <View style={styles.imagecardstyle}>
                                <Image source={IMAGE.TRAVEL1} style={styles.imagestyle1} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10 }}>
                                <Text style={styles.titletext}>
                                    {"Maldives"}
                                </Text>
                                <Text style={{ marginTop: 2, color: COLOR.DEFALUTCOLOR, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>
                                    {"4N/5D"}
                                </Text>

                                <Text style={[styles.titletext, {}]}>{"$ 20200"}</Text>
                                <Text>{"per person"}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, flexDirection: KEY.COLUMN, marginTop: 5 }}>
                    <Text style={styles.titletext}>{"Nearby Destinations"}</Text>
                    <View style={{
                        borderWidth: 0.2, marginTop: 5, borderColor: COLOR.BLACK,
                        marginRight: 15, marginLeft: 15, width: WIDTH * 0.2, marginTop: 10
                    }} />
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    <View style={{ flexDirection: KEY.ROW, marginLeft: 15, marginRight: 15, marginTop: 10, marginBottom: 5 }}>
                        <TouchableOpacity style={styles.mainstyle}>
                            <View style={styles.imagecardstyle}>
                                <Image source={IMAGE.TRAVEL1} style={styles.imagestyle1} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10 }}>
                                <View style={{ flexDirection: KEY.ROW }}>
                                    <Text style={styles.titletext}>
                                        {"Maldives"}
                                    </Text>
                                    <Text style={{ marginLeft: 10, marginTop: 2, color: COLOR.DEFALUTCOLOR, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>
                                        {"4N/5D"}
                                    </Text>
                                </View>
                                <Text style={[styles.titletext, { marginTop: 10 }]}>{"$ 20200"}</Text>
                                <Text>{"per person"}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.mainstyle}>
                            <View style={styles.imagecardstyle}>
                                <Image source={IMAGE.TRAVEL1} style={styles.imagestyle1} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10 }}>
                                <Text style={styles.titletext}>
                                    {"Maldives"}
                                </Text>
                                <Text style={{ marginTop: 2, color: COLOR.DEFALUTCOLOR, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>
                                    {"4N/5D"}
                                </Text>

                                <Text style={[styles.titletext, {}]}>{"$ 20200"}</Text>
                                <Text>{"per person"}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.mainstyle}>
                            <View style={styles.imagecardstyle}>
                                <Image source={IMAGE.TRAVEL1} style={styles.imagestyle1} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10 }}>
                                <Text style={styles.titletext}>
                                    {"Maldives"}
                                </Text>
                                <Text style={{ marginTop: 2, color: COLOR.DEFALUTCOLOR, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>
                                    {"4N/5D"}
                                </Text>

                                <Text style={[styles.titletext, {}]}>{"$ 20200"}</Text>
                                <Text>{"per person"}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, flexDirection: KEY.COLUMN, marginTop: 5 }}>
                    <Text style={styles.titletext}>{"International Destination"}</Text>
                    <View style={{
                        borderWidth: 0.2, marginTop: 5, borderColor: COLOR.BLACK,
                        marginRight: 15, marginLeft: 15, width: WIDTH * 0.2, marginTop: 10
                    }} />
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    <View style={{ flexDirection: KEY.ROW, marginLeft: 15, marginRight: 15, marginTop: 10, marginBottom: 5 }}>
                        <TouchableOpacity style={styles.mainstyle}>
                            <View style={styles.imagecardstyle}>
                                <Image source={IMAGE.TRAVEL1} style={styles.imagestyle1} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10 }}>
                                <Text style={styles.titletext}>
                                    {"Maldives"}
                                </Text>
                                <Text style={{ marginTop: 2, color: COLOR.DEFALUTCOLOR, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>
                                    {"4N/5D"}
                                </Text>

                                <Text style={[styles.titletext, {}]}>{"$ 20200"}</Text>
                                <Text>{"per person"}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.mainstyle}>
                            <View style={styles.imagecardstyle}>
                                <Image source={IMAGE.TRAVEL1} style={styles.imagestyle1} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10 }}>
                                <Text style={styles.titletext}>
                                    {"Maldives"}
                                </Text>
                                <Text style={{ marginTop: 2, color: COLOR.DEFALUTCOLOR, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>
                                    {"4N/5D"}
                                </Text>

                                <Text style={[styles.titletext, {}]}>{"$ 20200"}</Text>
                                <Text>{"per person"}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.mainstyle}>
                            <View style={styles.imagecardstyle}>
                                <Image source={IMAGE.TRAVEL1} style={styles.imagestyle1} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10 }}>
                                <Text style={styles.titletext}>
                                    {"Maldives"}
                                </Text>
                                <Text style={{ marginTop: 2, color: COLOR.DEFALUTCOLOR, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>
                                    {"4N/5D"}
                                </Text>

                                <Text style={[styles.titletext, {}]}>{"$ 20200"}</Text>
                                <Text>{"per person"}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </ScrollView>
        </SafeAreaView >
    )
}

export default TourPakageScreen;