import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function EventsButton() {
  return (
    <TouchableOpacity style={styles.ButtonBox} className=''>
        <Text>Events</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    ButtonBox:{
        width: 200,
        height: 150,
        borderColor: "black",
        borderRadius: 50,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    }
})