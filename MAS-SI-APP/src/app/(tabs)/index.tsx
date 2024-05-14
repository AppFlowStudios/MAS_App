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
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    overflow: 'hidden',
    alignItems: "center",
  },
  masLogoBox: {
    width: 300,
    height: 100
  },
  massiLogo : {
    width: 200,
    height: 200,
    resizeMode: "contain",
    justifyContent: "center"
  }
});
