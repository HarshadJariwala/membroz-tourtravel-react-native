import { StyleSheet, Dimensions } from 'react-native';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    // dateNumberStyle: {
    //     color: COLOR.BLACK,
    //     fontSize: FONT.FONT_SIZE_16,
    //     textTransform: KEY.CAPITALIZE,
    // },
    dateNameStyle: {
        color: COLOR.BLACK,
        fontSize: FONT.FONT_SIZE_14,
        textTransform: KEY.CAPITALIZE
    },
    iconleftStyle: {
        width: 12,
        height: 12,
        marginLeft: 20,
        tintColor: COLOR.WHITE,
    },
    iconrightStyle: {
        width: 12,
        height: 12,
        marginRight: 20,
        tintColor: COLOR.WHITE,
    },
    dateNumberStyle: {
        color: COLOR.BLACK,
        fontSize: FONT.FONT_SIZE_16,
        textTransform: KEY.CAPITALIZE,
    },
    dateNameStyle: {
        color: COLOR.BLACK,
        fontSize: FONT.FONT_SIZE_14,
        textTransform: KEY.CAPITALIZE
    },
    iconStyle: {
        marginTop: -65
    },
    calendarcardstyle: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
    },
    maincontainer: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
    texttitle: {
        fontSize: FONT.FONT_SIZE_16,
        color: COLOR.BLACK,
        fontWeight: FONT.FONT_WEIGHT_MEDIAM,
        fontFamily: FONT.FONT_BOLD
    },
    maincard: {
        backgroundColor: COLOR.WHITE,
        width: WIDTH - 30,
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
    pricebox: {
        width: 100,
        height: 40,
        backgroundColor: COLOR.DEFALUTCOLOR,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderRadius: 5
    },
    pricetext: {
        fontSize: FONT.FONT_SIZE_16,
        color: COLOR.WHITE,
        fontWeight: FONT.FONT_WEIGHT_MEDIAM,
        fontFamily: FONT.FONT_BOLD,
    },
    smallcard: {
        width: 70,
        height: 30,
        borderColor: COLOR.BLACK,
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: KEY.SPACEBETWEEN,
        flexDirection: KEY.ROW,
        alignItems: KEY.CENTER,
    },
    blackcard: {
        width: WIDTH,
        height: 50,
        backgroundColor: COLOR.LIGHT_BLACK,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,

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
    },
})
export default styles;