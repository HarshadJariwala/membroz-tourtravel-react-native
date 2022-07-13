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
import * as COLOR from '../../styles/colors';
import styles from "./Splashscreentwostyle";
import * as IMAGE from '../../styles/image';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const SplashScreentwo = ({ navigation }) => {
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
            setBackgroungImage(userData.splashscreentwo);
        }
    };

    const onPressStartUpSkip = (val) => (
        AsyncStorage.setItem(KEY.STARTUP, JSON.stringify(val))
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={KEY.TRANSPARENT} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.LIGHT_CONTENT} />
            <ImageBackground
                style={styles.backgroundImage}
                source={backgroungImage ? { uri: backgroungImage } : IMAGE.BACKGROUND_IMAGE}
                resizeMode={KEY.STRETCH}>
            </ImageBackground>
            <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                <View style={styles.mainViewimage}>
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                        <Text style={{
                            fontSize: FONT.FONT_SIZE_28, color: COLOR.BLACK, ffontFamily: FONT.FONT_NORMAL,
                            fontWeight: FONT.FONT_WEIGHT_REGULAR, marginTop: 20
                        }}>{"Enjoy your food"}</Text>
                        <Text style={{
                            fontSize: FONT.FONT_SIZE_24, color: COLOR.BLACK, fontFamily: FONT.FONT_NORMAL,
                            fontWeight: FONT.FONT_WEIGHT_REGULAR,
                        }}>{"Thanks for chosing"}</Text>
                        <Text style={{
                            fontSize: FONT.FONT_SIZE_18, marginTop: 10, fontFamily: FONT.FONT_NORMAL,
                            fontWeight: FONT.FONT_WEIGHT_REGULAR,
                        }}>{"Lorem ipsum dolor sit amet,"}</Text>
                        <Text style={{
                            fontSize: FONT.FONT_SIZE_18, fontFamily: FONT.FONT_NORMAL,
                            fontWeight: FONT.FONT_WEIGHT_REGULAR,
                        }}>{"consecteur adipiscing elit"}</Text>
                    </View>
                    <View style={styles.mainbtnview} onPress={() => onPressStartUpSkip(true)}>
                        <TouchableOpacity style={styles.btnstyle}>
                            <Text style={styles.btntext}>{languageConfig.skip}</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: KEY.ROW, }}>
                            <View style={[styles.dotstyle, { backgroundColor: COLOR.GRAY_MEDIUM }]} />
                            <View style={[styles.dotstyle, { backgroundColor: COLOR.DEFALUTCOLOR }]} />
                            <View style={[styles.dotstyle, { backgroundColor: COLOR.GRAY_MEDIUM }]} />
                        </View>
                        <TouchableOpacity style={styles.btnstyle} onPress={() => navigation.navigate(SCREEN.SPLASHSCREENTHREE)}>
                            <Text style={styles.btntext}>{languageConfig.next}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SplashScreentwo;