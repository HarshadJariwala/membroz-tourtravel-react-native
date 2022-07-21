import { StyleSheet, Dimensions } from 'react-native';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    viewMain: {
        backgroundColor: COLOR.BACKGROUNDCOLOR,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
    },
    viewRectangle: {
        width: WIDTH - 30,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: COLOR.WHITE,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        alignItems: KEY.CENTER,
        marginBottom: 5,

    },
    rectangleText: {
        fontSize: FONT.FONT_SIZE_14,
        fontFamily: FONT.FONT_NORMAL, fontWeight: FONT.FONT_WEIGHT_REGULAR,
        color: COLOR.GRANITE_GRAY,
        marginTop: 5,
    },
    btnStyle: {
        marginTop: 20,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        borderRadius: 5,
        backgroundColor: COLOR.DEFALUTCOLOR,
        width: WIDTH - 30,
        height: 45,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    imageLogo: {
        height: 150,
        width: 150
    },
    text: {
        fontSize: FONT.FONT_SIZE_20,
        fontFamily: FONT.FONT_BOLD,
        fontWeight: FONT.FONT_WEIGHT_MEDIAM,
        color: COLOR.BLACK
    },
});

export default styles;