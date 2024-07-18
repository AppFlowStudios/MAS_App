import { View, Text , useWindowDimensions} from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view';
import React, { useState } from 'react'

const Ayah = () => {
    return(
        <View></View>
    )
}
  
  const Surah = () => {
    return(
        <View></View>
    )
  }
  
  const renderScene = SceneMap({
    first: Ayah,
    second: Surah,
  });

const FavoriteQuran = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Ayah' },
    { key: 'second', title: 'Surah' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

export default FavoriteQuran