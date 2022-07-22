import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, SafeAreaView, Image, StatusBar, ScrollView, Platform, TouchableOpacity } from "react-native";
import languageConfig from "../../languages/languageConfig";
import * as SCREEN from "../../context/screen/screenName";
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import getCurrency from '../../services/getCurrencyService/getCurrency';
import Feather from 'react-native-vector-icons/Feather';
import * as LocalService from '../../services/LocalService/LocalService';
import RenderHTML from 'react-native-render-html';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import Loader from '../../components/loader/index';
import styles from "./TourPackagesliststyle";
import axiosConfig from "../../helpers/axiosConfig";

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const ListTab = [
    {
        'status': "OverView"
    },
    {
        'status': "Itinerary"
    },
    {
        'status': "Activity"
    }
]
const TourPackageListScreen = (props) => {
    const PacakageDetailsList = props.route.params === undefined ? null : props.route.params.item;

    const [pacakagedetails, setPacakageDetails] = useState(PacakageDetailsList);
    console.log("pacakagedetails", pacakagedetails);
    const [logo, setLogo] = useState(null);
    const [customerInfo, setCustomerInfo] = useState(null);
    const [currencySymbol, setCurrencySymbol] = useState(null);
    const [loading, setloading] = useState(true);
    const [status, setStatus] = useState("OverView");
    const [photogellry, setPhotoGellry] = useState(PacakageDetailsList.destinations[0].attachment.length > 0 ? PacakageDetailsList.destinations[0].attachment : []);

    const source = {
        html: ` <html>${pacakagedetails.destinations[0].description}</html>`
    }

    const setStatusFilter = (status, index) => {
        const tab = ListTab.map((item) => {
            item.selected = false;
            return item;
        });
        tab[index].selected = true;
        setStatus(status)
    }

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        RemoteController();
        getMemberDeatilsLocalStorage
    }, []);

    useEffect(() => {
    }, [logo, pacakagedetails, loading, customerInfo, photogellry, currencySymbol]);

    //REMOTE DATA FATCH IN LOCAL STORAGE
    const RemoteController = async () => {
        var userData = await LocalService.RemoteServerController();
        if (userData) {
            setLogo(userData.applogo);
        }
    };

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var publicAuthkey = await LocalService.LocalBranchDetails();
        axiosConfig(publicAuthkey._id);
        console.log("publicAuthkey._id", publicAuthkey._id);
        const response = getCurrency(publicAuthkey.branchid.currency);
        setCurrencySymbol(response);
    }

    //ON PRESS TO PACAKAGE BOOKING
    const onPresstoPackageBooking = async (item) => {
        item = pacakagedetails;
        props.navigation.navigate(SCREEN.PAKAGEBOOKINGSCREEN, { item });
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar hidden={false} translucent={false} backgroundColor={COLOR.STATUSBARCOLOR} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.DARK_CONTENT} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View>
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                        <Image
                            style={{
                                width: WIDTH, height: HEIGHT * 0.4,
                                borderBottomRightRadius: 20,
                                borderBottomLeftRadius: 20,
                                resizeMode: KEY.STRETCH
                            }}
                            source={!pacakagedetails && pacakagedetails.image ? IMAGE.USERPROFILE : { uri: pacakagedetails.image.attachment }} />

                        <View style={{ alignSelf: KEY.FLEX_START, position: KEY.ABSOLUTE, top: 0, marginTop: 20, marginLeft: 15 }}>
                            <TouchableOpacity style={{
                                width: 35, height: 35, borderRadius: 100,
                                backgroundColor: COLOR.WHITE, justifyContent: KEY.CENTER, alignItems: KEY.CENTER,
                            }} onPress={() => props.navigation.goBack(null)}>
                                <Feather name="arrow-left" size={24} color={COLOR.BLACK} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                        <View style={styles.maincard}>
                            <View style={{ marginLeft: 10, marginTop: 10, marginBottom: 10, flexDirection: KEY.COLUMN }}>
                                <Text style={styles.titletext}>{pacakagedetails && pacakagedetails && pacakagedetails.title}</Text>
                                <Text style={[styles.titletext, { color: COLOR.DEFALUTCOLOR }]}>{pacakagedetails && pacakagedetails && pacakagedetails.duration}</Text>
                            </View>
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal keyboardShouldPersistTaps={KEY.ALWAYS}>
                                <View style={styles.listTab}>
                                    {
                                        ListTab.map((e, index) => (
                                            <TouchableOpacity style={[styles.btnTab, status === e.status && styles.tabActive]} onPress={() => setStatusFilter(e.status, index)}>
                                                <Text style={[styles.tabText, status === e.status && styles.tabTextActive]}>
                                                    {e.status}
                                                </Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </View>
                            </ScrollView>
                            {status === "OverView" &&
                                pacakagedetails && pacakagedetails?.destinations[0].description ?
                                <>
                                    <Text style={styles.descripationText}>
                                        <RenderHTML contentWidth={WIDTH - 10}
                                            source={source}
                                            baseStyle={styles.tagsStyles} />
                                    </Text>
                                    <View style={{ marginTop: 10, marginBottom: 10, flexDirection: KEY.COLUMN, }}>
                                        <View style={{ justifyContent: KEY.SPACEBETWEEN, flex: 1, flexDirection: KEY.ROW, marginLeft: 10, marginRight: 10 }}>
                                            <Text style={styles.texttitle}>{"Photo Gallery"}</Text>
                                        </View>
                                        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                                            <View style={{ flexDirection: KEY.ROW, marginLeft: 5, marginRight: 5 }}>
                                                {
                                                    photogellry && photogellry.length > 0 &&
                                                    photogellry.map((img) => (
                                                        <Image style={styles.photogallerystyle}
                                                            source={{ uri: img.attachment }} />
                                                    ))
                                                }
                                            </View>
                                        </ScrollView>
                                    </View>
                                </>
                                :
                                <View style={{ margin: 5, }} />
                            }


                            {status === "Itinerary" &&
                                pacakagedetails && pacakagedetails?.destinations[0].description ?
                                <Text style={styles.highlighttext}>
                                    <RenderHTML contentWidth={WIDTH - 10}
                                        source={source}
                                        baseStyle={styles.tagsStyles} />
                                </Text>
                                :
                                <View style={{ margin: 5, }} />
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                <View style={styles.blackcard}>
                    <View style={{ justifyContent: KEY.SPACEBETWEEN, flex: 1, flexDirection: KEY.ROW }}>
                        <View style={{ flexDirection: KEY.COLUMN, marginLeft: 10 }}>
                            <Text style={{ color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_16, fontWeight: FONT.FONT_WEIGHT_MEDIAM, fontFamily: FONT.FONT_BOLD }}>{currencySymbol + (pacakagedetails && pacakagedetails && pacakagedetails.items[0].cost)}</Text>
                            <Text style={{ color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_16 }}>{"per person"}</Text>
                        </View>
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginRight: 10, }}>
                            <TouchableOpacity style={styles.continuebutton} onPress={() => onPresstoPackageBooking(pacakagedetails.item)}>
                                <Text style={{ fontSize: FONT.FONT_SIZE_18, color: COLOR.WHITE, fontFamily: FONT.FONT_BOLD, fontWeight: FONT.FONT_WEIGHT_MEDIAM }}>{"Continue"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default TourPackageListScreen;