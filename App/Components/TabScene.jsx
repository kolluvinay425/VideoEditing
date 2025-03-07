import React from 'react';
import {View, Dimensions, Animated, FlatList} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Item from '../Screens/Achievement/Detail/Item';

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
  headerName,
}) => {
  const windowHeight = Dimensions.get('window').height;

  // if (headerName === 'SearchBar') {
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
      }}
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
    />
  );
  // } else {
  //   console.log('im an item ???-------->', data.language);

  //   // <Item item={data.item} />;
  // }
};

export default TabScene;
