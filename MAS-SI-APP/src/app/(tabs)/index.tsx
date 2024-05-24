import { Image, StyleSheet, View, Text } from 'react-native';
export default function HomeScreen() {
  return (
    <View style={styles.container} className='backgroundColor'>
      < Image source={require("../../../assets/images/massiLogo.png")} style={styles.massiLogo} />
      <Text className='text-2xl font-bold'>Hello World</Text>
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
