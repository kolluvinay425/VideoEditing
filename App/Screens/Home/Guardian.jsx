import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const GuardianDetails = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Event Details Page</Text>
      <Text style={styles.subText}>Here is the content for this event.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#363434',
    padding: 20,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    color: '#f0e9e9',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default GuardianDetails;
