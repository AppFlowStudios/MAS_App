import { View, Text, Pressable, Image, ImageBackground } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { defaultProgramImage } from './ProgramsListProgram'
import { Link } from 'expo-router'
const LinkToDonationModal = () => {
  return (
    <View>
        <Link href={'more/Donation'} asChild>
        <Pressable  style={{width: "100%", height: 200, justifyContent :"center", alignItems : 'center',shadowColor: "black", shadowOffset: { width: 0, height: 0},shadowOpacity: 0.6, borderRadius : 20 }}>
                    <ImageBackground 
                        source={require('@/assets/images/MASDonation2.png')}
                        style={{ width: '95%', height : '100%', borderRadius : 20, alignSelf : 'center'}}
                        imageStyle={{ width : '100%', height : '100%', borderRadius : 20, alignSelf : 'center', objectFit : 'cover'}}
                    />
                    { /* <Pressable className='bg-[#0D509D] w-[95%] h-[90%]' style={{borderRadius: 30, justifyContent : 'center'}}>
                        <View className='flex-col justify-center'>
                            <View style={{width: "95%", height: '100%' ,shadowColor: "black", shadowOffset: { width: 0, height: 0},shadowOpacity: 0.6, alignItems: "center" }} className=''>
                                <Image source={require('@/assets/images/MASDonation.png')}  style={{width: '90%', height: '50%', borderRadius: 20, marginLeft: 15, marginTop : 10 }} />
                                <View className='w-[95%] pl-4'>
                                    <Button icon={"account-heart"} mode='contained' style={{width: 150, alignItems: "center", backgroundColor: "#57BA47", marginTop : 10}}>Donate Now</Button>
                                </View>
                            </View>
                        </View>
                    </Pressable> */}
        </Pressable>
        </Link>
    </View>
  )
}

export default LinkToDonationModal