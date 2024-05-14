import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, Text, Button } from 'react-native';
import { Collapsible } from '../../components/Collapsible';
import { ExternalLink } from '../../components/ExternalLink';
import ParallaxScrollView from '../../components/ParallaxScrollView';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SaturdayLecs from './saturdayLecs';
const programsStack = createNativeStackNavigator();

export default function Programs( {navigation} : any ) {
  return (
    <View>
      <Button 
      title="Saturday Lectures" 
      onPress={() => navigation.navigate(SaturdayLecs)}
      />
    </View>
  )
};
