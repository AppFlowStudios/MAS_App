import { View, Text, Pressable, Image, FlatList, Linking } from 'react-native'
import React from 'react'
import { Link } from "expo-router"
import { Button } from 'react-native-paper'

const VolunteerImages = [
{  image: require("@/assets/images/volunteerImages/DSC06184-7.jpg")},
{  image: require("@/assets/images/volunteerImages/DSC07561-1.jpg")},
{ image : require("@/assets/images/volunteerImages/DSC00982.png")},
{ image: require("@/assets/images/volunteerImages/DSC00937.png")}
]

const randomIndex = Math.floor(Math.random() % VolunteerImages.length )
const VolunterImageCarousel = () => {
  return (
    <FlatList 
    data={VolunteerImages}
    renderItem={({item}) => { return <Image source={item.image}  style={{width: 100, height: 100, borderRadius: 20}} />} }
    horizontal
    pagingEnabled
    />
  )
}
const onPress = () => Linking.canOpenURL("https://chat.whatsapp.com/EJZZgYlIGuR4veJjeBnJrr").then(() => {
  Linking.openURL("https://chat.whatsapp.com/EJZZgYlIGuR4veJjeBnJrr");
});

const LinkToVolunteersModal = () => {
  return (
    <View style={{width: "100%", height: 200, justifyContent :"center", alignItems : 'center',shadowColor: "black", shadowOffset: { width: 0, height: 0},shadowOpacity: 0.6 }} >
        <Pressable className='bg-[#0D509D] w-[95%] h-[90%]' style={{borderRadius: 30, justifyContent : "center"}} onPress={onPress}>
          <View className='flex-row '>
            <View className='flex-col pl-4 '>
              <Text className='text-white font-bold '>Lets Grow Together!</Text>
              <Text className='text-white font-bold text-xl mt-1'>Join Your Community</Text>
              <Button icon={"account-heart"} mode='contained' style={{width: 150, alignItems: "center", backgroundColor: "#57BA47", marginTop: 30}}>Volunteer Now</Button>
            </View>
            <View style={{width: "50%", height: 120 ,shadowColor: "black", shadowOffset: { width: 0, height: 0},shadowOpacity: 0.6, alignItems: "center"}} >
              <Image source={VolunteerImages[1].image}  style={{width: 115, height: 120, borderRadius: 20, marginLeft: 15}} />
            </View>
          </View>
        </Pressable>
    </View>
  )
}

export default LinkToVolunteersModal