import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ProgramFormType } from '@/src/types'
import { TextInput, RadioButton } from 'react-native-paper'
import { Menu,  MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
type RadioButtonFormProp = {
    item : ProgramFormType
    isReady : number[]
    setIsReady : ( isReady : number[] ) => void
    index : number
}
const RadioButtonForm = ({item, isReady, setIsReady, index} : RadioButtonFormProp) => {
   const [ value, setValue ] = useState(item.radio_button_prompts[0])
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
   useEffect(() => {
    onTouchEnd()
   }, [])
   const Choices = () => {
    return(
    <Menu style={{ width : '100%', height : '100%' }}>
        <MenuTrigger style={{ width : '100%', height : '100%', alignItems : 'flex-start', justifyContent : 'center' }}>
            <Text>{value}</Text>
        </MenuTrigger>
        <MenuOptions customStyles={{optionsContainer: {width: 150, borderRadius: 8, marginTop: 20, padding: 8}}}>
            {item.radio_button_prompts.map((prompt) => {
                return(
                    <MenuOption onSelect={() =>{ setValue(prompt); onTouchEnd() }}>
                        <Text>{prompt}</Text>
                    </MenuOption>
                )
            })}
        </MenuOptions>
    </Menu>
    )
   }
  return (
    <View>
        <View>
            <Text>{item.question}?</Text>
        </View>
        <View style={{ width: '100%', backgroundColor: "#e8e8e8", height: 45, alignItems : 'flex-start', borderRadius : 10, borderWidth : 0.5, justifyContent : 'center', paddingHorizontal : 5,}}>
            <Choices />
        </View>
    </View>
  )
}

export default RadioButtonForm