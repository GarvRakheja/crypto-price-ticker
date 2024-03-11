import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CryptoPrice from './src/screens/CryptoList'
import Home from './src/screens/Home'
import Calculator from './src/screens/Calculator'
import * as Icon from './src/helpers/Icons'
import { widthToDp, heightToDp } from "./src/helpers/Responsive";
import { Colors } from 'react-native/Libraries/NewAppScreen'


const Tab = createBottomTabNavigator()

const App = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home} options={{
                    headerShown: false, tabBarLabelStyle: {
                        fontSize: widthToDp(3.5),
                    },
                    tabBarIcon: ({ tintColor }) => (
                        <Image source={Icon.home_icon} style={styles.tabIcon} />
                    ),
                }} />
                <Tab.Screen name="Crypto" component={CryptoPrice} options={{
                    headerShown: false, tabBarLabelStyle: {
                        fontSize: widthToDp(3.5)
                    },
                    tabBarIcon: ({ tintColor }) => (
                        <Image source={Icon.crypto_icon} style={styles.tabIcon} />
                    )
                }} />
                <Tab.Screen name="Calculator" component={Calculator} options={{
                    headerShown: false, tabBarLabelStyle: {
                        fontSize: widthToDp(3.5)
                    },
                    tabBarIcon: ({ tintColor }) => (
                        <Image source={Icon.calculator_icon} style={styles.tabIcon} />
                    )
                }} />
            </Tab.Navigator>
        </NavigationContainer>

    )
}

const styles = StyleSheet.create({
    tabIcon: {
        height: heightToDp(3),
        width: widthToDp(6),
    }
})

export default App