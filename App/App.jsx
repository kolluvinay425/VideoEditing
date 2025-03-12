import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import GradientBackground from './Components/GradientBackground';
import TabNavigator from './navigation/TabNavigator';
import {AchievementContext} from './context/AchievementContext';

const App = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  const handleQuery = query => {
    setQuery(query);
  };

  useEffect(() => {
    console.log('Fetching achievements before mounting...');
    const fetchAchievements = async () => {
      try {
        const response = await fetch(
          `https://pubg-guides.onrender.com/api/achievements/all?name=${query}&limit=${limit}&`,
        );
        const data = await response.json();
        setAchievements(data.achievements);
        // setHasMore(data.length < data.count ? true : false);
      } catch (error) {
        console.error('Error fetching achievements:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, [query, limit]);

  const handleEndReached = () => {
    if (!loading) {
      setLimit(prevLimit => prevLimit + 10);
    }
  };

  return (
    <AchievementContext.Provider
      value={{
        achievements,
        loading,
        handleQuery,
        handleEndReached,
      }}>
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
              handleEndReached={handleEndReached}
            />
          </NavigationContainer>
        </GradientBackground>
      </SafeAreaProvider>
    </AchievementContext.Provider>
  );
};

export default App;
