import React from 'react';
import {ScrollView, View, Text, Image, StyleSheet} from 'react-native';
import GradientBackground from '../../../Components/GradientBackground';

const TipsScreen = ({item}) => (
  <GradientBackground>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.tabContent}>
        {item.tipsTricks.map((tip, index) => (
          <View key={index} style={styles.tipContainer}>
            <Text style={styles.heading}>{tip.heading}</Text>
            {tip.image && (
              <Image source={{uri: tip.image}} style={styles.image} />
            )}
            <Text style={styles.tabText}>{tip.description}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  </GradientBackground>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  tabContent: {
    padding: 10,
  },
  heading: {
    fontSize: 20, // Increased the font size for the heading
    fontWeight: 'bold',
    color: '#f3eeee',
    marginBottom: 10,
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
  },
  tabText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#f3eeee',
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
    lineHeight: 24,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginVertical: 10,
  },
});

export default TipsScreen;
