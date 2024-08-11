import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ProgramFormType } from '@/src/types'
import { TextInput } from 'react-native-paper'

type TextInputFormProp = {
    item : ProgramFormType
    isReady : number[]
    setIsReady : ( isReady : number[] ) => void
    index : number
}
const TextInputForm = ({item, setIsReady, isReady, index} : TextInputFormProp) => {
   const [ value, setValue ] = useState('')
   const onTouchEnd = () => {
    if( value && isReady.includes(index) ){
        setIsReady(isReady)
    }
    else if( value && isReady.length > 0){
        setIsReady([...isReady, index])
    }
    else if( value ){
        setIsReady([index])
    }
    else if( !value ){
        const deleteFrom = isReady.filter(id => id != index)
        setIsReady(deleteFrom)
    }
   }
  return (
    <View className='items-center'>
        <Text numberOfLines={1}>{item.question}?</Text>
        <TextInput
            onEndEditing={onTouchEnd}
            mode='outlined'
            theme={{ roundness : 50 }}
            style={{ width: 300, backgroundColor: "#e8e8e8", height: 45 }}
            activeOutlineColor='#0D509D'
            value={value.trim()}
            onChangeText={setValue}    
            textColor='black'            
        />
    </View>
  )
}

export default TextInputForm