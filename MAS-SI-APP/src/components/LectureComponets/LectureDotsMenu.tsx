import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { FAB, Portal, PaperProvider, Button, List } from 'react-native-paper';
import ContextMenu from "react-native-context-menu-view";

const LectureDotsMenu = () => {
  
    return (
        <ContextMenu
        actions={[{ title: "Title 1" }, { title: "Title 2" }]}
        onPress={(e) => {
          console.warn(
            `Pressed ${e.nativeEvent.name} at index ${e.nativeEvent.index}`
          );
        }}
      >
      </ContextMenu>
  )
}

export default LectureDotsMenu