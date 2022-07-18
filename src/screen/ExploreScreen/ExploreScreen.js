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
import styles from "./ExploreScreenstyle";


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

const ExploreScreen = () => {

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
    return (
        <SafeAreaView>
            <StatusBar />
            <View style={{ justifyContent: KEY.SPACEBETWEEN, flexDirection: KEY.ROW, marginTop: 5, marginLeft: 10, marginRight: 10 }}>
                <TouchableOpacity>
                    <AntDesign name="arrowleft" size={28} color={COLOR.BLACK} />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: FONT.FONT_SIZE_18, color: COLOR.BLACK, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{"Explore"}</Text>
                </View>
                <View></View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                {("Domestic" && "Domestic".length > 0) || (domesticList && domesticList.length > 0)
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
                            <>
                                <View style={{ flexDirection: KEY.COLUMN, marginBottom: 40 }}>
                                    <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                        <TouchableOpacity style={styles.mainstyle}>
                                            <View style={styles.imagecardstyle}>
                                                <Image source={IMAGE.TRAVEL1} style={styles.image1} />
                                            </View>
                                            <View style={{ marginLeft: 10 }}>
                                                <Text style={styles.titletext}>
                                                    {"Goa"}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.mainstyle}>
                                            <View style={styles.imagecardstyle}>
                                                <Image source={IMAGE.TRAVEL2} style={styles.image1} />
                                            </View>
                                            <View style={{ marginLeft: 10 }}>
                                                <Text style={styles.titletext}>
                                                    {"Manali"}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                        <TouchableOpacity style={styles.mainstyle}>
                                            <View style={styles.imagecardstyle}>
                                                <Image source={IMAGE.TRAVEL3} style={styles.image1} />
                                            </View>
                                            <View style={{ marginLeft: 10 }}>
                                                <Text style={styles.titletext}>
                                                    {"Nainital"}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.mainstyle}>
                                            <View style={styles.imagecardstyle}>
                                                <Image source={IMAGE.TRAVEL1} style={styles.image1} />
                                            </View>
                                            <View style={{ marginLeft: 10 }}>
                                                <Text style={styles.titletext}>
                                                    {"Mumbai"}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                        <TouchableOpacity style={styles.mainstyle}>
                                            <View style={styles.imagecardstyle}>
                                                <Image source={IMAGE.TRAVEL2} style={styles.image1} />
                                            </View>
                                            <View style={{ marginLeft: 10 }}>
                                                <Text style={styles.titletext}>
                                                    {"Goa"}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.mainstyle}>
                                            <View style={styles.imagecardstyle}>
                                                <Image source={IMAGE.TRAVEL3} style={styles.image1} />
                                            </View>
                                            <View style={{ marginLeft: 10 }}>
                                                <Text style={styles.titletext}>
                                                    {"Manali"}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </>
                        }
                    </>
                    :
                    loading == false ?
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <Image source={IMAGE.NODATA} style={{ height: 150, width: 200, marginTop: HEIGHT * 0.2 }} resizeMode={KEY.CONTAIN} />
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                        </View>
                        : <Loader />
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default ExploreScreen;
