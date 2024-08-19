import { View, Text, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { Button, Divider, Icon, TextInput } from 'react-native-paper'

const BusinessAds = () => {
  const tabBarHeight = useBottomTabBarHeight() + 30
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
  return (
    <ScrollView className='h-[100%] w-[100%] bg-white' contentContainerStyle={{ height : '100%', width : '100%' }}>
      <View className='w-[100%] bg-[#0D509D] h-[15%] flex-row items-center justify-evenly'>
        { stageInfo.map((item, index) => {
            return(
                <View style={{ width : '30%', height : '70%' }} className='items-center justify-center flex-col'> 
                    <View style={[{ backgroundColor : currentStage == index ? 'white' : 'gray'}, {borderRadius : 50, width : '48%', height : '70%' }]}>

                    </View>
                    <Text className='text-center text-white'>{item}</Text>
                </View>
            )
            })
        }
      </View>
     <View className='flex-1 bg-white' style={{ paddingBottom : tabBarHeight }}>
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
                            <View className='w-[90%] self-center flex-2'>
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
                    <View className='flex-row justify-between items-center'> 
                        <Text className='text-gray-400 '>Duration</Text>
                        <Pressable>
                            <Icon source={'information-icon'} size={20}/>
                        </Pressable>
                    </View>
                    <View> 
                        
                    </View>
                </View>
            ) : <></>
        }
     </View>
    </ScrollView>
  )
}

export default BusinessAds