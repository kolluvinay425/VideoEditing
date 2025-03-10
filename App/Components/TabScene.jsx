import React from 'react';
import {View, Dimensions, Animated} from 'react-native';
import {useAchievement} from '../context/AchievementContext';
const screenHeight = Dimensions.get('window').height;
const TabBarHeight = 50;
const HeaderHeight = 300;

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

  const {achievements, handleEndReached} = useAchievement();

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
        minHeight: screenHeight * 1.5, // Ensures a minimum scrollable height
        paddingTop: HeaderHeight + TabBarHeight,
      }}
      showsHorizontalScrollIndicator={false}
      data={achievements}
      renderItem={renderItem}
      showsVerticalScrollIndicator={true}
      onEndReached={handleEndReached}
      // keyExtractor={(item, index) => index.toString()}
      keyExtractor={item => item.id.toString()} // or any unique identifier
    />
  );
};

export default TabScene;
