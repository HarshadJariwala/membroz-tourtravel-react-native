import React, { useEffect, useState } from 'react';
import {
    View, Text, Dimensions, SafeAreaView, ImageBackground,
    Image, TextInput, ScrollView, TouchableOpacity, StatusBar, Keyboard, Platform
} from 'react-native';
import { RemoteServerController } from '../../services/LocalService/LocalService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AsyncStorage from '@react-native-community/async-storage';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import Feather from 'react-native-vector-icons/Feather';
import axiosConfig from '../../helpers/axiosConfig';
import Loader from '../../components/loader/index';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './Otpscreenstyle';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const Otpscreen = (props) => {
    const customerDetails = props.route.params.customerDetails.customer;
    const verifyOtpNumber = props.route.params.customerDetails.verifyotp;
    const loginname = props.route.params.customerDetails.loginname;

    const [publicAuthKey, setPublicAuthKey] = useState(null);
    const [loading, setloading] = useState(false);
    const [inputOtpNumber, setinputOtpNumber] = useState(null);


    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        // CHECK AUTHCONTROLLER USE TO LOGIN OR NOT LOGIN        
        RemoteController();
    }, []);

    const onPressToLoginScreen = () => {
        props.navigation.navigate(SCREEN.LOGINSCREEN);
    }

    //REMOTE DATA FATCH IN LOCAL STORAGE
    async function RemoteController() {
        var userData = await RemoteServerController();
        if (userData) {
            setPublicAuthKey(userData.authkey);
        }
    };

    //OTP verify function
    const otpVerify = async () => {
        try {
            if (Number(inputOtpNumber) === Number(verifyOtpNumber)) {
                setloading(true);
                if (customerDetails) {
                    //set header auth user key
                    axiosConfig(publicAuthKey);
                    authenticateUser(customerDetails);
                    props.navigation.replace(SCREEN.TABNAVIGATION);
                }
            } else {
                setloading(false);
                setinputOtpNumber(null);
                Toast.show('OTP not Match!', Toast.SHORT);
            }
        }
        catch (error) {
            firebase.crashlytics().recordError(error);
            AsyncStorage.removeItem(KEY.AUTHUSER);
            Toast.show('OTP not Match!', Toast.SHORT);
        };
    }

    //user input Code set
    const handleChange = (code) => {
        setinputOtpNumber(code);
    }

    //add local storage Records
    const authenticateUser = (customer) => (
        AsyncStorage.setItem(KEY.AUTHUSER, JSON.stringify(customer))
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={false} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={Platform.OS === KEY.IOS ? KEY.DARK_CONTENT : KEY.DARK_CONTENT} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={{ marginLeft: 15, marginRight: 15, marginTop: 5, justifyContent: KEY.FLEX_START, flexDirection: KEY.ROW, alignItems: KEY.CENTER, }}>
                    <View>
                        <TouchableOpacity onPress={() => onPressToLoginScreen()}>
                            <Feather name='arrow-left' size={24} color={COLOR.BLACK} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={{ marginTop: 30, marginBottom: 20 }}>
                        <Image source={IMAGE.OTPIMAGE} style={{ width: 200, height: 200 }} />
                    </View>

                    <View style={{ marginTop: 20, marginBottom: 20 }}>
                        <Text style={{ fontSize: FONT.FONT_SIZE_24, color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM, }}>{"Verification code"}</Text>
                    </View>
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginBottom: 20 }}>
                        <Text style={{ fontSize: FONT.FONT_SIZE_18, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, }}>{"We have sent the code verification to "}</Text>
                        <Text style={{ fontSize: FONT.FONT_SIZE_18, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, }}>{"your mobile number"}</Text>
                    </View>
                    <View style={{ flexDirection: KEY.ROW }}>
                        <Text style={{ fontSize: FONT.FONT_SIZE_20, color: COLOR.BLACK, fontWeight: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM, }}>{loginname && loginname}</Text>
                    </View>
                    <View style={{ alignSelf: KEY.CENTER, alignItems: KEY.CENTER, justifyContent: KEY.CENTER, marginRight: WIDTH * 0.4, marginTop: 50, marginBottom: 20 }}>
                        <OTPInputView
                            style={{ width: 60, height: 60, borderRadius: 100, backgroundColor: "#F8F7FB", marginRight: 100 }}
                            pinCount={4}
                            autoFocusOnLoad
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            onCodeFilled={(code => handleChange(code))}
                            editable={true}
                        />
                    </View>
                    <View style={{ marginTop: 60, marginBottom: 20 }}>
                        <TouchableOpacity style={styles.otpBtn} onPress={() => otpVerify()}>
                            <Text style={styles.Otptext}>{"Countinue"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default Otpscreen;
