import { StyleSheet, Dimensions } from 'react-native';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    text1: {
        fontSize: FONT.FONT_SIZE_20,
        fontFamily: FONT.FONT_BOLD,
        fontWeight: FONT.FONT_WEIGHT_MEDIAM,
        color: COLOR.BLACK
    },
    changetext: {
        fontSize: FONT.FONT_SIZE_18,
        color: COLOR.DEFALUTCOLOR
    },
    maincontainer: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
    serachboxstyle: {
        width: WIDTH - 30,
        height: 40,
        borderRadius: 5,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: COLOR.WHITE,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 3,
        marginTop: 5,
        marginBottom: 15
    },
    serachtext: {
        padding: 10,
        fontSize: FONT.FONT_SIZE_16,
        color: COLOR.X11_GRAY
    },
    titletext: {
        fontSize: FONT.FONT_SIZE_16,
        fontFamily: FONT.FONT_BOLD,
        fontWeight: FONT.FONT_WEIGHT_MEDIAM,
        color: COLOR.BLACK,

    },
    categorymaincard: {
        width: WIDTH / 2 - 30,
        height: 48,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 1,
        borderRadius: 10,
        marginHorizontal: 5,
        marginTop: 8,
        marginBottom: 5,
    },
    cardimagestyle: {
        width: 38,
        height: 38,
        borderRadius: 5,
    },
    cardtext: {
        fontSize: FONT.FONT_SIZE_16,
        color: COLOR.WHITE,
        fontFamily: FONT.FONT_BOLD,
        fontWeight: FONT.FONT_WEIGHT_MEDIAM
    },
    text: {
        position: "absolute",
        top: 0,
        padding: 10,
        alignSelf: KEY.CENTER
    },
    imagecard: {
        width: 90,
        height: 90,
        borderRadius: 10,
        margin: 5
    },
    text_1: {
        fontSize: FONT.FONT_SIZE_14,
        color: COLOR.BLACK,
        fontFamily: FONT.FONT_BOLD,
        fontWeight: FONT.FONT_WEIGHT_MEDIAM
    },
    mainstyle: {
        backgroundColor: COLOR.WHITE,
        width: WIDTH / 2 - 30,
        height: 230,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 3,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    imagecardstyle: {
        margin: 5
    },
    imagestyle1: {
        width: WIDTH / 2 - 40,
        height: 120,
        borderRadius: 10
    },
})

export default styles;