import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Icon, MD3Colors } from 'react-native-paper';
type salahProp = {
  salah: string,
}
export default function AlertBell( {salah} : salahProp ) {
    const [bellClick, setBellClick] = useState(false);

  return (
    <TouchableOpacity className='flex-row items-center justify-center' onPress={()=>{console.log("Pressed")}}>
      <Icon
      source="bell" 
      color="grey"
      size={12.5}
      />
      <Text className='font-bold text-[#0D509D] text-lg pl-2'>{salah}</Text>
    </TouchableOpacity>
  )
}