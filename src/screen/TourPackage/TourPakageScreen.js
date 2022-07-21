import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Dimensions, SafeAreaView, Image, StatusBar, ScrollView, Platform, TouchableOpacity } from "react-native";
import * as KEY from '../../context/actions/key';
import languageConfig from "../../languages/languageConfig";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { topTourCategoryListService } from '../../services/CategoryService/CategoryService';
import { topTourPackagesListService } from "../../services/PackageService/PackageService";
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import * as LocalService from '../../services/LocalService/LocalService';
import axiosConfig from "../../helpers/axiosConfig";
import { firebase } from "@react-native-firebase/crashlytics";
import * as FONT from '../../styles/typography';
import * as SCREEN from "../../context/screen/screenName";
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from "./TourPakagestyle";

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const TourPakageScreen = (props) => {

    const [logo, setLogo] = useState(null);
    const [loading, setloading] = useState(true)
    const [customerInfo, setCustomerInfo] = useState(null);
    const [categorylist, setCategoryList] = useState([]);
    const [pacakagelist, setPacakageList] = useState([]);
    const [refreshing, setrefreshing] = useState(false);

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        RemoteController();
        getMemberDeatilsLocalStorage();
    }, []);

    useEffect(() => {
    }, [loading, logo, refreshing, categorylist, customerInfo, pacakagelist])

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

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var memberInfo = await LocalService.LocalStorageService();
        if (memberInfo) {
            setCustomerInfo(memberInfo);
            getmemberid = memberInfo?._id;
            getCategoryList();
            getpacakgeList();
        } else {
            getCategoryList();
            getpacakgeList();
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
                setCategoryList(response.data);
                setloading(false);
            }
        } catch (error) {
            console.log("error", error)
            firebase.crashlytics().recordError(error);
            setloading(false);
        }
    }

    //THIS FUNCTION INPRESS CATEGORY LIST ITEM
    const onPressCategoryListItem = (item) => {
        // if (item) {
        //     props.navigation.navigate(SCREEN.TOURPACKAGELISTSCREEN, { item });
        // }
        // console.log("item", item)
    }

    //RENDER CATEGORY SERVICE FLATLIST
    const CatogoryList = ({ item, index }) => (
        <TouchableOpacity style={styles.categorymaincard} onPress={() => onPressCategoryListItem(item)}>
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

    //ON PRESS TO PACAKAGE DETAILS
    const onPresstoPackageDetails = async (item) => {
        props.navigation.navigate(SCREEN.TOURPACKAGELISTSCREEN, { item });
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={false} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.DARK_CONTENT} />
            <View style={{ marginLeft: 15, marginRight: 15, marginTop: 15, marginBottom: 10, justifyContent: KEY.SPACEBETWEEN, flexDirection: KEY.ROW, alignItems: KEY.CENTER }}>
                <View>
                    <TouchableOpacity onPress={() => onPressTomainmenu()}>
                        <Image source={IMAGE.MENUICON} style={{ width: 27, height: 18 }} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.text1}>{languageConfig.packagetext}</Text>
                <View>
                    <TouchableOpacity>
                        <Image source={IMAGE.BELL_ICON} style={{ width: 22, height: 27, tintColor: COLOR.BLACK }} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>


                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    <View style={{ flexDirection: KEY.ROW, marginLeft: 15, marginRight: 15, marginBottom: 10 }}>
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

                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={{ flexDirection: KEY.COLUMN }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10, marginRight: 10 }}>
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={pacakagelist}
                                    numColumns={2}
                                    renderItem={PacakagesList}
                                    keyExtractor={item => item._id}
                                    style={{ flexDirection: KEY.ROW, }}
                                    keyboardShouldPersistTaps={KEY.ALWAYS}
                                    ListFooterComponent={() => (
                                        pacakagelist && pacakagelist.length == 0 &&
                                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, alignSelf: KEY.CENTER, width: WIDTH * 0.9 }}>
                                            <Image source={IMAGE.NODATA} style={{ height: 150, width: 200, marginTop: HEIGHT * 0.2 }} resizeMode={KEY.CONTAIN} />
                                            <Text style={{ fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                                        </View>
                                    )}
                                />
                            </View>
                        </ScrollView>

                    </View>
                </ScrollView>
            </ScrollView>
        </SafeAreaView >
    )
}

export default TourPakageScreen;