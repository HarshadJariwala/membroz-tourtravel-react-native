import React from "react";
import { } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native"


import LOGINSCREEN from "../screen/LoginScreen/LoginScreen";


import languageConfig from '../languages/languageConfig';
import * as SCREEN from '../context/screen/screenName';
import * as KEY from "../context/actions/key";
import * as FONT from "../context/actions/type";
import * as IMAGE from "../styles/image";
import * as COLOR from "../styles/colors";

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();


const AuthStackScreen = () => {
    return (
        <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShadowVisible: false }}>
            <Stack.Screen
                name="LoginScreen"
                component={LOGINSCREEN}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default NavigationsApp = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShadowVisible: false }}>
                <Stack.Screen name="Auth" component={AuthStackScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}