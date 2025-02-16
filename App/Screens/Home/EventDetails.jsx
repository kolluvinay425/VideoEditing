import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

const FirstRoute = () => (
  <View style={[styles.container, {backgroundColor: '#ff4081'}]}>
    <Text style={styles.text}>First Tab Content</Text>
  </View>
);

const SecondRoute = () => (
  <View style={[styles.container, {backgroundColor: '#673ab7'}]}>
    <Text style={styles.text}>Second Tab Content</Text>
  </View>
);

const EventDetails = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Tab 1'},
    {key: 'second', title: 'Tab 2'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={SceneMap({
        first: FirstRoute,
        second: SecondRoute,
      })}
      onIndexChange={setIndex}
      renderTabBar={props => (
        <TabBar
          {...props}
          scrollEnabled
          indicatorStyle={styles.indicator}
          style={styles.tabBar}
          labelStyle={styles.label}
          tabStyle={styles.tabStyle}
          activeColor="#ffffff"
          inactiveColor="#f0e9e9"
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  indicator: {
    backgroundColor: '#e91e63',
  },
  tabBar: {
    backgroundColor: '#363434',
  },
  label: {
    color: '#000',
    fontWeight: 'bold',
  },
  tabStyle: {
    width: 'auto',
    paddingHorizontal: 10,
  },
});

export default EventDetails;
