import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientBackground = ({children}) => {
  return (
    <LinearGradient
      colors={['#2a2a2a', '#1d1d1d', '#3e3e3e', '#2a2a2a']} // Deep, rich gradient colors
      locations={[0.1, 0.4, 0.8, 1]} // Adjusted location for smoother gradient transitions
      style={styles.gradient}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});

export default GradientBackground;
