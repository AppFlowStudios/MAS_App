import { View, Text, Button } from 'react-native'
import React, {forwardRef, useCallback, useMemo, useRef, } from 'react'
import BottomSheet, { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { JummahBottomSheetProp } from '../types';
type Ref = BottomSheetModal;
export const JummahBottomSheet = forwardRef<Ref, JummahBottomSheetProp>(({jummahSpeaker, jummahSpeakerImg, jummahTopic}, ref) => {
    const snapPoints = useMemo(() => ["25%", "50%"], []);

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
    <View>
        <Text className='text-white'>Khateeb: {jummahSpeaker}</Text>
        <Text className='text-white'>Topic: {jummahTopic}</Text>
    </View>
    </BottomSheetModal>
  )
}
)