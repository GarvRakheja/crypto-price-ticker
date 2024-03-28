import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LineChart, BarChart } from 'react-native-gifted-charts'
import axios from 'axios'
import { widthToDp } from '../helpers/Responsive'
// import { CartesianChart } from 'victory-native';


const CryptoGraph = ({ route }) => {
  const [graphData, setGraphData] = useState([])
  const [loadingGraph, setLoadingGraph] = useState(false)
  const { coin } = route.params
  const API_URL = 'https://api.coingecko.com/api/v3';

  const getGraphData = async () => {
    try {
      setLoadingGraph(true)
      const graphResponse = await axios.get(`${API_URL}/coins/${coin.id}/market_chart`, {
        params: {
          vs_currency: 'usd',
          days: 30
        }
      })
      setGraphData(graphResponse.data.prices)
      console.log("data", graphResponse.data.prices)
    } catch (err) {
      console.log("error fetching data", err)
    } finally {
      setLoadingGraph(false)
    }
  }

  useEffect(() => {
    getGraphData()
  }, [coin.id])
  // const DATA = Array.from({ length: 31 }, (_, i) => ({
  //   day: i,
  //   highTmp: 40 + 30 * Math.random(),
  // }));
  return (
    <View>
      <Text>{coin.name}</Text>
      {/* <Text>{coin.current_price}</Text> */}
      {
        loadingGraph ?
          <View>
            <ActivityIndicator color="red" size="large" />
          </View> :
          <View>
            <LineChart
              data={graphData.map(([timestamp, prices]) => ({ value: prices }))}
            />
          </View>

      }
      {/* <View style={{ height: 300 }}>
      <CartesianChart data={DATA} xKey="day" yKeys={["highTmp"]} >

      </CartesianChart>
    </View> */}
    </View>
  )
}

export default CryptoGraph