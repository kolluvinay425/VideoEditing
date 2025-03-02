import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Achievements from './Screens/Achievement/Achievements';
import ItemDetails from './Screens/Achievement/Detail/ItemDetails';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import GradientBackground from './Components/GradientBackground';
import SacredQuartetEvent from './Screens/Home/Event/Event';
import images from './themes/Images';
import EventDetails from './Screens/Home/Event/EventDetail/EventDetails';
import GuardianDetails from './Screens/Home/Event/EventDetail/ElemetalPowerDetail';
import EventLocations from './Screens/Home/Event/EventDetail/EventLocations';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function CreateAchievementRoutes({achievements, loading, handleQuery}) {
  return (
    <Stack.Navigator initialRouteName="Achievements">
      <Stack.Screen name="Achievements" options={{headerShown: false}}>
        {props => (
          <Achievements
            {...props}
            achievements={achievements}
            handleQuery={handleQuery}
            loading={loading}
          />
        )}
      </Stack.Screen>
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
          headerStyle: {backgroundColor: '#2a2a2a'},
          headerTintColor: '#e91e63',
          headerTitleStyle: {fontWeight: 'bold', fontSize: 20},
          headerTitle: '',
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

          headerStyle: {backgroundColor: '#2a2a2a'},
          headerTintColor: '#e91e63',
          headerTitleStyle: {fontWeight: 'bold', fontSize: 20},
          headerTitle: '', // Remove the title
        })}
      />
      <Stack.Screen
        name="GuardianDetails"
        component={GuardianDetails} // Home screen inside the event tab
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
            backgroundColor: '#2a2a2a',
          },
          headerTintColor: '#e91e63',
          headerTitleStyle: {fontWeight: 'bold', fontSize: 20},
          headerTitle: '', // Remove the title
        })}
      />
      <Stack.Screen
        name="EventLocations"
        component={EventLocations} // Home screen inside the event tab
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
            backgroundColor: '#2a2a2a',
          },
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
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  console.log('queryyyy---------__>', query);
  const handleQuery = query => {
    setQuery(query);
  };
  useEffect(() => {
    console.log('Fetching achievements before mounting...');
    const fetchAchievements = async () => {
      try {
        const response = await fetch(
          `https://pubg-guides.onrender.com/api/achievements/all?name=${query}`,
        );
        const data = await response.json();
        setAchievements(data.achievements);
      } catch (error) {
        console.error('Error fetching achievements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [query]);

  return (
    <SafeAreaProvider>
      <GradientBackground>
        <NavigationContainer>
          <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
            <GradientBackground />
          </View>
          <Tab.Navigator
            theme={{colors: {secondaryContainer: 'transparent'}}}
            initialRouteName="Home-Screen"
            activeColor="#e91e63"
            inactiveColor="#ffffff"
            barStyle={{
              backgroundColor: 'transparent',
              height: 80, // Reduce height (default is ~56)
              paddingBottom: 10,
              // paddingBottom: 5,
            }}>
            <Tab.Screen
              name="Home-Screen"
              component={CreateEventRoutes}
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
              options={{
                tabBarLabel: 'Achievements',
                tabBarIcon: ({color}) => (
                  <MaterialCommunityIcons
                    name="trophy"
                    color={color}
                    size={26}
                  />
                ),
              }}>
              {props => (
                <CreateAchievementRoutes
                  {...props}
                  achievements={achievements}
                  loading={loading}
                  handleQuery={handleQuery}
                />
              )}
            </Tab.Screen>
            <Tab.Screen
              name="Events-Screen"
              component={EventsScreen}
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
