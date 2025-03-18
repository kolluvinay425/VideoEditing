import React, {useState, useEffect, useRef} from 'react';
import {View, Animated, Dimensions, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import GradientBackground from './Components/GradientBackground';
import TabNavigator from './navigation/TabNavigator';
import {AchievementContext} from './context/AchievementContext';
import FastImage from 'react-native-fast-image';

const {width} = Dimensions.get('window');

const App = () => {
  const [achievements, setAchievements] = useState([]);
  const [achievementsLimited, setAchievementsLimited] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(scrollX, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const handleQuery = newQuery => {
    setQuery(newQuery);
  };

  const fetchLimitedFieldsAchievements = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/achievements/all/limited?name=${''}&limit=${400}`,
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
          `http://localhost:3001/api/achievements/all?name=${query}&limit=${400}`,
        );
        const data = await response.json();

        setAchievements(data.achievements || []);
        setHasMore(data.achievements?.length < data.count);

        const limitedAFields = await fetchLimitedFieldsAchievements();
        if (limitedAFields?.achievements) {
          setAchievementsLimited(limitedAFields.achievements);
          setHasMore(
            limitedAFields.achievements?.length < limitedAFields.count,
          );
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

  // Animated image translation
  const translateX = scrollX.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -width * 0.2], // Adjust for a subtle pan effect
  });

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
          {!loading ? (
            <NavigationContainer>
              <TabNavigator />
            </NavigationContainer>
          ) : (
            <View style={styles.loadingContainer}>
              <Animated.View
                style={[
                  styles.animatedImageWrapper,
                  {transform: [{translateX}]},
                ]}>
                <FastImage
                  source={{
                    uri: 'https://img.redbull.com/images/c_crop,x_246,y_0,h_720,w_576/c_fill,w_450,h_600/q_auto:low,f_auto/redbullcom/2018/04/05/5648d866-1b90-48c4-a827-fe37e6f21788/pubg-mobile-header',
                  }} // 🟡 Replace with your PUBG-styled image
                  style={styles.loadingImage}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </Animated.View>
            </View>
          )}
        </GradientBackground>
      </SafeAreaProvider>
    </AchievementContext.Provider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedImageWrapper: {
    width: '120%',
    height: '100%',
  },
  loadingImage: {
    width: '100%',
    height: '100%',
  },
});

export default App;
