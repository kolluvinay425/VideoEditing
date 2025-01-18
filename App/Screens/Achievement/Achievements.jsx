import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import SearchBar from '../../Components/SearchBar';
import {useNavigation} from '@react-navigation/native';
import GradientBackground from '../../Components/GradientBackground';
import images from '../../themes/Images';

const {width} = Dimensions.get('window');

const Achievements = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'all', title: 'All'},
    {key: 'glorious_moments', title: 'Glorious Moments'},
    {key: 'matches', title: 'Matches'},
    {key: 'honor', title: 'Honor'},
    {key: 'progress', title: 'Progress'},
    {key: 'items', title: 'Items'},
    {key: 'social', title: 'Social'},
    {key: 'general', title: 'General'},
  ]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch(
          'http://localhost:3001/api/achievements/all',
        );
        const data = await response.json();
        setAchievements(data);
      } catch (error) {
        console.error('Error fetching achievements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const renderScene = ({route}) => {
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const filteredAchievements =
      route.key === 'all'
        ? achievements
        : achievements.filter(ach => ach.category === route.key);

    return (
      <FlatList
        data={filteredAchievements}
        keyExtractor={(item, index) => `${route.key}-${index}`}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ItemDetails', {item})}
            style={styles.itemContainer}>
            <Image
              source={images.achievement}
              style={{
                width: 60,
                height: 50,
              }}
            />
            <Text style={styles.itemText}>{item.name.en}</Text>
            <View style={styles.inlineContainer}>
              <Image source={images.pointsIcon} style={styles.inlineImage} />
              <Text style={styles.itemText}>{item.points}</Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={3}
      />
    );
  };

  const sceneMap = {};
  routes.forEach(route => {
    sceneMap[route.key] = renderScene;
  });

  return (
    <>
      <SearchBar />
      <GradientBackground>
        <TabView
          navigationState={{index, routes}}
          renderScene={SceneMap(sceneMap)}
          onIndexChange={setIndex}
          initialLayout={{width}}
          renderTabBar={props => (
            <TabBar
              {...props}
              scrollEnabled
              indicatorStyle={styles.indicator}
              style={styles.tabBar}
              labelStyle={styles.label}
              tabStyle={styles.tabStyle}
              activeColor="#ffffff"
              inactiveColor="#f0e9e9"
            />
          )}
        />
      </GradientBackground>
    </>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#363434',
  },
  indicator: {
    backgroundColor: '#e91e63',
  },
  label: {
    color: '#000',
    fontWeight: 'bold',
  },
  tabStyle: {
    width: 'auto',
    paddingHorizontal: 10,
  },
  itemContainer: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.3,
    borderColor: '#b09d21',
    padding: 10,
    margin: 10,
    aspectRatio: 1,
    backgroundColor: '#3c3939',
    overflow: 'hidden',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  itemText: {
    padding: 5,
    fontSize: 10,
    color: '#d5cece',
    fontWeight: 'bold',
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inlineImage: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
    marginLeft: 5,
  },
});

export default Achievements;
