import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const EventInformation = ({event}) => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.scrollContainer}>
      <Text style={styles.descriptionText}>{event.description}</Text>

      <Text style={styles.heading}>Event Features:</Text>
      <View style={styles.container}>
        {event.features.event_locations.locations.map((feature, index) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('EventLocations', {feature})}
            key={index}
            style={styles.item}>
            <Text style={styles.featureTitle}>{feature.name.en}</Text>
            {/* <Text style={styles.featureDescription}>
              {feature.description.en}
            </Text> */}
            <Image
              source={{
                uri: 'https://wstatic-prod.pubg.com/web/live/main_9c958eb/img/05ea3d0.jpg',
              }}
              style={styles.image}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
  },
  descriptionText: {
    color: '#f5f4f4',
    fontSize: 16,
    marginBottom: 20,
  },
  container: {
    marginBottom: 20,
  },
  item: {
    backgroundColor: 'transparent',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    borderWidth: 0.8,
    borderColor: '#b49415',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  featureTitle: {
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  featureDescription: {
    color: '#f5f4f4',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#3A3A3A',
    padding: 15,
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 30,
    width: '70%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EventInformation;
