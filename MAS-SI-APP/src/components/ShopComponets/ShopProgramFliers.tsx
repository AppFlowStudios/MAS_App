import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { defaultProgramImage } from '../ProgramsListProgram'
import { Link } from 'expo-router'
type ShopProgramFliersProp = {
    width : number
    program_id : string
    img : string | null
}
const ShopProgramFliers = ({ width, program_id, img } : ShopProgramFliersProp) => {
  
  return (
    <Link href={`more/ProgramsPage/${program_id}`} asChild>
        <Pressable style={{ width : width / 2, height : 130, alignItems : "center", marginTop : 15 }}>
            <Image
            source={{ uri : img || defaultProgramImage }}
            style={{ width : "90%", height : 130, objectFit: "fill", borderRadius: 15 }}
            />
        </Pressable>
    </Link>
  )
}

export default ShopProgramFliers