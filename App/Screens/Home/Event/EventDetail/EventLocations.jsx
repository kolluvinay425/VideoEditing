import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import GradientBackground from '../../../../Components/GradientBackground';
import ReusableTabView from '../../../../Components/TabView';
const EventLocations = ({route}) => {
  const {feature} = route.params;

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Info'},
    {key: 'second', title: 'Tips & Tricks'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return (
          <GradientBackground>
            <View style={styles.container}>
              <Text style={styles.text}>Name: {feature.name.en}</Text>
              {/* <Text style={styles.text}>Effect: {ability.effect}</Text>
              <Text style={styles.text}>
                Where to select: {ability.where_to_select.en}
              </Text>
              <Text style={styles.text}>Usage: {ability.usage.en}</Text> */}
            </View>
          </GradientBackground>
        );
      case 'second':
        return (
          <GradientBackground>
            <View style={styles.container}>
              <Text style={styles.text}>Name: {feature.name.en}</Text>
              {/* <Text style={styles.text}>Effect: {ability.effect}</Text>
              <Text style={styles.text}>
                Where to select: {ability.where_to_select.en}
              </Text>
              <Text style={styles.text}>Usage: {ability.usage.en}</Text> */}
            </View>
          </GradientBackground>
        );
      default:
        return null;
    }
  };

  return (
    <GradientBackground>
      <ReusableTabView
        routes={routes}
        renderScene={renderScene}
        index={index}
        onIndexChange={setIndex}
      />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    color: '#f0e9e9',
    fontSize: 16,
    textAlign: 'center',
  },
  indicator: {
    backgroundColor: '#e91e63',
  },
  tabBar: {
    backgroundColor: '#2a2a2a',
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tabStyle: {
    width: 'auto',
    paddingHorizontal: 10,
  },
});

export default EventLocations;
