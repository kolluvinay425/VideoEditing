import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import SearchBar from './SearchBar';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import TabScene from './TabScene';
import LanguageSwitcher from './LanguageSwitcher';
import Item from '../Screens/Achievement/Detail/Item';
import RequirementScreen from '../Screens/Achievement/Detail/RequirementScreen';
import TipsScreen from '../Screens/Achievement/Detail/TipsAndTricks';

let HeaderHeight;
const TabBarHeight = 50;
const TabBarCollapsible = ({
  data,
  loading,
  routes,
  handleQuery,
  headerName,
}) => {
  const [tabIndex, setIndex] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;
  let listRefArr = useRef([]);
  let listOffset = useRef({});
  let isListGliding = useRef(false);
  const navigation = useNavigation();
  const [loadingLanguage, setLoadingLanguage] = useState(false);

  const [language, setLanguage] = useState('en'); // Default language is English

  switch (headerName) {
    case 'SearchBar':
      HeaderHeight = 300;
      break;
    case 'Details':
      HeaderHeight = 150;
      break;
    default:
      break;
  }

  //   const handleLanguageChange = lang => {
  //     setLoadingLanguage(true); // Start loading effect
  //     setLanguage(lang); // Set new language
  //     setTimeout(() => {
  //       setLoadingLanguage(false); // End loading effect after 1 second (or adjust time as needed)
  //     }, 1000);
  //   };
  useEffect(() => {
    scrollY.addListener(({value}) => {
      const curRoute = routes[tabIndex].key;
      listOffset.current[curRoute] = value;
    });
    return () => {
      scrollY.removeAllListeners();
    };
  }, [routes, tabIndex]);

  const syncScrollOffset = useCallback(() => {
    const curRouteKey = routes[tabIndex]?.key;
    listRefArr.current.forEach(({key, value}) => {
      if (key !== curRouteKey && value) {
        const offset = Math.min(HeaderHeight, Math.max(0, scrollY.current));
        if (listOffset.current[key] !== offset) {
          value.scrollToOffset({offset, animated: false});
          listOffset.current[key] = offset;
        }
      }
    });
  }, [HeaderHeight, routes, tabIndex]);

  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    syncScrollOffset();
  };

  const onScrollEndDrag = syncScrollOffset;

  const renderHeader = useMemo(() => {
    if (headerName === 'SearchBar') {
      return (
        <SearchBar
          handleQuery={handleQuery}
          scrollY={scrollY}
          headerHeight={HeaderHeight}
        />
      );
    }
    if (headerName === 'Details') {
      return (
        <Item
          item={data?.item}
          language={data?.language}
          scrollY={scrollY}
          headerHeight={HeaderHeight}
        />
      );
    }
    return null;
  }, [headerName, data, handleQuery, HeaderHeight]);

  const renderTabBar = useCallback(
    props => {
      const y = scrollY.interpolate({
        inputRange: [0, HeaderHeight],
        outputRange: [0, -HeaderHeight],
        extrapolate: 'clamp',
      });

      return (
        <Animated.View
          style={[styles.tabBarContainer, {transform: [{translateY: y}]}]}>
          <TabBar
            {...props}
            onTabPress={({preventDefault}) =>
              isListGliding.current && preventDefault()
            }
            labelStyle={styles.label}
            tabStyle={styles.tabStyle}
            style={styles.tab}
            renderLabel={({route, focused}) => (
              <Text style={[styles.label, {opacity: focused ? 1 : 0.6}]}>
                {route.title}
              </Text>
            )}
            indicatorStyle={styles.indicator}
          />
        </Animated.View>
      );
    },
    [scrollY, HeaderHeight],
  );
  const renderItem = ({item}) => {
    if (loading) {
      console.log('loading fired----->', loading);
      return (
        <ActivityIndicator
          style={{padding: 100}}
          size="large"
          color="#e91e63"
        />
      );
    }
    console.log('loading fired----->', loading);
    return (
      <>
        <TouchableOpacity
          onPress={() => navigation.navigate('ItemDetails', {item, language})}
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
  }; //Achievements

  const renderLabel = ({route, focused}) => (
    <Text style={[styles.label, {opacity: focused ? 1 : 2}]}>
      {route.title}
    </Text>
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

  const renderSceneAchievement = useCallback(
    ({route}) => {
      const filteredData =
        headerName === 'SearchBar'
          ? route.key === 'all'
            ? data || []
            : (data || []).filter(ach => ach.category === route.key)
          : data;

      return (
        <Animated.FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          removeClippedSubviews={true}
          getItemLayout={(data, index) => ({
            length: 100,
            offset: 100 * index,
            index,
          })}
          ref={ref => {
            if (ref && !listRefArr.current.some(e => e.key === route.key)) {
              listRefArr.current.push({key: route.key, value: ref});
            }
          }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {
              useNativeDriver: true,
            },
          )}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          contentContainerStyle={{paddingTop: HeaderHeight + TabBarHeight}}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ItemDetails', {item})}
              style={styles.itemContainer}>
              <FastImage source={{uri: item.imageUrl}} style={styles.image} />
              <Text style={styles.itemText} numberOfLines={1}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      );
    },
    [data, headerName, HeaderHeight],
  );

  const renderSceneDetail = useCallback(
    ({route}) => {
      const content =
        route.key === 'info' ? (
          <RequirementScreen language={data?.language} item={data?.item} />
        ) : (
          <TipsScreen language={data?.language} item={data?.item} />
        );

      return (
        <Animated.FlatList
          data={[{key: 'content'}]}
          keyExtractor={item => item.key}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {
              useNativeDriver: true,
            },
          )}
          contentContainerStyle={{paddingTop: HeaderHeight + TabBarHeight}}
          renderItem={() => content}
        />
      );
    },
    [data, HeaderHeight],
  );

  const renderScene =
    headerName === 'SearchBar' ? renderSceneAchievement : renderSceneDetail;

  const renderTabView = () => (
    <TabView
      onIndexChange={index => setIndex(index)}
      navigationState={{index: tabIndex, routes}}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      initialLayout={{height: 0, width: Dimensions.get('window').width}}
    />
  );

  return (
    <View style={{flex: 1}}>
      {renderTabView()}
      {renderHeader}
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
  label: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tab: {elevation: 0, shadowOpacity: 0, backgroundColor: '#2a2a2a'},
  indicator: {
    backgroundColor: '#e91e63',
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
