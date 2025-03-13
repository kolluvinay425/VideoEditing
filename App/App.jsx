import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import GradientBackground from './Components/GradientBackground';
import TabNavigator from './navigation/TabNavigator';
import {AchievementContext} from './context/AchievementContext';

const App = () => {
  const [achievements, setAchievements] = useState([]);
  const [achievementsLimited, setAchievementsLimited] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  const handleQuery = newQuery => {
    setQuery(newQuery);
  };

  const fetchLimitedFieldsAchievements = async () => {
    try {
      const response = await fetch(
        `https://pubg-guides.onrender.com/api/achievements/all/limited?limit=${400}`,
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching limited achievements:', error);
      return null;
    }
  };

  useEffect(() => {
    console.log('Fetching achievements...');
    const fetchAchievements = async () => {
      try {
        const response = await fetch(
          `https://pubg-guides.onrender.com/api/achievements/all?name=${query}&limit=${limit}`,
        );
        const data = await response.json();

        setAchievements(data.achievements || []);
        setHasMore(data.achievements?.length < data.count); // Ensure `data.count` exists

        const limitedAFields = await fetchLimitedFieldsAchievements();
        if (limitedAFields?.achievements) {
          setAchievementsLimited(limitedAFields.achievements);
          setHasMore(
            limitedAFields.achievements?.length < limitedAFields.count,
          ); // Ensure `data.count` exists
        }
      } catch (error) {
        console.error('Error fetching achievements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [query, limit]);

  const handleEndReached = () => {
    if (!loading && hasMore) {
      setLimit(prevLimit => prevLimit + 10);
    }
  };

  return (
    <AchievementContext.Provider
      value={{
        achievements,
        achievementsLimited,
        loading,
        handleQuery,
        handleEndReached,
      }}>
      <SafeAreaProvider>
        <GradientBackground>
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </GradientBackground>
      </SafeAreaProvider>
    </AchievementContext.Provider>
  );
};

export default App;
