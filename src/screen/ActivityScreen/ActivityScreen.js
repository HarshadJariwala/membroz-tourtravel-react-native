import React, { useState, useEffect } from "react";
import { View, Text, RefreshControl, Dimensions, SafeAreaView, Image, StatusBar, ScrollView, Platform, TouchableOpacity, FlatList } from "react-native";
import languageConfig from "../../languages/languageConfig";
import * as SCREEN from "../../context/screen/screenName";
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import Loader from '../../components/loader/index';
import styles from "./Activityscreenstyle";
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import * as LocalService from '../../services/LocalService/LocalService';
import { ActivityListService } from '../../services/ActivityService/ActivityService';
import { firebase } from "@react-native-firebase/crashlytics";
import axiosConfig from "../../helpers/axiosConfig";


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ActivityScreen = (props) => {
    const [logo, setLogo] = useState(null);
    const [loading, setloading] = useState(true)
    const [activityList, setActivityList] = useState([]);
    const [customerInfo, setCustomerInfo] = useState(null);
    const [refreshing, setrefreshing] = useState(false);

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        RemoteController();
        getMemberDeatilsLocalStorage();
    }, []);

    useEffect(() => {
    }, [loading, logo, refreshing])

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
            getActivityList();
        } else {
            getActivityList();
        }
    }

    //ACTIVITY LIST FETCH DATA THROUGHT API
    const getActivityList = async () => {
        try {
            const response = await ActivityListService();
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                console.log("response data", response)
                setActivityList(response.data);
                setloading(false);
            }
        } catch (error) {
            console.log("error", error)
            firebase.crashlytics().recordError(error);
            setloading(false);
        }
    }

    //GET PULL TO REFRESH FUNCTION
    const onRefresh = () => {
        setrefreshing(true);
        getActivityList();
        wait(3000).then(() => setrefreshing(false));
    }
    //RENDER CATEGORY SERVICE FLATLIST
    const AvtivityList = ({ item, index }) => (
        <TouchableOpacity style={styles.mainstyle} onPress={() => onPresstoActivityDetails(item)}>
            <Image source={{
                uri: item.property && item.property.image && item.property.image[0] &&
                    item.property.image[0].attachment ? item.property.image[0].attachment : logo
            }}
                style={styles.imagestyle1} />
            <View style={{
                marginLeft: 10,
                marginTop: 5,
                marginBottom: 5
            }}>
                <Text style={styles.titletext}>
                    {item.property && item.property.title}
                </Text>
            </View>
        </TouchableOpacity>
    )
    //OPEN PAYMENT SCREEN
    const onPresstoActivityDetails = async (item) => {
        props.navigation.navigate(SCREEN.AVTIVITTOURDETAILS, { item });
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={false} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.DARK_CONTENT} />
            <View style={{ marginLeft: 15, marginRight: 15, marginTop: 5, marginBottom: 20, justifyContent: KEY.SPACEBETWEEN, flexDirection: KEY.ROW, alignItems: KEY.CENTER }}>
                <View>
                    <TouchableOpacity onPress={() => onPressTomainmenu()}>
                        <Image source={IMAGE.MENUICON} style={{ width: 27, height: 18 }} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.text}>{languageConfig.activityrtext}</Text>
                <View>
                    <TouchableOpacity>
                        <Image source={IMAGE.BELL_ICON} style={{ width: 22, height: 27, tintColor: COLOR.BLACK }} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        title={languageConfig.pullrefreshtext}
                        tintColor={COLOR.DEFALUTCOLOR}
                        titleColor={COLOR.DEFALUTCOLOR}
                        colors={[COLOR.DEFALUTCOLOR]}
                        onRefresh={onRefresh} />
                }  >
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, alignSelf: KEY.CENTER }}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={activityList}
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
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ActivityScreen;