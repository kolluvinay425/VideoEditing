// GradientBackground.js
import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientBackground = ({children}) => {
  return (
    <LinearGradient
      colors={['#201C1C', '#464141', '#322D2D', '#322D2D']}
      locations={[0.05, 0.34, 0.89, 1]}
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
