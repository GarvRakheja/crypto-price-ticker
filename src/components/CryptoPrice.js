import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Modal from "react-native-modal";

const CryptoPrice = () => {
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const API_URL = 'https://api.coingecko.com/api/v3';

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
                console.log(data)
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
                <TouchableOpacity onPress={() => {
                    setSelectedItem(item);
                    toggleModal()
                }}>
                    <View key={item.symbol} style={styles.priceItem}>
                        <View style={{ margin: 0, padding: 0, width: 25 }}>
                            <Image source={{ uri: item.image }} style={{ height: 50, weight: 50 }} resizeMode="contain" />
                        </View>
                        <Text style={styles.symbol} >{item.name}{item.symbol}</Text>
                        <Text style={styles.symbol2}>{item.symbol}</Text>
                        <Text style={styles.currentPrice} numberOfLines={1} ellipsizeMode="tail">$ {item.current_price}</Text>
                        <Text style={item.price_change_percentage_24h.toString().substring(0, 4) >= 0 ? styles.positiveChange : styles.negativeChange}>
                            {item.price_change_percentage_24h.toString().substring(0, 4)}%
                        </Text>
                    </View>
                </TouchableOpacity>
            </>


        )
    }

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }

    return (
        <>
            <View>
                <Text style={styles.header}>
                    Cryptocurrency
                </Text>
            </View>
            <View style={styles.container}>
                <View style={{ backgroundColor: "#35201C", borderRadius: 10 }}>
                    {/* <View style={styles.rowName}>
                        <Text style={styles.rowText}>icon</Text>
                        <Text style={styles.rowText}>Name</Text>
                        <Text style={styles.rowText}>Symbol</Text>
                        <Text style={styles.rowText}>Price</Text>
                        <Text style={styles.rowText}>% Change</Text>
                    </View> */}
                    {
                        loading ? <View style={styles.loader}>
                            <ActivityIndicator color="red" size="large" />
                        </View>
                            : (
                                <FlatList
                                    data={prices}
                                    renderItem={({ item }) => renderCrypto(item)}
                                    keyExtractor={(item) => item.id}
                                />
                            )
                    }

                </View>
            </View>
            <Modal isVisible={modalVisible} onBackdropPress={toggleModal}>
                <View style={styles.modalContent}>
                    <View style={{ marginBottom: 5 }}>
                        <Image
                            style={{ height: 50, width: 50 }}
                            resizeMode="contain"
                            source={{ uri: selectedItem && selectedItem.image }}
                        />
                    </View>
                    <View style={styles.modalHead}>
                        <Text style={styles.modalText}>Name :</Text>
                        <Text style={styles.modalText}>{selectedItem ? selectedItem.name : ''}</Text>
                    </View>
                    <View style={styles.modalHead}>
                        <Text style={styles.modalText}>Symbol :</Text>
                        <Text style={styles.modalText}>{selectedItem ? selectedItem.symbol : ''}</Text>
                    </View>
                    <View style={styles.modalHead}>
                        <Text style={styles.modalText}>Current Price :</Text>
                        <Text style={styles.modalText}>$ {selectedItem ? selectedItem.current_price : ''}</Text>
                    </View>
                    <View style={styles.modalHead}>
                        <Text style={styles.modalText}>
                            Percentage change in 24 hour :
                        </Text>
                        <Text style={styles.modalText}>{selectedItem ? selectedItem.price_change_percentage_24h.toString().substring(0, 4) : ''}</Text>
                    </View>
                    {/* Add more details here */}
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#66453F"
    },
    priceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: "black",
        backgroundColor: "#35201C",
        // width:"100%"
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
        fontWeight: 'bold',
        fontSize: 16,
        color: "white",
        width: "20%",
    },
    symbol: {
        fontWeight: 'bold',
        fontSize: 16,
        color: "white",
        padding: 15,
        // backgroundColor: "red",
        width: "35%",
        // backgroundColor:"red"
    },
    symbol2: {
        fontWeight: 'bold',
        fontSize: 16,
        color: "white",
        padding: 15,
        flexWrap: "wrap",
        // backgroundColor: "red",
        width: "20%"
    },
    currentPrice: {
        fontSize: 16,
        color: "white",
        padding: 15,
        // backgroundColor: "red",
        width: "20%"
    },
    positiveChange: {
        color: 'green',
        fontSize: 16,
        color: "white",
        padding: 15,
        // backgroundColor: "green",
        width: "20%"
    },
    negativeChange: {
        color: 'red',
        fontSize: 16,
        // backgroundColor: "green",
        width: "20%"
    },
    header: {
        color: "white",
        backgroundColor: "#66453F",
        padding: 15,
        fontSize: 20
    },
    loader: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
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
    }
});

export default CryptoPrice;
