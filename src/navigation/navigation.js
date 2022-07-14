import React, { useState, useEffect } from "react";
import { Image } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, TabRouter } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import LOGINSCREEN from "../screen/LoginScreen/LoginScreen";
import SPLASHSCREEN from "../screen/SplashScreen/SplashScreen";
import REGISTERSCREEN from '../screen/RegisterScreen/RegisterScreen';
import HOMESCREEN from '../screen/HomeScreen/HomeScreen';


import languageConfig from '../languages/languageConfig';
import * as SCREEN from '../context/screen/screenName';
import * as KEY from "../context/actions/key";
import * as FONT from "../styles/typography";
import * as IMAGE from "../styles/image";
import * as COLOR from "../styles/colors";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const AuthStackScreen = () => {
    return (
        <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShadowVisible: false }}>
            <Stack.Screen
                name="LoginScreen"
                component={LOGINSCREEN}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="RegisterScreen"
                component={REGISTERSCREEN}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
const HomeStackScreen = () => {
    return (
        <Stack.Navigator initialRouteName="HomeScreen"
            screenOptions={{ headerShadowVisible: false }}>
            <Stack.Screen
                name="HomeScreen"
                component={HOMESCREEN}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )

}

const PackageStackScreen = () => {

}

const ActivityStackScreen = () => {

}


const ExploreStackScreen = () => {

}

const Profile = () => {

}

const TabNavigation = () => {

    const [memberInfo, setMemberInfo] = useState(false);
    useEffect(() => {
        getMemberDeatilsLocalStorage();
    }, [])

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var memberInfo = await LocalService.LocalStorageService();
        if (memberInfo && memberInfo != undefined) {
            setMemberInfo(true);
        }
    }
    useEffect(() => {
    }, [memberInfo])
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === "home") {
                        return (
                            <Image
                                source={IMAGE.HOMEICON}
                                style={{ width: 25, height: 32, marginTop: 5, tintColor: color }}
                            />
                        )
                    } else if (route.name === 'package') {
                        return (
                            <Image
                                source={IMAGE.HOMEICON}
                                style={{ width: 25, height: 25, tintColor: color }}
                            />
                        )
                    } else if (route.name === 'activity') {
                        return (
                            <Image
                                source={IMAGE.HOMEICON}
                                style={{ width: 25, height: 25, tintColor: color }}
                            />
                        )
                    } else if (route.name === 'explore') {
                        return (
                            <Image
                                source={IMAGE.HOMEICON}
                                style={{ width: 25, height: 25, tintColor: color }}
                            />
                        );
                    } else if (route.name === "profile") {
                        return (
                            <Image
                                source={IMAGE.USER}
                                style={{ width: 25, height: 25, tintColor: color }}
                            />
                        );
                    }
                },
                tabBarActiveTintColor: COLOR.DEFALUTCOLOR,
                tabBarInactiveTintColor: COLOR.BLACK,
                tabBarStyle: {
                    borderTopRightRadius: 0, //10
                    borderTopLeftRadius: 0,
                    backgroundColor: COLOR.WHITE,
                    //height:60
                },
                tabBarLabelStyle: { fontSize: 12, fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR, textTransform: KEY.CAPITALIZE },
                tabBarHideOnKeyboard: true,
                headerTintColor: COLOR.BLACK,
            })}
            backBehavior="initialRoute"
        >
            <Tab.Screen name="home" component={HomeStackScreen} options={({ route }) => ({ headerShown: false, title: languageConfig.home })} />
            <Tab.Screen name="package" component={PackageStackScreen} options={({ route }) => ({ headerShown: false, title: languageConfig.packages })} />
            <Tab.Screen name="activity" component={ActivityStackScreen} options={({ route }) => ({ headerShown: false, title: languageConfig.activityrtext })} />
            <Tab.Screen name="explore" component={ExploreStackScreen} options={({ route }) => ({ headerShown: false, title: languageConfig.explore })} />
            <Tab.Screen name="profile" component={Profile} options={({ route }) => ({ headerShown: false, title: languageConfig.profile })} />

        </Tab.Navigator>
    )

}

export default NavigationsApp = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShadowVisible: false }}>
                <Stack.Screen name="SplashScreen" component={SPLASHSCREEN} options={{ headerShown: false }} />
                <Stack.Screen name="Auth" component={AuthStackScreen} options={{ headerShown: false }} />
                <Stack.Screen name="TabNavigation" component={TabNavigation} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}