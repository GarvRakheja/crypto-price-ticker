import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import styles from "../helpers/Styles"
import axios from 'axios';
import { widthToDp, heightToDp } from '../helpers/Responsive';

const Losers = () => {
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true)
    const API_URL = 'https://api.coingecko.com/api/v3';

    const navigation = useNavigation()

    useFocusEffect(
        React.useCallback(() => {
            const fetchPrices = async () => {
                try {
                    const response = await axios.get(`${API_URL}/coins/markets`, {
                        params: {
                            vs_currency: 'usd'
                        }
                    });
                    const getPositive = response.data.filter((arr) => arr.price_change_percentage_24h < -1)
                    const sortedPositive = getPositive.sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
                    const FirstFive = sortedPositive.slice(0, 5);
                    setPrices(FirstFive);
                } catch (error) {
                    console.error('Error fetching prices:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchPrices();
            const interval = setInterval(fetchPrices, 10 * 1000);
            return () => clearInterval(interval);
        }, [])
    )

    const renderCrypto = (item) => {
        return (
            <>
                <TouchableOpacity
                    onPress={() => navigation.navigate('cryptograph', { coin: item })}
                >
                    <View key={item.symbol} style={styles.priceItem}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ margin: 0, padding: 0, width: widthToDp(8) }}>
                                <Image source={{ uri: item.image }} style={{ height: heightToDp(5), weight: widthToDp(5) }} resizeMode="contain" />
                            </View>
                            <View style={{ flexDirection: "column", justifyContent: "center", width: widthToDp(35), marginLeft: widthToDp(2) }}>
                                <Text style={styles.symbol}>{item.name}</Text>
                                <Text style={styles.symbol2}>{item.symbol.toUpperCase()}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "column", justifyContent: "center", width: widthToDp(20), paddingLeft: widthToDp(6) }}>
                            <Text style={styles.currentPrice} numberOfLines={1} ellipsizeMode="tail">${item.current_price}</Text>
                            <Text style={item.price_change_percentage_24h.toString().substring(0, 4) >= 0 ? styles.positiveChange : styles.negativeChange}>
                                {item.price_change_percentage_24h < -1 ? "+" : null}{item.price_change_percentage_24h.toString().substring(0, 4)}%
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </>
        )
    }
    return (
        <View style={styles.container}>
            <View>
                {
                    loading ?
                        <View style={styles.loader}>
                            <ActivityIndicator color="blue" size="large" />
                        </View>
                        : (
                            <FlatList
                                data={prices}
                                renderItem={({ item }) => renderCrypto(item)}
                                keyExtractor={(item) => item.id}
                                showsVerticalScrollIndicator={false}
                            />
                        )
                }
                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity style={{ backgroundColor: "#AECDFF", width: widthToDp(85), padding: widthToDp(3), borderRadius: 5 }}
                        onPress={() => navigation.navigate("Market")}
                    >
                        <Text style={{ fontSize: widthToDp(5), textAlign: "center", color: "#1D7BFE", fontWeight: "500" }}>
                            Explore Categories
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Losers