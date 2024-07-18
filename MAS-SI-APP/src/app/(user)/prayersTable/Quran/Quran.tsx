import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack } from "expo-router"
import { isLoading } from 'expo-font'
import { ActivityIndicator } from 'react-native-paper'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ContinueQuran from './ContinueQuran'
import FavoriteQuran from './FavoriteQuran'
import BookmarkQuran from './BookmarkQuran'
const Quran = () => {
  
    const Tabs = createMaterialTopTabNavigator()
    return (
        <Tabs.Navigator>
           <Tabs.Screen name='Continue' component={ContinueQuran} />
           <Tabs.Screen name="Bookmark" component={BookmarkQuran} />
           <Tabs.Screen name='Favorite' component={FavoriteQuran} />
        </Tabs.Navigator>
    )
    }

    export default Quran