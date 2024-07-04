import { View, Image } from 'react-native';
import React, {forwardRef, useCallback, useEffect, useMemo, useRef, useState, } from 'react'
import BottomSheet, { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { SheikDataType } from '../types';
import { JummahBottomSheetProp } from '../types';
import SheikData from "@/assets/data/sheikData";
import { Modal, Portal, Text, Button, PaperProvider, Icon, Divider } from 'react-native-paper';
import { defaultProgramImage } from './ProgramsListProgram';

type Ref = BottomSheetModal;

export const JummahBottomSheet = forwardRef<Ref, JummahBottomSheetProp>(({jummahSpeaker, jummahSpeakerImg, jummahTopic, jummahDesc, jummahNum}, ref) => {
    const snapPoints = useMemo(() => ["25%", "50%"], []);
    const [ visible, setVisible ] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const GetSheikData = () => {
      const sheik : SheikDataType[]  = SheikData.filter(sheik => sheik.name == jummahSpeaker)
      return( 
        <View>
          <View className=' flex-row'>
            <Image source={{uri : sheik[0].image || defaultProgramImage}} style={{width: 110, height: 110, borderRadius: 50}}/>
            <View className='flex-col px-5'>
              <Text variant='headlineSmall' >Name: </Text>
              <Text variant='titleMedium' className='pt-2'> {sheik[0].name} </Text>
            </View>
          </View>

          <View className='flex-col py-3'>
            <Text variant='titleLarge' >Credentials: </Text>
            {sheik[0].creds.map( (cred, i) => {
              return <Text key={i}> <Icon source="cards-diamond-outline"  size={15}/> {cred} </Text>
            })}
          </View>
        </View>
      )
    } 


    const renderBackDrop = useCallback( (props : any ) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props}/> , [])
  return (
    <BottomSheetModal
        ref={ref}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={{backgroundColor: "#0D509D"}}
        handleIndicatorStyle={{backgroundColor: "white"}}
        backdropComponent={renderBackDrop}
    >
    <View className='ml-2'>
        <Text variant="headlineMedium" style={{textAlign: "center", color : "white", fontWeight : "bold"}}>{jummahNum} Prayer</Text>
        <View className='flex-row'>
          <Text className='text-white font-bold text-2xl pr-[20%]'>Topic:</Text>
          <Text className='text-3xl text-white'>{jummahTopic}</Text>
        </View>
        <Divider style={{width : "90%", alignSelf: "center"}}/>
        <View>
         <Text className='font-semi text-2xl text-white'>Description:</Text> 
         <Text className='text-lg text-white'>{jummahDesc}</Text>
        </View>
        <View className='flex-row'>
          <Text><Text className='font-bold text-white text-2xl'>Speaker:</Text> </Text>
          <Button onPress={showModal} style={{cursor: "pointer"}} > <Text variant='titleMedium' style={{color : "blue", textDecorationLine: "underline"}}>{jummahSpeaker}</Text> </Button>
        </View>
        <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{backgroundColor: 'white', padding: 20, height: "35%", width: "90%", borderRadius: 35, alignSelf: "center"}} >
          <GetSheikData />
        </Modal>
      </Portal>
    </View>
    </BottomSheetModal>
  )
}
)