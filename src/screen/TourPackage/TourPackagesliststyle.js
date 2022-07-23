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
        marginTop: 10,
        marginBottom: 10,

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
        marginLeft: 15
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
    listTab: {
        marginTop: -10,
        backgroundColor: COLOR.WHITE,
        height: 50,
        shadowColor: COLOR.BLACK,
        flexDirection: KEY.ROW,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,

    },
    btnTab: {
        flexDirection: KEY.ROW,
        width: WIDTH / 3,
        padding: 10,
        justifyContent: KEY.CENTER,
        borderBottomColor: COLOR.BLACK_OLIVE,
        borderBottomWidth: 1
    },
    tabActive: {
        width: WIDTH / 3 - 0,
        borderBottomColor: COLOR.DEFALUTCOLOR,
        borderBottomWidth: 2,
    },
    tabText: {
        fontSize: FONT.FONT_SIZE_16,
        fontFamily: FONT.FONT_BOLD,
        fontWeight: FONT.FONT_WEIGHT_MEDIAM,
        textTransform: KEY.CAPITALIZE,
        color: COLOR.LIGHT_BLACK
    },
    tabTextActive: {
        fontSize: FONT.FONT_SIZE_16,
        fontWeight: FONT.FONT_BOLD,
        textTransform: KEY.CAPITALIZE,
        color: COLOR.DEFALUTCOLOR

    },
    highlighttext: {
        marginLeft: 20,
        textAlign: KEY.CENTER,
        alignSelf: KEY.CENTER,
        fontSize: FONT.FONT_SIZE_16,
        fontFamily: FONT.FONT_NORMAL,
        fontWeight: FONT.FONT_WEIGHT_REGULAR,
        color: COLOR.BLACK,
        width: WIDTH - 10,
        marginBottom: 10,
        padding: 10,
        textAlign: 'left'
    },
})

export default styles;