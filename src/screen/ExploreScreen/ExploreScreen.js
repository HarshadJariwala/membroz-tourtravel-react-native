import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, RefreshControl, SafeAreaView, Image, StatusBar, ScrollView, FlatList, Platform, TouchableOpacity } from "react-native";
import languageConfig from "../../languages/languageConfig";
import * as SCREEN from "../../context/screen/screenName";
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import Loader from '../../components/loader/index';
import styles from "./ExploreScreenstyle";
import { getInternationalListService, getDomesticListService } from "../../services/ExploreService/ExploreService";
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import axiosConfig from "../../helpers/axiosConfig";
import Ionicons from 'react-native-vector-icons/Ionicons';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const ListTab = [
    {
        'status': languageConfig.domestictexttext
    },
    {
        'status': languageConfig.internationaltext
    }
]

const ExploreScreen = (props) => {
    const [logo, setLogo] = useState(null);
    const [loading, setloading] = useState(true);
    const [status, setStatus] = useState("Domestic");
    const [domesticList, setDomesticList] = useState([]);
    const [internationList, setInternationList] = useState([]);
    const [customerInfo, setCustomerInfo] = useState(null);
    const [refreshing, setrefreshing] = useState(false);

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        RemoteController();
        getMemberDeatilsLocalStorage();
    }, []);

    const setStatusFilter = (status, index) => {
        const tab = ListTab.map((item) => {
            item.selected = false;
            return item;
        });
        tab[index].selected = true;
        setStatus(status)
    }

    useEffect(() => {
    }, [loading, logo, refreshing, customerInfo])

    //REMOTE DATA FATCH IN LOCAL STORAGE
    const RemoteController = async () => {
        var userData = await LocalService.RemoteServerController();
        if (userData) {
            setLogo(userData.applogo);
            axiosConfig(userData.authkey);
        }
    };

    //TIME OUT FUNCTION
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //GET PULL TO REFRESH FUNCTION
    const onRefresh = () => {
        setrefreshing(true);
        getinternationList();
        wait(3000).then(() => setrefreshing(false));
    }

    //ON PRESS MAIN MENU
    const onPressTomainmenu = () => {
        if (customerInfo) {
            props.navigation.navigate(SCREEN.MAINMENUSCREEN);
        } else {
            props.navigation.navigate(SCREEN.AUTH);
        }
    }

    //ON PRESS LOCATION LIST
    const onPressToLocationList = (item) => {
        props.navigation.navigate(SCREEN.LOCATIONLIST, { item });

    }

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var memberInfo = await LocalService.LocalStorageService();
        if (memberInfo) {
            setCustomerInfo(memberInfo);
            getinternationList();
            getDomesticList();
        } else {
            getinternationList();
            getDomesticList();
        }
    }

    //ACTIVITY LIST FETCH DATA THROUGHT API
    const getinternationList = async () => {
        try {
            const response = await getInternationalListService();
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setInternationList(response.data);
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setloading(false);
        }
    }

    const getDomesticList = async () => {
        try {
            const response = await getDomesticListService();
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setDomesticList(response.data);
                setloading(false);
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setloading(false);
        }
    }

    //RENDER  INTERNATIONALLIST CATEGORY SERVICE FLATLIST
    const InternationalList = ({ item, index }) => (
        <TouchableOpacity style={styles.mainstyle} onPress={() => onPressToLocationList(item)}>
            <View style={styles.imagecardstyle}>
                <Image source={{
                    uri: item.property && item.property.image && item.property.image[0] &&
                        item.property.image[0].attachment ? item.property.image[0].attachment : logo
                }}

                    style={styles.image1} />
            </View>
            <View style={{ marginLeft: 10, marginBottom: 5 }}>
                <Text style={styles.titletext}>
                    {item.property && item.property.locationname}
                </Text>
            </View>
        </TouchableOpacity>

    )

    //RENDER  DOMESTICLLIST CATEGORY SERVICE FLATLIST
    const DomesticlList = ({ item, index }) => (
        <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
            <TouchableOpacity style={styles.mainstyle} onPress={() => onPressToLocationList(item)}>
                <View style={styles.imagecardstyle}>
                    <Image source={{
                        uri: item.property && item.property.image && item.property.image[0] &&
                            item.property.image[0].attachment ? item.property.image[0].attachment : logo
                    }}
                        style={styles.image1} />
                </View>
                <View style={{ marginLeft: 10, marginBottom: 5 }}>
                    <Text style={styles.titletext}>
                        {item.property && item.property.locationname}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={false} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.DARK_CONTENT} />
            <View style={{ marginLeft: 15, marginRight: 15, marginTop: 5, marginBottom: 10, justifyContent: KEY.SPACEBETWEEN, flexDirection: KEY.ROW, alignItems: KEY.CENTER }}>
                <View>
                    <TouchableOpacity onPress={() => onPressTomainmenu()}>
                        <Image source={IMAGE.MENUICON} style={{ width: 27, height: 18 }} />
                    </TouchableOpacity>
                </View>
                <Text style={{
                    fontSize: FONT.FONT_SIZE_20,
                    fontFamily: FONT.FONT_BOLD,
                    fontWeight: FONT.FONT_WEIGHT_MEDIAM,
                    color: COLOR.BLACK
                }}>{languageConfig.explore}</Text>
                <View>
                    <View style={{ marginBottom: 10, width: 16, height: 16, backgroundColor: COLOR.DEFALUTCOLOR, borderRadius: 100, justifyContent: KEY.CENTER, alignItems: KEY.CENTER, position: KEY.ABSOLUTE, bottom: 5, left: 15 }}>
                        <Text style={{ color: COLOR.WHITE, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM, fontSize: FONT.FONT_SIZE_10 }}>{'0'}</Text>
                    </View>
                    <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.NOTIFICATIONSCREEN)}>
                        <Ionicons name='notifications-outline' size={28} color={COLOR.BLACK} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                {(languageConfig.domestictext && languageConfig.domestictext.length > 0) || (domesticList && domesticList.length > 0)
                    ?
                    <>
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <View style={{ flexDirection: KEY.ROW, marginTop: 10, marginBottom: 10, margin: 10 }}>
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    data={domesticList}
                                    numColumns={2}
                                    renderItem={DomesticlList}
                                    keyExtractor={item => item._id}
                                    style={{ flexDirection: KEY.COLUMN, }}
                                    keyboardShouldPersistTaps={KEY.ALWAYS}
                                    ListFooterComponent={() => (
                                        internationList && internationList.length == 0 &&
                                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, alignSelf: KEY.CENTER, width: WIDTH * 0.9 }}>
                                            <Image source={IMAGE.NODATA} style={{ height: 150, width: 200, marginTop: HEIGHT * 0.2 }} resizeMode={KEY.CONTAIN} />
                                            <Text style={{ fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                                        </View>
                                    )}
                                />
                            </View>
                        </View>
                        {
                            status == languageConfig.domestictext &&
                            <>
                                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                    <View style={{ flexDirection: KEY.ROW, marginTop: 10, marginBottom: 10, margin: 10 }}>
                                        <FlatList
                                            showsHorizontalScrollIndicator={false}
                                            data={domesticList}
                                            numColumns={2}
                                            renderItem={DomesticlList}
                                            keyExtractor={item => item._id}
                                            style={{ flexDirection: KEY.COLUMN, }}
                                            keyboardShouldPersistTaps={KEY.ALWAYS}
                                            ListFooterComponent={() => (
                                                internationList && internationList.length == 0 &&
                                                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, alignSelf: KEY.CENTER, width: WIDTH * 0.9 }}>
                                                    <Image source={IMAGE.NODATA} style={{ height: 150, width: 200, marginTop: HEIGHT * 0.2 }} resizeMode={KEY.CONTAIN} />
                                                    <Text style={{ fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                                                </View>
                                            )}
                                        />
                                    </View>
                                </View>

                            </>
                        }
                        {
                            status == languageConfig.internationaltext &&
                            <>

                                {
                                    status == "International" &&
                                    <>

                                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, }}>
                                            <View style={{ flexDirection: KEY.ROW, marginTop: 10, marginBottom: 10, margin: 10 }}>
                                                <FlatList
                                                    showsHorizontalScrollIndicator={false}
                                                    data={internationList}
                                                    numColumns={2}
                                                    renderItem={InternationalList}
                                                    keyExtractor={item => item._id}
                                                    style={{ flexDirection: KEY.ROW, }}
                                                    keyboardShouldPersistTaps={KEY.ALWAYS}
                                                    ListFooterComponent={() => (
                                                        internationList && internationList.length == 0 &&
                                                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, alignSelf: KEY.CENTER, width: WIDTH * 0.9 }}>
                                                            <Image source={IMAGE.NODATA} style={{ height: 150, width: 200, marginTop: HEIGHT * 0.2 }} resizeMode={KEY.CONTAIN} />
                                                            <Text style={{ fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                                                        </View>
                                                    )}
                                                />
                                            </View>
                                        </View>
                                    </>
                                }
                            </ScrollView>
                        }
            // {loading ? <Loader /> : null}
                    </SafeAreaView>
    )
}

                export default ExploreScreen;
