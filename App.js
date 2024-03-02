import { View, Text } from 'react-native'
import React from 'react'
import CryptoPrice from './src/components/CryptoPrice'

const App = () => {
    return (
        <View style={{ flex: 1 }}>
            <CryptoPrice />
        </View>
    )
}
  
export default App