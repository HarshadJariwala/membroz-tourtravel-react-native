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
        marginBottom: 0, //55
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
        borderRadius: 5,
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
        paddingLeft: 15,
        backgroundColor: COLOR.WHITE,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        fontFamily: FONT.FONT_NORMAL,
        fontWeight: FONT.FONT_WEIGHT_REGULAR,
    },
    inputTextViewError: {
        borderRadius: 5,
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
        paddingLeft: 15,
        backgroundColor: COLOR.WHITE,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        fontFamily: FONT.FONT_NORMAL,
        fontWeight: FONT.FONT_WEIGHT_REGULAR,
    },
    forgotButton: {
        borderRadius: 5,
        backgroundColor: COLOR.DEFALUTCOLOR,
        width: WIDTH - 30,
        height: 45,
        marginTop: 0,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    backgroundImage: {
        flex: 1,
        // width: WIDTH,
        // height: HEIGHT + 30,
        height: "100%",
        width: "100%"
    }
});

export default styles;