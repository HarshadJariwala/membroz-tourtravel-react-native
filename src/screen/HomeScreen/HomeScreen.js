import React from "react";
import { View, Text, Dimensions, SafeAreaView, Image, StatusBar, ScrollView, Platform, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import languageConfig from "../../languages/languageConfig";
import * as SCREEN from "../../context/screen/screenName";
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from "./HomeScreenstyle";

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const HomeScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={false} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.DARK_CONTENT} />
            <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                <Text style={{
                    fontSize: FONT.FONT_SIZE_18, fontFamily: FONT.FONT_BOLD,
                    fontWeight: FONT.FONT_WEIGHT_MEDIAM,
                    color: COLOR.BLACK
                }}>{languageConfig.home}</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 10 }}>
                    <Swiper height={200} showsPagination={false}>
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <Image
                                resizeMode={KEY.COVER}
                                style={styles.image}
                                source={IMAGE.TRAVEL1}
                            />
                        </View>
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <Image
                                resizeMode={KEY.COVER}
                                style={styles.image}
                                source={IMAGE.TRAVEL2}
                            />
                        </View>
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <Image
                                resizeMode={KEY.COVER}
                                style={styles.image}
                                source={IMAGE.TRAVEL3}
                            />
                        </View>
                    </Swiper>

                </View>

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
                            // blurradius={0}
                            blurType="light"
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
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, flexDirection: KEY.COLUMN, marginTop: 10 }}>
                    <Text style={styles.titletext}>{"Popular Destination Pacakages"}</Text>
                    <View style={{
                        borderWidth: 0.2, marginTop: 5, borderColor: COLOR.BLACK,
                        marginRight: 15, marginLeft: 15, width: WIDTH * 0.2, marginBottom: 5, marginTop: 10
                    }} />
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    <View style={{ flexDirection: KEY.ROW }}>
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
                                <View style={{ flexDirection: KEY.ROW }}>
                                    <Text style={styles.titletext}>
                                        {"Goa"}
                                    </Text>
                                    <Text style={{ marginLeft: 10, marginTop: 2, color: COLOR.DEFALUTCOLOR, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>
                                        {"4N/5D"}
                                    </Text>
                                </View>
                                <Text style={[styles.titletext, { marginTop: 10 }]}>{"$ 10200"}</Text>
                                <Text>{"per person"}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.mainstyle}>
                            <View style={styles.imagecardstyle}>
                                <Image source={IMAGE.TRAVEL1} style={styles.imagestyle1} />
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10 }}>
                                <View style={{ flexDirection: KEY.ROW }}>
                                    <Text style={styles.titletext}>
                                        {"Beach"}
                                    </Text>
                                    <Text style={{ marginLeft: 10, marginTop: 2, color: COLOR.DEFALUTCOLOR, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>
                                        {"4N/5D"}
                                    </Text>
                                </View>
                                <Text style={[styles.titletext, { marginTop: 10 }]}>{"$ 10200"}</Text>
                                <Text>{"per person"}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, flexDirection: KEY.COLUMN, marginTop: 10 }}>
                    <Text style={styles.titletext}>{"Popular Activites"}</Text>
                    <View style={{
                        borderWidth: 0.2, marginTop: 5, borderColor: COLOR.BLACK,
                        marginRight: 15, marginLeft: 15, width: WIDTH * 0.2, marginBottom: 5, marginTop: 10
                    }} />
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    <TouchableOpacity style={styles.mainstyle}>
                        <View style={styles.imagecardstyle}>
                            <Image source={IMAGE.TRAVEL1} style={styles.image1} />
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.titletext}>
                                {"Manali"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mainstyle}>
                        <View style={styles.imagecardstyle}>
                            <Image source={IMAGE.TRAVEL2} style={styles.image1} />
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.titletext}>
                                {"National"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mainstyle}>
                        <View style={styles.imagecardstyle}>
                            <Image source={IMAGE.TRAVEL3} style={styles.image1} resizeMode={KEY.COVER} />
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.titletext}>
                                {"Mumbai"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </ScrollView >
        </SafeAreaView >
    )
}


export default HomeScreen;