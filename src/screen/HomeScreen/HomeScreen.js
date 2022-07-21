import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, SafeAreaView, Image, StatusBar, ScrollView, Platform, TouchableOpacity, FlatList } from "react-native";
import { topTourCategoryListService } from '../../services/CategoryService/CategoryService';
import { topTourPackagesListService } from "../../services/PackageService/PackageService";
import { topActivityListService } from '../../services/ActivityService/ActivityService';
import { topDomesticListService } from '../../services/ExploreService/ExploreService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import * as LocalService from '../../services/LocalService/LocalService';
import SliderService from "../../services/SliderService/SliderService";
import { firebase } from "@react-native-firebase/crashlytics";
import languageConfig from "../../languages/languageConfig";
import * as SCREEN from "../../context/screen/screenName";
import axiosConfig from "../../helpers/axiosConfig";
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import Swiper from "react-native-swiper";
import styles from "./HomeScreenstyle";

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const HomeScreen = (props) => {

    const [logo, setLogo] = useState(null);
    const [loading, setloading] = useState(true)
    const [customerInfo, setCustomerInfo] = useState(null);
    const [activityList, setActivityList] = useState([]);
    const [domesticlist, setDomesticList] = useState([]);
    const [pacakagelist, setPacakageList] = useState([]);
    const [categorylist, setCategoryList] = useState([]);
    const [sliderData, setsliderData] = useState([]);
    const [refreshing, setrefreshing] = useState(false);

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        RemoteController();
        getMemberDeatilsLocalStorage();
        sliderService();
    }, []);

    useEffect(() => {
    }, [loading, logo, refreshing, sliderData, domesticlist, activityList])

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
    const getMemberDeatilsLocalStorage = async () => {
        var memberInfo = await LocalService.LocalStorageService();
        if (memberInfo) {
            setCustomerInfo(memberInfo);
            getmemberid = memberInfo?._id;
            getActivityList();
            getDomeasticList();
            getpacakgeList();
            getCategoryList();
        } else {
            getActivityList();
            getDomeasticList();
            getpacakgeList();
            getCategoryList();
        }
    }

    //ACTIVITY LIST FETCH DATA THROUGHT API
    const getActivityList = async () => {
        try {
            const response = await topActivityListService();
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setActivityList(response.data);
                setloading(false);
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
                setloading(false);
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
                console.log("pacakage", response);
                setPacakageList(response.data);
                setloading(false);
            }
        } catch (error) {
            console.log("error", error)
            firebase.crashlytics().recordError(error);
            setloading(false);
        }
    }

    //ACTIVITY LIST FETCH DATA THROUGHT API
    const getCategoryList = async () => {
        try {
            const response = await topTourCategoryListService();
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                console.log("catogory", response);
                setCategoryList(response.data);
                setloading(false);
            }
        } catch (error) {
            console.log("error", error)
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
            console.log("error", error);
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

                <Text style={[styles.titletext, {}]}>{item.items && item.items[0].cost}</Text>
                <Text>{"per person"}</Text>
            </View>
        </TouchableOpacity>

    )

    //RENDER CATEGORY SERVICE FLATLIST
    const CatogoryList = ({ item, index }) => (
        <TouchableOpacity style={styles.categorymaincard}>
            <View style={{ justifyContent: KEY.SPACEBETWEEN, flex: 1, flexDirection: KEY.ROW, margin: 5, marginLeft: 6 }}>
                <Image style={styles.cardimagestyle}
                    source={{
                        uri: item && item.image && item.image &&
                            item.image.attachment ? item.image.attachment : logo
                    }}
                />
                <Text style={{ marginTop: 7, fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM, color: COLOR.BLACK }}>
                    {item.property && item.property.title}
                </Text>
                <View>
                </View>
            </View>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.DARK_CONTENT} />
            <View style={{ marginLeft: 15, marginRight: 15, marginTop: 15, marginBottom: 10, justifyContent: KEY.SPACEBETWEEN, flexDirection: KEY.ROW, alignItems: KEY.CENTER }}>
                <View>
                    <TouchableOpacity onPress={() => onPressTomainmenu()}>
                        <Image source={IMAGE.MENUICON} style={{ width: 27, height: 18 }} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.text1}>{languageConfig.home}</Text>
                <View>
                    <TouchableOpacity>
                        <Image source={IMAGE.BELL_ICON} style={{ width: 22, height: 27, tintColor: COLOR.BLACK }} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
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
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, flexDirection: KEY.COLUMN }}>
                    <Text style={styles.titletext}>{languageConfig.category}</Text>
                    <View style={{
                        borderWidth: 0.2, marginTop: 5, borderColor: COLOR.BLACK,
                        marginRight: 15, marginLeft: 15, width: WIDTH * 0.2, marginBottom: 5, marginTop: 10
                    }} />
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
                            ListFooterComponent={() => (
                                categorylist && categorylist.length == 0 &&
                                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, alignSelf: KEY.CENTER, width: WIDTH * 0.9 }}>
                                    <Image source={IMAGE.NODATA} style={{ height: 150, width: 200, marginTop: HEIGHT * 0.2 }} resizeMode={KEY.CONTAIN} />
                                    <Text style={{ fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                                </View>
                            )}
                        />
                    </View>
                </ScrollView>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, flexDirection: KEY.COLUMN }}>
                    <Text style={styles.titletext}>{languageConfig.TravelbyLocation}</Text>
                    <View style={{
                        borderWidth: 0.2, marginTop: 5, borderColor: COLOR.BLACK,
                        marginRight: 15, marginLeft: 15, width: WIDTH * 0.2, marginBottom: 10, marginTop: 10
                    }} />
                </View>
                <View style={{ flexDirection: KEY.COLUMN, justifyContent: KEY.CENTER, alignItems: KEY.CENTER, }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        // horizontal
                        numColumns={2}
                        data={domesticlist}
                        renderItem={DomesticList}
                        keyExtractor={item => item._id}
                        style={{ flexDirection: KEY.ROW, }}
                        keyboardShouldPersistTaps={KEY.ALWAYS}
                        ListFooterComponent={() => (
                            activityList && activityList.length == 0 &&
                            <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, alignSelf: KEY.CENTER, width: WIDTH * 0.9 }}>
                                <Image source={IMAGE.NODATA} style={{ height: 150, width: 200, marginTop: HEIGHT * 0.2 }} resizeMode={KEY.CONTAIN} />
                                <Text style={{ fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                            </View>
                        )}
                    />
                </View>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, flexDirection: KEY.COLUMN, marginTop: 10 }}>
                    <Text style={styles.titletext}>{languageConfig.Podestination}</Text>
                    <View style={{
                        borderWidth: 0.2, marginTop: 5, borderColor: COLOR.BLACK,
                        marginRight: 15, marginLeft: 15, width: WIDTH * 0.2, marginBottom: 10, marginTop: 10
                    }} />
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
                            ListFooterComponent={() => (
                                activityList && activityList.length == 0 &&
                                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, alignSelf: KEY.CENTER, width: WIDTH * 0.9 }}>
                                    <Image source={IMAGE.NODATA} style={{ height: 150, width: 200, marginTop: HEIGHT * 0.2 }} resizeMode={KEY.CONTAIN} />
                                    <Text style={{ fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                                </View>
                            )}
                        />

                    </View>
                </ScrollView>

                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, flexDirection: KEY.COLUMN, marginTop: 10 }}>
                    <Text style={styles.titletext}>{languageConfig.PopularActivitesText}</Text>
                    <View style={{
                        borderWidth: 0.2, marginTop: 5, borderColor: COLOR.BLACK,
                        marginRight: 15, marginLeft: 15, width: WIDTH * 0.2, marginBottom: 5, marginTop: 10
                    }} />
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
                            ListFooterComponent={() => (
                                activityList && activityList.length == 0 &&
                                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, alignSelf: KEY.CENTER, width: WIDTH * 0.9 }}>
                                    <Image source={IMAGE.NODATA} style={{ height: 150, width: 200, marginTop: HEIGHT * 0.2 }} resizeMode={KEY.CONTAIN} />
                                    <Text style={{ fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                                </View>
                            )}
                        />
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default HomeScreen;