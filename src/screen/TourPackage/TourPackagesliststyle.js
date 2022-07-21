import { StyleSheet, Dimensions } from 'react-native';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    maincard: {
        width: WIDTH - 0,
        flexDirection: KEY.COLUMN,
        backgroundColor: COLOR.WHITE,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 3,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10
    },
    titletext: {
        fontSize: FONT.FONT_SIZE_18,
        fontFamily: FONT.FONT_BOLD,
        fontWeight: FONT.FONT_WEIGHT_MEDIAM,
        color: COLOR.BLACK,
        marginBottom: 5,
        marginLeft: 5
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
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        alignSelf: KEY.FLEX_END
    },
    texttitle: {
        fontSize: FONT.FONT_SIZE_16,
        fontFamily: FONT.FONT_BOLD,
        fontWeight: FONT.FONT_WEIGHT_MEDIAM,
        color: COLOR.BLACK,
        marginBottom: 5,
        marginLeft: 5
    },
    photogallerystyle: {
        width: WIDTH / 2 - 30,
        height: 150,
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5
    },
    decriptiontext: {
        marginLeft: 10,
        color: COLOR.BLACK,
        fontFamily: FONT.FONT_BOLD,
        fontWeight: FONT.FONT_WEIGHT_MEDIAM
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
        width: WIDTH - 10,
        marginBottom: 10,
    },
    tagsStyles: {
        fontSize: FONT.FONT_SIZE_16,
        fontFamily: FONT.FONT_NORMAL,
        fontWeight: FONT.FONT_WEIGHT_REGULAR,
        color: COLOR.BLACK,
        width: WIDTH - 10
    },
})

export default styles;