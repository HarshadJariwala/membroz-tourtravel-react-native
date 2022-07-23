import React, { useState, useEffect } from "react";
import {
    View, Text, Dimensions, SafeAreaView,
    Image, StatusBar, ScrollView, Platform, RefreshControl,
    TouchableOpacity, FlatList, Alert, Linking
} from "react-native";
import { getByIdMemberService, getByIdUserService } from "../../services/MemberService/MemberService";
import { topTourCategoryListService } from '../../services/CategoryService/CategoryService';
import { topTourPackagesListService } from "../../services/PackageService/PackageService";
import { topActivityListService } from '../../services/ActivityService/ActivityService';
import { topDomesticListService } from '../../services/ExploreService/ExploreService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import * as LocalService from '../../services/LocalService/LocalService';
import getCurrency from '../../services/getCurrencyService/getCurrency';
import SliderService from "../../services/SliderService/SliderService";
import { firebase } from "@react-native-firebase/crashlytics";
import languageConfig from "../../languages/languageConfig";
import * as SCREEN from "../../context/screen/screenName";
import { useFocusEffect } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import axiosConfig from "../../helpers/axiosConfig";
import Loader from "../../components/loader/index";
import DeviceInfo from 'react-native-device-info';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import RNExitApp from "react-native-exit-app";
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import Swiper from "react-native-swiper";
import styles from "./HomeScreenstyle";

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const HomeScreen = (props) => {
    const [logo, setLogo] = useState(null);
    const [loading, setloading] = useState(true);
    const [customerInfo, setCustomerInfo] = useState(null);
    const [activityList, setActivityList] = useState([]);
    const [domesticlist, setDomesticList] = useState([]);
    const [pacakagelist, setPacakageList] = useState([]);
    const [categorylist, setCategoryList] = useState([]);
    const [sliderData, setsliderData] = useState([]);
    const [refreshing, setrefreshing] = useState(false);
    const [currencySymbol, setCurrencySymbol] = useState(null);
    const [userID, setUserID] = useState(null);
    let appVersionCode, androidUrl, iosUrl;

    useFocusEffect(
        React.useCallback(() => {
            const getCallBackScreen = async () => {
                //LANGUAGE MANAGEMENT FUNCTION
                MemberLanguage();
            }
            getCallBackScreen();
        }, [])
    );

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        RemoteController();
    }, []);

    useEffect(() => {
    }, [loading, logo, refreshing, sliderData, domesticlist, activityList])

    //REMOTE DATA FATCH IN LOCAL STORAGE
    const RemoteController = async () => {
        try {
            var userData = await LocalService.RemoteServerController();
            if (userData) {
                setLogo(userData.applogo);
                axiosConfig(userData.authkey);
                if (Platform.OS === KEY.IOS) {
                    appVersionCode = userData.appstoreversioncode;
                } else {
                    appVersionCode = userData.appversioncode;
                }
                androidUrl = userData.playstoreid;
                iosUrl = userData.appstoreid;
                await getMemberDeatilsLocalStorage(userData.authkey);
            }
        } catch (error) {
            console.log(`error`, error);
        }
    };

    //TIME OUT FUNCTION
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //ON PRESS MAIN MENU
    const onPressTomainmenu = () => {
        if (customerInfo) {
            props.navigation.navigate(SCREEN.MAINMENUSCREEN);
        } else {
            props.navigation.navigate(SCREEN.AUTH);
        }
    }

    //ON PRESS TO PACAKAGE DETAILS
    const onPresstoPackageDetails = async (item) => {
        props.navigation.navigate(SCREEN.TOURPACKAGELISTSCREEN, { item });
    }

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async (USERID) => {
        axiosConfig(USERID);
        var customerInfo = await LocalService.LocalStorageService();
        if (customerInfo) {
            const responseCurrency = getCurrency(customerInfo.branchid.currency);
            setCurrencySymbol(responseCurrency);
            setCustomerInfo(customerInfo);
            getMemberDeatils(customerInfo?._id);
            sliderService();
            getActivityList();
            getDomeasticList();
            getpacakgeList();
            getCategoryList();
        } else {
            getPublicUserDeatils(USERID);
            sliderService();
            getActivityList();
            getDomeasticList();
            getpacakgeList();
            getCategoryList();
            await getAppVersion(appVersionCode);
        }
    }

    //GET PUBLIC USER DATA USEING API CALL
    const getPublicUserDeatils = async (id) => {
        try {
            const response = await getByIdUserService(id);
            if (response.data != null && response.data != 'undefind' && response.status === 200) {
                const responseCurrency = getCurrency(response.data.branchid.currency);
                setCurrencySymbol(responseCurrency);
                setUserID(response.data._id);
                Toast.show(languageConfig.welcometext, Toast.SHORT);
                LocalService.AuthenticatePublicUser(response.data);
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setloading(false);
        }
    }

    //ALERT BUTTON APP VERSIONCODE
    const checkAlertResponse = () =>
        Alert.alert(
            languageConfig.warning,
            Platform.OS === KEY.IOS ?
                languageConfig.homeupdatemessage
                : languageConfig.homeupdatemessage2,
            [
                {
                    text: languageConfig.closetext,
                    onPress: () => {
                        if (Platform.OS === KEY.IOS) {
                            RNExitApp.exitApp();
                        } else {
                            RNExitApp.exitApp();
                        }
                    }
                },
                {
                    text: languageConfig.updatenow, onPress: () => {
                        if (Platform.OS === KEY.IOS) {
                            Linking.openURL(`itms-apps://apps.apple.com/id/app/${iosUrl}`);
                        } else {
                            Linking.openURL(`market://details?id=${androidUrl}`);
                        }
                    }
                }
            ]
        );

    //CHECK APP VERSIONCODE
    const getAppVersion = (value) => {
        const appVersionCode = DeviceInfo.getVersion();
        if (appVersionCode != value) {
            return checkAlertResponse();
        }
    }

    //GET MEMBER DATA USEING API CALL
    const getMemberDeatils = async (id) => {
        try {
            const response = await getByIdMemberService(id);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                if (response.data.message === 'You do not have permission') {
                    setloading(false);
                    LocalService.RemoveAuthenticateMember();
                } else {
                    Toast.show(languageConfig.welcometext, Toast.SHORT);
                    LocalService.AuthenticateMember(response.data);
                    setCustomerInfo(response.data);
                }
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setloading(false);
        }
    }

    //ACTIVITY LIST FETCH DATA THROUGHT API
    const getActivityList = async () => {
        try {
            const response = await topActivityListService();
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setActivityList(response.data);
            }
        } catch (error) {
            console.log("error", error)
            firebase.crashlytics().recordError(error);
            setloading(false);
        }
    }

    //ACTIVITY LIST FETCH DATA THROUGHT API
    const getDomeasticList = async () => {
        try {
            const response = await topDomesticListService();
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setDomesticList(response.data);
            }
        } catch (error) {
            console.log("error", error)
            firebase.crashlytics().recordError(error);
            setloading(false);
        }
    }

    //ACTIVITY LIST FETCH DATA THROUGHT API
    const getpacakgeList = async () => {
        try {
            const response = await topTourPackagesListService();
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setPacakageList(response.data);
                setloading(false);
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setloading(false);
        }
    }

    //ACTIVITY LIST FETCH DATA THROUGHT API
    const getCategoryList = async () => {
        try {
            const response = await topTourCategoryListService();
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setCategoryList(response.data);
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setloading(false);
        }
    }

    //SILDER IMAGE MANAGE FUNCTION
    const sliderService = async () => {
        try {
            const response = await SliderService();
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setsliderData(response.data);
            }
        } catch (error) {
            setloading(false);
            firebase.crashlytics().recordError(error);
        }
    }

    //OPEN PAYMENT SCREEN
    const onPresstoActivityDetails = async (item) => {
        props.navigation.navigate(SCREEN.AVTIVITTOURDETAILS, { item });
    }

    //ON PRESS LOCATION LIST
    const onPressToLocationList = (item) => {
        props.navigation.navigate(SCREEN.LOCATIONLIST, { item });

    }

    //RENDER AVTIVITY SERVICE FLATLIST
    const AvtivityList = ({ item, index }) => (
        <TouchableOpacity style={styles.mainstyle1} onPress={() => onPresstoActivityDetails(item)}>
            <View >
                <Image source={{
                    uri: item.property && item.property.image && item.property.image[0] &&
                        item.property.image[0].attachment ? item.property.image[0].attachment : logo
                }}
                    style={styles.image1} />
            </View>
            <View style={{ marginTop: 4, marginLeft: 10 }}>
                <Text style={styles.titletext}>
                    {item.property && item.property.title}
                </Text>
            </View>
        </TouchableOpacity>
    )

    //RENDER DOMESTIC SERVICE FLATLIST
    const DomesticList = ({ item, index }) => (
        <View style={{ marginRight: 10, marginLeft: 10, marginTop: 10, marginBottom: 10 }}>
            <TouchableOpacity onPress={() => onPressToLocationList(item)}>
                <Image
                    style={styles.imagestyle}
                    source={{
                        uri: item.property && item.property.image && item.property.image[0] &&
                            item.property.image[0].attachment ? item.property.image[0].attachment : logo
                    }}
                    resizeMode={KEY.COVER}
                />
                <View style={styles.text}>
                    <Text style={styles.cardtext}>{item.property && item.property.locationname}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )

    //RENDER PACAKAGE SERVICE FLATLIST
    const PacakagesList = ({ item, index }) => (
        <TouchableOpacity style={styles.mainstyle} onPress={() => onPresstoPackageDetails(item)}>
            <View style={styles.imagecardstyle}>
                <Image
                    source={{
                        uri: item && item.image && item.image &&
                            item.image.attachment ? item.image.attachment : logo
                    }}
                    style={styles.imagestyle1} />
            </View>
            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10, marginTop: 5 }}>
                <Text style={styles.titletext}>
                    {item && item.title}
                </Text>
                <Text style={{ marginTop: 2, color: COLOR.DEFALUTCOLOR, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>
                    {item && item.duration}
                </Text>

                <Text style={[styles.titletext, {}]}>{currencySymbol + (item.items && item.items[0].cost ? item.items[0].cost : item.items[0].cost)}</Text>
                <Text>{"per person"}</Text>
            </View>
        </TouchableOpacity>

    )

    //RENDER CATEGORY SERVICE FLATLIST
    const CatogoryList = ({ item, index }) => (
        <TouchableOpacity style={styles.categorymaincard}>
            <View style={{ justifyContent: KEY.SPACEBETWEEN, flex: 1, flexDirection: KEY.ROW, }}>
                <Image style={styles.cardimagestyle}
                    // source={{
                    //     uri: item && item.image && item.image &&
                    //         item.image.attachment ? item.image.attachment : logo
                    // }}
                    source={IMAGE.TRAVEL1}
                />
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                    <Text style={{ fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM, color: COLOR.BLACK }}>
                        {item.property && item.property.title}
                    </Text>
                </View>
                <View>
                </View>
            </View>
            <Text style={{
                textAlign: KEY.CENTER, alignSelf: KEY.CENTER,
                color: COLOR.BLACK, width: WIDTH / 6 + 10,
                marginTop: -5, marginBottom: 5
            }}>{item.property && item.property.title}</Text>
        </TouchableOpacity>
    )

    //GET PULL TO REFRESH FUNCTION
    const onRefresh = () => {
        setrefreshing(true);
        sliderService();
        getActivityList();
        getDomeasticList();
        getpacakgeList();
        getCategoryList();
        wait(3000).then(() => setrefreshing(false));
    }

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
                }}>{languageConfig.home}</Text>
                <View>
                    <View style={{ marginBottom: 10, width: 16, height: 16, backgroundColor: COLOR.DEFALUTCOLOR, borderRadius: 100, justifyContent: KEY.CENTER, alignItems: KEY.CENTER, position: KEY.ABSOLUTE, bottom: 5, left: 15 }}>
                        <Text style={{ color: COLOR.WHITE, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM, fontSize: FONT.FONT_SIZE_10 }}>{'0'}</Text>
                    </View>
                    <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.NOTIFICATIONSCREEN)}>
                        <Ionicons name='notifications-outline' size={28} color={COLOR.BLACK} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    title={languageConfig.pullrefreshtext}
                    tintColor={COLOR.DEFALUTCOLOR}
                    titleColor={COLOR.DEFALUTCOLOR}
                    colors={[COLOR.DEFALUTCOLOR]}
                    onRefresh={onRefresh} />
            } >
                {(sliderData != null) || (sliderData && sliderData.length < 0) ?
                    <Swiper height={200} showsPagination={false}>
                        {sliderData.map((item, index) => (
                            <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginBottom: 10 }}>
                                <Image
                                    resizeMode={KEY.STRETCH}
                                    style={styles.image}
                                    source={{ uri: item.property && item.property.image && item.property.image[0] && item.property.image[0].attachment ? item.property.image[0].attachment : logo }} />
                            </View>
                        ))}
                    </Swiper>
                    : null
                }
                <View style={{ alignItems: KEY.CENTER, justifyContent: KEY.SPACEBETWEEN, flexDirection: KEY.ROW, marginLeft: 15, marginTop: 5 }}>
                    <Text style={styles.menuTitletext}>{'Travel by Category'}</Text>
                    <TouchableOpacity onPress={() => { }} style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER }}>
                        <Text style={{ marginLeft: 15, fontSize: FONT.FONT_SIZE_14, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, color: COLOR.DEFALUTCOLOR }}>{languageConfig.Viewalltext}</Text>
                        <Feather name="chevron-right" size={18} color={COLOR.DEFALUTCOLOR} style={{ marginRight: 10, }} />
                    </TouchableOpacity>
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    <View style={{ flexDirection: KEY.ROW, marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={categorylist}
                            numColumns={5}
                            renderItem={CatogoryList}
                            keyExtractor={item => item._id}
                            style={{ flexDirection: KEY.ROW, }}
                            keyboardShouldPersistTaps={KEY.ALWAYS}
                        />
                    </View>
                </ScrollView>
                <View style={{ alignItems: KEY.CENTER, justifyContent: KEY.SPACEBETWEEN, flexDirection: KEY.ROW, marginLeft: 15, marginTop: 0 }}>
                    <Text style={styles.menuTitletext}>{languageConfig.TravelbyLocation}</Text>
                    <TouchableOpacity onPress={() => { }} style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER }}>
                        <Text style={{ marginLeft: 15, fontSize: FONT.FONT_SIZE_14, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, color: COLOR.DEFALUTCOLOR }}>{languageConfig.Viewalltext}</Text>
                        <Feather name="chevron-right" size={18} color={COLOR.DEFALUTCOLOR} style={{ marginRight: 10, }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.CENTER, alignItems: KEY.CENTER, }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        data={domesticlist}
                        renderItem={DomesticList}
                        keyExtractor={item => item._id}
                        style={{ flexDirection: KEY.ROW, }}
                        keyboardShouldPersistTaps={KEY.ALWAYS}
                    />
                </View>
                <View style={{ alignItems: KEY.CENTER, justifyContent: KEY.SPACEBETWEEN, flexDirection: KEY.ROW, marginLeft: 20, marginTop: 10 }}>
                    <Text style={styles.menuTitletext}>{languageConfig.Podestination}</Text>
                    <TouchableOpacity onPress={() => { }} style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER }}>
                        <Text style={{ marginLeft: 15, fontSize: FONT.FONT_SIZE_14, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, color: COLOR.DEFALUTCOLOR }}>{languageConfig.Viewalltext}</Text>
                        <Feather name="chevron-right" size={18} color={COLOR.DEFALUTCOLOR} style={{ marginRight: 10, }} />
                    </TouchableOpacity>
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    <View style={{ flexDirection: KEY.ROW, marginLeft: 10, marginRight: 10 }}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={pacakagelist}
                            numColumns={5}
                            renderItem={PacakagesList}
                            keyExtractor={item => item._id}
                            style={{ flexDirection: KEY.ROW, }}
                            keyboardShouldPersistTaps={KEY.ALWAYS}
                        />
                    </View>
                </ScrollView>
                <View style={{ alignItems: KEY.CENTER, justifyContent: KEY.SPACEBETWEEN, flexDirection: KEY.ROW, marginLeft: 20, marginTop: 10 }}>
                    <Text style={styles.menuTitletext}>{languageConfig.PopularActivitesText}</Text>
                    <TouchableOpacity onPress={() => { }} style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER }}>
                        <Text style={{ marginLeft: 15, fontSize: FONT.FONT_SIZE_14, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, color: COLOR.DEFALUTCOLOR }}>{languageConfig.Viewalltext}</Text>
                        <Feather name="chevron-right" size={18} color={COLOR.DEFALUTCOLOR} style={{ marginRight: 10, }} />
                    </TouchableOpacity>
                </View>
                <View style={{ marginLeft: 10, marginRight: 10 }}>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={activityList}
                            numColumns={5}
                            renderItem={AvtivityList}
                            keyExtractor={item => item._id}
                            style={{ flexDirection: KEY.ROW, }}
                            keyboardShouldPersistTaps={KEY.ALWAYS}
                        />
                    </ScrollView>
                </View>
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView >
    )
}

export default HomeScreen;