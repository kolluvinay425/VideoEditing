// CollapsibleTabBar.js
import React from 'react';
import {Animated, Text, StyleSheet} from 'react-native';
import {TabBar} from 'react-native-tab-view';

const HeaderHeight = 150;

const CollapsibleTabBar = ({scrollY, isListGliding, ...props}) => {
  const y = scrollY.interpolate({
    inputRange: [0, 1, HeaderHeight],
    outputRange: [0, 0, -HeaderHeight],
    extrapolateRight: 'clamp',
  });

  const renderLabel = ({route, focused}) => (
    <Text style={[styles.label, {opacity: focused ? 1 : 0.7}]}>
      {route.title}
    </Text>
  );

  return (
    <Animated.View
      style={{
        zIndex: 1,
        position: 'absolute',
        top: HeaderHeight,
        transform: [{translateY: y}],
        width: '100%',
      }}>
      <TabBar
        {...props}
        onTabPress={({route, preventDefault}) => {
          if (isListGliding.current) {
            preventDefault();
          }
        }}
        labelStyle={styles.label}
        tabStyle={styles.tabStyle}
        style={styles.tab}
        renderLabel={renderLabel}
        indicatorStyle={styles.indicator}
        activeColor="#ffffff"
        inactiveColor="#f0e9e9"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  label: {color: '#fff', fontWeight: 'bold'},
  tab: {elevation: 0, shadowOpacity: 0, backgroundColor: '#2a2a2a'},
  indicator: {backgroundColor: '#e91e63'},
  tabStyle: {width: 'auto', paddingHorizontal: 10},
});

export default CollapsibleTabBar;
