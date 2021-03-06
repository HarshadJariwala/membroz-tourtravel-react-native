import React, { useEffect, useState } from 'react';
import {
    View, StatusBar,
    SafeAreaView, Image,
    ImageBackground, Dimensions,
    ActivityIndicator, Modal, Text
} from 'react-native';
import { REMOTEDATA, REMOTECONFIGKEY, STARTUP } from '../../context/actions/type';
import AsyncStorage from '@react-native-community/async-storage';
import MyPermissionController from '../../helpers/appPermission';
import remoteConfig from '@react-native-firebase/remote-config';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import axiosConfig from '../../helpers/axiosConfig';
import firebase from '@react-native-firebase/app';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import RNRestart from 'react-native-restart';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './Styles';

const HEIGHT = Dimensions.get('window').height;

function SplashScreen(props) {
    const [logo, setLogo] = useState(null);
    const [splashimage, setSplashimage] = useState(null);
    const [appLogoVisible, setAppLogoVisible] = useState(false);
    const [showMessageModalVisible, setshowMessageModalVisible] = useState(false);

    useEffect(() => {
        // check AuthController use to Login Or Not Login
        splashScreen();
        remoteConfigSetup();
    }, []);

    //MEMBER AUTHANTICATION CHECK
    async function AuthController() {
        var getStartup = await AsyncStorage.getItem(STARTUP);
        var startup = JSON.parse(getStartup);
        var getUser = await AsyncStorage.getItem(KEY.AUTHUSER);
        var userData = JSON.parse(getUser);
        if (userData) {
            //set header auth user key
            let token = userData._id;
            axiosConfig(token);
            return props.navigation.replace(SCREEN.TABNAVIGATION);
        } else {
            return props.navigation.replace(SCREEN.TABNAVIGATION);
        }

    }

    async function splashScreen() {
        var getUser = await AsyncStorage.getItem(REMOTEDATA);
        var userData = JSON.parse(getUser);
        if (userData) {
            setSplashimage(userData.splashimage);
            setAppLogoVisible(userData.applogovisiblesplashscreen);
            setLogo(userData.applogo);
            checkPermission();
            setTimeout(() => {
                AuthController();
            }, 3000);
        } else {
            setshowMessageModalVisible(true);
            Toast.show(languageConfig.splashtext1, Toast.SHORT);
            setTimeout(() => {
                setshowMessageModalVisible(false);
                // Immediately reload the React Native Bundle
                RNRestart.Restart();
            }, 10000);
        }
    }

    async function remoteConfigSetup() {
        await remoteConfig()
            .setDefaults({
                REMOTECONFIGKEY: 'disabled',
            })
            .then(() => {
                console.log('Default values set.');
            });

        await remoteConfig()
            .setDefaults({
                REMOTECONFIGKEY: 'disabled',
            })
            .then(() => remoteConfig().fetchAndActivate())
            .then(fetchedRemotely => {
                if (fetchedRemotely) {
                    console.log('Configs were retrieved from the backend and activated.');
                } else {
                    console.log(
                        'No configs were fetched from the backend, and the local configs were already activated',
                    );
                }
            });

        await remoteConfig().setConfigSettings({
            minimumFetchIntervalMillis: 30000,
        });

        const configValue = firebase.remoteConfig().getValue(REMOTECONFIGKEY);
        let remoteConfigValue = configValue.asString();
        AsyncStorage.setItem(REMOTEDATA, remoteConfigValue);
    }

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

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <StatusBar hidden={false} translucent={true} backgroundColor={KEY.TRANSPARENT} barStyle={KEY.LIGHT_CONTENT} />
            <ImageBackground source={splashimage ? { uri: splashimage } : IMAGE.BACKGROUND_IMAGE} style={styles.imageStyle} >
                {appLogoVisible ?
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: HEIGHT / 3 }}>
                        <Image style={styles.imageLogo} resizeMode={KEY.COVER} source={logo ? { uri: logo } : IMAGE.MEMBROZ_LOGO} />
                    </View> : <></>
                }
            </ImageBackground>

            {/* message model Pop */}
            <Modal
                animationType='slide'
                transparent={true}
                visible={showMessageModalVisible}
                onRequestClose={() => setshowMessageModalVisible(!showMessageModalVisible)}
            >
                <View style={{ alignItems: KEY.CENTER, flex: 1 }}>
                    <View style={{ position: KEY.ABSOLUTE, bottom: 0 }}>
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <View style={styles.msgModalView}>
                                <View style={{ marginTop: 20 }}>
                                    <ActivityIndicator
                                        size='large'
                                        color={COLOR.BLACK_OLIVE}
                                        style={{
                                            left: Platform.OS === 'ios' ? 1.3 : 0,
                                            top: Platform.OS === 'ios' ? 1 : 0,
                                        }}
                                    />
                                </View>
                                <Text style={{ fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, color: COLOR.BLACK_OLIVE, marginTop: 25, textTransform: KEY.CAPITALIZE }}>{languageConfig.splashtext2}</Text>
                                <Text style={{ fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, color: COLOR.BLACK_OLIVE, textTransform: KEY.CAPITALIZE }}>{languageConfig.splashtext3}</Text>
                                <Text style={{ fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, color: COLOR.BLACK_OLIVE, textTransform: KEY.CAPITALIZE }}>{languageConfig.splashtext4}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

export default SplashScreen;
