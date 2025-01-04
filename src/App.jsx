import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Achievements from './components/Achievements';
import ItemDetails from './components/ItemDetails';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

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
      <Stack.Screen name="ItemDetails" component={ItemDetails} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Achievements"
          activeColor="#e91e63"
          labelStyle={{fontSize: 12}}
          style={{backgroundColor: 'tomato'}}
          barStyle={{backgroundColor: 'white'}}
          tabBarBackground={() => (
            <ImageBackground
              source={{
                uri: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
              }}
              style={styles.backgroundImage}
            />
          )}>
          <Tab.Screen name="Home">
            {() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>screen 1</Text>
              </View>
            )}
          </Tab.Screen>

          <Tab.Screen
            name="Achievements"
            component={CreateProject}
            options={{
              tabBarLabel: 'Achievements',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
              // tabBarBackground: () => (
              //   <ImageBackground
              //     source={{
              //       uri: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
              //     }}
              //     style={styles.backgroundImage}
              //   />
              // ),
            }}
          />

          <Tab.Screen name="Screen 2">
            {() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>screen 2</Text>
              </View>
            )}
          </Tab.Screen>

          <Tab.Screen name="Screen 3">
            {() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>screen 3</Text>
              </View>
            )}
          </Tab.Screen>

          <Tab.Screen name="Screen 4">
            {() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'red'}}>screen 4</Text>
              </View>
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default App;
