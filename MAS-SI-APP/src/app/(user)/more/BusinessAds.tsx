import { View, Text, ScrollView, Pressable, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { Button, Divider, Icon, TextInput } from 'react-native-paper'
import BusinessAdsDurationCard from '@/src/components/BusinessAdsComponets/BusinessAdsDurationCard'
import BusinessAdsLocationCard from '@/src/components/BusinessAdsComponets/BusinessAdsLocationCard'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
import { useAuth } from '@/src/providers/AuthProvider'
import { supabase } from '@/src/lib/supabase'
import { BlurView } from 'expo-blur'
import { useRouter } from 'expo-router'
import { useRoute } from '@react-navigation/native'
const BusinessAdsDurationInfoTooltip = () => {
    return(
        <Menu>
            <MenuTrigger>
                <Icon source={'information-outline'} size={20}/>
            </MenuTrigger>
            <MenuOptions customStyles={{optionsContainer: {width: 150, borderRadius: 8, marginTop: 20, padding: 8}}}>
                <MenuOption>
                    <Text>How long would you like your business to be displayed?</Text>
                </MenuOption>
            </MenuOptions>
        </Menu>
    )
}
const BusinessAdsLocationInfoToolTip = () => {
    return(
        <Menu>
            <MenuTrigger>
                <Icon source={'information-outline'} size={20}/>
            </MenuTrigger>
            <MenuOptions customStyles={{optionsContainer: {width: 150, borderRadius: 8, marginTop: 20, padding: 8}}}>
                <MenuOption>
                    <Text>Where would you like your business to be shown?</Text>
                </MenuOption>
            </MenuOptions>
        </Menu>
    )
}
const BusinessAds = () => {
  const { session } = useAuth()
  const router = useRouter()
  const tabBarHeight = useBottomTabBarHeight() * 3.7
  const { height, width } = Dimensions.get('screen')
  const [ currentStage, setCurrentStage ] = useState(0)
  const [ personalFullName, setPersonalFullName ] = useState('')
  const [ personalPhoneNumber, setPersonalPhoneNumber ] = useState('')
  const [ personalEmail, setPersonalEmail ] = useState('')
  const [ finishedPersonalPage, setFinishedPersonalPage ] = useState(false)
  const [ businessName, setBusinessName ]= useState('')
  const [ businessAddress, setBusinessAddress ] = useState('')
  const [ businessCity, setBusinessCity ] = useState('')
  const [ businessState, setBusinessState ] = useState('')
  const [ businessPhoneNumber, setBusinessPhoneNumber ] = useState('')
  const [ businessEmail, setBusinessEmail ] = useState('')
  const [ finishedBusinessPage, setFinishedBusinessPage ] = useState(false)
  const [ selectedDuration, setSelectedDuration ] = useState([''])
  const [ selectedLocation, setSelectedLoction ] = useState([''])
  const [ finishedSelectedChoices, setFinishedSelectedChoices ] = useState(false)
  const [ businessFlyer, setBusinessFlyer ] = useState<ImagePicker.ImagePickerAsset>()
  useEffect(() => {
    if(  personalFullName &&  personalPhoneNumber && personalEmail ){
        setFinishedPersonalPage(true)
    }else{
        setFinishedPersonalPage(false)
    }
  }, [ personalFullName, personalPhoneNumber, personalEmail])

  useEffect(() => {
    if ( businessName && businessAddress &&  businessCity &&  businessState && businessPhoneNumber &&  businessEmail ){
        setFinishedBusinessPage(true)
    }else{
        setFinishedBusinessPage(false)
    }
  }, [ businessName, businessAddress, businessCity, businessState, businessPhoneNumber, businessEmail])
  useEffect(() => {
    if( selectedDuration.length > 0 && selectedLocation.length > 0 && businessFlyer ){
        setFinishedSelectedChoices(true)
    }
    else{
        setFinishedSelectedChoices(false)
    }
  }, [ selectedDuration, selectedLocation, businessFlyer])

  const ADDURATIONOPTIONS = ['1 Month', '3 Months', '1 Year']
  const LOCATIONOPTIONS = ['On App', "Center Tv's", 'Both']
  const stageInfo = ['Personal Info', 'Business Info', 'Ad details']
  const personalStageQuestions = ['Full Name', 'Phone Number', 'Email']
  const personalStageStates = [{ get : personalFullName, set : setPersonalFullName}, {get : personalPhoneNumber, set : setPersonalPhoneNumber }, { get : personalEmail, set : setPersonalEmail }]
  const onFinished = () => {
    setCurrentStage(currentStage + 1)
  }
  
  const onGoBack = () => {
    setCurrentStage(currentStage - 1)
  }
  const businessStageQuestions = ['Business Name', 'Address', 'City', 'State', 'Phone Number', 'Email']
  const businessStageStates = [{ get : businessName, set : setBusinessName}, {get : businessAddress, set : setBusinessAddress }, { get : businessCity, set : setBusinessCity }, {get : businessState, set : setBusinessState} ,{ get : businessPhoneNumber, set : setBusinessPhoneNumber}, { get : businessEmail, set : setBusinessEmail}]

  const onSelectImage = async () => {
    const options : ImagePicker.ImagePickerOptions = {
        mediaTypes : ImagePicker.MediaTypeOptions.Images,
        allowsEditing : true
    }

    const result = await ImagePicker.launchImageLibraryAsync(options)

    if( !result.canceled ){
      const img = result.assets[0]
      setBusinessFlyer(img)
    }
  }

  const onSubmit = async () => {
    if( businessFlyer ){
        const base64 = await FileSystem.readAsStringAsync(businessFlyer.uri, { encoding: 'base64' });
        const filePath = `${session?.user.id}/${new Date().getTime()}.${businessFlyer.type === 'image' ? 'png' : 'mp4'}`;
        const contentType = businessFlyer.type === 'image' ? 'image/png' : 'video/mp4';
        const { data : image, error : image_upload_error } = await supabase.storage.from('business_flyers').upload(filePath, decode(base64));
        console.log(image_upload_error)
        if( image ){
            const { data : business_flyer_url } = await supabase.storage.from('business_flyers').getPublicUrl(image?.path)
            if( business_flyer_url ) {
                const { data, error } = await supabase.from('business_ads_submissions').insert({'personal_full_name' : personalFullName, 'personal_phone_number' : personalPhoneNumber, 'personal_email' : personalEmail, 'business_name': businessName, 'business_address' : businessAddress, 'business_phone_number': businessPhoneNumber, 'business_email' : businessEmail, 'business_flyer_location' : selectedLocation[0], 'business_flyer_duration' : selectedDuration[0], 'business_flyer_img' : business_flyer_url.publicUrl, user_id : session?.user.id })
                if( error ){
                    console.log(error)
                }else{
                     await supabase.functions.invoke('resend', { body : {submission : { personal_full_name : personalFullName, personal_phone_number : personalPhoneNumber, personal_email : personalEmail,  business_name: businessName, business_address : businessAddress,  business_phone_number : businessPhoneNumber,  business_email  : businessEmail,  business_flyer_location  : selectedLocation[0],  business_flyer_duration : selectedDuration[0],  business_flyer_img : business_flyer_url.publicUrl } }})
                }
                router.back()
            }
        }
    }

}

  return (
    <ScrollView className='flex-1 bg-white' contentContainerStyle={{ paddingBottom : tabBarHeight, flexGrow: 1 }}>
      <View className='w-[100%] bg-[#0D509D] h-[15%] flex-row items-center justify-evenly'>
        { stageInfo.map((item, index) => {
            return(
                <View key={index} style={{ width : '25%', height : 65 }} className='items-center justify-center flex-col'> 
                    <View style={[{ backgroundColor : currentStage == index ? 'white' : currentStage < index ?  'gray' : 'green'}, {borderRadius : 50, width : '48%', height : '70%', alignItems : 'center' }]}>
                        {currentStage > index ? <Icon source={'check-bold'} color='white' size={40}/> : <></>}
                    </View>
                    <Text className='text-center text-white'>{item}</Text>
                </View>
            )
            })
        }
      </View>
     <View className='flex-1 bg-white' style={{ }}>
        <View className='flex-2 pt-2'>
           { currentStage == 0 && <Text className='text-3xl font-bold pl-2'>Personal Information</Text>}
           { currentStage == 1 && <Text className='text-3xl font-bold pl-2'>Business Information</Text>}
           { currentStage == 2 && <Text className='text-3xl font-bold pl-2'>Advertisment Details</Text>}
            <Divider style={{ backgroundColor : 'black'}}/>     
        </View>
        {
            currentStage == 0 ? (
                <View className='flex-1 flex-col gap-y-8 mt-5'> 
                    {personalStageQuestions.map((item, index) => {
                        return(
                            <View className='w-[90%] self-center flex-2'>
                                <TextInput 
                                    mode='outlined'
                                    label={personalStageQuestions[index]}
                                    value={personalStageStates[index].get}
                                    onChangeText={personalStageStates[index].set}
                                    style={{ backgroundColor : 'white'}}
                                />
                            </View>
                        )
                    })}
                    <View className='flex-row items-center w-[100%] justify-end flex-2 px-5' > 
                        <Button className='bg-[#57BA47] ' mode='contained' theme={{ roundness : 1 }} disabled={!finishedPersonalPage} onPress={onFinished}>
                            <Text>Next</Text>
                        </Button>
                    </View>
                </View>
            ) : currentStage == 1 ? (
                <View className='flex-1 flex-col gap-y-3 mt-5'> 
                    {businessStageQuestions.map((item, index) => {
                        return(
                            <View className='w-[90%] self-center flex-2' key={index}>
                                <TextInput 
                                    mode='outlined'
                                    label={businessStageQuestions[index]}
                                    value={businessStageStates[index].get}
                                    onChangeText={businessStageStates[index].set}
                                    style={{ backgroundColor : 'white'}}
                                />
                            </View>
                        )
                    })}
                    <View className='flex-row items-center w-[100%] justify-between flex-2 px-5' > 
                         <Button className=' bg-gray-500 ' mode='contained' theme={{ roundness : 1 }} onPress={onGoBack}>
                            <Text>Back</Text>
                        </Button>
                        <Button className='bg-[#57BA47] ' mode='contained' theme={{ roundness : 1 }} disabled={!finishedBusinessPage} onPress={onFinished}>
                            <Text>Next</Text>
                        </Button>
                    </View>
                </View>
            ) : currentStage == 2 ? (
                <View className='flex-col'>
                    <View className='flex-row justify-between items-center px-2'> 
                        <Text className='text-gray-400 text-xl'>Duration</Text>
                        <BusinessAdsDurationInfoTooltip />
                    </View>
                    <View className='items-center flex-col gap-y-2'>
                        {
                            ADDURATIONOPTIONS.map((item, index) => (
                                <View key={index}>
                                    <BusinessAdsDurationCard height={height / 15} width={width * .8} selectedDuration={selectedDuration} setDuration={setSelectedDuration} duration={item} index={index} />
                                </View>
                            ))
                        }
                    </View>
                    <View className='flex-row justify-between items-center px-2'> 
                        <Text className='text-gray-400 text-xl'>Location</Text>
                        <BusinessAdsLocationInfoToolTip />
                    </View>
                    <View className='items-center flex-col gap-y-2'>
                        {
                            LOCATIONOPTIONS.map((item, index) => (
                                <View key={index}>
                                    <BusinessAdsLocationCard height={height / 15} width={width * .8} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLoction} location={item} index={index} />
                                </View>
                            ))
                        }
                    </View>
                    <View className='flex-row justify-between items-center px-2'> 
                        <Text className='text-gray-400 text-xl'>Upload Flyer</Text>
                    </View>
                    <Pressable className='h-[200] w-[250] items-center justify-center bg-white self-center mt-2' onPress={onSelectImage} style={{ borderRadius : 20 }}>
                        {businessFlyer ? <Image source={{ uri : businessFlyer.uri || undefined}} style={{width: "100%", height:"100%", objectFit: "contain"}} /> : (
                            <View className=' overflow-hidden w-[100%] h-[100%]' style={{ borderRadius : 20 }}>
                                <BlurView intensity={10} style={{ height : '100%', width : '100%', borderRadius : 20, alignItems : 'center', justifyContent : 'center'}} >
                                    <View className='p-2 rounded-full bg-gray-50' >
                                        <Icon source={"camera"} size={60} color='#007AFF'/>
                                    </View>
                                </BlurView>
                            </View>
                        )}
                    </Pressable>
                    <View className='flex-row items-center w-[100%] justify-between  px-5' > 
                         <Button className=' bg-gray-500 ' mode='contained' theme={{ roundness : 1 }} onPress={onGoBack}>
                            <Text>Back</Text>
                        </Button>
                        <Button className='bg-[#57BA47] ' mode='contained' theme={{ roundness : 1 }} disabled={!finishedSelectedChoices} onPress={onSubmit}>
                            <Text>Submit</Text>
                        </Button>
                    </View>
                </View>
            ) : <></>
        }
     </View>
    </ScrollView>
  )
}

export default BusinessAds