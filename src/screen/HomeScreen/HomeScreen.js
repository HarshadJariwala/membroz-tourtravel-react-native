import React from "react";
import { View, Text, Dimensions, SafeAreaView, Image, StatusBar, ScrollView, Platform, TouchableOpacity, ImageBackground } from "react-native";
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
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.DARK_CONTENT} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 0, marginBottom: 10 }}>
                    <Swiper height={200} width={WIDTH} showsPagination={false}>
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
                    <Text style={styles.titletext}>{"Category"}</Text>
                    <View style={{
                        borderWidth: 0.2, marginTop: 5, borderColor: COLOR.BLACK,
                        marginRight: 15, marginLeft: 15, width: WIDTH * 0.2, marginBottom: 5, marginTop: 10
                    }} />
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    <View style={{ flexDirection: KEY.ROW, marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
                        <View style={styles.categorymaincard}>
                            <View style={{ justifyContent: KEY.SPACEBETWEEN, flex: 1, flexDirection: KEY.ROW, marginTop: 7, marginLeft: 8 }}>
                                <Image style={styles.cardimagestyle} source={IMAGE.TRAVEL1} />
                                <Text style={{ marginTop: 7, fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM, color: COLOR.BLACK }}>
                                    {"Goa"}
                                </Text>
                                <View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.categorymaincard}>
                            <View style={{ justifyContent: KEY.SPACEBETWEEN, flex: 1, flexDirection: KEY.ROW, marginTop: 7, marginLeft: 8 }}>
                                <Image style={styles.cardimagestyle} source={IMAGE.TRAVEL1} />
                                <Text style={{ marginTop: 7, fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM, color: COLOR.BLACK }}>
                                    {"Gir nar"}
                                </Text>
                                <View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.categorymaincard}>
                            <View style={{ justifyContent: KEY.SPACEBETWEEN, flex: 1, flexDirection: KEY.ROW, marginTop: 7, marginLeft: 8, }}>
                                <Image style={styles.cardimagestyle} source={IMAGE.TRAVEL1} />
                                <Text style={{ marginTop: 7, fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM, color: COLOR.BLACK }}>
                                    {"Nainital"}
                                </Text>
                                <View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.categorymaincard}>
                            <View style={{ justifyContent: KEY.SPACEBETWEEN, flex: 1, flexDirection: KEY.ROW, marginTop: 7, marginLeft: 8, }}>
                                <Image style={styles.cardimagestyle} source={IMAGE.TRAVEL1} />
                                <Text style={{ marginTop: 7, fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM, color: COLOR.BLACK }}>
                                    {"Manali"}
                                </Text>
                                <View>
                                </View>
                            </View>
                        </View>

                    </View>
                </ScrollView>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, flexDirection: KEY.COLUMN }}>
                    <Text style={styles.titletext}>{"Travel by Location"}</Text>
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
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, flexDirection: KEY.COLUMN, marginTop: 10 }}>
                    <Text style={styles.titletext}>{"Popular Destination Pacakages"}</Text>
                    <View style={{
                        borderWidth: 0.2, marginTop: 5, borderColor: COLOR.BLACK,
                        marginRight: 15, marginLeft: 15, width: WIDTH * 0.2, marginBottom: 5, marginTop: 10
                    }} />
                </View>

                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    <View style={{ flexDirection: KEY.ROW, marginLeft: 10, marginRight: 10 }}>
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
                                <Image source={IMAGE.TRAVEL2} style={styles.imagestyle1} />
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
                                <Image source={IMAGE.TRAVEL3} style={styles.imagestyle1} />
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

                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, flexDirection: KEY.COLUMN, marginTop: 10 }}>
                    <Text style={styles.titletext}>{"Popular Activites"}</Text>
                    <View style={{
                        borderWidth: 0.2, marginTop: 5, borderColor: COLOR.BLACK,
                        marginRight: 15, marginLeft: 15, width: WIDTH * 0.2, marginBottom: 5, marginTop: 10
                    }} />
                </View>

                <View style={{ marginLeft: 10, marginRight: 10 }}>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                        <TouchableOpacity style={styles.mainstyle1}>
                            <View >
                                <Image source={IMAGE.TRAVEL1} style={styles.image1} />
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={styles.titletext}>
                                    {"Manali"}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.mainstyle1}>
                            <View>
                                <Image source={IMAGE.TRAVEL2} style={styles.image1} />
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={styles.titletext}>
                                    {"National"}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.mainstyle1}>
                            <View >
                                <Image source={IMAGE.TRAVEL3} style={styles.image1} resizeMode={KEY.COVER} />
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={styles.titletext}>
                                    {"Mumbai"}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


export default HomeScreen;