import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const SacredQuartetEvent = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={{
        uri: 'https://preview.redd.it/feedback-sacred-quartet-themed-mode-v0-ojlfhy301qce1.png?width=1920&format=png&auto=webp&s=ee6da83f569c48d306197a72ee59bc1ff824e5f1',
      }}
      style={styles.backgroundImage}>
      <LinearGradient
        colors={['rgba(46, 44, 44, 0.7)', 'rgba(0, 0, 0, 0.7)']} // Transparent to black gradient
        style={styles.gradientOverlay}
      />
      <View style={styles.overlay}>
        <Text style={styles.text}>{'Sacred\nQuartet\nEvent'}</Text>
        <Text style={styles.caption}>{'Master the Four Guardians'}</Text>

        {/* Circle Layout */}
        <View style={styles.circleContainer}>
          <View style={styles.circleRow}>
            <TouchableOpacity
              style={styles.circleWrapper}
              onPress={
                () => navigation.navigate('GuardianDetails') // Navigate to ItemDetails screen
              }>
              <View style={[styles.circle, styles.sketchCircle]}>
                <Icon name="shield" size={35} color="brown" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.circleWrapper}
              onPress={
                () => navigation.navigate('GuardianDetails') // Navigate to ItemDetails screen
              }>
              <View style={[styles.circle, styles.sketchCircle]}>
                <Icon name="star" size={35} color="skyblue" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.circleRow}>
            <TouchableOpacity
              style={styles.circleWrapper}
              onPress={
                () => navigation.navigate('GuardianDetails') // Navigate to ItemDetails screen
              }>
              <View style={[styles.circle, styles.sketchCircle]}>
                <Icon name="fire" size={35} color="orange" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.circleWrapper}
              onPress={
                () => navigation.navigate('GuardianDetails') // Navigate to ItemDetails screen
              }>
              <View style={[styles.circle, styles.sketchCircle]}>
                <Icon name="bolt" size={35} color="gold" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* "Tips And Tricks" Text with Arrows */}
        <TouchableOpacity
          style={styles.tipsContainer}
          onPress={
            () => navigation.navigate('EventDetails') // Navigate to ItemDetails screen
          }>
          <Icon name="arrow-left" size={20} color="skyblue" />
          <Text style={styles.tipsText}>Know More</Text>
          <Icon name="arrow-right" size={20} color="gold" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    padding: 20,
    alignItems: 'center',
    zIndex: 3,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  text: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'PUBG Font, sans-serif',
    textTransform: 'uppercase',
  },
  caption: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Grechen-Fuemen',
  },
  circleContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 30,
    width: '100%',
  },
  circleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  circleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 90,
    marginHorizontal: 20,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sketchCircle: {
    backgroundColor: '#272f39',
    borderWidth: 0.5,
    borderColor: '#ffffff',
    borderRadius: 50,
  },
  tipsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  tipsText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});

export default SacredQuartetEvent;
