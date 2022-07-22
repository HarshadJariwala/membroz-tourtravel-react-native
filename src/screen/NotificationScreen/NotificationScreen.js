import React, { useState, useEffect } from 'react';
import {
    View, Text, SafeAreaView, TouchableOpacity, ScrollView,
    Image, StatusBar, FlatList, RefreshControl, Animated, Dimensions
} from 'react-native';
import { getByIdNotificationDeleteService, NotificationService, deleteAllNotificationService }
    from '../../services/NotificationService/NotificationService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Feather from 'react-native-vector-icons/Feather';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AUTHUSER } from '../../context/actions/type';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './styles';
import moment from 'moment';
import axiosConfig from '../../helpers/axiosConfig';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const NotificationScreen = (props) => {
    const [loading, setloading] = useState(false);
    const [notification, setNotification] = useState(0);
    const [notificationList, setNotificationList] = useState([]);
    const [customerId, setCustomerID] = useState(null);
    const [refreshing, setrefreshing] = useState(false);

    useEffect(() => {
    }, [loading, notification, notificationList, customerId, refreshing]);

    useEffect(() => {
        setloading(true);
        getMemberDeatilsLocalStorage();
    }, []);

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var customerInfo = await LocalService.LocalStorageService();
        var publicUserInfo = await LocalService.LocalBranchDetails();
        axiosConfig(publicUserInfo._id);
        if (customerInfo) {
            getNotification(customerInfo._id);
            setCustomerID(customerInfo._id);
        } else {
            setloading(false);
        }
    }

    //refresh function
    const onRefresh = () => {
        setrefreshing(true);
        getNotification(customerId);
        wait(3000).then(() => setrefreshing(false));
    }

    //get Notification Api 
    const getNotification = async (id) => {
        try {
            const response = await NotificationService(id);
            setNotification(response.data.length);
            setNotificationList(response.data);
            setloading(false);
        } catch (error) {
            setloading(false);
            firebase.crashlytics().recordError(error);
        }
    }

    //render Notification on flatlist function
    const renderNotification = ({ item }) => (
        <View>
            <Swipeable renderRightActions={() => RightActions(item)} onSwipeableRightOpen={() => swipeToDeleteNotification(item)}>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginBottom: 10, marginTop: 10 }}>
                    <View style={styles.notificationview}>
                        <View style={{ alignItems: KEY.FLEX_END, justifyContent: KEY.FLEX_END, marginTop: 5 }}>
                            <Text style={{ fontSize: 12, marginRight: 20, color: COLOR.PLACEHOLDER_COLOR }}>
                                {moment(item.createdAt).format('LL') == moment(item.createdAt).format('LL') ? moment(item.createdAt).format('LT') : moment(item.createdAt).format('LLL')}
                            </Text>
                        </View>
                        <View style={{ flexDirection: KEY.ROW, flex: 1, marginTop: -30, marginLeft: 15, alignItems: KEY.CENTER, }}>
                            <View style={styles.rounfIconStyle}>
                                <Image style={{ width: 20, height: 15, tintColor: COLOR.DEFALUTCOLOR, }} source={IMAGE.MONEYICON} />
                            </View>
                            <View style={{ flex: 1, marginLeft: 15 }}>
                                {/* <Text style={{ fontSize: 12, color: COLOR.DEFALUTCOLOR }} >#{item?.property?.subject}</Text> */}
                                <Text style={{ fontSize: 14, color: COLOR.BLACK }}>{item?.property?.message}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Swipeable>
        </View>
    )

    //swipe To Delete Notification function
    const swipeToDeleteNotification = async (item) => {
        try {
            const response = await getByIdNotificationDeleteService(item._id);
            if (response.data != null && response.data != undefined && response.status == 200)
                getNotification(customerId);
        } catch (error) {
            setloading(false);
            firebase.crashlytics().recordError(error);
        }
    }

    //clear btn to all notification clear 
    const clearAllNotification = async () => {
        let clear = [];
        notificationList.forEach(ele => {
            clear.push(ele._id);
        });
        try {
            const response = await deleteAllNotificationService(clear);
            if (response.status === 200) {
                getNotification(customerId);
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
        }
    }

    //swipe To Delete Left Actions
    const RightActions = () => {
        return (
            <View
                style={{ flex: 1, backgroundColor: COLOR.DEFALUTCOLOR, justifyContent: KEY.CENTER }}>
                <Text
                    style={{
                        color: COLOR.WHITE,
                        paddingHorizontal: 10,
                        fontWeight: FONT.FONT_WEIGHT_MEDIAM
                    }}>
                </Text>
            </View>
        )
    }

    //ON PRESS MAIN MENU
    const onPressTomainmenu = () => {
        if (customerInfo) {
            props.navigation.navigate(SCREEN.MAINMENUSCREEN);
        } else {
            props.navigation.navigate(SCREEN.AUTH);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={false} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.DARK_CONTENT} />
            <View style={{ marginLeft: 15, marginRight: 15, marginTop: 5, justifyContent: KEY.SPACEBETWEEN, flexDirection: KEY.ROW, alignItems: KEY.CENTER }}>
                <View>
                    <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
                        <Feather name='arrow-left' size={24} color={COLOR.BLACK} />
                    </TouchableOpacity>
                </View>
                <Text style={{
                    fontSize: FONT.FONT_SIZE_20,
                    fontFamily: FONT.FONT_BOLD,
                    fontWeight: FONT.FONT_WEIGHT_MEDIAM,
                    color: COLOR.BLACK
                }}>{languageConfig.notification}</Text>
                <View>
                    <View style={{ marginBottom: 10, width: 16, height: 16, backgroundColor: COLOR.DEFALUTCOLOR, borderRadius: 100, justifyContent: KEY.CENTER, alignItems: KEY.CENTER, position: KEY.ABSOLUTE, bottom: 5, left: 15 }}>
                        <Text style={{ color: COLOR.WHITE, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM, fontSize: FONT.FONT_SIZE_10 }}>{notification}</Text>
                    </View>
                    <TouchableOpacity>
                        <Ionicons name='notifications-outline' size={28} color={COLOR.BLACK} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                refreshControl={<RefreshControl refreshing={refreshing} title={languageConfig.pullrefreshtext} tintColor={COLOR.DEFALUTCOLOR} titleColor={COLOR.DEFALUTCOLOR}
                    colors={[COLOR.DEFALUTCOLOR]} onRefresh={() => onRefresh()} />}>
                {(notificationList == null) || (notificationList && notificationList.length <= 0) ?
                    (loading ? null :
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <Image source={IMAGE.NODATA} style={{ height: 150, width: 200, marginTop: HEIGHT * 0.3 }} resizeMode={KEY.CONTAIN} />
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>{languageConfig.norecordtext}</Text>
                        </View>
                    )
                    :
                    <FlatList
                        data={notificationList}
                        renderItem={renderNotification}
                        keyExtractor={item => item._id}
                    />
                }
                <View style={{ paddingBottom: 50 }} />
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default NotificationScreen;
