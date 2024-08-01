import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

const Index = () => {
  return (
   
      <View style={{ height : 500, width : '100%', marginTop : "15%", alignItems : "center", justifyContent : "center", backgroundColor : "white"}} className='border'>
          <LottieView
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require("@/assets/lottie/PoliteChicky.json")}
          style={{ borderWidth : 2, width : "100%", height : "100%", alignItems : "center", justifyContent : "center" }}
          autoPlay
          loop
        />
        
      </View>
    
  )
}

export default Index