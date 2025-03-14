import React, {useState, useEffect, useRef, useCallback} from 'react';
import {View, Dimensions, Animated} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';

import LanguageSwitcher from './LanguageSwitcher';
import Item from '../Screens/Achievement/Detail/Item';
import RequirementScreen from '../Screens/Achievement/Detail/RequirementScreen';
import TipsScreen from '../Screens/Achievement/Detail/TipsAndTricks';
import {useCollapsibleTabScroll} from './useCollapsibleTabScroll';
import CollapsibleTabBar from './CollapsibleTabBar';
const TabBarHeight = 50;
const HeaderHeight = 150;

const TabBarCollapsibleDetail = ({loading, routes, data, handleQuery}) => {
  const [tabIndex, setIndex] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;

  const {listRefArr, isListGliding, syncScrollOffset} = useCollapsibleTabScroll(
    routes,
    tabIndex,
    scrollY,
  );

  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    syncScrollOffset();
  };

  const onScrollEndDrag = syncScrollOffset;

  const renderHeader = () => (
    <>
      <Item
        item={data.item}
        language={data.language}
        scrollY={scrollY}
        headerHeight={HeaderHeight}
      />
    </>
  );

  const renderSceneDetail = ({route}) => {
    const renderItem = () => {
      if (route.key === 'info' && data) {
        return <RequirementScreen language={data.language} item={data.item} />;
      } else if (route.key === 'tips' && data) {
        return <TipsScreen language={data.language} item={data.item} />;
      }
      return <View style={{height: 10}} />;
    };

    return (
      <Animated.FlatList
        data={[{key: 'content'}]} // Ensuring FlatList has valid data
        keyExtractor={item => item.key}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: true,
          },
        )}
        ref={ref => {
          if (ref) {
            const found = listRefArr.current.find(e => e.key === route.key);
            if (!found) {
              listRefArr.current.push({key: route.key, value: ref});
            }
          }
        }}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        contentContainerStyle={{
          paddingTop: HeaderHeight + TabBarHeight,
          paddingHorizontal: 10,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    );
  };

  const renderTabView = () => (
    <TabView
      onIndexChange={index => setIndex(index)}
      navigationState={{index: tabIndex, routes}}
      renderScene={renderSceneDetail}
      renderTabBar={props => (
        <CollapsibleTabBar
          {...props}
          scrollY={scrollY}
          isListGliding={isListGliding}
        />
      )}
      initialLayout={{height: 0, width: Dimensions.get('window').width}}
    />
  );

  return (
    <View style={{flex: 1}}>
      {renderTabView()}
      {renderHeader()}
    </View>
  );
};

export default TabBarCollapsibleDetail;
