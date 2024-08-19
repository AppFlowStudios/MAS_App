import { View, Text } from 'react-native'
import React from 'react'

type BusinessAdsDurationCardProp = {
    height : number
    width : number
    index : number
    duration : string
    setDuration : ( duration : string ) => void
    selectedDuration : string
}
const BusinessAdsDurationCard = () => {

  return (
    <View>
      <Text>BusinessAdsDurationCard</Text>
    </View>
  )
}

export default BusinessAdsDurationCard