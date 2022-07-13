import { StyleSheet, Dimensions } from 'react-native';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    text: {
        fontSize: FONT.FONT_SIZE_20,
        color: COLOR.BLACK,
        fontFamily: FONT.FONT_BOLD,
        fontWeight: FONT.FONT_WEIGHT_MEDIAM,
    },
    container: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
    otpBtn: {
        borderRadius: 100,
        backgroundColor: COLOR.DEFALUTCOLOR,
        width: WIDTH - 30,
        height: 45,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        // borderBottomRightRadius: 20,
        // borderTopLeftRadius: 20,
    },
    Otptext: {
        fontSize: FONT.FONT_SIZE_16,
        color: COLOR.WHITE,
        fontFamily: FONT.FONT_BOLD,
        fontWeight: FONT.FONT_WEIGHT_MEDIAM,
    },
    otpmainView: {
        justifyContent: KEY.CENTER,
        width: WIDTH / 4 - 30,
        alignItems: KEY.CENTER,
        flexDirection: KEY.ROW,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        marginBottom: 30
    },
    OtproundView: {
        width: 70,
        height: 70,
        borderRadius: 100,
        backgroundColor: "#F8F7FB",
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        margin: 10

    },
    inputtext: {
        fontSize: FONT.FONT_SIZE_24,
        color: COLOR.BLACK,
        fontFamily: FONT.FONT_BOLD,
        fontWeight: FONT.FONT_WEIGHT_MEDIAM,
        alignSelf: KEY.CENTER
    },
    borderStyleBase: {
        width: 60,
        height: 60,
        borderRadius: 100,
    },
    borderStyleHighLighted: {
        borderColor: COLOR.DEFALUTCOLOR,
    },
    underlineStyleBase: {
        width: 60,
        height: 60,
        borderRadius: 100,
        backgroundColor: "#F8F7FB",
        borderWidth: 1,
        marginRight: WIDTH / 15,
        color: COLOR.BLACK,
        fontFamily: FONT.FONT_BOLD,
        fontWeight: FONT.FONT_WEIGHT_MEDIAM,
        fontSize: FONT.FONT_SIZE_18

    },
    underlineStyleHighLighted: {
        borderColor: COLOR.DEFALUTCOLOR,
    },

})

export default styles;