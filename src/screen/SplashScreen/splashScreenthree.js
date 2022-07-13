import React, { useEffect, useState } from 'react';
import {
    View, Image, ImageBackground,
    Dimensions, Text, TouchableOpacity,
    StatusBar, ScrollView, SafeAreaView
} from "react-native";
import { RemoteServerController } from '../../services/LocalService/LocalService';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import AsyncStorage from '@react-native-community/async-storage';
import languageConfig from '../../languages/languageConfig';
import * as SCREEN from '../../context/screen/screenName';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import styles from "./splashScreenthreestyle";
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const SplashScreenthree = ({ navigation }) => {
    const [backgroungImage, setBackgroungImage] = useState(null);

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        // CHECK AUTHCONTROLLER USE TO LOGIN OR NOT LOGIN        
        RemoteController();
    }, []);

    useEffect(() => {
    }, [backgroungImage]);

    //REMOTE DATA FATCH IN LOCAL STORAGE
    async function RemoteController() {
        var userData = await RemoteServerController();
        if (userData) {
            setBackgroungImage(userData.splashscreenthree);
        }
    };

    const checkStartUP = (val) => (
        AsyncStorage.setItem(KEY.STARTUP, JSON.stringify(val))
    )

    const onPressStartUp = (val) => {
        checkStartUP(true);
        navigation.replace(SCREEN.TABNAVIGATION);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={KEY.TRANSPARENT} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.LIGHT_CONTENT} />
            <ImageBackground
                style={styles.backgroundImage}
                source={IMAGE.SPLASH2}
                resizeMode={KEY.STRETCH}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>

                </ScrollView>
            </ImageBackground>
            <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, }}>
                <View style={styles.mainViewimage}>
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                        <Text style={{
                            fontSize: FONT.FONT_SIZE_28, color: COLOR.BLACK, fontFamily: FONT.FONT_NORMAL,
                            fontWeight: FONT.FONT_WEIGHT_REGULAR, marginTop: 20
                        }}>{"Check Your order"}</Text>
                        <Text style={{
                            fontSize: FONT.FONT_SIZE_24, color: COLOR.BLACK, fontFamily: FONT.FONT_NORMAL,
                            fontWeight: FONT.FONT_WEIGHT_REGULAR,
                        }}>{"Faster & Easier"}</Text>
                        <Text style={{
                            fontSize: FONT.FONT_SIZE_20, marginTop: 10, fontFamily: FONT.FONT_NORMAL,
                            fontWeight: FONT.FONT_WEIGHT_REGULAR,
                        }}>{"Lorem ipsum dolor sit amet,"}</Text>
                        <Text style={{
                            fontSize: FONT.FONT_SIZE_20, fontFamily: FONT.FONT_NORMAL,
                            fontWeight: FONT.FONT_WEIGHT_REGULAR,
                        }}>{"consecteur adipiscing elit"}</Text>
                    </View>
                    <View style={styles.mainbtnview}>
                        <TouchableOpacity style={styles.btnstyle} onPress={() => onPressStartUp()}>
                            <Text style={styles.btntext}>{languageConfig.getstartedtext}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SplashScreenthree;