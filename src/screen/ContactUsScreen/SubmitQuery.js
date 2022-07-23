import React, { useEffect, useState } from 'react';
import {
    View, Text, Dimensions, SafeAreaView, ImageBackground, Platform, Modal,
    Image, TextInput, ScrollView, TouchableOpacity, StatusBar, Keyboard
} from 'react-native';
import { HelpSupportService } from '../../services/HelpSupportService/HelpSupportService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import { CLOUD_URL, UPLOAD_PRESET } from '../../context/actions/type';
import MyPermissionController from '../../helpers/appPermission';
import languageConfig from '../../languages/languageConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectDropdown from 'react-native-select-dropdown';
import * as SCREEN from '../../context/screen/screenName';
import * as ImagePicker from "react-native-image-picker";
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import axiosConfig from '../../helpers/axiosConfig';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './SubmitQueryStyle';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const data = [
    languageConfig.requestforsupporttext,
    languageConfig.systemenhancementstext,
    languageConfig.othertext
];

const SubmitQuery = (props) => {
    const [category, setCatogry] = useState(null);
    const [categoryError, setCatogryError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [subject, setSubject] = useState(null);
    const [subjectError, setSubjectError] = useState(null);
    const [contactNo, setContactNo] = useState(null);
    const [contactNoError, setContactNoError] = useState(null);
    const [email, setEmail] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [meassge, setMeassge] = useState(null);
    const [meassgeError, setMeassgeError] = useState(null);
    const [supportImage, setSupportImage] = useState(null);
    const [showMessageModalVisible, setshowMessageModalVisible] = useState(false);
    const [branchName, setBranchName] = useState(null);
    const [memberID, setMemberID] = useState(null);
    const [userID, setUserID] = useState(null);
    const [ticketPhoto, setTicketPhoto] = useState(null);
    const firstTextInputRef = React.createRef();
    const secondTextInputRef = React.createRef();
    const thirdTextInputRef = React.createRef();

    useEffect(() => {
        setLoading(true);
        //LANGUAGE MANAGEMENT FUNCTION 
        MemberLanguage();
        checkPermission();
        getMemberDeatilsLocalStorage();
    }, []);

    useEffect(() => {
    }, [
        category, categoryError, loading, subject, subjectError, contactNo,
        contactNoError, email, emailError, meassge, meassgeError, supportImage,
        showMessageModalVisible, ticketPhoto, branchName
    ]);

    //check permission 
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

    //TIME OUT FUNCTION
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var memberInfo = await LocalService.LocalStorageService();
        var publicUserInfo = await LocalService.LocalBranchDetails();
        setBranchName(publicUserInfo.branchid.branchname);
        axiosConfig(publicUserInfo._id);
        if (memberInfo) {
            setMemberID(memberInfo?._id);
            wait(1000).then(() => setLoading(false));
        } else {
            setUserID(publicUserInfo?._id);
            wait(1000).then(() => setLoading(false));
        }
    }

    //CHECK CATEGORY VALIDATION
    const CheckCategory = (category) => {
        if (!category || category.length <= 0) {
            setCatogryError(languageConfig.CatogeryText);
            return;
        }
        setCatogry(category);
        setCatogryError(null);
        return;
    }

    //CHECK SUNJECT VALIDATION
    const CheckSubject = (subject) => {
        if (!subject || subject.length <= 0) {
            setSubjectError(languageConfig.Selectcategorytext);
            return;
        }
        setSubject(subject);
        setSubjectError(null);
        return;
    }

    //CHECT MOBILE NUMBER
    const CheckContact = (contactNo) => {
        if (!contactNo || contactNo.length <= 0) {
            setContactNoError(languageConfig.Contactext);
            return;
        }
        setContactNo(contactNo);
        setContactNoError(null);
        return;
    }

    // CHECK EMAIL VALIDATION
    const CheckEamil = (email) => {
        const reg = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
        if (!email || email.length <= 0) {
            setEmailError(languageConfig.email);
            return;
        }
        if (!reg.test(email)) {
            setEmailError(languageConfig.emailinvalid);
            return;
        }
        setEmail(email);
        setEmailError(null);
        return;
    }

    //CHECK MEASSGE VALIDATION
    const CheckMeassge = (meassge) => {
        if (!meassge || meassge.length <= 0) {
            setMeassgeError(languageConfig.meassgeText);
            return;
        }
        setMeassge(meassge);
        setMeassgeError(null);
        return;
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
                    firebase.crashlytics().recordError(response.error);
                    // console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    setLoading(false);
                    // console.log('User tapped custom button: ', response.customButton);
                } else {
                    setLoading(true);
                    onPressUploadFile(response.assets[0]);
                }
            });
        } else if (value == 'camera') {
            ImagePicker.launchCamera(options, response => {
                if (response.didCancel) {
                    setLoading(false);
                    // console.log('User cancelled image picker');
                } else if (response.error) {
                    setLoading(false);
                    firebase.crashlytics().recordError(response.error);
                    // console.log('ImagePicker Error: ', response.error);
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
                        setSupportImage(data.url);
                        setTicketPhoto("image uploaded");
                        Toast.show(languageConfig.supportimagemessage, Toast.SHORT);
                    }
                }).catch(error => {
                    firebase.crashlytics().recordError(error);
                    Toast.show(languageConfig.supportimagefail, Toast.SHORT);
                })
        } else {
            Toast.show(languageConfig.supportimageerror, Toast.SHORT);
        }
    }

    //MODAL POPUP SHOW TO CALL FUNCTION
    const uploadImageOption = (value) => {
        checkPermission();
        handlePicker(value);
        setshowMessageModalVisible(false);
    }

    //ONPRESS TO SUBMIT QUERY
    const onPresstoSubmit = async () => {
        if (!category || !subject || !contactNo || !email || !meassge) {
            CheckCategory(category);
            CheckSubject(subject);
            CheckContact(contactNo);
            CheckEamil(email);
            CheckMeassge(meassge);
            return;
        }
        setLoading(true);
        Keyboard.dismiss();
        try {
            let body = {
                'status': 'Requested',
                'subject': subject,
                'customerid': memberID ? memberID : userID,
                'onModel': 'Member',
                'category': category,
                'content': meassge,
                "property": {
                    'customerid': memberID ? memberID : userID,
                    'category': category,
                    'subject': subject,
                    "primary_email": email,
                    "mobile": contactNo,
                    'content': meassge,
                    "attachments": [
                        {
                            "attachment": supportImage,
                            "extension": "png",
                            "originalfilename": branchName
                        }
                    ]
                },
                "attachments": [
                    {
                        "attachment": supportImage,
                        "extension": "png",
                        "originalfilename": branchName
                    }
                ]
            }
            const response = await HelpSupportService(body);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                resetScreen();
                setLoading(false);
                Toast.show(languageConfig.supportticket, Toast.SHORT);
                props.navigation.goBack(null);
            }
        }
        catch (error) {
            console.log(`error`, error);
            firebase.crashlytics().recordError(error);
            resetScreen();
        }
    }

    //CLEAR FIELD UP DATA
    const resetScreen = () => {
        setCatogry(null);
        setCatogryError(null);
        setSubject(null);
        setSubjectError(null);
        setContactNo(null);
        setContactNoError(null);
        setEmail(null);
        setEmailError(null);
        setMeassge(null);
        setMeassgeError(null);
    }

    //REMOVE IMAGE ONPRESS TO
    const removeImage = () => {
        setTicketPhoto(null);
        supportImage(null);
    }

    const onPressTocontactus = () => {
        props.navigation.navigate(SCREEN.CONTACTUSSCREEN);
    }

    const onPressTomycart = () => {
        props.navigation.navigate(SCREEN.MYCARTSCREEN);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            {
                showMessageModalVisible
                    ?
                    <StatusBar hidden={false} translucent={false} backgroundColor="rgba(0,0,0,0.5)" barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.DARK_CONTENT} />
                    :
                    <StatusBar hidden={false} translucent={false} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.DARK_CONTENT} />
            }
            <View style={{ marginLeft: 15, marginRight: 15, marginTop: 5, justifyContent: KEY.SPACEBETWEEN, flexDirection: KEY.ROW, alignItems: KEY.CENTER }}>
                <View>
                    <TouchableOpacity onPress={() => onPressTocontactus()}>
                        <Feather name='arrow-left' size={24} color={COLOR.BLACK} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.text}>{languageConfig.submitquery}</Text>
                <View>
                    <TouchableOpacity onPress={() => onPressTomycart()}>
                        <Image source={IMAGE.BAG} style={{ width: 25, height: 25 }} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={styles.mainContainer}>
                    <View style={styles.mainCard}>
                        <View style={{ marginLeft: 22, marginTop: 10, flexDirection: KEY.ROW }}>
                            <Text style={styles.headertext}>{languageConfig.HeppytoText}</Text>
                            <Text style={{
                                color: COLOR.DEFALUTCOLOR,
                                marginLeft: 5,
                                fontFamily: FONT.FONT_BOLD,
                                fontWeight: FONT.FONT_WEIGHT_MEDIAM,
                                fontSize: FONT.FONT_SIZE_18
                            }}>{languageConfig.helptext}</Text>
                        </View>
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <SelectDropdown
                                buttonTextStyle={{
                                    color: category ? COLOR.BLACK : COLOR.LIGHT_BLACK,
                                    textAlign: KEY.LEFT, marginLeft: 10, fontSize: FONT.FONT_SIZE_16,
                                    fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR,
                                }}
                                defaultButtonText={languageConfig.SelectCategoryText}
                                data={data}
                                dropdownStyle={{ color: COLOR.GRANITE_GRAY, marginBottom: 20, marginLeft: 5 }}
                                buttonStyle={{
                                    marginTop: 15,
                                    backgroundColor: COLOR.WHITE,
                                    color: COLOR.LIGHT_BLACK,
                                    marginBottom: 5,
                                    borderRadius: 5,
                                    borderWidth: 1,
                                    borderColor: COLOR.TEXTINPUTCOLOR,
                                    width: WIDTH - 60,
                                    height: 45,
                                    backgroundColor: COLOR.WHITE,
                                    borderBottomRightRadius: 20,
                                    borderTopLeftRadius: 20,
                                }}
                                renderDropdownIcon={() => <Ionicons name="chevron-down" size={20} color={COLOR.BLACK} />}
                                dropdownIconPosition={"right"}
                                onSelect={(selectedItem, index) => {
                                    setCatogry(selectedItem);
                                }}
                                onChangeText={(category) => CheckCategory(category)}
                            />
                            {/* {
                                !categoryError ?

                                    <View
                                        style={{
                                            borderBottomColor: COLOR.BRIGHT_GRAY,
                                            borderBottomWidth: 1,
                                            alignSelf: KEY.CENTER,
                                            marginTop: 0,
                                            width: WIDTH - 60,
                                            color: COLOR.BLACK
                                        }}
                                    />
                                    :
                                    <View
                                        style={{
                                            borderBottomColor: COLOR.ERRORCOLOR,
                                            borderBottomWidth: 1,
                                            alignSelf: KEY.CENTER,
                                            marginTop: 0,
                                            width: WIDTH - 60,
                                            color: COLOR.BLACK
                                        }}
                                    />
                            } */}
                        </View>
                        <View style={{ marginLeft: 20, marginTop: 10 }}>
                            <TextInput placeholder={languageConfig.subjecttext}
                                placeholderTextColor={COLOR.LIGHT_BLACK}
                                selectionColor={COLOR.DEFALUTCOLOR}
                                returnKeyType={KEY.NEXT}
                                defaultValue={subject}
                                autoCapitalize={KEY.NONE}
                                style={!subjectError ? styles.inputTextView1 : styles.inputTextViewError1}
                                blurOnSubmit={false}
                                onSubmitEditing={() => firstTextInputRef.current.focus()}
                                onChangeText={(subject) => CheckSubject(subject)}
                            />
                        </View>
                        <View style={{ marginLeft: 20, marginTop: 10 }}>
                            <TextInput placeholder={languageConfig.contactnumberText}
                                placeholderTextColor={COLOR.LIGHT_BLACK}
                                selectionColor={COLOR.DEFALUTCOLOR}
                                keyboardType='number-pad'
                                defaultValue={contactNo}
                                autoCapitalize={KEY.NONE}
                                returnKeyType={KEY.DONE}
                                style={!contactNoError ? styles.inputTextView1 : styles.inputTextViewError1}
                                blurOnSubmit={false}
                                ref={firstTextInputRef}
                                onSubmitEditing={() => secondTextInputRef.current.focus()}
                                onChangeText={(contactNo) => CheckContact(contactNo)}
                            />
                        </View>
                        <View style={{ marginLeft: 20, marginTop: 10 }}>
                            <TextInput placeholder={languageConfig.emailtext}
                                placeholderTextColor={COLOR.LIGHT_BLACK}
                                selectionColor={COLOR.DEFALUTCOLOR}
                                keyboardType='email-address'
                                defaultValue={email}
                                autoCapitalize={KEY.NONE}
                                returnKeyType={KEY.NEXT}
                                style={!emailError ? styles.inputTextView1 : styles.inputTextViewError1}
                                blurOnSubmit={false}
                                ref={secondTextInputRef}
                                onSubmitEditing={() => thirdTextInputRef.current.focus()}
                                onChangeText={(email) => CheckEamil(email)}
                            />
                        </View>
                        <View style={{ marginLeft: 20, marginTop: 10 }}>
                            <TextInput placeholder={languageConfig.meassgetext}
                                placeholderTextColor={COLOR.LIGHT_BLACK}
                                selectionColor={COLOR.DEFALUTCOLOR}
                                returnKeyType={KEY.DONE}
                                defaultValue={meassge}
                                autoCapitalize={KEY.NONE}
                                style={!meassgeError ? styles.inputTextView1 : styles.inputTextViewError1}
                                blurOnSubmit={false}
                                ref={thirdTextInputRef}
                                onSubmitEditing={() => Keyboard.dismiss()}
                                onChangeText={(meassge) => CheckMeassge(meassge)}
                            />
                        </View>
                        <TouchableOpacity style={{ marginLeft: 20, marginTop: 10, flexDirection: KEY.ROW }}
                            onPress={() => { setshowMessageModalVisible(true), Keyboard.dismiss() }}>
                            <Feather name='paperclip' size={24} color={COLOR.DEFALUTCOLOR} />
                            <Text style={{ color: COLOR.DEFALUTCOLOR, fontSize: FONT.FONT_SIZE_18, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, }}>{'  ' + languageConfig.attachFileText}</Text>
                        </TouchableOpacity>
                        {ticketPhoto &&
                            <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, alignItems: KEY.CENTER, width: WIDTH - 80, alignSelf: KEY.CENTER }}>
                                <Text style={{ color: COLOR.BLACK, marginTop: 10, marginBottom: 5 }}>{ticketPhoto}</Text>
                                <TouchableOpacity onPress={() => removeImage()}>
                                    <Entypo name={"cross"} size={20} />
                                </TouchableOpacity>
                            </View>
                        }
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginBottom: 20 }}>
                            <TouchableOpacity style={styles.submitquery} onPress={() => onPresstoSubmit()}>
                                <Text style={{ color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_18, fontWeight: FONT.FONT_WEIGHT_MEDIAM, fontFamily: FONT.FONT_BOLD }}>{languageConfig.SubmitText}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* message model Pop */}
            <Modal
                animationType='slide'
                transparent={true}
                visible={showMessageModalVisible}
                onRequestClose={() => setshowMessageModalVisible(!showMessageModalVisible)}>
                <View style={{ alignItems: KEY.CENTER, flex: 1 }}>
                    <View style={{ position: KEY.ABSOLUTE, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)" }}>
                        <View style={styles.msgModalView}>
                            <Text style={{ fontSize: FONT.FONT_SIZE_18, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, marginLeft: 25, color: COLOR.BLACK, marginTop: 20, marginBottom: 10 }}>{languageConfig.supportmodelpopuptitle}</Text>
                            <TouchableOpacity onPress={() => uploadImageOption('camera')} >
                                <Text style={{ fontSize: FONT.FONT_SIZE_20, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, marginLeft: 25, color: COLOR.GRAY_DARK, marginTop: 15 }}>{languageConfig.takephototext}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => uploadImageOption('gallery')} >
                                <Text style={{ fontSize: FONT.FONT_SIZE_20, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, marginLeft: 25, color: COLOR.GRAY_DARK, marginTop: 15, marginBottom: 10 }}>{languageConfig.choosegallerytext}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setshowMessageModalVisible(false)}>
                                <Text style={{ fontSize: FONT.FONT_SIZE_20, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, marginLeft: 25, color: COLOR.GRAY_DARK, marginTop: 5, marginBottom: 10 }}>{languageConfig.closetext}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default SubmitQuery;