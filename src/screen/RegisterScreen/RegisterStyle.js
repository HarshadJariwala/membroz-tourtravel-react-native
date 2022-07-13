import { StyleSheet, Dimensions } from 'react-native';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    containerView: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
    imageLogo: {
        marginLeft: 100,
        marginRight: 100,
        marginTop: 50,
        marginBottom: -10, //55
        height: 200, //100
        width: 200 //200
    },
    welcomeText: {
        marginBottom: 20,
        fontSize: FONT.FONT_SIZE_24,
        color: COLOR.WHITE,
        fontFamily: FONT.FONT_BOLD,
        fontWeight: FONT.FONT_WEIGHT_MEDIAM,
    },
    inputTextView: {
        borderRadius: 100,
        borderWidth: 2,
        borderColor: COLOR.WHITE,
        alignItems: KEY.FLEX_START,
        marginBottom: 20,
        width: WIDTH - 30,
        height: 45,
        marginLeft: 20,
        marginRight: 20,
        color: COLOR.GRANITE_GRAY,
        fontSize: FONT.FONT_SIZE_16,
        fontFamily: FONT.FONT_NORMAL,
        fontWeight: FONT.FONT_WEIGHT_REGULAR,
        paddingLeft: 15,
        backgroundColor: COLOR.WHITE,
        // borderBottomRightRadius: 20,
        // borderTopLeftRadius: 20
    },
    EmialInputText: {
        borderRadius: 100,
        borderWidth: 2,
        borderColor: COLOR.WHITE,
        alignItems: KEY.FLEX_START,
        marginBottom: 20,
        width: WIDTH - 30,
        height: 45,
        marginLeft: 20,
        marginRight: 20,
        color: COLOR.GRANITE_GRAY,
        fontSize: FONT.FONT_SIZE_16,
        fontFamily: FONT.FONT_NORMAL,
        fontWeight: FONT.FONT_WEIGHT_REGULAR,
        paddingLeft: 15,
        backgroundColor: COLOR.WHITE,
    },
    inputTextViewError: {
        borderRadius: 100,
        borderWidth: 2,
        borderColor: COLOR.ERRORCOLOR,
        alignItems: KEY.FLEX_START,
        marginBottom: 20,
        width: WIDTH - 30,
        height: 45,
        marginLeft: 20,
        marginRight: 20,
        color: COLOR.GRANITE_GRAY,
        fontSize: FONT.FONT_SIZE_16,
        fontFamily: FONT.FONT_NORMAL,
        fontWeight: FONT.FONT_WEIGHT_REGULAR,
        paddingLeft: 15,
        backgroundColor: COLOR.WHITE,
        // borderBottomRightRadius: 20,
        // borderTopLeftRadius: 20
    },
    loginBtn: {
        borderRadius: 100,
        backgroundColor: COLOR.DEFALUTCOLOR,
        width: WIDTH - 30,
        height: 45,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        // borderBottomRightRadius: 20,
        // borderTopLeftRadius: 20
    },
    backgroundImage: {
        flex: 1,
        // width: WIDTH,
        // height: HEIGHT + 30,
        height: "100%",
        width: "100%"
    },
    joinBtn: {
        flexDirection: KEY.ROW,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        marginTop: 10
    }
});

export default styles;