import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import images from '../../themes/Images';
import GradientBackground from '../../Components/GradientBackground';
const InfoScreen = () => {
  return (
    <GradientBackground>
      <View style={styles.container}>
        {/* <View style={styles.header}>
        <Image source={images.sharpshooter} style={styles.icon} />
        <Text style={styles.title}>Sharpshooter</Text>
      </View> */}
        <Text style={styles.description}>
          Earn the Sharpshooter title by showcasing your sniping skills in PUBG
          Mobile.
        </Text>
        <Text style={styles.subtitle}>How to Earn:</Text>
        <View style={styles.requirements}>
          <Text style={styles.requirement}>1. Solo Classic match</Text>
          <Text style={styles.requirement}>2. Platinum tier or higher</Text>
          <Text style={styles.requirement}>
            3. Kill three enemies with headshots using a sniper rifle
          </Text>
          <Text style={styles.requirement}>
            4. Consecutive kills without missing
          </Text>
          <Text style={styles.requirement}>
            5. Distance of at least 50 meters
          </Text>
        </View>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  description: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 5,
  },
  requirements: {
    marginLeft: 10,
  },
  requirement: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
});

export default InfoScreen;
