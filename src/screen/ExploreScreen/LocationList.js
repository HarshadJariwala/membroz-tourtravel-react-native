import React, { useState, useEffect } from "react";
import { FlatList, View, Text, Dimensions, SafeAreaView, Image, StatusBar, ScrollView, Platform, TouchableOpacity, RemoteController } from "react-native";
import languageConfig from "../../languages/languageConfig";
import * as SCREEN from "../../context/screen/screenName";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MemberLanguage } from '../../services/LocalService/LanguageService';
import getCurrency from '../../services/getCurrencyService/getCurrency';
import Feather from 'react-native-vector-icons/Feather';
import * as LocalService from '../../services/LocalService/LocalService';
import RenderHTML from 'react-native-render-html';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import { firebase } from "@react-native-firebase/crashlytics";
import styles from "./Locationliststyle";
import axiosConfig from "../../helpers/axiosConfig";

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const ListTab = [
    {
        'status': languageConfig.overview
    },
    {
        'status': languageConfig.highLighttext
    },
    {
        'status': languageConfig.gallery
    }
]

const LocationList = (props) => {
    const LocationList = props.route.params === undefined ? null : props.route.params.item;

    const [locationlist, setLocationList] = useState(LocationList);
    console.log("locationlist", locationlist);
    const [overview, setOverView] = useState([]);
    const [logo, setLogo] = useState(null);
    const [loading, setloading] = useState(true);
    const [gallery, setGallery] = useState([])
    const [highlight, setHightLight] = useState([]);
    const [customerInfo, setCustomerInfo] = useState(null);
    const [status, setStatus] = useState(languageConfig.overview);
    const imageGallery = LocationList?.property?.image.length > 0 ? LocationList.property.image : null;

    const setStatusFilter = (status, index) => {
        const tab = ListTab.map((item) => {
            item.selected = false;
            return item;
        });
        tab[index].selected = true;
        setStatus(status)
    }

    useEffect(() => {
    }, [logo, loading, gallery, overview, highlight, status]);

    useEffect(() => {
        //LANGUAGE MANAGEMENT FUNCTION
        MemberLanguage();
        RemoteController();
        getMemberDeatilsLocalStorage
    }, []);

    const RemoteController = async () => {
        var userData = await LocalService.RemoteServerController();
        if (userData) {
            setLogo(userData.applogo);
            axiosConfig(userData.authkey);
        }
    };


    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var memberInfo = await LocalService.LocalStorageService();
        if (memberInfo) {
            setCustomerInfo(memberInfo);
            getmemberid = memberInfo?._id;
            getDomesticList();
        } else {
            getDomesticList();
        }
    }

    const source = {
        html: ` <html>${locationlist.property.description}</html>`
    }

    const highlightlist = {
        html: ` <html>${locationlist.property.highlights}</html>`
    }

    //IMAGE CLICK TO VIEW IMAGE FUNCTION
    const viewImage = (val) => {
        let viewimage;
        if (val.attachment != null) {
            viewimage = val.attachment;
            props.navigation.navigate(SCREEN.VIEWIMAGE, { viewimage });
        }
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
                            resizeMode: KEY.STRETCH
                        }}
                        source={!locationlist && locationlist.property.image ? IMAGE.USERPROFILE : { uri: locationlist.property.image[0].attachment }} />

                    <View style={{ alignSelf: KEY.FLEX_START, position: KEY.ABSOLUTE, top: 0, marginTop: 20, marginLeft: 15 }}>
                        <TouchableOpacity style={{
                            width: 35, height: 35, borderRadius: 100,
                            backgroundColor: COLOR.WHITE, justifyContent: KEY.CENTER, alignItems: KEY.CENTER,
                        }} onPress={() => props.navigation.goBack(null)}>
                            <Feather name="arrow-left" size={24} color={COLOR.BLACK} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.maincard}>
                        <View style={{ marginLeft: 10, marginTop: 10, marginBottom: 10, flexDirection: KEY.COLUMN }}>
                            <Text style={styles.titletext}>{locationlist && locationlist.property && locationlist.property.city}</Text>

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

                        {status === languageConfig.overview &&
                            locationlist && locationlist?.property.description ?
                            <Text style={styles.descripationText}>
                                <RenderHTML contentWidth={WIDTH - 10}
                                    source={source}
                                    baseStyle={styles.tagsStyles} />
                            </Text>
                            :
                            <View style={{ margin: 5, }} />
                        }

                        {status === languageConfig.gallery &&
                            <FlatList
                                data={imageGallery}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => viewImage(item)}
                                        style={{
                                            flex: 1,
                                            flexDirection: KEY.COLUMN,
                                            margin: 1
                                        }}>
                                        <Image
                                            style={styles.imageThumbnail}
                                            source={{ uri: item.attachment }}
                                        />
                                    </TouchableOpacity>
                                )}
                                //Setting the number of column
                                numColumns={3}
                                keyExtractor={(item, index) => index}
                            />
                        }
                        {status === languageConfig.highLighttext &&
                            locationlist && locationlist?.property.highlights ?
                            <Text style={styles.highlighttext}>
                                <RenderHTML contentWidth={WIDTH - 10}
                                    source={highlightlist}
                                    baseStyle={styles.tagsStyles} />
                            </Text>
                            :
                            <View style={{ margin: 5, }} />
                        }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default LocationList;