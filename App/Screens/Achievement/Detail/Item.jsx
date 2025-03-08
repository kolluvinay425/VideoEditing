import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Animated} from 'react-native';
import GradientBackground from '../../../Components/GradientBackground';
import images from '../../../themes/Images';
import FastImage from 'react-native-fast-image';

const Item = ({item, language, scrollY, headerHeight}) => {
  const height = scrollY.interpolate({
    inputRange: [0, 1, headerHeight],
    outputRange: [0, 0, -headerHeight],
    extrapolateRight: 'clamp',
  });

  const searchTranslateY = scrollY.interpolate({
    inputRange: [0, 1, headerHeight],
    outputRange: [0, 0, headerHeight - 150],
    extrapolateRight: 'clamp',
  });

  const textOpacity = scrollY.interpolate({
    inputRange: [0, headerHeight * 0.5],
    outputRange: [1, 0], // Fades out text as you scroll up 50% of the scroll height
    extrapolate: 'clamp',
  });

  const imageScale = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [1, 0.5], // Scales the image down to 50% of its size
    extrapolate: 'clamp',
  });

  const imageTranslateX = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -50], // Moves the image to the left
    extrapolate: 'clamp',
  });

  return (
    <>
      <Animated.View
        style={[styles.container, {transform: [{translateY: height}]}]}>
        <GradientBackground>
          <Animated.View
            style={[
              styles.headerContainer,
              {transform: [{translateY: searchTranslateY}]},
            ]}>
            <View style={styles.header1}>
              <Animated.View
                style={{
                  transform: [
                    {translateY: searchTranslateY},
                    {scale: imageScale},
                    {translateX: imageTranslateX},
                  ],
                }}>
                <FastImage
                  source={images.achievement}
                  style={styles.achievementImage}
                />
              </Animated.View>
              <Animated.Text
                style={[
                  styles.text1,
                  {transform: [{translateY: searchTranslateY}]},
                  {opacity: textOpacity},
                ]}>
                {item.name[language]}
              </Animated.Text>
            </View>

            <View style={styles.header2}>
              <Animated.Text
                style={[
                  styles.text2,
                  {transform: [{translateY: searchTranslateY}]},
                  {opacity: textOpacity},
                ]}>
                Hardness: {item.hardness[language]}
              </Animated.Text>
              <View style={styles.inlineContainer}>
                <Animated.Text
                  style={[
                    styles.text2,
                    {transform: [{translateY: searchTranslateY}]},
                    {opacity: textOpacity},
                  ]}>
                  Achievement points: {item.points}
                </Animated.Text>
                <Image
                  source={images.pointsIcon}
                  style={styles.inlineImageSmall}
                />
              </View>
              {item.rewards.title && (
                <View style={styles.inlineContainer}>
                  <Animated.Text
                    style={[
                      styles.text2,
                      {transform: [{translateY: searchTranslateY}]},
                      {opacity: textOpacity},
                    ]}>
                    Title
                  </Animated.Text>
                  <Image
                    source={{uri: item.rewards.titleImage}}
                    style={styles.inlineImageLarge}
                  />
                </View>
              )}
            </View>
          </Animated.View>
        </GradientBackground>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    height: 150,
    width: '100%',
    position: 'absolute',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  text1: {
    color: 'white',
    margin: 0,
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
  },
  text2: {
    color: 'white',
    paddingVertical: 5,
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
  },
  header1: {
    alignItems: 'center',
  },
  header2: {
    justifyContent: 'center',
  },
  achievementImage: {
    width: 150,
    height: 120,
    resizeMode: 'contain',
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inlineImageSmall: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    marginLeft: 5,
  },
  inlineImageLarge: {
    width: 100,
    height: 60,
  },
  tabBar: {
    backgroundColor: '#2a2a2a',
  },
  indicator: {
    backgroundColor: '#e91e63',
  },
  label: {
    color: '#e5e5ef',
    fontWeight: 'bold',
  },
  tabStyle: {
    width: 'auto',
    paddingHorizontal: 10,
  },
});

export default Item;
