import { View, Text, Button } from 'react-native'
import React, {forwardRef, useMemo, useRef, } from 'react'
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import { JummahBottomSheetProp } from '../types';
type Ref = BottomSheetModal;
export const JummahBottomSheet = forwardRef<Ref, JummahBottomSheetProp>(({jummahSpeaker, jummahSpeakerImg, jummahTopic}, ref) => {
    const snapPoints = useMemo(() => ["25%", "50%"], []);
  return (
    <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}

    >
    <View>
        <Text>Khateeb: {jummahSpeaker}</Text>
    </View>
    </BottomSheetModal>
  )
}
)