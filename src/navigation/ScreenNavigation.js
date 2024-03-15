import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//screens
import CryptoGraph from '../screens/CryptoGraph';
import Home from '../screens/Home';
import CryptoPrice from '../screens/CryptoList';
import Calculator from '../screens/Calculator';
import Search from '../screens/Search'
import { widthToDp, heightToDp } from "../helpers/Responsive";
import * as Icon from '../helpers/Icons'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='bottom' component={BottomTabs} options={{headerShown:false}} />
            <Stack.Screen name='cryptograph' component={CryptoGraph} options={{headerShown:false}} />
            <Stack.Screen name='search' component={Search} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}

const BottomTabs = () => {
    return (
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
    )
}

const styles = StyleSheet.create({
    tabIcon: {
        height: heightToDp(3),
        width: widthToDp(6),
    }
})

export { HomeStack, BottomTabs }