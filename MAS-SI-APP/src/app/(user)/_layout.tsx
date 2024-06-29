import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from "expo-router";
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity, View } from "react-native"
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

const TabButton = (props : any) => {
  const { item, onPress } = props;
  return(
    <TouchableOpacity>
      <TabBarIcon name="ellipsis-h" color="grey"/>
    </TouchableOpacity>
  )
}
export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarStyle : { height: 50, position: "absolute",bottom: 13, right: 16, left: 16, borderRadius: 16, marginBottom: 5, },
      tabBarItemStyle: { height: 44}
    }}
    
    >

      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home" color={color} />
          ),
        }}
      />

      <Tabs.Screen 
        name="myPrograms"
        options={ {
          title: "My Library",
          headerShown:  false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='book' color={color} />
          ),
        }}
        />

      <Tabs.Screen 
        name="prayersTable"
        options={ {
          title: "Prayer Times",
          headerShown: false,
          tabBarIcon: ( {color} ) =>(
            <TabBarIcon name="clock-o" color={color} />
          )
        }}
      />

<Tabs.Screen 
        name="more"
        options={ {
          title: "More",
          headerShown: false,
          tabBarIcon: ( {color} ) =>(
            <TabBarIcon name="ellipsis-h" color={color} />
          ),
          tabBarButton : (props) => <TabButton {...props}/>
        }}
      />
    </Tabs>
  );
}
