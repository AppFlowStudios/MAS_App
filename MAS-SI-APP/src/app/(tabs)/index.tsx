import { Image, StyleSheet, Platform, View } from 'react-native';

import { HelloWave } from '../../components/HelloWave';
import ParallaxScrollView from '../../components/ParallaxScrollView';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
export default function HomeScreen() {
  return (
    <View style={styles.container}> 

      < Image source={require("../../../assets/images/massiLogo.png")} style={styles.massiLogo} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent : "center",
    alignItems: 'center',
  },
  massiLogo : {
    position: "absolute",
    height : 100,
    width: 300,
    justifyContent : "center"
  }
});
