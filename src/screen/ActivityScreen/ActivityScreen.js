import React, { useState } from "react";
import { View, Text, Dimensions, SafeAreaView, Image, StatusBar, ScrollView, Platform, TouchableOpacity } from "react-native";
import languageConfig from "../../languages/languageConfig";
import * as SCREEN from "../../context/screen/screenName";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import Loader from '../../components/loader/index';
import styles from "./Activityscreenstyle";

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const ListTab = [
    {
        'status': "Domestic"
    },
    {
        'status': "International"
    }
]

const ActivityScreen = (props) => {

    const [status, setStatus] = useState("Domestic");
    const [domesticList, setDomesticList] = useState([]);

    const setStatusFilter = (status, index) => {
        const tab = ListTab.map((item) => {
            item.selected = false;
            return item;
        });
        tab[index].selected = true;
        setStatus(status)
    }

    //OPEN PAYMENT SCREEN
    const onPresstoActivityDetails = async () => {
        props.navigation.navigate(SCREEN.AVTIVITTOURDETAILS);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={false} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.DARK_CONTENT} />
            {/* <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, padding: 10 }}>
                <TouchableOpacity style={{ marginTop: 8 }}>
                    <AntDesign name="arrowleft" size={28} color={COLOR.BLACK} />
                </TouchableOpacity>
                <View style={{ flexDirection: KEY.COLUMN, alignSelf: KEY.FLEX_START, flex: 1, marginLeft: 10 }}>
                    <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK }}>{"Activity & Tour"}</Text>
                    <Text style={{ fontSize: FONT.FONT_SIZE_20, color: COLOR.BLACK, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{"Anywhere"}</Text>
                </View>
                <TouchableOpacity style={{ flexDirection: KEY.ROW, marginRight: 5, marginLeft: 5, marginTop: 8 }}>
                    <MaterialIcons name="edit" size={24} color={COLOR.DEFALUTCOLOR} />
                    <Text style={styles.changetext}>{"Change"}</Text>
                </TouchableOpacity>
            </View> */}
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                {/* {("Domestic" && "Domestic".length > 0) || (domesticList && domesticList.length > 0)
                    ?
                    <>
                        <View style={styles.listTab}>
                            {
                                ListTab.map((e, index) => (
                                    <TouchableOpacity style={[styles.btnTab, status === e.status && styles.tabActive]} onPress={() => setStatusFilter(e.status, index)}>
                                        <Text style={[styles.tabText, status === e.status && styles.tabTextActive]}>
                                            {e.status}
                                        </Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                        {
                            status == "Domestic" &&
                            <> */}
                {/* <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                                    <View style={{ flexDirection: KEY.ROW, marginLeft: 15, marginRight: 15, marginTop: 5, marginBottom: 10 }}>
                                        <TouchableOpacity style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                            <Image source={IMAGE.TRAVEL1} style={styles.imagecard} />
                                            <Text style={styles.text_1}>{"Goa"}</Text>
                                            <Text style={{ textAlign: KEY.CENTER }}>{"200 Activities"}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                            <Image source={IMAGE.TRAVEL2} style={styles.imagecard} />
                                            <Text style={styles.text_1}>{"Manali"}</Text>
                                            <Text style={{ textAlign: KEY.CENTER }}>{"34 Activities"}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                            <Image source={IMAGE.TRAVEL3} style={styles.imagecard} />
                                            <Text style={styles.text_1}>{"Nainital"}</Text>
                                            <Text style={{ textAlign: KEY.CENTER }}>{"18 Activities"}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                            <Image source={IMAGE.TRAVEL1} style={styles.imagecard} />
                                            <Text style={styles.text_1}>{"Mumbai"}</Text>
                                            <Text style={{ textAlign: KEY.CENTER }}>{"90 Activities"}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                            <Image source={IMAGE.TRAVEL2} style={styles.imagecard} />
                                            <Text style={styles.text_1}>{"Manali"}</Text>
                                            <Text style={{ textAlign: KEY.CENTER }}>{"34 Activities"}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                            <Image source={IMAGE.TRAVEL3} style={styles.imagecard} />
                                            <Text style={styles.text_1}>{"Nainital"}</Text>
                                            <Text style={{ textAlign: KEY.CENTER }}>{"18 Activities"}</Text>
                                        </TouchableOpacity>

                                    </View>
                                </ScrollView> */}
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, flexDirection: KEY.COLUMN }}>
                    <Text style={styles.titletext}>{"Theme and Water Parks"}</Text>
                    <View style={{
                        borderWidth: 0.2, marginTop: 5, borderColor: COLOR.BLACK,
                        marginRight: 15, marginLeft: 15, width: WIDTH * 0.2, marginBottom: 5, marginTop: 10
                    }} />
                </View>

                <View style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                    <TouchableOpacity style={styles.mainstyle} onPress={() => onPresstoActivityDetails()}>
                        <Image source={IMAGE.TRAVEL1} style={styles.imagestyle1} />
                        <View style={{ margin: 10 }}>
                            <Text style={styles.titletext}>
                                {"Imagicaa Theme"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mainstyle} onPress={() => onPresstoActivityDetails()}>
                        <Image source={IMAGE.TRAVEL2} style={styles.imagestyle1} />
                        <View style={{ margin: 10 }}>
                            <Text style={styles.titletext}>
                                {"Wonderla Park"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mainstyle} onPress={() => onPresstoActivityDetails()}>
                        <Image source={IMAGE.TRAVEL3} style={styles.imagestyle1} />
                        <View style={{ margin: 10 }}>
                            <Text style={styles.titletext}>
                                {"Gir National Park"}
                            </Text>
                        </View>
                    </TouchableOpacity>


                    {/* <TouchableOpacity style={styles.mainstyle} onPress={() => onPresstoActivityDetails()}>
                                        <Image source={IMAGE.TRAVEL1} style={styles.imagestyle1} />
                                        <View style={{ margin: 10 }}>
                                            <Text style={styles.titletext}>
                                                {"Imagicaa Theme"}
                                            </Text>
                                        </View>
                                    </TouchableOpacity> */}


                </View>

                {/* <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, flexDirection: KEY.COLUMN }}>
                                    <Text style={styles.titletext}>{"National Parks & jungle Safaris"}</Text>
                                    <View style={{
                                        borderWidth: 0.2, marginTop: 5, borderColor: COLOR.BLACK,
                                        marginRight: 15, marginLeft: 15, width: WIDTH * 0.2, marginBottom: 5, marginTop: 10
                                    }} />
                                </View>
                                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                                    <View style={{ flexDirection: KEY.ROW, marginLeft: 15, marginRight: 15, marginTop: 10, marginBottom: 5 }}>
                                        <TouchableOpacity style={styles.mainstyle}>
                                            <View style={styles.imagecardstyle}>
                                                <Image source={IMAGE.TRAVEL1} style={styles.imagestyle1} />
                                            </View>
                                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10, justifyContent: KEY.SPACEBETWEEN, flex: 1 }}>
                                                <Text style={styles.titletext}>
                                                    {"Jim Corbett Park"}
                                                </Text>
                                                <View style={{ flexDirection: KEY.ROW, marginTop: -20 }}>
                                                    <Ionicons name="location-outline" size={16} color={COLOR.DEFALUTCOLOR} style={{ marginTop: 2 }} />
                                                    <Text style={{ marginLeft: 3 }}>
                                                        {"Uttarakhand"}
                                                    </Text>
                                                </View>
                                                <View style={{ flexDirection: KEY.ROW, marginBottom: 5 }}>
                                                    <Text style={[styles.titletext, {}]}>{"$ 495"}</Text>
                                                    <Text style={{ marginLeft: 10 }}>{"per person"}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.mainstyle}>
                                            <View style={styles.imagecardstyle}>
                                                <Image source={IMAGE.TRAVEL2} style={styles.imagestyle1} />
                                            </View>
                                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10, justifyContent: KEY.SPACEBETWEEN, flex: 1 }}>
                                                <Text style={styles.titletext}>
                                                    {"Gir National Park"}
                                                </Text>
                                                <View style={{ flexDirection: KEY.ROW, marginTop: -20 }}>
                                                    <Ionicons name="location-outline" size={16} color={COLOR.DEFALUTCOLOR} style={{ marginTop: 2 }} />
                                                    <Text style={{ marginLeft: 3 }}>
                                                        {"Gujarat"}
                                                    </Text>
                                                </View>
                                                <View style={{ flexDirection: KEY.ROW, marginBottom: 5 }}>
                                                    <Text style={[styles.titletext, {}]}>{"$ 1350"}</Text>
                                                    <Text style={{ marginLeft: 10 }}>{"per person"}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.mainstyle}>
                                            <View style={styles.imagecardstyle}>
                                                <Image source={IMAGE.TRAVEL3} style={styles.imagestyle1} />
                                            </View>
                                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10, justifyContent: KEY.SPACEBETWEEN, flex: 1 }}>
                                                <Text style={styles.titletext}>
                                                    {"Imagicaa Theme"}
                                                </Text>
                                                <View style={{ flexDirection: KEY.ROW, marginTop: -20 }}>
                                                    <Ionicons name="location-outline" size={16} color={COLOR.DEFALUTCOLOR} style={{ marginTop: 2 }} />
                                                    <Text style={{ marginLeft: 3 }} >
                                                        {"Pune"}
                                                    </Text>
                                                </View>
                                                <View style={{ flexDirection: KEY.ROW, marginBottom: 5 }}>
                                                    <Text style={[styles.titletext, {}]}>{"$ 11500"}</Text>
                                                    <Text style={{ marginLeft: 10 }}>{"per person"}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                    </View>
                                </ScrollView> */}
                {/* </>
                        }
                    </>
                    :
                    loading == false ?
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <Image source={IMAGE.NODATA} style={{ height: 150, width: 200, marginTop: HEIGHT * 0.2 }} resizeMode={KEY.CONTAIN} />
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                        </View>
                        : <Loader />
                } */}
            </ScrollView>
        </SafeAreaView>
    )
}

export default ActivityScreen;