import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ItemDetails = ({route}) => {
  const {item} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item}</Text>
      {/* Add more details about the item here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ItemDetails;
