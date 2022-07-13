import { StyleSheet, Dimensions } from 'react-native';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    backgroundImage: {
        height: "100%",
        width: "100%",
    },
    mainViewimage: {
        position: KEY.ABSOLUTE,
        bottom: 0,
        width: WIDTH,
        height: 240,
        borderColor: COLOR.BLACK,
        backgroundColor: COLOR.WHITE,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderRadius: 0
    },
    mainbtnview: {
        flexDirection: KEY.ROW,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20
    },
    btnstyle: {
        width: WIDTH * 0.6,
        height: 40,
        borderColor: COLOR.BLACK,
        borderTopLeftRadius: 20,
        borderRadius: 5,
        borderBottomRightRadius: 20,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        backgroundColor: COLOR.DEFALUTCOLOR,
        marginBottom: 10
    },
    btntext: {
        color: COLOR.WHITE,
        fontFamily: FONT.FONT_BOLD,
        fontWeight: FONT.FONT_WEIGHT_MEDIAM,
        fontSize: FONT.FONT_SIZE_16,
        textTransform: KEY.CAPITALIZE
    },
    dotstyle: {
        width: 10,
        height: 10,
        borderColor: COLOR.BLACK,
        borderRadius: 10,
        margin: 5,
    }
})

export default styles;