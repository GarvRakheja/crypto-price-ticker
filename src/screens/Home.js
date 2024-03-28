import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { widthToDp, heightToDp } from '../helpers/Responsive'
import * as Icon from "../helpers/Icons"
import { useNavigation } from "@react-navigation/native"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Gainers from './Gainers'
import Losers from './Losers'
import CryptoPrice from './CryptoList'

const Tab = createMaterialTopTabNavigator()

const Home = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <View style={styles.profile}>
            <Image source={Icon.profile_icon} tintColor={'#0065B1'} style={{ height: heightToDp(3), width: widthToDp(6) }} />
          </View>
          <TouchableOpacity style={styles.searchBarContent} onPress={() => navigation.navigate('search')}>
            <Image source={Icon.search_icon} style={{ height: heightToDp(2), width: widthToDp(5) }} />
            <Text style={{ fontSize: widthToDp(4) }}>search</Text>
            {/* <Text>BTC</Text> */}
          </TouchableOpacity>
          <View style={styles.notification}>
            <Image source={Icon.bell_icon} style={{ height: heightToDp(3), width: widthToDp(6) }} />
          </View>
        </View>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: widthToDp(3.5), color: "#1D7BFE", fontWeight: "500" },
        }}
      >
        <Tab.Screen name="Gainers" component={Gainers} />
        <Tab.Screen name="Losers" component={Losers} />
      </Tab.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchBar: {
    backgroundColor: "#FBFBFB",
    padding: widthToDp(5),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 1.41,

    // elevation: 2,
  },
  searchBarContent: {
    border: 0.5,
    backgroundColor: "#F5F5F5",
    width: widthToDp(70),
    flexDirection: "row",
    alignItems: "center",
    padding: widthToDp(2),
    gap: widthToDp(1),
    borderRadius: widthToDp(5),
    // marginLeft: widthToDp(8),
  },
})

export default Home