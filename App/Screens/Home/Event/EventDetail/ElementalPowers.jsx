import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
const ElementalPowers = ({event}) => {
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation();

  const handleComplete = () => {
    alert('Marked as Complete!');
  };

  const powers = event.features.elemental_powers.abilities;

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.contentContainerStyle}>
      <Text style={styles.descriptionText}>
        {event.features.elemental_powers.description}
      </Text>

      {/* <Text style={styles.heading}>Elemental Powers</Text> */}
      <View style={styles.container}>
        {powers.map((ability, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => navigation.navigate('GuardianDetails', {ability})}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleHead}>{ability.name.en}</Text>
            </View>

            <Text style={styles.descriptionText}>{ability.effect.en}</Text>
            <Image
              source={{
                uri: 'https://wstatic-prod.pubg.com/web/live/main_9c958eb/img/05ea3d0.jpg',
              }}
              style={styles.powerImage}
            />
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.button} onPress={handleComplete}>
          <Text style={styles.buttonText}>Mark as Complete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    elevation: 10, // Android shadow
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    paddingBottom: 20,
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  contentContainerStyle: {
    paddingBottom: 50,
  },
  descriptionText: {
    color: '#f5f4f4',
    fontSize: 16,
    paddingVertical: 10,
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 16,
    marginLeft: 10, // Aligning to the left
  },
  item: {
    backgroundColor: 'transparent', // Dark background for the item
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    borderWidth: 0.8,
    borderColor: '#b49415',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10, // Android shadow
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 70,
    height: 60,
    marginLeft: 10,
    borderRadius: 10,
  },
  icon: {
    paddingBottom: 8,
    marginLeft: 10,
  },
  powerImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  title: {
    paddingTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    flexWrap: 'wrap',
  },
  titleHead: {
    paddingTop: 5,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    flexWrap: 'wrap',
  },
  content: {
    padding: 10,
    flex: 1,
  },
});

export default ElementalPowers;
