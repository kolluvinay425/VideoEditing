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
import {useEffect, useState} from 'react';

const SacredQuartetEvent = () => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const url = `https://pubg-guides.onrender.com/api/events/4`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          console.log('Data:', data);
          setEvent(data);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchData();
  }, []); // Add dependencies as needed

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
          {event && event.features?.elemental_powers?.abilities && (
            <>
              <View style={styles.circleRow}>
                {event.features.elemental_powers.abilities
                  .slice(0, 2)
                  .map((ability, index) => (
                    <TouchableOpacity key={index} style={styles.circleWrapper}>
                      <View style={[styles.circle, styles.sketchCircle]}>
                        <Icon
                          name={'star'} // Assuming each ability has an `icon` property
                          size={35}
                          color={'gold'} // Assuming each ability has a `color` property
                        />
                      </View>
                    </TouchableOpacity>
                  ))}
              </View>

              <View style={styles.circleRow}>
                {event.features.elemental_powers.abilities
                  .slice(2, 4)
                  .map((ability, index) => (
                    <TouchableOpacity key={index} style={styles.circleWrapper}>
                      <View style={[styles.circle, styles.sketchCircle]}>
                        <Icon
                          name={'fire'} // Assuming each ability has an `icon` property
                          size={35}
                          color={'red'} // Assuming each ability has a `color` property
                        />
                      </View>
                    </TouchableOpacity>
                  ))}
              </View>
            </>
          )}
        </View>

        {/* "Tips And Tricks" Text with Arrows */}
        <TouchableOpacity
          style={styles.knowMoreButton}
          onPress={() => navigation.navigate('EventDetails', event)}>
          {/* <Icon name="arrow-left" size={20} color="skyblue" /> */}
          <Text style={styles.tipsText}>Unlock Event Secrets</Text>
          {/* <Icon name="arrow-right" size={20} color="gold" /> */}
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
  knowMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#272f39',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 30,
    shadowColor: '#e7e0e2',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
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
    borderWidth: 0.1,
    borderColor: '#ffffff',
    borderRadius: 50,
    shadowColor: '#e7e0e2',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
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
