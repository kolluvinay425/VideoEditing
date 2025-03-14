import React, {useState, useEffect, useRef, useCallback, memo} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import SearchBar from './SearchBar';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import TabScene from './TabScene';
import LanguageSwitcher from './LanguageSwitcher';
import {useAchievement} from '../context/AchievementContext';
import {useCollapsibleTabScroll} from './useCollapsibleTabScroll';
import CollapsibleTabBar from './CollapsibleTabBar';

const TabBarHeight = 50;
const HeaderHeight = 300;

const TabBarCollapsible = () => {
  const {
    achievements,
    achievementsLimited,
    handleEndReached,
    loading,
    handleQuery,
  } = useAchievement();

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
  const scrollY = useRef(new Animated.Value(0)).current;

  const {listRefArr, isListGliding, syncScrollOffset} = useCollapsibleTabScroll(
    routes,
    (tabIndex = index),
    scrollY,
    (headerHeight = HeaderHeight),
  );

  const navigation = useNavigation();
  const [loadingLanguage, setLoadingLanguage] = useState(false);

  const [language, setLanguage] = useState('en'); // Default language is English

  //   const handleLanguageChange = lang => {
  //     setLoadingLanguage(true); // Start loading effect
  //     setLanguage(lang); // Set new language
  //     setTimeout(() => {
  //       setLoadingLanguage(false); // End loading effect after 1 second (or adjust time as needed)
  //     }, 1000);
  //   };

  const [swiping, setSwiping] = useState(false);

  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
    console.log('scroll started------------->', isListGliding.current);
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    console.log('scroll ended------------->', isListGliding.current);
    syncScrollOffset();
  };

  const onScrollEndDrag = () => {
    isListGliding.current = false; // Reset gliding state on drag stop
    syncScrollOffset();
  };

  const renderHeader = () => (
    <>
      <SearchBar
        handleQuery={handleQuery}
        scrollY={scrollY}
        headerHeight={HeaderHeight}
      />
      {/* <LanguageSwitcher language={language} setLanguage={setLanguage} /> */}
    </>
  );

  const renderItem = ({item}) => {
    return (
      <>
        <TouchableOpacity
          onPress={() =>
            !isListGliding.current &&
            navigation.navigate('ItemDetails', {
              item: getItem(item.id),
              language,
            })
          }
          style={styles.itemContainer}>
          <FastImage
            source={{
              uri: 'https://res.cloudinary.com/vny/image/upload/v1739896428/AchievementSkeliton_l2dkqc.png',
            }}
            style={{width: 60, height: 50}}
          />

          <Text style={styles.itemText} numberOfLines={1} ellipsizeMode="tail">
            {item.name[language]}
          </Text>
          <View style={styles.inlineContainer}>
            <FastImage
              source={{
                uri: 'https://res.cloudinary.com/vny/image/upload/v1739961906/points_vhi3dv.png',
              }}
              style={styles.inlineImage}
            />
            <Text style={styles.itemText}>{item.points}</Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const isLoading = () => {
    if (loading) {
      console.log('loading fired----->', loading);
      return (
        <ActivityIndicator
          style={{paddingBottom: 300}}
          size="large"
          color="#e91e63"
        />
      );
    }
  };

  const getItem = id => {
    const item = achievements.find(item => item.id === id);
    return item;
  };

  const renderScene = ({route}) => {
    const numCols = 3;

    const filteredAchievements =
      route.key === 'all'
        ? achievementsLimited || []
        : (achievementsLimited || []).filter(ach => ach.category === route.key);

    console.log('---------------------------->', filteredAchievements);

    return (
      <TabScene
        numCols={numCols}
        data={filteredAchievements}
        renderItem={renderItem}
        scrollY={scrollY}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onGetRef={ref => {
          if (ref) {
            const found = listRefArr.current.find(e => e.key === route.key);
            if (!found) {
              listRefArr.current.push({key: route.key, value: ref});
            }
          }
        }}
        handleEndReached={handleEndReached}
      />
    );
  };

  const renderTabView = () => (
    <TabView
      onIndexChange={index => {
        setIndex(index);
        onMomentumScrollBegin();
        setTimeout(() => {
          onMomentumScrollEnd();
        }, 2000); // Adjust delay based on tab transition duration
      }}
      navigationState={{index, routes}}
      renderScene={renderScene}
      // renderTabBar={renderTabBar}
      renderTabBar={props => (
        <CollapsibleTabBar
          {...props}
          scrollY={scrollY}
          isListGliding={isListGliding}
          headerHeight={HeaderHeight}
        />
      )}
      initialLayout={{height: 0, width: Dimensions.get('window').width}}
    />
  );

  return (
    <View style={{flex: 1}}>
      {renderTabView()}
      {renderHeader()}
      {isLoading()}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    top: 0,
    height: HeaderHeight,
    width: '100%',
    position: 'absolute',
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
    backgroundColor: '#302d2d',
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
    numberOfLines: 1, // Ensures only one line
    ellipsizeMode: 'tail', // Adds "..." if text overflows
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

export default TabBarCollapsible;
