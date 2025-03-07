import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import GradientBackground from '../../../Components/GradientBackground';
import images from '../../../themes/Images';
import FastImage from 'react-native-fast-image';

const Item = ({item, language}) => {
  console.log('here i am----->item');
  return (
    <>
      <GradientBackground>
        <View style={styles.headerContainer}>
          <View style={styles.header1}>
            <FastImage
              source={images.achievement}
              style={styles.achievementImage}
            />
            <Text style={styles.text1}>{item.name[language]}</Text>
          </View>

          <View style={styles.header2}>
            <Text style={styles.text2}>
              Hardness: {item.hardness[language]}
            </Text>
            <View style={styles.inlineContainer}>
              <Text style={styles.text2}>
                Achievement points: {item.points}
              </Text>
              <Image
                source={images.pointsIcon}
                style={styles.inlineImageSmall}
              />
            </View>
            {item.rewards.title && (
              <View style={styles.inlineContainer}>
                <Text style={styles.text2}>Title</Text>
                <Image
                  source={{uri: item.rewards.titleImage}}
                  style={styles.inlineImageLarge}
                />
              </View>
            )}
          </View>
        </View>
      </GradientBackground>
    </>
  );
};

const styles = StyleSheet.create({
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
    // resizeMode: 'contain',
    // marginLeft: 5,
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
