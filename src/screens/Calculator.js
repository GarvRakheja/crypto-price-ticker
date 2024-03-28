import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { heightToDp, widthToDp } from '../helpers/Responsive'
import { Dropdown } from "react-native-element-dropdown"
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios'; // Import axios for making HTTP requests

const Calculator = (props) => {
  const [prices, setPrices] = useState([]);
  const [bitCoinNumber, setBitcoinNumber] = useState(0)
  const [value, setValue] = useState(null);
  const [selectedCoinPrice, setSelectedCoinPrice] = useState(null);
  const [convertedValue, setConvertedValue] = useState(null);
  const API_URL = 'https://api.coingecko.com/api/v3';

  useFocusEffect(
    useCallback(() => {
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
          console.log("PRICES===>", prices)
        } catch (error) {
          console.error('Error fetching prices:', error);
        }
      };
      fetchPrices();
      const interval = setInterval(fetchPrices, 10 * 1000);
      return () => clearInterval(interval);
    }, [])
  );

  const getSelectedCoinPrice = () => {
    if (value) {
      const selectedCoin = prices.find(coin => coin.id === value);
      if (selectedCoin) {
        return selectedCoin.current_price;
      }
    }
    return null;
  }

  useEffect(() => {
    setSelectedCoinPrice(getSelectedCoinPrice());
  }, [value, prices]);

  const handleTextInputChange = (text) => {
    setBitcoinNumber(text);
    const enteredNumber = parseFloat(text);
    if (!isNaN(enteredNumber) && selectedCoinPrice !== null) {
      const convertedValue = enteredNumber * selectedCoinPrice;
      setConvertedValue(convertedValue); // Set the converted value
    } else {
      setConvertedValue(selectedCoinPrice);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: widthToDp(4), color: 'black', textAlign: "center" }}>Convert {value} to United States Dollar</Text>
      </View>
      <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: heightToDp(7) }}>
        <TextInput
          style={styles.input}
          value={bitCoinNumber.toString()}
          onChangeText={handleTextInputChange}
          placeholder="BTC"
          keyboardType='numeric'
          autoFocus
        />

        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={prices?.map(item => ({ label: item.name, value: item.id, }))}
          search
          maxHeight={widthToDp(80)}
          labelField="label"
          valueField="value"
          placeholder="Select Cryptocurrency"
          searchPlaceholder="Search.."
          value={value}
          iconStyle={styles.iconStyle}
          imageStyle={styles.imageStyle}
          onChange={item => {
            setValue(item.value);
          }}
        />
        <View style={{ borderWidth: 0.5, width: widthToDp(95), padding: widthToDp(3), borderRadius: 5, paddingHorizontal: 8 }}>
          <Text style={{ fontSize: widthToDp(4) }}>{convertedValue}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: "#fff",
    padding: widthToDp(5),
    elevation: 2
  },
  input: {
    borderWidth: 0.5,
    width: widthToDp(95),
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: widthToDp(2)
  },
  dropdown: {
    margin: 16,
    height: 50,
    width: widthToDp(95),
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: widthToDp(5.5)
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  imageStyle: {
    width: 24,
    height: 24,
  },
  iconStyle: {
    width: 20,
    height: 20,
  }
})

export default Calculator;
