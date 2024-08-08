import { View, Text, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Icon } from 'react-native-paper';
import { Program } from '@/src/types';
import { supabase } from '@/src/lib/supabase';
import ShopProgramFliers from '@/src/components/ShopComponets/ShopProgramFliers';

const AllPaid = () => {
    const [ paidPrograms, setPaidPrograms ] = useState<Program[]>()
    const width = useWindowDimensions().width
    const getAllPaid = async () => {
        const { data, error } = await supabase.from("programs").select("*").eq("program_is_paid", true)
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
    const iconsArray = [ "collapse-all-outline", "human-male-female-child", "book-outline", "account-arrow-up-outline" ]
    const getTabBarIcon = (props : any) => {
        const {route} = props
        const { focused } = props
          if (route.key === 'first') {
            if( focused ){
                return (
                    <View className='bg-gray-300 p-1 rounded-lg'>
                     <Icon source={iconsArray[0]} size={25} color={'#57BA47'}/>
                   </View>
                )
            }else{
                return (
                    <View className='bg-gray-300 p-1 rounded-lg'>
                     <Icon source={iconsArray[0]} size={25} color={'black'}/>
                   </View>
                ) 
            }
          } else if( route.key === 'second') {
            if( focused ){
                return (
                    <View className='bg-gray-300 p-1 rounded-lg'>
                     <Icon source={iconsArray[1]} size={25} color={'#57BA47'}/>
                   </View>
                )
            }else{
                return (
                    <View className='bg-gray-300 p-1 rounded-lg'>
                     <Icon source={iconsArray[1]} size={25} color={'black'}/>
                   </View>
                ) 
            }
          }else if( route.key == "third") {
            if( focused ){
                return (
                    <View className='bg-gray-300 p-1 rounded-lg'>
                     <Icon source={iconsArray[2]} size={25} color={'#57BA47'}/>
                   </View>
                )
            }else{
                return (
                    <View className='bg-gray-300 p-1 rounded-lg'>
                     <Icon source={iconsArray[2]} size={25} color={'black'}/>
                   </View>
                ) 
            }
          }
          else{
            if( focused ){
                return (
                    <View className='bg-gray-300 p-1 rounded-lg'>
                     <Icon source={iconsArray[3]} size={25} color={'#57BA47'}/>
                   </View>
                )
            }else{
                return (
                    <View className='bg-gray-300 p-1 rounded-lg'>
                     <Icon source={iconsArray[3]} size={25} color={'black'}/>
                   </View>
                ) 
            }
          }
    }

    const layout  = useWindowDimensions().width
    const [index, setIndex] = useState(0)
    const renderScene = SceneMap({
        first: AllPaid,
        second: KidsPaid,
        third : EducationPaid,
        fourth : TeenPaid
      });
      
      const routes = [
        { key: 'first', title: 'All' },
        { key: 'second', title: 'Kids' },
        { key: "third", title : "Education"} ,
        {key : "fourth", title: "14 +"}
      ];
      
      const renderTabBar = (props : any) => (
        
        <TabBar
          {...props}
          style={{ alignSelf : "center", width : layout, backgroundColor: 'rgba(0 ,0, 0, 0)' }}
          labelStyle={{ color : "black", fontWeight : "bold" , alignItems : "center", justifyContent  : 'center' }}
          renderIcon={(props) => getTabBarIcon(props)}
          tabStyle={{ flexDirection : 'row', alignItems : 'center', backgroundColor : "white", padding : 2, borderRadius  : 10, justifyContent : "space-evenly", paddingHorizontal : 25 }}
          contentContainerStyle={{ paddingHorizontal : 5 }}
          indicatorStyle={{ backgroundColor: 'rgba(0 ,0, 0, 0)' }}
          activeColor='#57BA47'
          scrollEnabled={true}
          gap={20}
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