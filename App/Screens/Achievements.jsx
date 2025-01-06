import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import SearchBar from '../Components/SearchBar';
import {useNavigation} from '@react-navigation/native';
import GradientBackground from '../Components/GradientBackground';

const icon = require('../../assets/icons/Frame4.png');
const iconA = require('../../assets/icons/points.png');

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

  const items = {
    all: [
      'Overachiever',
      'Chicken master',
      'On a Mission',
      'Weapon Master',
      'Pacifist',
      'Well Liked',
      'Unique Destiny',
      'Commando',
      'Dead Eye',
      'Overachiever',
      'Chicken master',
      'On a Mission',
      'Weapon Master',
      'Pacifist',
      'Well Liked',
      'Unique Destiny',
      'Commando',
      'Dead Eye',
    ],
    glorious_moments: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
      'Item 5',
      'Item 6',
      'Item 7',
      'Item 8',
      'Item 9',
    ],
    matches: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
      'Item 5',
      'Item 6',
      'Item 7',
      'Item 8',
      'Item 9',
    ],
    honor: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
      'Item 5',
      'Item 6',
      'Item 7',
      'Item 8',
      'Item 9',
    ],
    progress: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
      'Item 5',
      'Item 6',
      'Item 7',
      'Item 8',
      'Item 9',
    ],
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
      'Item 5',
      'Item 6',
      'Item 7',
      'Item 8',
      'Item 9',
    ],
    social: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
      'Item 5',
      'Item 6',
      'Item 7',
      'Item 8',
      'Item 9',
    ],
    general: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
      'Item 5',
      'Item 6',
      'Item 7',
      'Item 8',
      'Item 9',
    ],
  };

  const navigation = useNavigation();

  const renderScene = ({route}) => (
    <FlatList
      data={items[route.key]}
      keyExtractor={(item, index) => `${route.key}-${index}`}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('ItemDetails', {item})}
          style={styles.itemContainer}>
          <Image
            source={icon}
            style={{
              width: 60,
              height: 50,
            }}
          />
          <Text style={styles.itemText}>{item}</Text>
          <View style={styles.inlineContainer}>
            <Image source={iconA} style={styles.inlineImage} />
            <Text style={styles.itemText}>60</Text>
          </View>
        </TouchableOpacity>
      )}
      numColumns={3}
    />
  );

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
              tabStyle={styles.tabStyle} // Added tabStyle to control spacing
              activeColor="#e5e5ef" // Active tab text color (blue)
              inactiveColor="#a79f9f" // Inactive tab text color (black)
            />
          )}
        />
      </GradientBackground>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {flex: 1},
  tabBar: {
    backgroundColor: '#363434',
  },
  indicator: {
    backgroundColor: '#a5a5bb',
  },
  label: {
    color: '#000',
    fontWeight: 'bold',
  },
  tabStyle: {
    width: 'auto', // Adjust tab width to auto
    paddingHorizontal: 10, // Adjust padding to control spacing
  },
  itemContainer: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.3,
    borderColor: '#b09d21',
    padding: 10,
    margin: 10,
    // backgroundColor: 'transparent',
    // borderRadius: 5,

    aspectRatio: 1,
    backgroundColor: '#3c3939',
    overflow: 'hidden',
    padding: 5,
    borderRadius: 5,
    position: 'relative', // Add shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2, // Add elevation for Android
    elevation: 5,
  },
  itemText: {
    padding: 5,
    fontSize: 10,
    color: '#d5cece',
    fontWeight: 'bold',
    fontFamily: 'italic',
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
