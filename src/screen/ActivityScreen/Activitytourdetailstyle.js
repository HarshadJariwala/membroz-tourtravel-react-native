import { StyleSheet, Dimensions } from 'react-native';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    maincard: {
        flexDirection: KEY.COLUMN,
        backgroundColor: COLOR.WHITE,
        marginTop: 10,
        marginBottom: 10,
    },
    titletext: {
        fontSize: FONT.FONT_SIZE_18,
        fontFamily: FONT.FONT_BOLD,
        fontWeight: FONT.FONT_WEIGHT_MEDIAM,
        color: COLOR.BLACK,
        marginBottom: 5,
        marginTop: 10,
        marginLeft: 10
    },
    texttitle: {
        fontSize: FONT.FONT_SIZE_16,
        color: COLOR.LIGHT_BLACK,
        marginLeft: 10
    },
    blackcard: {
        width: WIDTH,
        height: 50,
        backgroundColor: COLOR.LIGHT_BLACK
    },
    continuebutton: {
        width: 150,
        height: 35,
        backgroundColor: COLOR.DEFALUTCOLOR,
        borderRadius: 5,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
    descripationText: {
        marginLeft: 15,
        marginTop: 10,
        textAlign: KEY.CENTER,
        alignSelf: KEY.CENTER,
        fontSize: FONT.FONT_SIZE_16,
        fontFamily: FONT.FONT_NORMAL,
        fontWeight: FONT.FONT_WEIGHT_REGULAR,
        color: COLOR.BLACK,
        width: WIDTH - 20,
        marginBottom: 10,

    },
    tagsStyles: {
        //textAlign: KEY.CENTER,
        fontSize: FONT.FONT_SIZE_16,
        fontFamily: FONT.FONT_NORMAL,
        fontWeight: FONT.FONT_WEIGHT_REGULAR,
        color: COLOR.BLACK,
        width: WIDTH - 20
    },
})

export default styles;

