import { View, Text, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { Icon, MD3Colors, Portal } from 'react-native-paper';
import AlertBellModal from '@/src/components/AlertBellModal';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

type salahProp = {
  salah: string,
}
export default function AlertBell( {salah} : salahProp ) {
  const [bellClick, setBellClick] = useState(false);

  return (
    <TouchableOpacity className='flex-row items-center justify-center' onPress={() => setBellClick(true)}>
      <Icon
      source="bell" 
      color="grey"
      size={11.5}
      />
      <Menu>
        <MenuTrigger>
          <Text className='font-bold text-[#0D509D] text-lg pl-2'>{salah}</Text>
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={{ borderRadius : 10 }}>
         <MenuOption>
            <Text className=''>Alert at Athan time</Text>
         </MenuOption>
         <MenuOption>
            <Text className='' numberOfLines={1} adjustsFontSizeToFit>Alert 30 mins before next prayer</Text>
         </MenuOption>
         <MenuOption>
            <Text className='text-red-800'>Mute</Text>
         </MenuOption>
        </MenuOptions>
      </Menu>
    </TouchableOpacity>
  )
}