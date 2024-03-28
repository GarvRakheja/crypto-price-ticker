import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, FlatList, LogBox } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import * as Icon from "../helpers/Icons"
import { heightToDp, widthToDp } from '../helpers/Responsive'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Search = () => {
    const [search, setSearch] = useState('')
    const [searchHistory, setSearchHistory] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [showNoResult, setShowNoResult] = useState(false)
    const navigation = useNavigation()
    const route = useRoute()
    const prices = route.params.prices

    useEffect(() => {
        if (search.trim() !== '') {
            const filterData = prices.filter(item => {
                return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                    item.symbol.toLowerCase().indexOf(search.toLowerCase()) > -1;
            })
            setSearchResults(filterData)
            setShowNoResult(filterData.length === 0)
        } else {
            setSearchResults([])
            setShowNoResult(false)
        }
    }, [search, prices])

    const saveSearchHistory = async () => {
        try {
            const history = [...searchHistory, search]
            setSearchHistory(history)
            await AsyncStorage.setItem("searchHistory", JSON.stringify(history))
            console.log("history=>", history);
        } catch (error) {
            console.log("error saving search histyory", error);
        }
    }

    const getSearchHistory = async () => {
        try {
            const getHistory = await AsyncStorage.getItem("searchHistory");
            if (getHistory !== null) {
                setSearchHistory(JSON.parse(getHistory));
            }
            console.log("getHistory=>", getHistory);
        } catch (error) {
            console.log("error getting search history", error);
        }
    };


    useEffect(() => {
        getSearchHistory()
    }, [])

    const renderResult = (item) => {
        saveSearchHistory()
        navigation.navigate('cryptograph', { coin: item })
    }
    const renderSearchResult = (item) => {
        return (
            <>
                <TouchableOpacity
                    onPress={renderResult}
                >
                    <View key={item.symbol} style={styles.priceItem}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ margin: 0, padding: 0, width: widthToDp(8) }}>
                                <Image source={{ uri: item.image }} style={{ height: heightToDp(5), weight: widthToDp(5) }} resizeMode="contain" />
                            </View>
                            <View style={{ flexDirection: "column", justifyContent: "center", width: widthToDp(35), marginLeft: widthToDp(2) }}>
                                <Text style={styles.symbol}>{item.name}</Text>
                                {item.symbol && <Text style={styles.symbol2}>{item.symbol.toUpperCase()}</Text>}
                            </View>
                        </View>
                        <View style={{ flexDirection: "column", justifyContent: "center", width: widthToDp(20), paddingLeft: widthToDp(6) }}>
                            <Text style={styles.currentPrice} numberOfLines={1} ellipsizeMode="tail">${item.current_price}</Text>
                            {item.price_change_percentage_24h &&
                                <Text style={item.price_change_percentage_24h.toString().substring(0, 4) >= 0 ? styles.positiveChange : styles.negativeChange}>
                                    {item.price_change_percentage_24h.toString().substring(0, 4)}%
                                </Text>}
                        </View>
                    </View>
                </TouchableOpacity>
            </>
        )
    }

    const rendersearchHistory = (item) => {
        return (
            <View>
                <View>
                    <Text style={{ fontSize: 20 }}>
                        {item}
                    </Text>
                </View>
            </View>

        )
    }

    return (
        <View style={styles.container}>

            <View style={styles.searchHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={Icon.back_icon} style={{ height: heightToDp(3), width: widthToDp(5), marginLeft: widthToDp(3) }} />
                </TouchableOpacity>
                <View style={styles.searchContent}>
                    <Image source={Icon.search_icon} style={{ height: heightToDp(3.5), width: widthToDp(6), marginLeft: widthToDp(2) }} />
                    <TextInput
                        placeholder='Search'
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                        style={{ fontSize: widthToDp(4.5), marginLeft: widthToDp(1.5) }}
                        autoFocus
                    />
                </View>
            </View>

            <View>
                <FlatList
                    data={searchHistory}
                    renderItem={({ item }) => rendersearchHistory(item)}
                    keyExtractor={(item) => item.id}
                />
            </View>
            {showNoResult ? (
                <View style={styles.noResults}>
                    <Image source={Icon.searchError_icon} style={{ height: heightToDp(10), width: widthToDp(20) }} />
                    <Text style={{ fontWeight: "600", color: "black" }}>Sorry, no results found for  '{search}'</Text>
                </View>
            ) : (
                <FlatList
                    data={searchResults}
                    renderItem={({ item }) => renderSearchResult(item)}
                    keyExtractor={(item) => item.id}
                />
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    searchHeader: {
        backgroundColor: "#FBFBFB",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1.41,

        elevation: 2,
    },
    searchContent: {
        backgroundColor: "#F5F5F5",
        flexDirection: "row",
        alignItems: "center",
        width: widthToDp(85),
        borderRadius: 5,
        margin: widthToDp(4)
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
    noResults: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: widthToDp(5)
    }
})

export default Search