import { View, Text } from 'react-native'
import React from 'react'
import { TabArrayType } from "../../types"
const TabArray : TabArrayType[] = [
    { name: "menu", title : "Home", icon : "home" },
    { name: "myPrograms", title : "My Library", icon : "book" },
    { name: "prayersTable", title : "Prayer Times", icon : "clock-outline" },
    { name: "more", title : "More", icon : "dots-horizontal" }
]

export default TabArray


{/* 

     <Tabs.Screen
        name="menu"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home" color={color} />
          ),
        }}
      />
    
*/}