import { StyleSheet } from "react-native"
import { heightToDp, widthToDp } from "./Responsive"

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        // backgroundColor: "#66453F"
    },
    marketHeader: {
        // backgroundColor: "red",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    priceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: widthToDp(5),
        marginLeft: widthToDp(2),
        marginRight: widthToDp(2),
        borderBottomWidth: 0.5,
        borderBottomColor: "#CFCFCF"
        // backgroundColor: "#35201C",
    },
    rowName: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "#35201C",
    },
    rowText: {
        fontWeight: '#500',
        fontSize: 16,
        color: "white",
        width: "20%",
    },
    symbol: {
        fontWeight: '#500',
        fontSize: widthToDp(4),
        color: "black",
    },
    symbol2: {
        fontWeight: '#500',
        fontSize: widthToDp(3.5),
        color: "gray",
    },
    currentPrice: {
        fontSize: widthToDp(4),
        color: "black",
        // width: "20%"
    },
    positiveChange: {
        color: 'green',
        fontSize: widthToDp(4),
        // width: "20%"
    },
    negativeChange: {
        color: 'red',
        fontSize: widthToDp(4),
        // width: "20%"
    },
    header: {
        color: "black",
        // backgroundColor: "#66453F",
        padding: widthToDp(4),
        fontSize: widthToDp(6),
        textAlign: "center"
    },
    loader: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: heightToDp(100)
    },
    modalContent: {
        backgroundColor: '#35201C',
        padding: 25,
        // justifyContent: 'center',
        // alignItems: 'center',
        borderRadius: 5,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        left: 15,
        bottom: 0,
        position: "absolute"
    },
    modalText: {
        marginBottom: 15,
        color: "white",
        fontSize: 20
    },
    modalHead: {
        flexDirection: "row",
        gap: 10,
    },
    // sortContainer:{
    //     // width: widthToDp(100)
    // },
    sort: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "#AECDFF",
        flexDirection: "row",
        justifyContent: "center",
        width: widthToDp(30),
        padding: widthToDp(2.5),
        marginBottom: widthToDp(5),
        marginLeft: widthToDp(35),
        borderRadius: 20
    },
    modal: {
        justifyContent: "flex-end",
        margin: 0
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 22,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        // borderBottomWidth: 0.5,
        // borderBottomColor: "#CFCFCF",
    }
})