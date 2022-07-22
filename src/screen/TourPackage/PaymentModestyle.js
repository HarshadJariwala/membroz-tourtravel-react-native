import { StyleSheet, Dimensions } from 'react-native';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    maincontainer: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
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
    round: {
        width: 20,
        height: 20,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: COLOR.DEFALUTCOLOR,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10
    },
    paymentbutton: {
        width: WIDTH - 30,
        height: 40,
        backgroundColor: COLOR.DEFALUTCOLOR,
        borderRadius: 5,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
    },
    buttontext: {
        color: COLOR.WHITE,
        fontSize: FONT.FONT_SIZE_16,
        fontWeight: FONT.FONT_WEIGHT_MEDIAM,
        fontFamily: FONT.FONT_BOLD
    }
})

export default styles;