import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { widthToDp, heightToDp } from '../helpers/Responsive';
import { useNavigation } from '@react-navigation/native'
import * as Icon from "../helpers/Icons"
import Modal from 'react-native-modal'
import styles from "../helpers/Styles"

const CryptoPrice = () => {
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [sortOrder, setSortOrder] = useState("HighToLow")
    const [sortAlpha, setSortAlpha] = useState("AToZ")
    const API_URL = 'https://api.coingecko.com/api/v3';

    const navigation = useNavigation()

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await axios.get(`${API_URL}/coins/markets`, {
                    params: {
                        vs_currency: 'usd',
                        // per_page: 20
                        // ids: 'bitcoin,ethereum,litecoin', // Add more cryptocurrencies as needed
                    }
                });
                const data = response.data;
                setPrices(data);
            } catch (error) {
                console.error('Error fetching prices:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPrices();
        const interval = setInterval(fetchPrices, 10 * 1000);
        return () => clearInterval(interval);
    }, []);
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
                                {item.price_change_percentage_24h.toString().substring(0, 4)}%
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </>
        )
    }

    const sortPrices = () => {
        const sortedPrices = [...prices];
        if (sortOrder === "highToLow") {
            sortedPrices.sort((a, b) => b.current_price - a.current_price);
            setSortOrder("lowToHigh");
        } else {
            sortedPrices.sort((a, b) => a.current_price - b.current_price);
            setSortOrder("highToLow");
        }
        setPrices(sortedPrices);
        // toggleModal();
    };

    const sortAlphabet = () => {
        const sortedNames = [...prices];
        if (sortAlpha === "AToZ") {
            sortedNames.sort((a, b) => a.name.localeCompare(b.name));
            setSortAlpha("ZToA");
        } else {
            sortedNames.sort((a, b) => b.name.localeCompare(a.name));
            setSortAlpha("AToZ");
        }
        setPrices(sortedNames);
    };
    

    return (
        <>

            <View style={styles.container}>
                <View style={styles.marketHeader}>
                    <Text style={styles.header}>
                        Markets
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('search', { prices })} >
                        <Image source={Icon.search_icon} style={{ height: heightToDp(3.5), width: widthToDp(6), marginRight: widthToDp(4) }} />
                    </TouchableOpacity>
                </View>
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
                </View>
                <View style={styles.sort}>
                    <TouchableOpacity onPress={() => toggleModal()}>
                        <Text style={{ color: "#1D7BFE" }}>sorted by Price</Text>
                    </TouchableOpacity>
                </View>
                {/* modal */}
                <Modal
                    isVisible={modalVisible}
                    onSwipeComplete={() => setModalVisible(false)}
                    swipeDirection='down'
                    onBackdropPress={() => toggleModal()}
                    style={styles.modal}
                >
                    <View style={styles.modalContainer}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomWidth: 0.5, borderBottomColor: "#CFCFCF", padding: widthToDp(5) }}>
                            <Text style={{ fontSize: widthToDp(5), fontWeight: "400", color: "black" }}>Price</Text>
                            <TouchableOpacity onPress={sortPrices} style={{ backgroundColor: "#AECDFF", padding: widthToDp(2.5), borderRadius: 20 }}>
                                <Text style={{ color: "#1D7BFE" }}>{sortOrder === "highToLow" ? "High to Low" : "Low to High"}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomWidth: 0.5, borderBottomColor: "#CFCFCF", padding: widthToDp(5) }}>
                            <Text style={{ fontSize: widthToDp(5), fontWeight: "400", color: "black" }}>Alphabaticaly</Text>
                            <TouchableOpacity onPress={sortAlphabet} style={{ backgroundColor: "#AECDFF", padding: widthToDp(2.5), borderRadius: 20 }}>
                                <Text style={{ color: "#1D7BFE" }}>{sortAlpha === "AToZ" ? "A to Z" : "Z to A"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </>
    );
};

// const styles = StyleSheet.create({

// });

export default CryptoPrice;