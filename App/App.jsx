import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import GradientBackground from './Components/GradientBackground';
import TabNavigator from './navigation/TabNavigator';

const App = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

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
          <TabNavigator
            achievements={achievements}
            loading={loading}
            handleQuery={handleQuery}
          />
        </NavigationContainer>
      </GradientBackground>
    </SafeAreaProvider>
  );
};

export default App;
