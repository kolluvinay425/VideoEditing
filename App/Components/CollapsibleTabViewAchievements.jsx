import React, {useState, useRef, useCallback, memo, useMemo} from 'react';
import {View, Dimensions, ActivityIndicator, Animated} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import SearchBar from './SearchBar';
import LanguageSwitcher from './LanguageSwitcher';
import {useAchievement} from '../context/AchievementContext';
import {useCollapsibleTabScroll} from '../hooks/useCollapsibleTabScroll';
import CollapsibleTabBar from './CollapsibleTabBarReUsable';
import AchievementItem from '../Screens/Achievement/AchievementItem';

const TabBarHeight = 50;
const HeaderHeight = 300;
const screenHeight = Dimensions.get('window').height;
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

  const [loadingLanguage, setLoadingLanguage] = useState(false);

  const [language, setLanguage] = useState('en'); // Default language is English

  //   const handleLanguageChange = lang => {
  //     setLoadingLanguage(true); // Start loading effect
  //     setLanguage(lang); // Set new language
  //     setTimeout(() => {
  //       setLoadingLanguage(false); // End loading effect after 1 second (or adjust time as needed)
  //     }, 1000);
  //   };

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
        // handleQuery={handleQuery}
        scrollY={scrollY}
        headerHeight={HeaderHeight}
      />
      {/* <LanguageSwitcher language={language} setLanguage={setLanguage} /> */}
    </>
  );

  const MemoizedAchievementItem = memo(AchievementItem);

  const renderItem = useCallback(
    ({item}) => (
      <MemoizedAchievementItem
        item={item}
        isListGliding={isListGliding}
        getItem={getItem}
        language={language}
      />
    ),
    [isListGliding, getItem, language],
  );

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
  const setListRef = useCallback((key, ref) => {
    if (ref && !listRefArr.current.find(e => e.key === key)) {
      listRefArr.current.push({key, value: ref});
    }
  }, []);
  const getItem = id => {
    const item = achievements.find(item => item.id === id);
    return item;
  };

  const achievementMap = useMemo(() => {
    const map = {
      all: achievementsLimited || [],
    };

    (achievementsLimited || []).forEach(ach => {
      const key = ach.category;
      if (!map[key]) map[key] = [];
      map[key].push(ach);
    });

    return map;
  }, [achievementsLimited]);

  const renderSearchResults = () => {
    return (
      <Animated.FlatList
        data={searchResults}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        contentContainerStyle={{
          paddingTop: HeaderHeight,
          minHeight: screenHeight * 1.3,
        }}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        ListHeaderComponent={() => <View style={{height: 10}} />}
        onEndReached={handleEndReached}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
      />
    );
  };

  const renderScene = ({route}) => {
    const numCols = 3;

    const filteredAchievements = achievementMap[route.key] || [];
    // const filteredAchievements =
    //   route.key === 'all'
    //     ? achievementsLimited || []
    //     : (achievementsLimited || []).filter(ach => ach.category === route.key);

    // console.log('---------------------------->', filteredAchievements);

    return (
      <Animated.FlatList
        scrollToOverflowEnabled={true}
        numColumns={numCols}
        ref={ref => setListRef(route.key, ref)}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: true,
          },
        )}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        ListHeaderComponent={() => <View style={{height: 10}} />}
        contentContainerStyle={{
          minHeight: screenHeight * 1.3, // Ensures a minimum scrollable height
          paddingTop: HeaderHeight + TabBarHeight,
        }}
        showsHorizontalScrollIndicator={false}
        data={filteredAchievements}
        renderItem={renderItem}
        showsVerticalScrollIndicator={true}
        onEndReached={handleEndReached}
        // keyExtractor={(item, index) => index.toString()}
        keyExtractor={item => item.id.toString()} // or any unique identifier
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
        }, 300); // Adjust delay based on tab transition duration
      }}
      lazy
      renderLazyPlaceholder={() => <ActivityIndicator color="#e91e63" />}
      navigationState={{index, routes}}
      renderScene={renderScene}
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

export default TabBarCollapsible;
