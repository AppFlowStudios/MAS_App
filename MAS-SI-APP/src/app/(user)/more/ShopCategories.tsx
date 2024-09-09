import { View, Text, useWindowDimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Icon } from 'react-native-paper';
import { Program } from '@/src/types';
import { supabase } from '@/src/lib/supabase';
import ShopProgramFliers from '@/src/components/ShopComponets/ShopProgramFliers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const SportsPaid = () => {
    const [ paidPrograms, setPaidPrograms ] = useState<Program[]>()
    const width = useWindowDimensions().width
    const getAllPaid = async () => {
        const { data, error } = await supabase.from("programs").select("*").eq("program_is_paid", true).eq('is_sport', true)
        if( data ){
            setPaidPrograms(data)
        }
    }
    useEffect(() => {
        getAllPaid()
    }, [])
    return(
        <View style={{ width : width, flexWrap : "wrap", flexDirection : 'row' }}>
            {
                paidPrograms ? paidPrograms.map((item, index) => {
                    return(
                        <ShopProgramFliers width={width} program_id={item.program_id} img={item.program_img} key={index}/>
                    )
                }) : <></>
            }
        </View>
    )
}

const KidsPaid = () => {
    const [ kidsPrograms, setKidsPrograms ] = useState<Program[]>()
    const width = useWindowDimensions().width
    const getKidsPrograms = async () => {
        const { data, error } = await supabase.from("programs").select("*").eq("is_kids", true).eq("program_is_paid", true)
        if( data ){
            setKidsPrograms(data)
        }
    }
   
    useEffect(() => {
        getKidsPrograms()
    }, [])

    return(
        <View style={{ width : width, flexWrap : "wrap", flexDirection : 'row' }}>
            {
                kidsPrograms ? kidsPrograms.map((item, index) => {
                  
                    return(
                        <ShopProgramFliers width={width} program_id={item.program_id} img={item.program_img} key={index}/>
                    )
                }) : <></>
            }
        </View>
    )
}

const EducationPaid = () => {
    const [ educationProgram, setEducationProgram ] = useState<Program[]>()
    const width = useWindowDimensions().width
    const getEducationPrograms = async () => {
        const { data, error } = await supabase.from("programs").select("*").eq("program_is_paid", true).eq("is_education", true)
        if( data ){
            setEducationProgram(data)
        }
    }

    useEffect(() => {
        getEducationPrograms()
    })
    return(
        <View style={{ width : width, flexWrap : "wrap", flexDirection : 'row' }}>
            {
                educationProgram ? educationProgram.map((item, index) => {
                    return(
                        <ShopProgramFliers width={width} program_id={item.program_id} img={item.program_img} key={index}/>
                    )
                }) : <></>
            }
        </View>
    )
}

const TeenPaid = () => {
    const [ teensProgram, setTeensProgram ] = useState<Program[]>()
    const width = useWindowDimensions().width
    const getTeensProgram = async () => {
        const { data, error } = await supabase.from("programs").select("*").eq("program_is_paid", true).eq("is_fourteen_plus", true)
        if( data ){
            setTeensProgram(data)
        }
    }

    useEffect(() => {
        getTeensProgram()
    })
    return(
        <View style={{ width : width, flexWrap : "wrap", flexDirection : 'row' }}>
            {
                teensProgram ? teensProgram.map((item, index) => {
                    return(
                        <ShopProgramFliers width={width} program_id={item.program_id} img={item.program_img} key={index}/>
                    )
                }) : <></>
            }
        </View>
    )
}
const ShopCategories = () => {
    const spin = useSharedValue(0)
    const flip = useAnimatedStyle(() => {
        const spinVal = interpolate(spin.value, [0, 1], [0, 360])
        return{
        transform: [
            {
            rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
            },
        ],
        }
    })
    const getTabBarIcon = (props : any) => {
        const {route} = props
        const { focused } = props
          if (route.key === 'first') {
            if( focused ){
                spin.value = spin.value ? 0 : 1
                return (
                    <Animated.Image 
                        source={require('@/assets/images/MasShopCategorie/sports.png')}
                        style={[{ width : 75, height : 75, borderRadius : 50}, flip]}
                    />
                )
            }else{
                return (
                    <Image 
                        source={require('@/assets/images/MasShopCategorie/sports.png')}
                        style={{ width : 75, height : 75, borderRadius : 50}}
                     />
                ) 
            }
          } else if( route.key === 'second') {
            if( focused ){
                spin.value = spin.value ? 0 : 1
                return (
                    <Animated.Image 
                        source={require('@/assets/images/MasShopCategorie/kids.png')}
                        style={[{ width : 75, height : 75, borderRadius : 50}, flip]}
                    />
                )
            }else{
                return (
                    <Image 
                        source={require('@/assets/images/MasShopCategorie/kids.png')}
                        style={{ width : 75, height : 75, borderRadius : 50}}
                    />
                ) 
            }
          }else if( route.key == "third") {
            if( focused ){
                spin.value = spin.value ? 0 : 1
                return (
                    <Animated.Image 
                        source={require('@/assets/images/MasShopCategorie/education.png')}
                        style={[{ width : 75, height : 75, borderRadius : 50}, flip]}
                    />
                )
            }else{
                return (
                    <Image 
                        source={require('@/assets/images/MasShopCategorie/education.png')}
                        style={{ width : 75, height : 75, borderRadius : 50}}
                    />
                ) 
            }
          }
          else{
            if( focused ){
                spin.value = spin.value ? 0 : 1
                return (
                    <Animated.Image 
                        source={require('@/assets/images/MasShopCategorie/16+.png')}
                        style={[{ width : 75, height : 75, borderRadius : 50}, flip]}
                    />
                )
            }else{
                return (
                    <Image 
                        source={require('@/assets/images/MasShopCategorie/16+.png')}
                        style={{ width : 75, height : 75, borderRadius : 50}}
                    />
                ) 
            }
          }
    }

    const layout  = useWindowDimensions().width
    const [index, setIndex] = useState(0)
    const renderScene = SceneMap({
        first: SportsPaid,
        second: KidsPaid,
        third : EducationPaid,
        fourth : TeenPaid
      });
      
      const routes = [
        { key: 'first', title: 'Sports' },
        { key: 'second', title: 'Kids' },
        { key: "third", title : "Education"} ,
        {key : "fourth", title: "16 +"}
      ];
      
      const renderTabBar = (props : any) => (
        
        <TabBar
          {...props}
          style={{ alignSelf : "center", width : layout , backgroundColor: 'rgba(0 ,0, 0, 0)' }}
          labelStyle={{ color : "black", fontWeight : "bold" , alignItems : "center", justifyContent  : 'center', paddingTop : 3 }}
          renderIcon={(props) => getTabBarIcon(props)}
          tabStyle={{ flexDirection : 'col', alignItems : 'center', backgroundColor : "white" }}
          indicatorStyle={{ backgroundColor: 'rgba(0 ,0, 0, 0)' }}
          activeColor='#57BA47'
          scrollEnabled={true}
          gap={0}
          bounces
        />
      );

  return (
    <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout }}
        renderTabBar={renderTabBar}
        swipeEnabled={false}
    />
  )
}

export default ShopCategories