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
    backgroundImage: {
        flex: 1,
        // width: WIDTH,
        // height: HEIGHT + 30,
        height: "100%",
        width: "100%"
    },
    imageLogo: {
        marginLeft: 100,
        marginRight: 100,
        marginTop: 20,
        marginBottom: 0, //55
        height: 200, //100
        width: 200 //200
    },
    boxView: {
        height: 300,
        width: WIDTH - 30,
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 4,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        alignItems: 'center'
    },
    orText: {
        marginBottom: 10,
        fontSize: FONT.FONT_SIZE_20,
        color: COLOR.BLACK,
        fontFamily: FONT.FONT_BOLD,
        fontWeight: FONT.FONT_WEIGHT_MEDIAM,
    },
    headerstyle: {
        marginTop: 0,
        flexDirection: KEY.COLUMN
    },
    logintext: {
        fontSize: FONT.FONT_SIZE_26,
        color: COLOR.WHITE,
        fontFamily: FONT.FONT_BOLD,
        fontWeight: FONT.FONT_WEIGHT_MEDIAM,
        marginLeft: 20,
        marginBottom: 20
    },
    maintabstyle: {
        marginTop: 40,
        marginBottom: 10,
        flexDirection: KEY.ROW,
        width: WIDTH - 30,
        height: 60,
        backgroundColor: COLOR.WHITE,
        borderRadius: 100,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 3,
    },
    minitabstyle: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        width: WIDTH / 2 - 30,
        height: 45,
        backgroundColor: COLOR.DEFALUTCOLOR,
        borderRadius: 100,
    },
    tabtext: {
        fontSize: FONT.FONT_SIZE_16,
        color: COLOR.BLACK
    },

    inputTextView: {
        borderRadius: 100,
        borderWidth: 1,
        borderColor: COLOR.LIGHT_BLACK,
        alignItems: KEY.FLEX_START,
        marginBottom: 10,
        width: WIDTH - 60,
        height: 45,
        marginLeft: 20,
        marginRight: 20,
        color: COLOR.BLACK,
        fontSize: FONT.FONT_SIZE_16,
        fontFamily: FONT.FONT_NORMAL,
        fontWeight: FONT.FONT_WEIGHT_REGULAR,
        paddingLeft: 15,
        backgroundColor: COLOR.WHITE,
    },
    inputTextViewError: {
        borderRadius: 100,
        borderWidth: 1,
        borderColor: COLOR.ERRORCOLOR,
        alignItems: KEY.FLEX_START,
        marginBottom: 10,
        width: WIDTH - 60,
        height: 45,
        marginLeft: 20,
        marginRight: 20,
        color: COLOR.BLACK,
        fontSize: FONT.FONT_SIZE_16,
        fontFamily: FONT.FONT_NORMAL,
        fontWeight: FONT.FONT_WEIGHT_REGULAR,
        paddingLeft: 15,
        backgroundColor: COLOR.WHITE,
    },
    loginBtn: {
        borderRadius: 100,
        backgroundColor: COLOR.DEFALUTCOLOR,
        width: WIDTH - 60,
        height: 45,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        marginTop: 20
    },
    Otptext: {
        fontSize: FONT.FONT_SIZE_16,
        color: COLOR.WHITE,
        fontFamily: FONT.FONT_BOLD,
        fontWeight: FONT.FONT_WEIGHT_MEDIAM,
    },
    registertext: {
        fontSize: FONT.FONT_SIZE_16,
        color: COLOR.WHITE,
        fontFamily: FONT.FONT_BOLD,
        fontWeight: FONT.FONT_WEIGHT_MEDIAM,
    },
    minitabstyle1: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        width: WIDTH / 2 - 30,
        height: 45,
        backgroundColor: COLOR.WHITE,
        borderRadius: 100,
    },
    Activetext: {
        fontSize: FONT.FONT_SIZE_16,
        color: COLOR.WHITE,
        fontFamily: FONT.FONT_BOLD,
        fontWeight: FONT.FONT_WEIGHT_MEDIAM,
    },
    Googlebtn: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        marginTop: 35,
        marginBottom: 50,
        flexDirection: KEY.ROW,
        width: WIDTH - 30,
        height: 60,
        backgroundColor: "#F8F7FB",
        borderRadius: 100,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 3,
    },
    googletext: {
        fontSize: FONT.FONT_SIZE_18,
        color: COLOR.BLACK,
        fontFamily: FONT.FONT_BOLD,
        fontWeight: FONT.FONT_WEIGHT_MEDIAM,
        marginLeft: 5
    }
    // imageLogo: {
    //     marginLeft: 100,
    //     marginRight: 100,
    //     marginTop: 50,
    //     marginBottom: 0, //55
    //     height: 200, //100
    //     width: 200 //200
    // },
    // welcomeText: {
    //     marginBottom: 20,
    //     fontSize: FONT.FONT_SIZE_24,
    //     color: COLOR.WHITE,
    //     fontFamily: FONT.FONT_BOLD
    // fontWeight: FONT.FONT_WEIGHT_MEDIAM,
    // },
    // inputTextView: {
    //     borderRadius: 5,
    //     borderWidth: 2,
    //     borderColor: COLOR.WHITE,
    //     alignItems: KEY.FLEX_START,
    //     marginBottom: 5,
    //     width: WIDTH - 30,
    //     height: 45,
    //     marginLeft: 20,
    //     marginRight: 20,
    //     color: COLOR.GRANITE_GRAY,
    //     fontSize: FONT.FONT_SIZE_16,
    //     paddingLeft: 15,
    //     backgroundColor: COLOR.WHITE,
    //     borderBottomRightRadius: 20,
    //     borderTopLeftRadius: 20
    // },
    // inputTextViewError: {
    //     borderRadius: 5,
    //     borderWidth: 2,
    //     borderColor: COLOR.ERRORCOLOR,
    //     alignItems: KEY.FLEX_START,
    //     marginBottom: 5,
    //     width: WIDTH - 30,
    //     height: 45,
    //     marginLeft: 20,
    //     marginRight: 20,
    //     color: COLOR.GRANITE_GRAY,
    //     fontSize: FONT.FONT_SIZE_16,
    //     paddingLeft: 15,
    //     backgroundColor: COLOR.WHITE,
    //     borderBottomRightRadius: 20,
    //     borderTopLeftRadius: 20
    // },
    // loginBtn: {
    //     borderRadius: 5,
    //     backgroundColor: COLOR.DEFALUTCOLOR,
    //     width: WIDTH - 30,
    //     height: 45,
    //     justifyContent: KEY.CENTER,
    //     alignItems: KEY.CENTER,
    //     borderBottomRightRadius: 20,
    //     borderTopLeftRadius: 20,
    // },
    // backgroundImage: {
    //     flex: 1,
    //     // width: WIDTH,
    //     // height: HEIGHT + 30,
    //     height: "100%",
    //     width: "100%"
    // },
    // joinBtn: {
    //     flexDirection: KEY.ROW,
    //     justifyContent: KEY.CENTER,
    //     alignItems: KEY.CENTER,
    //     marginTop: 50
    // },
    // backBtn: {
    //     flexDirection: KEY.ROW,
    //     justifyContent: KEY.CENTER,
    //     alignItems: KEY.CENTER,
    //     marginTop: 10
    // }
});

export default styles;