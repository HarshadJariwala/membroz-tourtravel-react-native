import React, { useState, useEffect } from "react";
import { Image } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, TabRouter } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import LOGINSCREEN from "../screen/LoginScreen/LoginScreen";
import SPLASHSCREEN from "../screen/SplashScreen/SplashScreen";
import REGISTERSCREEN from '../screen/RegisterScreen/RegisterScreen';
import HOMESCREEN from '../screen/HomeScreen/HomeScreen';
import TOURPAKAGESCREEN from '../screen/TourPackage/TourPakageScreen';
import ACTIVITYSCREEN from '../screen/ActivityScreen/ActivityScreen';
import EXPLORESCREEN from '../screen/ExploreScreen/ExploreScreen';
import TOURPACKAGELISTSCREEN from '../screen/TourPackage/TourPackageListScreen';
import AVTIVITTOURDETAILS from '../screen/ActivityScreen/Avtivittourdetails';
import PAKAGEBOOKINGSCREEN from '../screen/TourPackage/PakageBookingScreen';
import PACKAGEPRICEDETAILS from '../screen/TourPackage/PackagePriceDetails';
import PAYMENTMODESCREEN from '../screen/TourPackage/paymentmodeScreen';
import BOOKINFCONFIRMSCREEN from '../screen/TourPackage/Bookinfconfirmscreen';
import MAINMENUSCREEN from '../screen/MainMenuScreen/MainMenuScreen';
import MYPROFILESCREEN from '../screen/MyProfileScreen/MyProfileScreen';
import UPDATEPROFILESCREEN from '../screen/MyProfileScreen/UpdateProfileScreen';
import PASSWORDCHANGESCREEN from '../screen/MyProfileScreen/PasswordChangeScreen';
import CONTACTUSSCREEN from '../screen/ContactUsScreen/ContactUsScreen';
import SUBMITQUERY from "../screen/ContactUsScreen/SubmitQuery";
import FORGETPASSWORDSCREEN from "../screen/ForgetPasswordScreen/ForgetPasswordScreen";
import NEWPASSWORDSCREEN from "../screen/ForgetPasswordScreen/NewPasswordScreen";
import OTPSCREEN from "../screen/LoginScreen/Otpscreen";
import LOCATIONLIST from "../screen/ExploreScreen/LocationList";
import VIEWIMAGE from "../screen/ExploreScreen/ViewImage";
import NOTIFICATIONSCREEN from "../screen/NotificationScreen/NotificationScreen";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
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
            <Stack.Screen
                name="ForgetPasswordScreen"
                component={FORGETPASSWORDSCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NewPasswordScreen"
                component={NEWPASSWORDSCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Otpscreen"
                component={OTPSCREEN}
                options={{ headerShown: false }} />
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
            <Stack.Screen
                name="NotificationScreen"
                component={NOTIFICATIONSCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="TourPakageScreen"
                component={TOURPAKAGESCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="TourPackageListScreen"
                component={TOURPACKAGELISTSCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PakageBookingScreen"
                component={PAKAGEBOOKINGSCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="MainMenuScreen"
                component={MAINMENUSCREEN}
                options={{ headerShown: false }} />
            <Stack.Screen
                name="ActivityScreen"
                component={ACTIVITYSCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Avtivittourdetails"
                component={AVTIVITTOURDETAILS}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ExploreScreen"
                component={EXPLORESCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PackagePriceDetails"
                component={PACKAGEPRICEDETAILS}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="paymentmodeScreen"
                component={PAYMENTMODESCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Bookinfconfirmscreen"
                component={BOOKINFCONFIRMSCREEN}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="MyProfileScreen"
                component={MYPROFILESCREEN}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="UpdateProfileScreen"
                component={UPDATEPROFILESCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PasswordChangeScreen"
                component={PASSWORDCHANGESCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ContactUsScreen"
                component={CONTACTUSSCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SubmitQuery"
                component={SUBMITQUERY}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ForgetPasswordScreen"
                component={FORGETPASSWORDSCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NewPasswordScreen"
                component={NEWPASSWORDSCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Otpscreen"
                component={OTPSCREEN}
                options={{ headerShown: false }} />

            <Stack.Screen
                name="LocationList"
                component={LOCATIONLIST}
                options={{ headerShown: false }} />

            <Stack.Screen
                name="ViewImage"
                component={VIEWIMAGE}
                options={{ headerShown: false }} />
        </Stack.Navigator>
    )

}

const PackageStackScreen = () => {
    return (
        <Stack.Navigator initialRouteName="TourPakageScreen"
            screenOptions={{ headerShadowVisible: false }}>
            <Stack.Screen
                name="NotificationScreen"
                component={NOTIFICATIONSCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="TourPakageScreen"
                component={TOURPAKAGESCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="TourPackageListScreen"
                component={TOURPACKAGELISTSCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PakageBookingScreen"
                component={PAKAGEBOOKINGSCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PackagePriceDetails"
                component={PACKAGEPRICEDETAILS}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="paymentmodeScreen"
                component={PAYMENTMODESCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Bookinfconfirmscreen"
                component={BOOKINFCONFIRMSCREEN}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )
}

const ActivityStackScreen = () => {
    return (
        <Stack.Navigator initialRouteName="ActivityScreen"
            screenOptions={{ headerShadowVisible: false }}>
            <Stack.Screen
                name="NotificationScreen"
                component={NOTIFICATIONSCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ActivityScreen"
                component={ACTIVITYSCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Avtivittourdetails"
                component={AVTIVITTOURDETAILS}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )
}

const ExploreStackScreen = () => {
    return (
        <Stack.Navigator initialRouteName="MyProfileScreen"
            screenOptions={{ headerShadowVisible: false }}>
            <Stack.Screen
                name="NotificationScreen"
                component={NOTIFICATIONSCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ExploreScreen"
                component={EXPLORESCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="LocationList"
                component={LOCATIONLIST}
                options={{ headerShown: false }} />
            <Stack.Screen
                name="ViewImage"
                component={VIEWIMAGE}
                options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const Profile = () => {
    return (
        <Stack.Navigator initialRouteName="MyProfileScreen"
            screenOptions={{ headerShadowVisible: false }}>
            <Stack.Screen
                name="NotificationScreen"
                component={NOTIFICATIONSCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="MyProfileScreen"
                component={MYPROFILESCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="UpdateProfileScreen"
                component={UPDATEPROFILESCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PasswordChangeScreen"
                component={PASSWORDCHANGESCREEN}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )
}

const SupportStackScreen = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName='ContactUsScreen'
            screenOptions={{ headerShadowVisible: false }}>
            <Stack.Screen
                name="NotificationScreen"
                component={NOTIFICATIONSCREEN}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ContactUsScreen"
                component={CONTACTUSSCREEN}
                options={{ headerShown: false }} />

            <Stack.Screen
                name="SubmitQuery"
                component={SUBMITQUERY}
                options={{ headerShown: false }} />
        </Stack.Navigator>
    )
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
                                style={{ width: 28, height: 28, marginTop: 5, tintColor: color }}
                            />
                        )
                    } else if (route.name === 'package') {
                        return (
                            <Image
                                source={IMAGE.LOCATIONICON}
                                style={{ width: 28, height: 28, tintColor: color }}
                            />
                        )
                    } else if (route.name === 'activity') {
                        return (
                            <Image
                                source={IMAGE.ACTIVITYICON}
                                style={{ width: 30, height: 30, tintColor: color }}
                            />
                        )
                    } else if (route.name === "login") {
                        return (
                            <Image
                                source={IMAGE.MEMBERICON}
                                style={{ width: 26, height: 24, tintColor: color }}
                            />
                        );
                    } else if (route.name === 'explore') {
                        return (
                            <Image
                                source={IMAGE.EXPLOREICON}
                                style={{ width: 28, height: 28, tintColor: color }}
                            />
                        );
                    } else if (route.name === "profile") {
                        return (
                            <Image
                                source={IMAGE.PROFILEICON}
                                style={{ width: 28, height: 28, tintColor: color }}
                            />
                        );
                    } else if (route.name === 'Support') {
                        return (
                            <MaterialCommunityIcons
                                name={focused ? 'face-agent' : 'face-agent'}
                                size={30}
                                color={color}
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
            backBehavior="initialRoute" >
            <Tab.Screen name="home" component={HomeStackScreen} options={({ route }) => ({ headerShown: false, title: languageConfig.home, tabBarStyle: { display: getTabBarVisibility(route) } })} />

            <Tab.Screen name="package" component={PackageStackScreen} options={({ route }) => ({ headerShown: false, title: languageConfig.packages, tabBarStyle: { display: getTabBarVisibility(route) } })} />
            {memberInfo &&
                <Tab.Screen name="activity" component={ActivityStackScreen} options={({ route }) => ({ headerShown: false, title: languageConfig.activityrtext, tabBarStyle: { display: getTabBarVisibility(route) } })} />
            }
            <Tab.Screen name="explore" component={ExploreStackScreen} options={({ route }) => ({ headerShown: false, title: languageConfig.explore, tabBarStyle: { display: getTabBarVisibility(route) } })} />
            {!memberInfo &&
                <Tab.Screen name="Support" component={SupportStackScreen} options={({ route }) => ({ headerShown: false, title: languageConfig.support, tabBarStyle: { display: getTabBarVisibility(route) } })} />
            }
            {!memberInfo &&
                <Tab.Screen name="login" component={AuthStackScreen} options={({ route }) => ({ headerShown: false, title: languageConfig.loginbtn, tabBarStyle: { display: getTabBarVisibility(route) } })} />
            }
            {memberInfo &&
                <Tab.Screen name="profile" component={Profile} options={({ route }) => ({ headerShown: false, title: languageConfig.profile, tabBarStyle: { display: getTabBarVisibility(route) } })} />
            }
        </Tab.Navigator>
    )

}

const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

    if (routeName == SCREEN.TOURPACKAGELISTSCREEN) {
        return 'none';
    } else if (routeName == SCREEN.AVTIVITTOURDETAILS) {
        return 'none';
    } else if (routeName == SCREEN.PACKAGEPRICEDETAILS) {
        return 'none';
    } else if (routeName == SCREEN.PAYMENTMODESCREEN) {
        return 'none';
    } else if (routeName == SCREEN.PAKAGEBOOKINGSCREEN) {
        return "none";
    } else if (routeName == SCREEN.BOOKINFCONFIRMSCREEN) {
        return "none";
    } else if (route.name == "login") {
        return 'none';
    } else if (routeName == SCREEN.VIEWIMAGE) {
        return "none";
    }
    else if (routeName == SCREEN.LOCATIONLIST) {
        return "none";
    }
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