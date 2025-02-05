import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import GradientBackground from '../../../Components/GradientBackground';

const TipsScreen = ({item, language}) => (
  <GradientBackground>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.tabContent}>
        {item.tipsTricks.map((tip, index) => (
          <View key={index} style={styles.tipContainer}>
            {/* Dark, Neon Gradient Header */}
            {/* <LinearGradient
              colors={['#1a1a1a', '#333333']}
              style={styles.headingContainer}> */}
            <Text style={styles.heading}>{tip.heading[language]}</Text>
            {/* </LinearGradient> */}

            {/* Display multiple images if present */}
            {tip.image &&
              tip.image.length > 0 &&
              tip.image.map((url, imgIndex) => (
                <FastImage
                  key={imgIndex}
                  style={styles.image}
                  source={{uri: url, priority: FastImage.priority.high}}
                  resizeMode={FastImage.resizeMode.cover}
                />
              ))}

            <Text style={styles.tabText}>{tip.description[language]}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  </GradientBackground>
);

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  tabContent: {
    paddingBottom: 20,
  },
  tipContainer: {
    backgroundColor: 'transparent', // Dark transparent card
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 0.3,
    borderColor: '#ffda1e', // Neon blue border for emphasis
    shadowColor: '#37331e',
    shadowOpacity: 0.7,
    shadowRadius: 15,
    elevation: 10, // Android shadow
  },
  headingContainer: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2ae2b', // Neon purple gradient border
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff', // White text for clarity
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  tabText: {
    fontSize: 16,
    color: '#e0e0e0', // Soft grey text
    lineHeight: 24,
    fontFamily: 'sans-serif-medium',
    textAlign: 'justify',
    marginTop: 5,
  },
  image: {
    width: '100%',
    aspectRatio: 1.8,
    borderRadius: 12,
    marginVertical: 10,
    borderWidth: 0.2,
    borderColor: '#d2a425',
  },
});

export default TipsScreen;
