import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
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
const TabBarHeight = 50;
const HeaderHeight = 300;
const tab1ItemSize = (Dimensions.get('window').width - 30) / 2;
const tab2ItemSize = (Dimensions.get('window').width - 40) / 3;

const TabScene = ({
  numCols,
  data,
  renderItem,
  onGetRef,
  scrollY,
  onScrollEndDrag,
  onMomentumScrollEnd,
  onMomentumScrollBegin,
}) => {
  const windowHeight = Dimensions.get('window').height;

  return (
    <Animated.FlatList
      scrollToOverflowEnabled={true}
      numColumns={numCols}
      ref={onGetRef}
      scrollEventThrottle={16}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
        useNativeDriver: true,
      })}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onScrollEndDrag={onScrollEndDrag}
      onMomentumScrollEnd={onMomentumScrollEnd}
      ItemSeparatorComponent={() => <View style={{height: 10}} />}
      ListHeaderComponent={() => <View style={{height: 10}} />}
      contentContainerStyle={{
        paddingTop: HeaderHeight + TabBarHeight,
        // paddingHorizontal: 10,
        // minHeight: windowHeight - TabBarHeight,
      }}
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const CollapsibleTabView = ({achievements, loading, routes}) => {
  const [tabIndex, setIndex] = useState(0);
  const [language, setLanguage] = useState('en');
  //   const [routes] = useState([
  //     {key: 'tab1', title: 'Tab1'},
  //     {key: 'tab2', title: 'Tab2'},
  //   ]);
  const [tab1Data] = useState(Array(40).fill(0));
  const [tab2Data] = useState(Array(30).fill(0));
  const scrollY = useRef(new Animated.Value(0)).current;
  let listRefArr = useRef([]);
  let listOffset = useRef({});
  let isListGliding = useRef(false);

  useEffect(() => {
    scrollY.addListener(({value}) => {
      const curRoute = routes[tabIndex].key;
      listOffset.current[curRoute] = value;
    });
    return () => {
      scrollY.removeAllListeners();
    };
  }, [routes, tabIndex]);

  const syncScrollOffset = () => {
    const curRouteKey = routes[tabIndex].key;
    listRefArr.current.forEach(item => {
      if (item.key !== curRouteKey) {
        if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollY._value,
              animated: false,
            });
            listOffset.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= HeaderHeight) {
          if (
            listOffset.current[item.key] < HeaderHeight ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: HeaderHeight,
                animated: false,
              });
              listOffset.current[item.key] = HeaderHeight;
            }
          }
        }
      }
    });
  };

  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    syncScrollOffset();
  };

  const onScrollEndDrag = () => {
    syncScrollOffset();
  };

  const renderHeader = () => {
    return (
      <>
        {/* <Animated.View style={[styles.header, {transform: [{translateY: y}]}]}> */}
        <SearchBar scrollY={scrollY} headerHeight={HeaderHeight} />
        {/* </Animated.View> */}
      </>
    );
  };

  const rednerTab1Item = ({item, index}) => {
    return (
      <View
        style={{
          borderRadius: 16,
          marginLeft: index % 2 === 0 ? 0 : 10,
          width: tab1ItemSize,
          height: tab1ItemSize,
          backgroundColor: '#aaa',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>{index}</Text>
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ItemDetails', {item, language})}
        style={styles.itemContainer}>
        <FastImage
          source={{
            uri: 'https://res.cloudinary.com/vny/image/upload/v1739896428/AchievementSkeliton_l2dkqc.png',
          }}
          style={{
            width: 60,
            height: 50,
          }}
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
    );
  };
  const rednerTab2Item = ({item, index}) => {
    return (
      <View
        style={{
          marginLeft: index % 3 === 0 ? 0 : 10,
          borderRadius: 16,
          width: tab2ItemSize,
          height: tab2ItemSize,
          backgroundColor: '#aaa',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>{index}</Text>
      </View>
    );
  };

  const renderLabel = ({route, focused}) => {
    return (
      <Text style={[styles.label, {opacity: focused ? 1 : 2}]}>
        {route.title}
      </Text>
    );
  };

  const renderScene = ({route}) => {
    const numCols = 3; // Fixed column count

    if (loading) {
      return (
        <ActivityIndicator
          style={{padding: 100}}
          size="large"
          color="#e91e63"
        />
      );
    }

    // Filter achievements based on the selected tab category
    const filteredAchievements =
      route.key === 'all'
        ? achievements || []
        : (achievements || []).filter(ach => ach.category === route.key);

    return (
      <TabScene
        numCols={numCols}
        data={filteredAchievements}
        renderItem={renderItem} // Single renderItem function
        scrollY={scrollY}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onGetRef={ref => {
          if (ref) {
            const found = listRefArr.current.find(e => e.key === route.key);
            if (!found) {
              listRefArr.current.push({
                key: route.key,
                value: ref,
              });
            }
          }
        }}
      />
    );
  };

  //   const renderScene = ({route}) => {
  //     let numCols = 3;
  //     let data;
  //     let renderItem = rednerTab1Item;

  //     return (
  //       <TabScene
  //         numCols={numCols}
  //         data={data}
  //         renderItem={renderItem}
  //         scrollY={scrollY}
  //         onMomentumScrollBegin={onMomentumScrollBegin}
  //         onScrollEndDrag={onScrollEndDrag}
  //         onMomentumScrollEnd={onMomentumScrollEnd}
  //         onGetRef={ref => {
  //           if (ref) {
  //             const found = listRefArr.current.find(e => e.key === route.key);
  //             if (!found) {
  //               listRefArr.current.push({
  //                 key: route.key,
  //                 value: ref,
  //               });
  //             }
  //           }
  //         }}
  //       />
  //     );
  //   };

  const renderTabBar = props => {
    // Interpolate scrollY to move the TabBar and SearchBar together
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [0, -HeaderHeight + 150], // Make TabBar follow SearchBar
      extrapolateRight: 'clamp',
    });

    return (
      <Animated.View
        style={{
          zIndex: 1,
          position: 'absolute',
          top: HeaderHeight, // Make TabBar stick below the SearchBar
          transform: [{translateY: y}], // Move the TabBar with the SearchBar
          width: '100%',
        }}>
        <TabBar
          {...props}
          onTabPress={({route, preventDefault}) => {
            if (isListGliding.current) {
              preventDefault();
            }
          }}
          labelStyle={styles.label}
          tabStyle={styles.tabStyle}
          style={styles.tab}
          renderLabel={renderLabel}
          indicatorStyle={styles.indicator}
          activeColor="#ffffff"
          inactiveColor="#f0e9e9"
        />
      </Animated.View>
    );
  };

  const renderTabView = () => {
    return (
      <TabView
        onIndexChange={index => setIndex(index)}
        navigationState={{index: tabIndex, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        initialLayout={{
          height: 0,
          width: Dimensions.get('window').width,
        }}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      {renderTabView()}
      {renderHeader()}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    top: 0,
    height: HeaderHeight,
    width: '100%',
    // backgroundColor: '#40C4FF',
    // alignItems: 'center',
    // justifyContent: 'center',
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

export default CollapsibleTabView;
