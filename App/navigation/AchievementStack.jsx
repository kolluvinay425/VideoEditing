import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Achievements from '../Screens/Achievement/Achievements';
import ItemDetails from '../Screens/Achievement/Detail/ItemDetails';

const Stack = createStackNavigator();

const CreateAchievementRoutes = ({
  achievements,
  loading,
  handleQuery,
  handleEndReached,
}) => {
  return (
    <Stack.Navigator initialRouteName="Achievements">
      <Stack.Screen name="Achievements" options={{headerShown: false}}>
        {props => (
          <Achievements
            {...props}
            achievements={achievements}
            handleQuery={handleQuery}
            loading={loading}
            handleEndReached={handleEndReached}
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
        })}
      />
    </Stack.Navigator>
  );
};

export default CreateAchievementRoutes;
