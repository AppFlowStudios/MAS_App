import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack } from "expo-router"
import { isLoading } from 'expo-font'
import { ActivityIndicator } from 'react-native-paper'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ContinueQuran from './ContinueQuran'
import FavoriteQuran from './FavoriteQuran'
import BookmarkQuran from './BookmarkQuran'
import AnimatedTabBar, { AnimatedTabBarProp } from '@/src/components/PrayerTimesComponets/AnimatedTabBar'
enum CustomTab {
    Tab1,
    Tab2,
    Tab3
}  
const AnimatedTabs:AnimatedTabBarProp[] = [
        {title : "Continue"},
        {title : "Bookmark"},
        {title : "Favorite"}
]
const Quran = () => {
    const [ selectedTab, setSelectedTab ] = useState<CustomTab>(CustomTab.Tab1)
  

    return (
        <View className='flex-1 bg-white'>
        <AnimatedTabBar animatedTabs={AnimatedTabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        
                { selectedTab == 0 ? ( <ContinueQuran />) : <></>}
                { selectedTab == 1 ? ( <BookmarkQuran />) : <></>}
                { selectedTab == 2 ? ( <FavoriteQuran />) : <></>}
            
        </View>
    )
    }

    export default Quran