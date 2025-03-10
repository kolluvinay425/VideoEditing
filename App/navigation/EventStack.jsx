import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SacredQuartetEvent from '../Screens/Home/Event/Event';
import EventDetails from '../Screens/Home/Event/EventDetail/EventDetails';
import GuardianDetails from '../Screens/Home/Event/EventDetail/ElemetalPowerDetail';
import EventLocations from '../Screens/Home/Event/EventDetail/EventLocations';

const Stack = createStackNavigator();

const CreateEventRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EventHome"
        component={SacredQuartetEvent}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EventDetails"
        component={EventDetails}
        options={({navigation}) => screenOptions(navigation)}
      />
      <Stack.Screen
        name="GuardianDetails"
        component={GuardianDetails}
        options={({navigation}) => screenOptions(navigation)}
      />
      <Stack.Screen
        name="EventLocations"
        component={EventLocations}
        options={({navigation}) => screenOptions(navigation)}
      />
    </Stack.Navigator>
  );
};

const screenOptions = navigation => ({
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <MaterialCommunityIcons
        name="arrow-left"
        size={35}
        color="#e91e63"
        style={{marginLeft: 10}}
      />
    </TouchableOpacity>
  ),
  headerRight: () => (
    <TouchableOpacity onPress={() => alert('Favorites clicked!')}>
      <MaterialCommunityIcons
        name="heart"
        size={28}
        color="#e91e63"
        style={{marginRight: 10}}
      />
    </TouchableOpacity>
  ),
  headerStyle: {backgroundColor: '#2a2a2a'},
  headerTintColor: '#e91e63',
  headerTitleStyle: {fontWeight: 'bold', fontSize: 20},
  headerTitle: '',
});

export default CreateEventRoutes;
