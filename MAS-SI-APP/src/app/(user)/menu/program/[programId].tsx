import { View, Text, Pressable, FlatList, Image, TouchableOpacity, Dimensions, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, Stack, router } from 'expo-router';
import programsData from '@/assets/data/programsData';
import LecturesListLecture from '@/src/components/LectureListLecture';
import { defaultProgramImage }  from '@/src/components/ProgramsListProgram';
import { Divider, Portal, Modal, IconButton, Icon, Button } from 'react-native-paper';
import SheikData from "@/assets/data/sheikData";
import { Lectures, SheikDataType, Program } from '@/src/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Animated,{ interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import { supabase } from '@/src/lib/supabase';
import { useAuth } from '@/src/providers/AuthProvider';
import { UserPlaylistType } from '@/src/types';
import RenderAddToUserPlaylistsListProgram from '@/src/components/RenderAddToUserPlaylistsList';
const programLectures = () => {
  const { session } = useAuth()
  const { programId } = useLocalSearchParams();
  const [ lectures, setLectures ] = useState<Lectures[] | null>(null)
  const [ program, setProgram ] = useState<Program>()
  const [ visible, setVisible ] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [ addToPlaylistVisible, setAddToPlaylistVisible ] = useState(false)
  const [ lectureToBeAddedToPlaylist, setLectureToBeAddedToPlaylist ] = useState<string>("")
  const [ playAnimation , setPlayAnimation ] = useState( false )
  const [ lectureInfoAnimation, setLectureInfoAnimation ] = useState<Lectures>()
  const [ usersPlaylists, setUsersPlaylists ] = useState<UserPlaylistType[]>()
  const hideAddToPlaylist = () => setAddToPlaylistVisible(false)

  const Tab = useBottomTabBarHeight()
  const { width } = Dimensions.get("window")
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOffset = useScrollViewOffset(scrollRef)
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return{
      transform: [
        {
          translateY : interpolate(
          scrollOffset.value,
          [-250, 0, 250 ],
          [-250/2, 0, 250 * 0.75]
          )
        },
        {
          scale: interpolate(scrollOffset.value, [-250, 0, 250], [2, 1, 1])
        }
      ]
    }
  })
 async function getProgram(){
  const { data, error } = await supabase.from("programs").select("*").eq("program_id", programId).single()
  if( error ) {
    alert(error)
  }
  if ( data ) {
    setProgram(data)
  }
 }
 async function getProgramLectures() {
  const { data, error } = await supabase.from("program_lectures").select("*").eq("lecture_program", programId)
  if( error ) {
    alert(error)
  }
  if ( data ) {
    setLectures(data)
  }
}

  useEffect(() => {
    getProgram()
    getProgramLectures()
  }, [session])

  const GetSheikData = () => {
    const sheik : SheikDataType[]  = SheikData.filter(sheik => sheik.name == program?.program_speaker)
    return( 
      <View>
        <View className=' flex-row'>
          <Image source={{uri : sheik[0].image || defaultProgramImage}} style={{width: 110, height: 110, borderRadius: 50}} resizeMode='contain'/>
          <View className='flex-col px-5'>
            <Text className='text-xl font-bold'>Name: </Text>
            <Text className='pt-2 font-semibold'> {sheik[0].name} </Text>
          </View>
        </View>
  
        <View className='flex-col py-3'>
          { sheik[0].name == "MAS" ? <Text className='font-bold'>Impact </Text> :  <Text className='font-bold'>Credentials: </Text> } 
          { sheik[0].creds.map( (cred, i) => {
            return <Text key={i}> <Icon source="cards-diamond-outline"  size={15}/> {cred} </Text>
          })}
        </View>
      </View>
    )
  } 

  return (
    <View className='flex-1 bg-white' style={{flexGrow: 1}}>
     <Stack.Screen options={ { title: "" , headerBackTitleVisible : false } }  />
      <Animated.ScrollView ref={scrollRef}  scrollEventThrottle={16} contentContainerStyle={{justifyContent: "center", alignItems: "center", marginTop: "2%" }} >
          
          <Animated.Image 
            source={ { uri: program?.program_img || defaultProgramImage }}
            style={ [{width: width / 1.2, height: 300, borderRadius: 8 }, imageAnimatedStyle] }
            resizeMode='stretch'
          />

          <View className='bg-white' style={{paddingBottom : Tab * 3}}>
            <Text className='text-center mt-2 text-xl text-black font-bold'>{program?.program_name}</Text>
            <Text className='text-center mt-2  text-[#0D509D]' onPress={showModal}>{program?.program_speaker}</Text>
              <View className='ml-3'>
                {
                  lectures ? lectures.map((item, index) => {
                    return(
                      <View key={index}>
                      <LecturesListLecture  lecture={item} index={index} speaker={program?.program_speaker}/>
                      <Divider style={{width: "95%", marginLeft: 8}}/>
                      </View>
                    )
                  }) : <></>
                }
              </View>
          </View>

          <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{backgroundColor: 'white', padding: 20, height: "35%", width: "90%", borderRadius: 35, alignSelf: "center"}} >
              <GetSheikData />
            </Modal>
          </Portal>
          <Portal>
            <Modal visible={addToPlaylistVisible} onDismiss={hideAddToPlaylist} contentContainerStyle={{backgroundColor: 'white', padding: 20, height: "50%", width: "90%", borderRadius: 35, alignSelf: "center"}} >
              <ScrollView>
                  { usersPlaylists ? usersPlaylists.map(( item, index) => {
                    return( <RenderAddToUserPlaylistsListProgram playlist={item} lectureToBeAdded={lectureToBeAddedToPlaylist} setAddToPlaylistVisible={setAddToPlaylistVisible}/>)
                  })
                  :( 
                  <View className=' items-center justify-center '> 
                      <Text> No User Playlists Yet </Text>
                  </View>
                  )
                }
              </ScrollView>
            </Modal>
        </Portal>
      </Animated.ScrollView>
      </View>
  )
}


const styles={
  programImageStyle: "h-200 w-300"
}
export default programLectures