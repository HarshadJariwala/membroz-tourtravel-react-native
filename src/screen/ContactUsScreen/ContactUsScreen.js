import React, { useEffect, useState } from 'react';
import {
    View, Text, Dimensions, SafeAreaView, ImageBackground,
    Image, TextInput, ScrollView, TouchableOpacity, StatusBar, Keyboard, Platform
} from 'react-native';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import * as LocalAddTOcart from '../../services/LocalService/LocalAddTOcart';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import { UserService } from '../../services/UserService/UserService';
import languageConfig from '../../languages/languageConfig';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import * as SCREEN from '../../context/screen/screenName';
import axiosConfig from '../../helpers/axiosConfig';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './ContactUsStyle';
import moment from 'moment';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const daylist = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const ContactUsScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [mobile, setMobile] = useState(null);
    const [availableDays, setAvailableDays] = useState(null);
    const [availableTime, setAvailableTime] = useState(null);
    const [closeDays, setCloseDays] = useState(null);
    const [address, setAddress] = useState(null);
    const [primaryemail, setPrimaryemail] = useState(null);
    const [logo, setLogo] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [customerInfo, setCustomerInfo] = useState(null);
    const [cartCounter, setCartCounter] = useState(0);

    useEffect(() => {
        setLoading(true);
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        // CHECK AUTHCONTROLLER USE TO LOGIN OR NOT LOGIN        
        RemoteController();
        //LOCAL STORAGE FETCH DETAILS
        getMemberDeatilsLocalStorage();
    }, []);

    //TIME OUT FUNCTION
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //REMOTE DATA FATCH IN LOCAL STORAGE
    async function RemoteController() {
        var userData = await LocalService.RemoteServerController();
        if (userData) {
            setLogo(userData.applogo);
        }
    };

    //ON PRESS SUBMIT QUERY BUTTON
    const onPressToSubmitQuery = () => {
        props.navigation.navigate(SCREEN.SUBMITQUERY);
    }

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var customerInfo = await LocalService.LocalStorageService();
        await getMyCartList();
        if (customerInfo) {
            setCustomerInfo(customerInfo);
        }
        let tempDays = [], closeDays = [], workingday = [];
        let starttime, endtime;
        var publicUserInfo = await LocalService.LocalBranchDetails();
        axiosConfig(publicUserInfo._id);
        starttime = publicUserInfo?.branchid?.workinghours?.starttime;
        endtime = publicUserInfo?.branchid?.workinghours?.endtime;
        workingday = publicUserInfo?.branchid?.workinghours?.days;
        if (workingday.length > 0) {
            closeDays = daylist.filter(x => !workingday.includes(x));
            workingday.forEach(element => {
                tempDays.push(element + ' ' + `(${starttime + ' - ' + endtime})`)
            });
        }
        setMobile(publicUserInfo?.property?.mobile);
        setAvailableDays(tempDays);
        setCloseDays(closeDays);
        setAddress(publicUserInfo?.branchid?.property?.address);
        setAvailableTime(starttime + ' - ' + endtime);
        setPrimaryemail(publicUserInfo?.property?.primaryemail);
        setStartTime(publicUserInfo?.branchid?.workinghours?.starttime);
        setEndTime(publicUserInfo?.branchid?.workinghours?.endtime);
        wait(1000).then(() => setLoading(false));
    }

    useEffect(() => {
    }, [mobile, availableDays, closeDays, primaryemail, availableTime, cartCounter])

    const onPressTomainmenu = () => {
        if (customerInfo) {
            props.navigation.navigate(SCREEN.MAINMENUSCREEN);
        } else {
            props.navigation.navigate(SCREEN.AUTH);
        }
    }

    const onPressTomycart = () => {
        props.navigation.navigate(SCREEN.MYCARTSCREEN);
    }

    //GET LOCAL CART LIST
    const getMyCartList = async () => {
        const cartCounter = await LocalAddTOcart.getLocaladdtocardlist();
        if (cartCounter && cartCounter.length > 0) {
            setCartCounter(cartCounter.length);
        } else {
            setCartCounter(0);
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={false} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.DARK_CONTENT} />
            <View style={{ marginLeft: 15, marginRight: 15, marginTop: 5, marginBottom: 20, justifyContent: KEY.SPACEBETWEEN, flexDirection: KEY.ROW, alignItems: KEY.CENTER }}>
                <View>
                    <TouchableOpacity onPress={() => onPressTomainmenu()}>
                        <Image source={IMAGE.MENUICON} style={{ width: 27, height: 18 }} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.text}>{languageConfig.contactustext}</Text>
                <View>
                    <View style={{ marginBottom: 10, width: 16, height: 16, backgroundColor: COLOR.DEFALUTCOLOR, borderRadius: 100, justifyContent: KEY.CENTER, alignItems: KEY.CENTER, position: KEY.ABSOLUTE, bottom: 5, left: 15 }}>
                        <Text style={{
                            color: COLOR.WHITE, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM, fontSize: FONT.FONT_SIZE_10
                        }}>{cartCounter}</Text>
                    </View>
                    <TouchableOpacity onPress={() => onPressTomycart()}>
                        <Image source={IMAGE.BAG} style={{ width: 25, height: 25 }} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={styles.viewMain}>
                    <View style={styles.viewRectangle}>
                        <Image source={logo ? { uri: logo } : IMAGE.MEMBROZ_LOGO} resizeMode={KEY.COVER}
                            style={styles.imageLogo} />
                        <View style={{
                            flexDirection: KEY.ROW, alignItems: KEY.FLEX_START, alignSelf: KEY.FLEX_START,
                            justifyContent: KEY.FLEX_START, marginTop: 5, marginLeft: 10
                        }}>
                            <Ionicons name='location-outline' size={22} color={COLOR.DEFALUTCOLOR} />
                            <Text style={{
                                alignItems: KEY.FLEX_START, fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_NORMAL,
                                fontWeight: FONT.FONT_WEIGHT_REGULAR, color: COLOR.BLACK, marginLeft: 5, width: WIDTH * 0.8
                            }}>
                                {address}</Text>
                        </View>

                        <View style={{
                            flexDirection: KEY.ROW, alignItems: KEY.FLEX_START, alignSelf: KEY.FLEX_START,
                            justifyContent: KEY.FLEX_START, marginTop: 15, marginLeft: 10
                        }}>
                            <AntDesign name='mobile1' size={22} color={COLOR.DEFALUTCOLOR} />
                            <Text style={{
                                alignItems: KEY.FLEX_START, fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_NORMAL,
                                fontWeight: FONT.FONT_WEIGHT_REGULAR, color: COLOR.BLACK, marginLeft: 5, width: WIDTH / 2
                            }}>
                                {mobile}</Text>
                        </View>

                        <View style={{
                            flexDirection: KEY.ROW, alignItems: KEY.FLEX_START, alignSelf: KEY.FLEX_START,
                            justifyContent: KEY.FLEX_START, marginTop: 15, marginLeft: 12, marginBottom: 15
                        }}>
                            <Fontisto name='email' size={20} color={COLOR.DEFALUTCOLOR} />
                            <Text style={{
                                alignItems: KEY.FLEX_START, fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_NORMAL,
                                fontWeight: FONT.FONT_WEIGHT_REGULAR,
                                color: COLOR.BLACK, marginLeft: 8, width: WIDTH * 0.8
                            }}>{primaryemail}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.viewMain}>
                    <View style={styles.viewRectangle}>
                        <View style={{
                            flexDirection: KEY.ROW, marginTop: 10,
                            alignSelf: KEY.FLEX_START, marginLeft: 20
                        }}>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_18, textTransform: KEY.CAPITALIZE, color: COLOR.BLACK,
                                fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM,
                            }}>{languageConfig.hourstext}</Text>
                            <Text style={{
                                fontSize: FONT.FONT_SIZE_18, textTransform: KEY.CAPITALIZE, color: COLOR.DEFALUTCOLOR,
                                fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM, marginLeft: 5
                            }}>{languageConfig.opentext}</Text>
                        </View>
                        <View style={{ alignItems: KEY.FLEX_START, alignSelf: KEY.FLEX_START, marginLeft: 10, marginTop: 10 }}>
                            <Text style={{
                                alignItems: KEY.FLEX_START, fontSize: FONT.FONT_SIZE_18,
                                color: COLOR.BLACK, marginLeft: 10, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM,
                                textTransform: KEY.CAPITALIZE
                            }}>{languageConfig.mondaytext + ' - ' + languageConfig.saturdaytext}</Text>

                            <View style={{
                                flexDirection: KEY.ROW, alignItems: KEY.CENTER, alignSelf: KEY.FLEX_START, marginTop: 5, marginLeft: 10
                            }}>
                                <Image source={(IMAGE.TIMEICON)} style={{ height: 20, width: 16, tintColor: COLOR.DEFALUTCOLOR }} />
                                <Text style={{
                                    alignItems: KEY.FLEX_START, fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR,
                                    color: COLOR.BLACK, marginLeft: 5, width: WIDTH / 2, textTransform: KEY.CAPITALIZE
                                }}>{moment(startTime, ["HH.mm"]).format("hh:mm A") + ' - ' + moment(endTime, ["HH.mm"]).format("hh:mm A")}</Text>
                            </View>
                        </View>
                        {
                            closeDays && closeDays.map((item) => (
                                <View style={{
                                    alignItems: KEY.FLEX_START, alignSelf: KEY.FLEX_START, marginLeft: 10, margin: 10
                                }}>
                                    <View style={{
                                        flexDirection: KEY.COLUMN, alignItems: KEY.CENTER, alignSelf: KEY.FLEX_START, marginTop: 5, marginLeft: 5
                                    }}>
                                        <Text style={{
                                            alignItems: KEY.FLEX_START, fontSize: FONT.FONT_SIZE_16,
                                            color: COLOR.BLACK, marginLeft: 5, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM,
                                            textTransform: KEY.CAPITALIZE
                                        }}>{item}</Text>
                                        <Text style={{
                                            alignItems: KEY.FLEX_START, fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR,
                                            color: COLOR.BLACK, marginLeft: 10, marginTop: 10
                                        }}>{'closed'}</Text>
                                    </View>
                                </View>
                            ))
                        }
                        <View style={{ marginBottom: 20 }} />
                    </View>
                    <TouchableOpacity style={styles.btnStyle} onPress={() => onPressToSubmitQuery()}>
                        <Text style={{ fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM, color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_18 }}>{languageConfig.submitquery}</Text>
                    </TouchableOpacity>
                    <View style={{ marginBottom: 50 }} />
                </View>
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default ContactUsScreen;
