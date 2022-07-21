import { StyleSheet, Dimensions } from 'react-native';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    text: {
        fontSize: FONT.FONT_SIZE_20,
        fontFamily: FONT.FONT_BOLD,
        fontWeight: FONT.FONT_WEIGHT_MEDIAM,
        color: COLOR.BLACK
    },
    listTab: {
        marginTop: 0,
        borderRadius: 100,
        flexDirection: KEY.ROW
    },
    btnTab: {
        flexDirection: KEY.ROW,
        width: "50%",
        padding: 10,
        justifyContent: KEY.CENTER,
        borderBottomColor: COLOR.BLACK,
        borderBottomWidth: 2
    },
    tabActive: {
        width: "50%",
        borderBottomColor: COLOR.DEFALUTCOLOR,
        borderBottomWidth: 2
    },
    tabText: {
        fontSize: FONT.FONT_SIZE_18,
        fontWeight: FONT.FONT_BOLD,
        textTransform: KEY.CAPITALIZE,
        color: COLOR.LIGHT_BLACK
    },
    tabTextActive: {
        fontSize: FONT.FONT_SIZE_18,
        fontWeight: FONT.FONT_BOLD,
        textTransform: KEY.CAPITALIZE,
        color: COLOR.DEFALUTCOLOR

    },
    tabActive: {
        width: "50%",
        borderBottomColor: COLOR.DEFALUTCOLOR,
        borderBottomWidth: 2
    },
    mainstyle: {
        backgroundColor: COLOR.WHITE,
        // borderWidth: 1, borderColor: COLOR.BLACK,
        width: WIDTH / 2 - 30,
        // height: 220,
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
        margin: 10,
    },
    imagecardstyle: {
        margin: 5
    },
    image1: {
        width: WIDTH / 2 - 40,
        height: 180,
        borderRadius: 10
    },
    titletext: {
        fontSize: FONT.FONT_SIZE_16,
        fontFamily: FONT.FONT_BOLD,
        fontWeight: FONT.FONT_WEIGHT_MEDIAM,
        color: COLOR.BLACK
    },


})

export default styles;