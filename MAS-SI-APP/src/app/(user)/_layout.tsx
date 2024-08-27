import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, Redirect, Link } from "expo-router";
import * as Animatable from 'react-native-animatable';
import { Pressable, TouchableOpacity } from "react-native";
import { useEffect, useRef, useState } from "react";
import TabArray from './tabArray';
import { addProgramToNotificationsToastProp, Program, TabArrayType } from '@/src/types';
import { Icon } from "react-native-paper";
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { useAuth } from "@/src/providers/AuthProvider";
import LottieView from 'lottie-react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming, runOnJS } from 'react-native-reanimated';
import Toast from 'react-native-toast-message'
import { View, Text, Image } from 'react-native'
import { defaultProgramImage } from '@/src/components/ProgramsListProgram';
import { BlurView } from 'expo-blur';
import { supabase } from '@/src/lib/supabase';

const toastConfig = {
  addProgramToNotificationsToast : ( {props} : any ) => (
    <Pressable className='rounded-xl overflow-hidden' onPress={props.onPress}>
        <BlurView intensity={40} className='flex-row w-[80%] items-center justify-between px-4 h-[60] rounded-xl'>
          <View>
              <Image source={{ uri : props.props.program_img || defaultProgramImage }} style={{ width : 50, height : 50 , objectFit : 'fill', borderRadius : 10 }}/>
          </View>
          <View className='flex-col'>
            <View>
              <Text>1 Program Added To Notifications</Text>
            </View>
            <View className='flex-row'>
              <Text>{props.props.program_name}</Text>
              <Icon source={'chevron-right'} size={20} />
            </View>
          </View>
        </BlurView>
      </Pressable>
  ),
  programRemovedFromNotifications : ( {props} : any ) => (
    <Pressable className='rounded-xl overflow-hidden'>
        <BlurView intensity={40} className='flex-row w-[80%] items-center justify-between px-4 h-[60] rounded-xl'>
          <View>
              <Image source={{ uri : props.props?.program_img || defaultProgramImage }} style={{ width : 50, height : 50 , objectFit : 'fill', borderRadius : 10 }}/>
          </View>
          <View className='flex-col'>
            <View>
              <Text>1 Program Removed From Notifications</Text>
            </View>
            <View className='flex-row'>
              <Text>{props.props.program_name}</Text>
              <Icon source={'chevron-right'} size={20} />
            </View>
          </View>
        </BlurView>
      </Pressable>
  ),
  LectureAddedToPlaylist : ( {props} : any) => (
    <Pressable className='rounded-xl overflow-hidden' onPress={props.onPress}>
        <BlurView intensity={40} className='flex-row w-[80%] items-center justify-between px-4 h-[60] rounded-xl'>
          <View>
              <Image source={{ uri : props.props?.playlist_img || defaultProgramImage }} style={{ width : 50, height : 50 , objectFit : 'fill', borderRadius : 10 }}/>
          </View>
          <View className='flex-col'>
            <View>
              <Text numberOfLines={1} allowFontScaling adjustsFontSizeToFit >1 lecture added</Text>
            </View>
            <View className='flex-row'>
              <Text>{props.props?.playlist_name}</Text>
              <Icon source={'chevron-right'} size={20} />
            </View>
          </View>
        </BlurView>
      </Pressable>
  )
}
const animate1 = { 0: { scale: 0.5, translateY: 0 }, 1: { scale: 1.2, translateY: -5 } };
const animate2 = { 0: { scale: 1.2, translateY: 0 }, 1: { scale: 1, translateY: 20 } };

type TabButtonProps = {
  props: BottomTabBarButtonProps,
  items: TabArrayType
}

const TabButton = ({ props, items }: TabButtonProps) => {
  const { onPress, accessibilityState } = props;
  const focused = accessibilityState?.selected;
  const viewRef = useRef<any>(null);
  const textRef = useRef<any>(null);

  useEffect(() => {
    if (focused) {
      textRef.current?.transitionTo({ scale: 1 });
    } else {
      textRef.current?.transitionTo({ scale: 0 });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ alignItems: "center", flex: 1, marginTop: 4.5 }}
    >
      <Animatable.View
        className='justify-center items-center'
        style={{ width: 30, height: 20, justifyContent: "center", alignItems: "center" }}
        animation="zoomIn"
        duration={1000}
      >
        <Icon source={items?.icon} size={20} color={focused ? "#57BA47" : "#0D509D"} />
      </Animatable.View>
      <Animatable.Text
        ref={textRef}
        style={{ fontSize: 14, color: "black", textAlign: "center", fontWeight: "bold" }}
      >
        {items?.title ? items?.title : ""}
      </Animatable.Text>
    </TouchableOpacity>
  );
}

export default function TabLayout() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(true);
  const opacity = useSharedValue(1);

  const playMASAnimation = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const handleAnimationEnd = () => {
    setLoading(false);
  };

  const fadeOutAnimation = () => {
    opacity.value = withTiming(0, { duration: 1000, easing: Easing.out(Easing.quad) }, () => {
      runOnJS(handleAnimationEnd)();
    });
  }

  if (!session) {
    return <Redirect href={'/sign-in'} />;
  }
  return (
    <>
      {loading && (
        <Animated.View style={[{ zIndex: 1, position: 'absolute', width: '100%', height: '100%' }, playMASAnimation]}>
          <LottieView
            autoPlay
            loop={false}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'white',
            }}
            source={require('@/assets/lottie/MASLogoAnimation3.json')}
            onAnimationFinish={() => {
              fadeOutAnimation();
            }}
          />
        </Animated.View>
      )}
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "white",
            height: 50,
            position: "absolute",
            bottom: 16,
            right: 16,
            left: 16,
            borderRadius: 16,
            marginBottom: 5,
            shadowColor: "black",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            shadowRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarItemStyle: { height: 30 }
        }}
      >
        <Tabs.Screen name="index" options={{ href: null }} />
        <Tabs.Screen name="tabArray" options={{ href: null }} />

        {TabArray.map((tab, i) => (
          <Tabs.Screen
            key={i}
            name={tab.name}
            options={{
              title: tab.title,
              headerShown: false,
              tabBarButton: (props) => <TabButton items={TabArray[i]} props={{ ...props }} />
            }}
          />
        ))}
      </Tabs>
      <Toast config={toastConfig}/>
    </>
  );
}
