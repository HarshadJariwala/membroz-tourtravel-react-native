import React, { useEffect, useState } from 'react';
import {
    View, Text, Dimensions, SafeAreaView, Modal,
    ImageBackground, TextInput, ScrollView, TouchableOpacity,
    StatusBar, Image, Keyboard, Platform, Share, Linking
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { patchMemberService } from '../../services/MemberService/MemberService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import { CLOUD_URL, UPLOAD_PRESET } from '../../context/actions/type';
import MyPermissionController from '../../helpers/appPermission';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from "react-native-image-picker";
import Feather from 'react-native-vector-icons/Feather';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import RNFetchBlob from 'rn-fetch-blob';
import styles from './MyProfileStyle';
import moment from 'moment';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const MyProfileScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [memberInfo, setMemberInfo] = useState(null);
    const [memberProfilePic, setMemberProfilePic] = useState(null);
    const [memberNumber, setMemberNumber] = useState(null);
    const [memberJoinDate, setMemberJoinDate] = useState(null);
    const [memberName, setMemberName] = useState(null);
    const [rateusAndroid, setrateusAndroid] = useState(null);
    const [rateusIos, setRateUsIos] = useState(null);
    const [showprofileModalVisible, setshowProfileModalVisible] = useState(false);
    const [showMessageModalVisible, setshowMessageModalVisible] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            //LANGUAGE MANAGEMENT FUNCTION
            MemberLanguage();
            RemoteController();
            getMemberDeatilsLocalStorage();
        }, [])
    );

    useEffect(() => {
        getMemberDeatilsLocalStorage();
    }, [])

    useEffect(() => {
    }, [memberProfilePic, memberJoinDate, showprofileModalVisible])

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var memberInfo = await LocalService.LocalStorageService();
        if (memberInfo) {
            setMemberInfo(memberInfo);
            setMemberProfilePic(memberInfo?.profilepic);
            setMemberNumber(memberInfo?.membernumber);
            setMemberName(memberInfo?.fullname);
            setMemberJoinDate(memberInfo?.property?.joining_date);
        } else {
            props.navigation.replace(SCREEN.AUTH);
        }
    }

    //IMAGE CLICK TO GET CALL FUNCTION
    const handlePicker = (value, options) => {
        if (value == 'gallery') {
            ImagePicker.launchImageLibrary(options, response => {
                if (response.didCancel) {
                    setLoading(false);
                    // console.log('User cancelled image picker');
                } else if (response.error) {
                    setLoading(false);
                    //firebase.crashlytics().recordError(response.error);
                    //console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    setLoading(false);
                    //console.log('User tapped custom button: ', response.customButton);
                } else {
                    setLoading(true);
                    onPressUploadFile(response.assets[0]);
                }
            });
        } else if (value == 'camera') {
            ImagePicker.launchCamera(options, response => {
                if (response.didCancel) {
                    setLoading(false);
                    //console.log('User cancelled image picker');
                } else if (response.error) {
                    setLoading(false);
                    firebase.crashlytics().recordError(response.error);
                    //console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    setLoading(false);
                    // console.log('User tapped custom button: ', response.customButton);
                } else {
                    setLoading(true);
                    onPressUploadFile(response.assets[0]);
                }
            });
        }
    }

    //ONPRESS TO MAIN MENU
    const onPressTomainmenu = () => {
        props.navigation.navigate(SCREEN.MAINMENUSCREEN);
    }

    // REMOTECONTROLLER USE TO AUTOCONFIG APP
    const RemoteController = async () => {
        var getUser = await LocalService.RemoteServerController();
        if (getUser) {
            setrateusAndroid(getUser.playstoreid);
            setRateUsIos(getUser.appstoreid);
        };
    };

    //RATE POPUP BOX CLICK TO CALL FUNCTION
    const onPressRateUs = () => {
        setshowMessageModalVisible(!showMessageModalVisible);
        if (Platform.OS != 'ios') {
            Linking.openURL(`market://details?id=${rateusAndroid}`);
        } else {
            Linking.openURL(`itms://itunes.apple.com/in/app/apple-store/${rateusIos}`);
        }
    }

    //SHARE BUTTON CLICK
    const onPressShare = async () => {
        try {
            const result = await Share.share({
                title: 'Salon App',
                message: `Please install this app and stay safe , AppLink :https://play.google.com/store/apps/developer?id=KRTYA+TECHNOLOGIES&hl=en_US&gl=US`,
                url: `https://play.google.com/store/apps/developer?id=KRTYA+TECHNOLOGIES&hl=en_US&gl=US`
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            //alert(error.message);
        }
    }

    //UPLOAD CLOUD STORAGE FUNCTION
    const onPressUploadFile = async (fileObj) => {
        if (fileObj != null) {
            const realPath = Platform.OS === 'ios' ? fileObj.uri.replace('file://', '') : fileObj.uri;
            await RNFetchBlob.fetch('POST', CLOUD_URL, { 'Content-Type': 'multipart/form-data' },
                Platform.OS === 'ios' ?
                    [{ name: 'file', filename: fileObj.fileSize, type: fileObj.type, data: RNFetchBlob.wrap(decodeURIComponent(realPath)) },
                    { name: 'upload_preset', data: UPLOAD_PRESET }]
                    :
                    [{ name: 'file', filename: fileObj.fileName, type: fileObj.type, data: RNFetchBlob.wrap(fileObj.uri) },
                    { name: 'upload_preset', data: UPLOAD_PRESET }]
            )
                .then(response => response.json())
                .then(data => {
                    setLoading(false);
                    if (data && data.url) {
                        setMemberProfilePic(data.url);
                        UpdateProfilePictureService(data.url);
                    }
                }).catch(error => {
                    console.log(`error`, error);
                    firebase.crashlytics().recordError(error);
                    Toast.show(languageConfig.supportimagefail, Toast.LONG);
                })
        } else {
            Toast.show(languageConfig.supportimageerror, Toast.LONG);
        }
    }

    //UPDATE PROFILE PICTURE API CALL
    const UpdateProfilePictureService = async (profilepic) => {
        let member = memberInfo;
        member.profilepic = profilepic;
        try {
            const response = await patchMemberService(memberInfo._id, member);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                LocalService.AuthenticateMember(response.data);
                Toast.show(languageConfig.profilesucessmessage, Toast.LONG);
            }
        }
        catch (error) {
            console.log(`error`, error);
            firebase.crashlytics().recordError(error);
            setLoading(false);
            Toast.show(languageConfig.profileerrormessage, Toast.LONG);
        }
    }

    //CHECK PERMISSION 
    const checkPermission = () => {
        setTimeout(
            () => {
                MyPermissionController.checkAndRequestStoragePermission()
                    .then((granted) => console.log('>Storage Permission Granted'))
                    .catch((err) => console.log(err))
            },
            500
        );
    }

    //MODAL POPUP SHOW TO CALL FUNCTION
    const uploadImageOption = (value) => {
        checkPermission();
        handlePicker(value);
        setshowProfileModalVisible(false);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            {
                showprofileModalVisible
                    ?
                    <StatusBar hidden={false} translucent={false} backgroundColor="rgba(0,0,0,0.5)" barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.DARK_CONTENT} />
                    :
                    <StatusBar hidden={false} translucent={false} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.DARK_CONTENT} />
            }
            <View style={{ marginLeft: 15, marginRight: 15, marginTop: 5, marginBottom: 10, justifyContent: KEY.FLEX_START, flexDirection: KEY.ROW, alignItems: KEY.CENTER }}>
                <View>
                    <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
                        <Feather name='arrow-left' size={26} color={COLOR.BLACK} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 20 }}>
                    <TouchableOpacity style={styles.viweRound}>
                        <Image source={!memberProfilePic ? IMAGE.USERPROFILE : { uri: memberProfilePic }}
                            style={{ height: 95, width: 95, borderRadius: 100 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.roundProfileStyle} onPress={() => setshowProfileModalVisible(true)}>
                        <Ionicons name='camera-outline' size={22} color={COLOR.WHITE} />
                    </TouchableOpacity>
                    <Text style={styles.text}>{memberName}</Text>
                </View>

                <View style={styles.viewMain}>
                    <View style={styles.viewRectangle}>
                        <TouchableOpacity onPress={() => { props.navigation.navigate(SCREEN.UPDATEPROFILESCREEN) }}>
                            <View style={styles.viewCard}>
                                <View style={styles.rounfIconStyle}>
                                    <Image style={{ width: 20, height: 18, tintColor: COLOR.DEFALUTCOLOR, }} source={IMAGE.MEMBERICON} />
                                </View>
                                <Text style={{ marginTop: 10, fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, color: COLOR.BLACK_OLIVE, marginLeft: 10 }}>{languageConfig.myprofile}</Text>
                                <View style={{ alignItems: KEY.FLEX_END, flex: 1, marginRight: 12 }}>
                                    <MaterialCommunityIcons name='chevron-right' size={30} style={{ color: COLOR.BLACK_OLIVE, marginTop: 5 }} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{
                            borderWidth: 0.2, marginTop: 5, borderColor: COLOR.LINE_COLOR,
                            marginRight: 15, marginLeft: 15, width: WIDTH - 60
                        }} />
                        <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.WEBVIEWSCREEN, { url: "https://www.membroz.com/terms-of-service-membroz/" })}>
                            <View style={styles.viewCard}>
                                <View style={styles.rounfIconStyle}>
                                    <AntDesign name='lock' size={20} color={COLOR.DEFALUTCOLOR} />
                                </View>
                                <Text style={{ marginTop: 10, fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, color: COLOR.BLACK_OLIVE, marginLeft: 10 }}>{languageConfig.termandconditiontext}</Text>
                                <View style={{ alignItems: KEY.FLEX_END, flex: 1, marginRight: 12 }}>
                                    <MaterialCommunityIcons name='chevron-right' size={30} style={{ color: COLOR.BLACK_OLIVE, marginTop: 5 }} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{
                            borderWidth: 0.2, marginTop: 5, borderColor: COLOR.LINE_COLOR,
                            marginRight: 15, marginLeft: 15, width: WIDTH - 60
                        }} />
                        <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.WEBVIEWSCREEN, { url: "https://www.membroz.com/privacy-policy/" })}>
                            <View style={styles.viewCard}>
                                <View style={styles.rounfIconStyle}>
                                    <AntDesign name='hearto' size={20} color={COLOR.DEFALUTCOLOR} />
                                </View>
                                <Text style={{ marginTop: 10, fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, color: COLOR.BLACK_OLIVE, marginLeft: 10 }}>{languageConfig.privacypolicy}</Text>
                                <View style={{ alignItems: KEY.FLEX_END, flex: 1, marginRight: 12 }}>
                                    <MaterialCommunityIcons name='chevron-right' size={30} style={{ color: COLOR.BLACK_OLIVE, marginTop: 5 }} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{
                            borderWidth: 0.2, marginTop: 5, borderColor: COLOR.LINE_COLOR,
                            marginRight: 15, marginLeft: 15, width: WIDTH - 60
                        }} />
                        <TouchableOpacity onPress={() => setshowMessageModalVisible(true)}>
                            <View style={styles.viewCard}>
                                <View style={styles.rounfIconStyle}>
                                    <FontAwesome name='star' size={20} color={COLOR.DEFALUTCOLOR} />
                                </View>
                                <Text style={{ marginTop: 10, fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, color: COLOR.BLACK_OLIVE, marginLeft: 10 }}>{languageConfig.rateus}</Text>
                                <View style={{ alignItems: KEY.FLEX_END, flex: 1, marginRight: 12 }}>
                                    <MaterialCommunityIcons name='chevron-right' size={30} style={{ color: COLOR.BLACK_OLIVE, marginTop: 5 }} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{
                            borderWidth: 0.2, marginTop: 5, borderColor: COLOR.LINE_COLOR,
                            marginRight: 15, marginLeft: 15, width: WIDTH - 60
                        }} />
                        <TouchableOpacity onPress={() => onPressShare()}>
                            <View style={styles.viewCard}>
                                <View style={styles.rounfIconStyle}>
                                    <Feather name='share-2' size={20} color={COLOR.DEFALUTCOLOR} />
                                </View>
                                <Text style={{ marginTop: 10, fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, color: COLOR.BLACK_OLIVE, marginLeft: 10 }}>{languageConfig.shareapp}</Text>
                                <View style={{ alignItems: KEY.FLEX_END, flex: 1, marginRight: 12 }}>
                                    <MaterialCommunityIcons name='chevron-right' size={30} style={{ color: COLOR.BLACK_OLIVE, marginTop: 5 }} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{ marginBottom: 10 }} />
                    </View>
                </View>
            </ScrollView>

            {/* message model Pop */}
            <Modal
                animationType='slide'
                transparent={true}
                visible={showprofileModalVisible}
                onRequestClose={() => setshowProfileModalVisible(!showprofileModalVisible)}>
                <View style={{ alignItems: KEY.CENTER, flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <View style={{ position: KEY.ABSOLUTE, bottom: 0 }} >
                        <View style={styles.msgModalView}>
                            <Text style={{ fontSize: FONT.FONT_SIZE_18, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, marginLeft: 25, color: COLOR.BLACK, marginTop: 10, marginBottom: 10 }}>{languageConfig.editphototext}</Text>
                            <TouchableOpacity onPress={() => uploadImageOption('camera')} >
                                <Text style={{ fontSize: FONT.FONT_SIZE_16, marginLeft: 25, color: COLOR.GRANITE_GRAY, marginTop: 10, marginBottom: 10 }}>{languageConfig.takephototext}</Text>
                            </TouchableOpacity>
                            <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, alignSelf: KEY.CENTER, width: WIDTH - 40, height: 1, backgroundColor: COLOR.BRIGHT_GRAY }} />
                            <TouchableOpacity onPress={() => uploadImageOption('gallery')} >
                                <Text style={{ fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, marginLeft: 25, color: COLOR.GRANITE_GRAY, marginTop: 10, marginBottom: 10 }}>{languageConfig.choosegallerytext}</Text>
                            </TouchableOpacity>
                            <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, alignSelf: KEY.CENTER, width: WIDTH - 40, height: 1, backgroundColor: COLOR.BRIGHT_GRAY }} />
                            <TouchableOpacity onPress={() => setshowProfileModalVisible(false)} >
                                <Text style={{ fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, marginLeft: 25, color: COLOR.GRANITE_GRAY, marginTop: 10, marginBottom: 10 }}>{languageConfig.closetext}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* message model Pop */}
            <Modal
                animationType='slide'
                transparent={true}
                visible={showMessageModalVisible}
                onRequestClose={() => setshowMessageModalVisible(!showMessageModalVisible)}>
                <View style={{ flex: 1, alignItems: KEY.CENTER, justifyContent: KEY.CENTER, backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <View style={{ position: KEY.ABSOLUTE, bottom: 0 }} >
                        <View style={styles.msgModalView}>
                            <Text style={{ fontSize: FONT.FONT_SIZE_22, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, color: COLOR.BLACK, marginLeft: 15, marginTop: 15 }}>{languageConfig.ratethisapp}</Text>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, color: COLOR.GRANITE_GRAY, marginLeft: 15, marginRight: 15, marginTop: 20 }}>{languageConfig.ratetext1}</Text>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, color: COLOR.GRANITE_GRAY, marginLeft: 15, marginRight: 15 }}>{languageConfig.ratetext2}</Text>
                            <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 25, marginLeft: WIDTH / 2 - 80 }}>
                                <TouchableOpacity onPress={() => onPressRateUs()} >
                                    <Text style={{ fontSize: FONT.FONT_SIZE_14, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, marginLeft: 25, color: COLOR.DEFALUTCOLOR }}>{languageConfig.ratetext}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setshowMessageModalVisible(false)} >
                                    <Text style={{ fontSize: FONT.FONT_SIZE_14, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, marginLeft: 25, color: COLOR.DEFALUTCOLOR }}>{languageConfig.nothanks}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            {loading ? <Loader /> : null}
        </SafeAreaView>

    );
}

export default MyProfileScreen;
