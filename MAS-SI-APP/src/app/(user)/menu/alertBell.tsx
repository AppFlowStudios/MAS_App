import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { IconButton, MD3Colors } from 'react-native-paper';
type styles = {
  fontWeight: string,
  color: string | "black",
  fontSize: number
}
type salahProp = {
  salah: string,
}
export default function AlertBell( {salah} : salahProp ) {
    const [bellClick, setBellClick] = useState(false);

  return (
    <>
    <TouchableOpacity className='flex-row  items-center w-[100%]' onPress={()=>{console.log("Pressed")}}>
      <IconButton
      icon="bell" 
      iconColor="grey"
      size={17.5}
      />
      <Text className='font-bold text-[#0D509D] text-lg'>{salah}</Text>
      </TouchableOpacity>
    </>
  )
}