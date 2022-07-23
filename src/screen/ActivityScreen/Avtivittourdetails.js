import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, SafeAreaView, Image, StatusBar, ScrollView, Platform, TouchableOpacity } from "react-native";
import languageConfig from "../../languages/languageConfig";
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import * as SCREEN from "../../context/screen/screenName";
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as LocalService from '../../services/LocalService/LocalService';
import RenderHTML from 'react-native-render-html';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import Loader from '../../components/loader/index';
import styles from "./Activitytourdetailstyle";
import moment from "moment";

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const Avtivittourdetails = (props) => {
    const Activitydetailslist = props.route.params === undefined ? null : props.route.params.item;
    console.log("Activitydetailslist", Activitydetailslist)
    const [activitydetails, setActivityDetails] = useState(null);
    const [logo, setLogo] = useState(null);
    const [customerInfo, setCustomerInfo] = useState(null);
    const [loading, setloading] = useState(true);

    var moment = require('moment');
    var start_time = moment(Activitydetailslist.property.start_time, "HH:mm:ss a");
    var end_time = moment(Activitydetailslist.property.end_time, 'HH:mm:ss a');
    var duration = moment.duration(end_time.diff(start_time));
    var hours = parseInt(duration.asHours());
    var minutes = parseInt(duration.asMinutes()) % 60;
    console.log(hours, minutes);

    const source = {
        html: ` <html>${Activitydetailslist.property.description}</html>`
    }

    useEffect(() => {
        if (Activitydetailslist) {
            setActivityDetails(Activitydetailslist);
        }
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        RemoteController();

    }, []);
    useEffect(() => {
    }, [logo, activitydetails, loading, customerInfo]);

    //REMOTE DATA FATCH IN LOCAL STORAGE
    const RemoteController = async () => {
        var userData = await LocalService.RemoteServerController();
        if (userData) {
            setLogo(userData.applogo);
        }
    };

    const onPresstoAvtivitiyScreen = async () => {
        props.navigation.navigate(SCREEN.ACTIVITYSCREEN);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={false} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.DARK_CONTENT} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                    <Image
                        style={{
                            width: WIDTH, height: HEIGHT * 0.4,
                            borderBottomRightRadius: 20,
                            borderBottomLeftRadius: 20,
                            resizeMode: KEY.COVER
                        }}
                        source={!Activitydetailslist && Activitydetailslist.property.image ? IMAGE.USERPROFILE : { uri: Activitydetailslist.property.image[0].attachment }} />

                    <View style={{ alignSelf: KEY.FLEX_START, position: KEY.ABSOLUTE, top: 0, marginTop: 20, marginLeft: 15 }}>
                        <TouchableOpacity style={{
                            width: 35, height: 35, borderRadius: 100,
                            backgroundColor: COLOR.WHITE, justifyContent: KEY.CENTER, alignItems: KEY.CENTER,
                        }} onPress={() => onPresstoAvtivitiyScreen()}>
                            <Feather name="arrow-left" size={24} color={COLOR.BLACK} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                    <View style={styles.maincard}>
                        <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10, marginRight: 10 }}>
                            <Text style={styles.titletext}>{Activitydetailslist && Activitydetailslist.property && Activitydetailslist.property.title}</Text>
                            <View style={{ flexDirection: KEY.ROW, marginBottom: 10, marginLeft: 10 }}>
                                <Feather name="clock" size={18} color={COLOR.DEFALUTCOLOR} style={{ marginTop: 2 }} />
                                <Text style={[styles.texttitle, { marginLeft: 5 }]}>{hours + minutes + ' ' + "Hours"}</Text>
                            </View>
                            <View style={{ flexDirection: KEY.COLUMN, marginBottom: 10 }}>
                                <Text style={[styles.texttitle, { fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM, marginBottom: 5 }]}>{"OverView"}</Text>
                                {Activitydetailslist && Activitydetailslist?.property.description ?
                                    <Text style={styles.descripationText}>
                                        <RenderHTML contentWidth={WIDTH - 20}
                                            source={source}
                                            baseStyle={styles.tagsStyles} />
                                    </Text>
                                    :
                                    <View style={{ margin: 5, }} />
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default Avtivittourdetails;