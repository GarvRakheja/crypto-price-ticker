import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { BottomTabs, HomeStack } from './src/navigation/ScreenNavigation'

const CryptoStack = () => {
    <NavigationContainer>
        <HomeStack />
    </NavigationContainer>
}

const App = () => {
    return (
        <>
            <NavigationContainer>
                <HomeStack />
            </NavigationContainer>
        </>


    )
}



export default App