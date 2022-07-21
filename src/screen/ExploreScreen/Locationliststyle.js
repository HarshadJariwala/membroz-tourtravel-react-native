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
    texttitle: {
        fontSize: FONT.FONT_SIZE_16,
        fontFamily: FONT.FONT_BOLD,
        fontWeight: FONT.FONT_WEIGHT_MEDIAM,
        color: COLOR.BLACK,
        marginBottom: 5,
        marginLeft: 5
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
        // lineHeight: 30
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
    photogallerystyle: {
        width: WIDTH / 2 - 30,
        height: 150,
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5
    },
    imagestyle: {
        width: WIDTH / 2 - 30,
        height: undefined,
        aspectRatio: 1,
        borderRadius: 5,
    },
    text: {
        position: "absolute",
        top: 0,
        padding: 10,
        alignSelf: KEY.CENTER
    },
    cardtext: {
        fontSize: FONT.FONT_SIZE_16,
        color: COLOR.WHITE,
        fontFamily: FONT.FONT_BOLD,
        fontWeight: FONT.FONT_WEIGHT_MEDIAM
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
    },

})

export default styles;