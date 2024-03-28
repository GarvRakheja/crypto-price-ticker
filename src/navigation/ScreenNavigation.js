import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
//screens
import CryptoGraph from '../screens/CryptoGraph';
import Home from '../screens/Home';
import CryptoPrice from '../screens/CryptoList';
import Calculator from '../screens/Calculator';
import Search from '../screens/Search'
import { widthToDp, heightToDp } from "../helpers/Responsive";
import * as Icon from '../helpers/Icons'
import Portfolio from '../screens/Portfolio';

const Stack = createNativeStackNavigator()
const Tab = createMaterialBottomTabNavigator()

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='bottom' component={BottomTabs} options={{ headerShown: false }} />
            <Stack.Screen name='cryptograph' component={CryptoGraph} options={{ headerShown: false }} />
            <Stack.Screen name='search' component={Search} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const BottomTabs = () => {
    return (
        <Tab.Navigator
        barStyle={{ backgroundColor: '#fff'}}
        >
            <Tab.Screen name="Home" component={Home} options={{
                headerShown: false, tabBarLabelStyle: {
                    fontSize: widthToDp(3),
                },
                tabBarIcon: ({ tintColor, focused }) => (
                    <Image source={Icon.home_icon} style={styles.tabIcon} tintColor={focused ? "#0065B1" : "gray"} />
                ),

            }}
            />
            <Tab.Screen name="Market" component={CryptoPrice} options={{
                headerShown: false, tabBarLabelStyle: {
                    fontSize: widthToDp(3)
                },
                tabBarIcon: ({ tintColor, focused }) => (
                    <Image source={Icon.graph_icon} style={styles.tabIcon} tintColor={focused ? "#0065B1" : "gray"} />
                )
            }} />
            <Tab.Screen name="Calculator" component={Calculator} options={{
                headerShown: false, tabBarLabelStyle: {
                    fontSize: widthToDp(3)
                },
                tabBarIcon: ({ tintColor, focused }) => (
                    <Image source={Icon.calculator_icon} style={styles.tabIcon} tintColor={focused ? "#0065B1" : "gray"} />
                )
            }} />
            <Tab.Screen name="Portfolio" component={Portfolio} options={{
                headerShown: false, tabBarLabelStyle: {
                    fontSize: widthToDp(3)
                },
                tabBarIcon: ({ tintColor, focused }) => (
                    <Image source={Icon.portfolio_icon} style={styles.tabIcon} tintColor={focused ? "#0065B1" : "gray"} />
                )
            }} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabIcon: {
        height: heightToDp(2.5),
        width: widthToDp(5)
    }
})

export { HomeStack, BottomTabs }