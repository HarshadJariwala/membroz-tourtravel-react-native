import { StyleSheet, Dimensions } from 'react-native';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
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


    }
})
export default styles;