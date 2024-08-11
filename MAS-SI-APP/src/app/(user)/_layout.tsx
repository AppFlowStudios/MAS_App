import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, Redirect } from "expo-router";
import * as Animatable from 'react-native-animatable';
import { AccessibilityInfo, TouchableOpacity, View, Text } from "react-native"
import { useEffect, useRef, useState } from "react"
import TabArray from './tabArray';
import { TabArrayType } from '@/src/types';
import { Icon } from "react-native-paper";
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { useAuth } from "@/src/providers/AuthProvider"
import LottieView from 'lottie-react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
function TabBarIcon(props: {
  source: string;
  color: string;
}) {
  return <Icon size={20} {...props} />;
}

const animate1 = {0 : {scale: .5, translateY : 0} ,1: {scale: 1.2, translateY: -5}}
const animate2 = {0 : {scale: 1.2, translateY: 0}, 1: {scale: 1, translateY: 20}}

type TabButtonProps = {
  props : BottomTabBarButtonProps,
  items : TabArrayType
}
type loadingAnimationProp = {
  onAnimationEnd : ( ) => void
}
const loadingAnimation = ({ onAnimationEnd} : loadingAnimationProp) => {
  const animation = useRef<LottieView>(null);
  const opacity = useSharedValue(1)
  const playMASAnimation = useAnimatedStyle(() => {
    return{
      opacity : opacity.value
    }
  })

  useEffect(() => {
    opacity.value = withTiming(0, { duration: 1000, easing: Easing.out(Easing.quad) }, () =>{
      onAnimationEnd()
    });
  },)
  return(
  <Animated.View style={[{ zIndex : 1, position : 'absolute', width : '100%', height : '100%'  }, playMASAnimation]}>
        <LottieView
          autoPlay
          ref={animation}
          style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'white'
          }}
          source={require('@/assets/lottie/MASLogoAnimation3.json')}
        />
    </Animated.View> 
  )
}
const TabButton = ({props ,items} : TabButtonProps) => {
  const { onPress, accessibilityState } = props;
  const focused = accessibilityState?.selected
  const viewRef = useRef<any>(null)
  const textRef = useRef<any>(null)

  useEffect(() => {
    if(focused) {
      textRef.current.transitionTo({scale: 1})
    }else{
      textRef.current.transitionTo({scale: 0})
    }

  }
  , [focused])
  return(
    <TouchableOpacity
    onPress={onPress}
    style={{ alignItems: "center", flex : 1, marginTop : 4.5}}
    >
      <Animatable.View className='justify-center items-center' style={{width : 30, height: 20, justifyContent: "center", alignItems: "center"}} animation="zoomIn" duration={1000}>
        <Icon source={items?.icon}  size={20} color={ focused ? "#57BA47" : "#0D509D"}/>
      </Animatable.View>
      <Animatable.Text ref={textRef} style={{fontSize: 14, color: "black", textAlign: "center", fontWeight: "bold"}}>
        {items?.title ? items?.title : ""}
      </Animatable.Text>
    </TouchableOpacity>
  )
}
export default function TabLayout() {
  const { session } = useAuth();
  const animation = useRef<LottieView>(null);
  const opacity = useSharedValue(1)
  const [ loading, setLoading ] = useState(true)
  if (!session) {
    return <Redirect href={'/sign-in'} />;
  }
  const playMASAnimation = useAnimatedStyle(() => {
    return{
      opacity : opacity.value
    }
  })
  const handleAnimationEnd = () => {
    setLoading(false);
  };

  const fadeOutAnimation = () => {
      // Fade out animation after 3 seconds
      opacity.value = withTiming(0, { duration: 1000, easing: Easing.out(Easing.quad) }, () =>{
        handleAnimationEnd()
      });
  }
  return (
    <>
    <Tabs 
    screenOptions={{
      tabBarStyle : {backgroundColor: "white", height: 50, position: "absolute", bottom: 16, right: 16, left: 16, borderRadius: 16, marginBottom: 5, shadowColor:"black", shadowOffset: { width: 0, height: 0},shadowOpacity: 1, shadowRadius: 8, justifyContent: "center", alignItems : "center", },
      tabBarItemStyle: { height: 30 }
    }}
    >

      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="tabArray" options={{ href: null}} />

      {TabArray.map((tab, i) => {
        return(
          <Tabs.Screen 
          key={i}
            name={tab.name}
            options={{
              title: tab.title,
              headerShown : false,
              tabBarButton: (props) => <TabButton items={TabArray[i]} props={{...props}}/>
            }}
          />
        )
      }) }
      { /*<Tabs.Screen
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
                tabBarButton : (props) => <TabButton items={TabArray[3]} props={{...props}} />
              }}
            /> */ }
    </Tabs>
    </>
  );
}
