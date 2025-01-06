import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Achievements from './Screens/Achievements';
import ItemDetails from './Screens/ItemDetails';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import GradientBackground from './Components/GradientBackground';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function CreateProject() {
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

function HomeScreen() {
  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={{color: 'white'}}>screen 1</Text>
      </View>
    </GradientBackground>
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
            initialRouteName="Achievements-Screen"
            activeColor="#e91e63"
            inactiveColor="#ffffff"
            shifting={false} // Add this line to disable background color change
            barStyle={{backgroundColor: '#3a3839'}}>
            <Tab.Screen
              name="Home Screen"
              options={{
                tabBarLabel: 'Home Screen',
                tabBarIcon: ({color}) => (
                  <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
              }}>
              {() => <HomeScreen />}
            </Tab.Screen>

            <Tab.Screen
              name="Achievements-Screen"
              component={CreateProject}
              options={{
                tabBarLabel: 'Achievements-Screen',
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
              name="Events Screen"
              options={{
                tabBarLabel: 'Events Screen',
                tabBarIcon: ({color}) => (
                  <MaterialCommunityIcons
                    name="calendar"
                    color={color}
                    size={26}
                  />
                ),
              }}>
              {() => <EventsScreen />}
            </Tab.Screen>
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
