import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';

const ReusableTabView = ({routes, renderScene, index, onIndexChange}) => {
  console.log('fired------->');
  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={onIndexChange}
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

export default ReusableTabView;
