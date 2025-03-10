import React, {memo} from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
const AchievementItem = ({
  item,
  navigation,
  isListGliding,
  swiping,
  language,
  HeaderHeight,
}) => {
  const handlePress = () => {
    console.log('scroll started kgkjgj------------->', isListGliding.current);
    if (!isListGliding.current) {
      console.log('scroll ended kjggk------------->', isListGliding.current);
      navigation.navigate('ItemDetails', {item, language});
    }
    // if (swiping) {
    //   console.log('swipinggggg------->', swiping);
    // }
    // if (!swiping) {
    //   console.log('swipinggggg------->', swiping);
    // }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.itemContainer}>
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
  );
};

const styles = StyleSheet.create({
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

// Memoized to avoid re-rendering unchanged items
export const MemoizedAchievementItem = memo(
  AchievementItem,
  (prevProps, nextProps) => {
    return (
      prevProps.item.id === nextProps.item.id &&
      prevProps.language === nextProps.language &&
      prevProps.swiping === nextProps.swiping &&
      prevProps.isListGliding.current === nextProps.isListGliding.current
    );
  },
);
