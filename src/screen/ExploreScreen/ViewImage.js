import React from 'react';
import {
    View,
    Image,
    SafeAreaView,
    StatusBar,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import * as KEY from '../../context/actions/key';
import * as COLOR from '../../styles/colors';
import AntDesign from "react-native-vector-icons/AntDesign"
import * as IMAGE from '../../styles/image';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export default function ViewImage(props) {
    const viewimage = props.route.params.viewimage;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BLACK }}>
            <StatusBar hidden={false} translucent={true} backgroundColor={COLOR.BLACK} barStyle={KEY.LIGHT_CONTENT} />

            <View style={{
                flex: 1,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                justifyContent: KEY.CENTER,
                marginTop: -140
            }}>
                <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
                    <AntDesign name='arrowleft' size={30} color={COLOR.WHITE} style={{ marginTop: 50, marginLeft: 10 }} />
                </TouchableOpacity>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                    <Image source={{ uri: viewimage }} resizeMode={KEY.COVER} style={{ height: '60%', width: WIDTH, borderRadius: 5 }} />
                </View>
            </View>
        </SafeAreaView>
    )
}
