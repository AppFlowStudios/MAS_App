import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from "expo-router";
import * as Animatable from 'react-native-animatable';
import { AccessibilityInfo, TouchableOpacity, View, Text } from "react-native"
import { useEffect, useRef } from "react"
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

const animate1 = {0 : {scale: .5, translateY : 8}, 1: {scale: 1.5, translateY: -14}}
const animate2 = {0 : {scale: 1.5, translateY: -14}, 1: {scale: 1, translateY: 8}}

const TabButton = (props : any) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected
  const viewRef = useRef<any>(null)
  const textRef = useRef<any>(null)

  useEffect(() => {
    if(focused) {
      viewRef.current?.animate(animate1)
      textRef.current.transitionTo({scale: 1})
    }else{
      viewRef.current?.animate(animate2)
      textRef.current.transitionTo({scale: 0})

    }

  }
  , [focused])
  return(
    <TouchableOpacity
    onPress={onPress}
    style={{ alignItems: "center"}}
    >
    <Animatable.View ref={viewRef} className='justify-center items-center' style={{width : 30, height: 30, borderRadius: 25, borderWidth: 4, backgroundColor: "white", borderColor: "white", justifyContent: "center", alignItems: "center"}} animation="zoomIn" duration={1000}>
      <TabBarIcon name="ellipsis-h" color={focused ? "blue" : "grey"}/>
    </Animatable.View>
    <Animatable.Text ref={textRef} style={{fontSize: 10, color: "grey", textAlign: "center"}}>
      <Text>More</Text>
    </Animatable.Text>
    </TouchableOpacity>
  )
}


export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarStyle : { height: 50, position: "absolute",bottom: 13, right: 16, left: 16, borderRadius: 16, marginBottom: 5, },
      tabBarItemStyle: { height: 44}
    }}
    
    >

      <Tabs.Screen name="index" options={{ href: null }} />
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

      <Tabs.Screen 
        name="myPrograms"
        options={ {
          title: "My Library",
          headerShown:  false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='book' color={color} />
          ),
        }}
        />

      <Tabs.Screen 
        name="prayersTable"
        options={ {
          title: "Prayer Times",
          headerShown: false,
          tabBarIcon: ( {color} ) =>(
            <TabBarIcon name="clock-o" color={color} />
          )
        }}
      />

<Tabs.Screen 
        name="more"
        options={ {
          title: "More",
          headerShown: false,
          tabBarIcon: ( {color} ) =>(
            <TabBarIcon name="ellipsis-h" color={color} />
          ),
          tabBarButton : (props) => <TabButton {...props}/>
        }}
      />
    </Tabs>
  );
}
