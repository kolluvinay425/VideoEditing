import React, {useEffect} from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider, useDispatch, useSelector} from 'react-redux'; // Import from react-redux
import store from './store'; // Correct path to your store
import GradientBackground from './Components/GradientBackground';
import TabNavigator from './navigation/TabNavigator';
import {fetchAchievements} from './actions/achievementActions'; // Ensure correct import

const categories = [
  'all',
  'glorious_moments',
  'matches',
  'honor',
  'progress',
  'items',
  'social',
  'general',
]; // Update categories as needed

const App = () => {
  const dispatch = useDispatch();
  const achievementsData = useSelector(state => state.achievements.data);
  const loading = useSelector(state => state.achievements.loading);

  useEffect(() => {
    categories.forEach(category => {
      dispatch(fetchAchievements(category, 10)); // Fetch with limit 10 for each category
    });
  }, [dispatch]);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GradientBackground>
          <NavigationContainer>
            <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
              <GradientBackground />
            </View>
            <TabNavigator
              achievementsData={achievementsData}
              loading={loading}
            />
          </NavigationContainer>
        </GradientBackground>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
