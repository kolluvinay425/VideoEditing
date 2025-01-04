import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  Text,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const SearchBar = () => {
  return (
    <ImageBackground
      source={{
        uri: 'https://wstatic-prod-boc.krafton.com/common/content/news/20241203/0SbOi7H9_thumb.jpg',
      }}
      style={styles.backgroundImage}>
      <View style={styles.overlay} />
      <View style={styles.achievementsContainer}>
        <Text style={styles.achievementsText}>Achievements</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Type Here..."
          placeholderTextColor="#888"
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    height: height * 0.3, // Adjusted to ensure it maintains a reasonable height
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adjust blur effect as needed
  },
  searchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.8,
    height: height * 0.06, // Maintain the height
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust the background of the search bar
    borderRadius: 25, // Increase the radius as needed
    position: 'relative',
    marginBottom: 0, // Ensure no margin at the bottom
  },
  achievementsContainer: {
    borderRadius: 8,
    padding: 5,
    textAlign: 'left',
    marginBottom: 0, // Ensure no margin at the bottom
  },
  achievementsText: {
    fontSize: 20, // Increased font size
    color: '#f6f3f3',
  },
  searchInput: {
    width: '100%',
    height: '100%',
    paddingLeft: 10,
    color: '#000',
  },
});

export default SearchBar;
