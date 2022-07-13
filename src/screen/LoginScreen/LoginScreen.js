import React, { useEffect, useState } from 'react';
import {
    View, Text, Dimensions, SafeAreaView, ImageBackground,
    Image, TextInput, ScrollView, TouchableOpacity, StatusBar, Keyboard, Platform
} from 'react-native';
import { SendEmailService, SendSmsService } from '../../services/SendEmailandSmsService/SendEmailandSmsService';
import { RemoteServerController } from '../../services/LocalService/LocalService';
import { CheckCustomerService } from '../../services/UserService/UserService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import * as LocalService from '../../services/LocalService/LocalService';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import { useFocusEffect } from '@react-navigation/native';
import axiosConfig from '../../helpers/axiosConfig';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './Loginstyle';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const LoginScreen = (props) => {
    const [logo, setLogo] = useState(null);
    const [backgroungImage, setBackgroungImage] = useState(null);
    const [appLogoVisible, setAppLogoVisible] = useState(false);
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(false);
    const [publicAuthKey, setPublicAuthKey] = useState(null);
    const [mobileNumber, setmobilenumber] = useState(null);
    const [mobileNumberError, setmobileNumberError] = useState(null);
    const [emailAddress, setEmailAddress] = useState(null);
    const [emailAddressError, setEmailAddressError] = useState(null);
    const [publicBranchID, setPublicBranchID] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            resetScreen();
        }, [])
    );

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        // CHECK AUTHCONTROLLER USE TO LOGIN OR NOT LOGIN        
        RemoteController();
        getMemberDeatilsLocalStorage();
    }, []);

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var publicAuthkey = await LocalService.LocalBranchDetails();
        if (publicAuthkey) {
            setPublicBranchID(publicAuthkey.branchid._id);
        }
    }

    //REMOTE DATA FATCH IN LOCAL STORAGE
    async function RemoteController() {
        var userData = await RemoteServerController();
        if (userData) {
            setLogo(userData.applogo);
            setBackgroungImage(userData.loginimage);
            setAppLogoVisible(userData.applogovisibleloginscreen);
            setPublicAuthKey(userData.authkey);
        }
    };

    //check email validation
    const checkEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        if (!email || email.length <= 0) {
            setEmailAddressError('Email Id can not be empty');
            return;
        }
        if (!re.test(email)) {
            setEmailAddressError('Ooops! We need a valid email address');
            setEmailAddress(email);
            return;
        }
        setEmailAddress(email);
        setEmailAddressError(null);
        return;
    }

    //check mobile number validation
    const checkMobileNumber = (mobile) => {
        if (!mobile || mobile.length <= 0) {
            setmobileNumberError('Mobile Number cannot be empty');
            setmobilenumber(null);
            return;
        }
        setmobilenumber(mobile);
        setmobileNumberError(null);
        return;
    }

    // generate OTP function 
    const createOtp = async () => {
        let body;

        try {
            setLoading(true);
            if (emailAddress) {
                body = {
                    "branchid": publicBranchID,
                    "username": emailAddress.trim()
                }
            }
            if (mobileNumber) {
                body = {
                    "branchid": publicBranchID,
                    "username": mobileNumber.trim()
                }
            }
            const verifyOtpNumber = Math.floor(1000 + Math.random() * 9000);
            const CheckUserResponse = await CheckCustomerService(body);
            if (Object.keys(CheckUserResponse.data).length !== 0 && CheckUserResponse.data != null && CheckUserResponse.data != undefined && CheckUserResponse.status == 200) {
                onPressSubmit(verifyOtpNumber, CheckUserResponse.data);
                Toast.show('OTP Sending', Toast.SHORT);
            }
            else {
                setLoading(false);
                Toast.show("user not availabe", Toast.SHORT);
            }
        }
        catch (error) {
            console.log(`error`, error);
            axiosConfig(null);
            firebase.crashlytics().recordError(error);
            Toast.show("Internal server problem,please try again", Toast.SHORT);
        };
    }

    //clear Field up data
    const resetScreen = () => {
        setLoading(false);
        setUsername(null);
        setmobilenumber(null);
        setmobileNumberError(null);
        setEmailAddress(null);
        setEmailAddressError(null);
    }

    //SIGN IN BUTTON ONPRESS TO PROCESS
    const onPressSubmit = async (verifyOtpNumber, customer) => {
        let mobilebody;
        let emailbody;
        let loginname;
        if (emailAddress) {
            loginname = emailAddress;
        }
        if (mobileNumber) {
            loginname = mobileNumber;
        }
        let customerDetails = { customer, verifyotp: verifyOtpNumber, loginname: loginname }
        axiosConfig(publicAuthKey);
        if (customer && customer.property.mobile) {
            mobilebody = {
                "messagetype": "SMS",
                "message": {
                    "content": `Dear User, Use this 4 digit OTP ${verifyOtpNumber} to reset your password for membroz restaruant. Please note this code is valid for 2 minutes.`,
                    "to": customer.property.mobile,
                    "subject": "OTP for Password reset"
                }
            }
        }

        if (customer && customer.property.primaryemail) {
            emailbody = {
                "messagetype": "EMAIL",
                "message": {
                    "content": `Dear User, Use this 4 digit OTP ${verifyOtpNumber} to reset your password for membroz restaruant. Please note this code is valid for 2 minutes.`,
                    "to": customer.property.primaryemail,
                    "subject": "OTP for Password reset"
                }
            }
        }

        setLoading(true);
        try {
            if (customer && customer.property.primaryemail) {
                const response = await SendEmailService(emailbody);
                if (response.data != 'undefind' && response.status == 200) {
                    setLoading(false);
                }
            }
            if (customer && customer.property.mobile) {
                const response1 = await SendSmsService(mobilebody);
                if (response1.data != 'undefind' && response1.status == 200) {
                    setLoading(false);
                }
            }
            resetScreen();
            props.navigation.navigate(SCREEN.OTPSCREEN, { customerDetails: customerDetails });
        }
        catch (error) {
            firebase.crashlytics().recordError(error);
            resetScreen();
            Toast.show('OTP sending problem', Toast.SHORT);
        };
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={false} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={Platform.OS === KEY.IOS ? KEY.DARK_CONTENT : KEY.DARK_CONTENT} />
            <ImageBackground source={backgroungImage ? { uri: backgroungImage } : IMAGE.BACKGROUND_IMAGE} style={styles.backgroundImage} >
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                    {appLogoVisible ?
                        <Image source={logo ? { uri: logo } : IMAGE.MEMBROZ_LOGO} resizeMode={KEY.COVER}
                            style={styles.imageLogo} /> :
                        <View style={{ marginTop: HEIGHT / 3 }} />
                    }
                    <View style={styles.headerstyle}>
                        <Text style={styles.logintext}>{"Sign in to your account"}</Text>
                    </View>
                    <View style={styles.containerView}>
                        <View style={styles.boxView}>
                            <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 30 }}>
                                <TextInput
                                    defaultValue={username}
                                    selectionColor={COLOR.DEFALUTCOLOR}
                                    placeholder='Mobile number'
                                    type={KEY.CLEAR}
                                    returnKeyType={KEY.DONE}
                                    style={mobileNumberError === null ? styles.inputTextView : styles.inputTextViewError}
                                    placeholderTextColor={COLOR.GRANITE_GRAY}
                                    onSubmitEditing={() => createOtp()}
                                    onChangeText={(email) => checkMobileNumber(email)}
                                />
                                <Text style={styles.orText}>{"OR"}</Text>
                                <TextInput
                                    defaultValue={username}
                                    selectionColor={COLOR.DEFALUTCOLOR}
                                    type={KEY.CLEAR}
                                    returnKeyType={KEY.DONE}
                                    placeholder='Email Address'
                                    style={emailAddressError === null ? styles.inputTextView : styles.inputTextViewError}
                                    placeholderTextColor={COLOR.GRANITE_GRAY}
                                    onSubmitEditing={() => createOtp()}
                                    onChangeText={(email) => checkEmail(email)}
                                />
                            </View>
                            <TouchableOpacity style={styles.loginBtn} onPress={() => createOtp()}>
                                <Text style={styles.Otptext}>{"Send OTP"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { props.navigation.replace(SCREEN.TABNAVIGATION), resetScreen() }} style={{ marginTop: 10, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }} >
                                <Text style={{ color: COLOR.BLACK, fontSize: 14, textTransform: KEY.CAPITALIZE, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM, }}>{`<< Back`}</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{ marginTop: 10 }}
                            onPress={() => props.navigation.navigate(SCREEN.REGISTERSCREEN)}>
                            <Text style={styles.registertext}>{"Create An Account"}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    );
}

export default LoginScreen;