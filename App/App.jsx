import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Achievements from './Screens/Achievement/Achievements';
import ItemDetails from './Screens/Achievement/Detail/ItemDetails';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import GradientBackground from './Components/GradientBackground';
import SacredQuartetEvent from './Screens/Home/Event';
import images from './themes/Images';
import EventDetails from './Screens/Home/EventDetails';
import GuardianDetails from './Screens/Home/Guardian';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function Create() {
  return (
    <Stack.Navigator initialRouteName="Achievements">
      <Stack.Screen
        name="Achievements"
        component={Achievements}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ItemDetails"
        component={ItemDetails}
        options={({navigation}) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color="#e91e63"
                style={{marginLeft: 10}}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => alert('Favorites clicked!')}>
              <MaterialCommunityIcons
                name="heart"
                size={24}
                color="#e91e63"
                style={{marginRight: 10}}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#ebe1e1',
            height: 190, // Adjust this value to set the desired header height
          },
          headerStyle: {backgroundColor: '#302D2D'},
          headerTintColor: '#e91e63',
          headerTitleStyle: {fontWeight: 'bold', fontSize: 20},
          headerTitle: '', // Remove the title
        })}
      />
    </Stack.Navigator>
  );
}
function CreateEventRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EventHome"
        component={HomeScreen} // Home screen inside the event tab
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EventDetails"
        component={EventDetails} // TabView for details
        options={({navigation}) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color="#e91e63"
                style={{marginLeft: 10}}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => alert('Favorites clicked!')}>
              <MaterialCommunityIcons
                name="heart"
                size={24}
                color="#e91e63"
                style={{marginRight: 10}}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#ebe1e1',
            height: 190, // Adjust this value to set the desired header height
          },
          headerStyle: {backgroundColor: '#302D2D'},
          headerTintColor: '#e91e63',
          headerTitleStyle: {fontWeight: 'bold', fontSize: 20},
          headerTitle: '', // Remove the title
        })}
      />
      <Stack.Screen
        name="GuardianDetails"
        component={GuardianDetails} // Home screen inside the event tab
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function HomeScreen() {
  return (
    <>
      <SacredQuartetEvent />
    </>
  );
}

function EventsScreen() {
  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={{color: 'white'}}>screen 2</Text>
      </View>
    </GradientBackground>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <GradientBackground>
        <NavigationContainer>
          <Tab.Navigator
            theme={{colors: {secondaryContainer: 'transparent'}}}
            initialRouteName="Home-Screen"
            activeColor="#e91e63"
            inactiveColor="#ffffff"
            barStyle={{backgroundColor: '#3a3839'}}>
            <Tab.Screen
              name="Home-Screen"
              component={CreateEventRoutes} // Correctly use component here
              options={{
                tabBarLabel: 'Event',
                tabBarIcon: ({color}) => (
                  <Image
                    source={images.event}
                    style={{width: 26, height: 26, tintColor: color}}
                  />
                ),
              }}
            />

            <Tab.Screen
              name="Achievements-Screen"
              component={Create}
              options={{
                tabBarLabel: 'Achievements',
                tabBarIcon: ({color}) => (
                  <MaterialCommunityIcons
                    name="trophy"
                    color={color}
                    size={26}
                  />
                ),
              }}
            />

            <Tab.Screen
              name="Events-Screen"
              options={{
                tabBarLabel: 'Tracker',
                tabBarIcon: ({color}) => (
                  <MaterialCommunityIcons
                    name="arrow-right-bold-circle-outline"
                    color={color}
                    size={26}
                  />
                ),
              }}
              component={EventsScreen} // Correctly use component here as well
            />
          </Tab.Navigator>
        </NavigationContainer>
      </GradientBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  gradient: {flex: 1},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
