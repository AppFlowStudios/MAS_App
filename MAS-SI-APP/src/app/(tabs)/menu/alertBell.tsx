import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { IconButton, MD3Colors } from 'react-native-paper';

export default function AlertBell() {
    const [bellClick, setBellClick] = useState(false);

  return (
    <View>
      <IconButton
      icon="bell" 
      iconColor={MD3Colors.error10}
      size={10}
      onPress={ () => console.log("Pressed") }
      />
    </View>
  )
}