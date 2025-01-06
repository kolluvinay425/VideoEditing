import React from 'react';
import images from '../themes/Images';
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';

const Guns = () => {
  const imagePaths = images.guns.ar.all;
  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.imageContainer}>
      <Image source={item} style={styles.image} />
      <Text style={styles.text}>akm</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={imagePaths}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false} // Hides the vertical scroll indicator
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  text: {
    color: 'white',
    fontSize: 15,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 5,
    textAlign: 'center',
  },
  contentContainer: {
    paddingBottom: 20, // Adds padding to the bottom of the list
  },
  imageContainer: {
    flex: 1,
    margin: 5,
    aspectRatio: 1,
    backgroundColor: '#3c3939',
    overflow: 'hidden',
    padding: 5,
    borderRadius: 15,
    position: 'relative', // Add shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2, // Add elevation for Android
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default Guns;
