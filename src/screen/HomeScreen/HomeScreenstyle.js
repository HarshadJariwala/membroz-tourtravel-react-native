import { StyleSheet, Dimensions } from 'react-native';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
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
        elevation: 3,
        borderRadius: 10,
        marginHorizontal: 5,
        marginTop: 8,
        marginBottom: 5,
    },
    cardimagestyle: {
        width: 48,
        height: 48,
        borderRadius: 5,
    },
    text1: {
        fontSize: FONT.FONT_SIZE_20,
        fontFamily: FONT.FONT_BOLD,
        fontWeight: FONT.FONT_WEIGHT_MEDIAM,
        color: COLOR.BLACK
    },
    image: {
        width: WIDTH,
        height: 200
    },
    titletext: {
        fontSize: FONT.FONT_SIZE_16,
        fontFamily: FONT.FONT_BOLD,
        fontWeight: FONT.FONT_WEIGHT_MEDIAM,
        color: COLOR.BLACK,
    },
    viewalltext: {
        color: COLOR.DEFALUTCOLOR,
        fontSize: FONT.FONT_SIZE_14
    },
    smallcard: {
        width: 120,
        height: 45,
        borderRadius: 5,
        backgroundColor: COLOR.WHITE,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 3,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5
    },
    imagecard: {
        margin: 5,
        flexDirection: KEY.ROW
    },
    imagestyle: {
        width: WIDTH / 2 - 30,
        height: undefined,
        aspectRatio: 1,
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
    mainstyle: {
        backgroundColor: COLOR.WHITE,
        width: WIDTH / 2 - 40,
        height: 220,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 3,
        marginLeft: 10,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    imagestyle1: {
        width: WIDTH / 2 - 40,
        height: 120,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    image1: {
        width: WIDTH - 100,
        height: 150,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    mainstyle1: {
        backgroundColor: COLOR.WHITE,
        width: WIDTH - 100,
        height: 180,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 3,
        marginLeft: 10,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
})

export default styles;