import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { ProgramFormType } from '@/src/types'
import { TextInput, RadioButton } from 'react-native-paper'

type RadioButtonFormProp = {
    item : ProgramFormType
    isReady : number[]
    setIsReady : ( isReady : number[] ) => void
    index : number
}
const RadioButtonForm = ({item, isReady, setIsReady, index} : RadioButtonFormProp) => {
   const [ checked, setChecked ] = useState('')
   const onTouchEnd = () => {
    if( checked && isReady.includes(index) ){
        setIsReady(isReady)
    }
    else if( checked && isReady.length > 0){
        setIsReady([...isReady, index])
    }
    else if( checked ){
        setIsReady([index])
    }
    else if( !checked ){
        const deleteFrom = isReady.filter(id => id != index)
        setIsReady(deleteFrom)
    }
   }
  return (
    <View>
    <Text>{item.question}?</Text>
    <RadioButton.Group onValueChange={newValue => {setChecked(newValue); onTouchEnd()}} value={checked}>
        { item.radio_button_prompts.map((option) => {
            return(
                <RadioButton.Item label={option} value={option} />
            )
        })}
    </RadioButton.Group>
    </View>
  )
}

export default RadioButtonForm