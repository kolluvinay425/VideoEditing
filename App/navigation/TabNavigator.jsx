import React from 'react';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CreateEventRoutes from './EventStack';
import CreateAchievementRoutes from './AchievementStack';
import EventsScreen from '../Screens/EventScreen';
import images from '../themes/Images';

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      theme={{colors: {secondaryContainer: 'transparent'}}}
      initialRouteName="Home-Screen"
      activeColor="#e91e63"
      inactiveColor="#ffffff"
      barStyle={{
        backgroundColor: 'transparent',
        height: 80,
        paddingBottom: 10,
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
            <MaterialCommunityIcons name="trophy" color={color} size={26} />
          ),
        }}>
        {props => <CreateAchievementRoutes {...props} />}
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
  );
};

export default TabNavigator;
