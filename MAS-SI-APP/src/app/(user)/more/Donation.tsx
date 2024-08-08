import { View, Text, ScrollView, useWindowDimensions, Pressable, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import DonationChart from '@/src/components/DonationChart'
import { format } from 'date-fns'
import { SharedValue, useDerivedValue, useSharedValue } from 'react-native-reanimated'
import { Canvas, SkFont, useFont } from '@shopify/react-native-skia'
import AnimatedDonationAmount from '@/src/components/AnimatedDonationText'
import { defaultProgramImage } from '@/src/components/ProgramsListProgram'
import { LinearGradient } from 'expo-linear-gradient'
import YoutubePlayer from "react-native-youtube-iframe"
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { Divider, Icon } from 'react-native-paper'
type DonationGoalType = {
    date : string
    amount : number
    amountGiven : number
}
const Donation = () => {
  const layout = useWindowDimensions().width
  const layoutHeight = useWindowDimensions().height
  const [ playing, setPlaying ] = useState(false)
  const layoutMargin = 40
  const [ selectedDate, setSelectedDate ] = useState('Total')
  const onStateChange = useCallback((state : any) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);
  const tabBarHeight = useBottomTabBarHeight() + 60
  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const selectedValue = useSharedValue(0)
  const DONATIONGOAL : DonationGoalType[] = [
        {date : "2017-02-01T05:00:00.000Z", amount : 0, amountGiven : 0},
        {date : "2026-02-01T05:00:00.000Z", amount : 13000000, amountGiven : 0}
  ]

  const currDonations : DonationGoalType[] = [
    {date : "2017-02-01T05:00:00.000Z", amount : 0, amountGiven : 0},
    {date : "2018-02-01T05:00:00.000Z", amount : 1850000, amountGiven : 1850000},
    {date : "2019-02-01T05:00:00.000Z", amount : 3000000, amountGiven : 1150000},
    {date : "2020-02-01T05:00:00.000Z", amount : 5571000, amountGiven : 2571000},
    {date : "2021-02-01T05:00:00.000Z", amount : 6023000, amountGiven : 452000},
    {date : "2022-02-01T05:00:00.000Z", amount : 7172830, amountGiven : 1149830},
    {date : "2023-02-01T05:00:00.000Z", amount : 8000000, amountGiven : 827170},
    {date : "2024-02-01T05:00:00.000Z", amount : 8332100, amountGiven : 332100},
    {date : "2024-02-01T05:00:00.000Z", amount : 8532100, amountGiven : 200000.02},
  ] 
  { /* 1857000, 3714000, 5571000, 7428000, 9285000, 11142000, 13000000 */ }
  const font = useFont(require('@/assets/fonts/SpaceMono-Regular.ttf'), 20)
  if(!font) {return null}
  const DonationButtonBoxs = [30, 50, 100, 250]
  const currTotalAmount = currDonations[currDonations.length - 1].amount
  const perctangeToGoal = ((currTotalAmount / 13000000 ) * 100).toFixed(1)
  return (
    <ScrollView style={{ width : layout, height : layoutHeight, backgroundColor : "white" }} contentContainerStyle={{ paddingBottom : tabBarHeight }}> 
        
        <View className='items-center flex-row'  style={{ backgroundColor : "#0D509D", width : '90%', alignSelf : 'center', marginTop : 2, borderTopLeftRadius : 20, borderTopRightRadius : 20, paddingHorizontal : 8, paddingVertical : 8}}>
            <Image  source={{ uri : defaultProgramImage || undefined}} style={{ backgroundColor : 'white', borderRadius : 50, width : 50, height : 50}}/>
            <Text className='text-white text-2xl font-bold ml-4'>MAS Staten Island</Text>
        </View>
        <Divider style={{width : '90%', alignSelf : 'center'}}/>
        <View style={{ backgroundColor : "#0D509D", width : '90%', alignSelf : 'center', borderBottomLeftRadius : 20, borderBottomRightRadius : 20}} className='flex-row'>
            <View style={{ width : (layout * .9) / 1.5}}>
              <AnimatedDonationAmount font={font} selectedValue={selectedValue} percantageToGoal={perctangeToGoal}/>
            </View>
            <View style={{ width : (layout * .9) / 3}} className='items-center justify-center flex-row'>
              <Text className='text-xl font-bold text-[#57BA47]'>{perctangeToGoal}%</Text>
              <Icon size={20} source={'arrow-up-thin'} color='#57BA47'/>
            </View>
        </View>
        <View style={{ width : '90%', height: layoutHeight / 2.8, shadowColor : 'black', shadowOffset : { width : 0, height : 0}, shadowOpacity : 1, shadowRadius : 2, borderRadius : 20, justifyContent : 'center', alignItems : 'center', backgroundColor : 'white', marginTop : 5, alignSelf : 'center' }}> 
            <DonationChart CHART_HEIGHT={layoutHeight / 3} CHART_WIDTH={layout * .89}  DONATION_GOAL={DONATIONGOAL} CHART_MARGIN={layoutMargin} CURR_DONATIONS={currDonations} setSelectedDate={setSelectedDate} selectedValue={selectedValue}/>
        </View> 
        <View style={{ width : layout, height : layoutHeight / 5, backgroundColor : 'white', flexWrap : "wrap", flexDirection : 'row', columnGap : 5, justifyContent : 'center', marginTop : "10%", rowGap : 5 }}>
            {DonationButtonBoxs.map((item) => (
                 <Pressable style={{ width : layout / 2.2, height : 50 }}>
                 <LinearGradient colors={['#0D509D', '#57BA47']} style={{ width : '100%', height : '100%', opacity : 0.8, borderRadius  : 20, justifyContent : "center"}}>
                     <Text className='text-white text-xl font-bold text-center'>${item}</Text>
                 </LinearGradient>
             </Pressable>
            ))}
             <Pressable style={{ width : layout / 2.2, height : 50 }}>
                 <LinearGradient colors={['#0D509D', '#57BA47']} style={{ width : '100%', height : '100%', opacity : 0.8, borderRadius  : 20, justifyContent : "center"}}>
                     <Text className='text-white text-xl font-bold text-center'>Other Amount...</Text>
                 </LinearGradient>
             </Pressable>
        </View>
        
        <View>
            <YoutubePlayer
                height={layoutHeight / 4}
                width={layout * 0.98}
                webViewStyle={{ borderRadius : 20, marginLeft : '2%', marginTop : 8, backgroundColor : "#ededed" }}
                play={playing}
                videoId={'pTKXtYdCg9c'}
                onChangeState={onStateChange}
            />
        </View>
    </ScrollView>
  )
}

export default Donation