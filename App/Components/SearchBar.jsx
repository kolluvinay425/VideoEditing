import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  Text,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('window');

const SearchBar = () => {
  return (
    <ImageBackground
      source={{
        uri: 'https://wallpapers.com/images/high/man-pubg-lite-character-poster-pgj9qxp3jiv28gg2.webp',
      }}
      style={styles.backgroundImage}>
      <View style={styles.overlay} />
      <View style={styles.achievementsContainer}>
        <Text style={styles.achievementsText}>Achievements</Text>
      </View>
      <View style={styles.searchContainer}>
        <MaterialIcons
          name="search"
          size={20}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Type Here..."
          placeholderTextColor="#888"
        />
        <MaterialIcons
          name="filter-list"
          size={20}
          color="#888"
          style={styles.filterIcon}
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
    flexDirection: 'row', // Adjust to align the icon and text input
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.7,
    height: height * 0.05, // Maintain the height
    backgroundColor: 'rgba(243, 238, 238, 0.8)', // Adjust the background of the search bar
    borderRadius: 25, // Increase the radius as needed
    position: 'relative',
    marginBottom: 0, // Ensure no margin at the bottom
    paddingHorizontal: 10, // Add padding to align icon and input

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2, // Add elevation for Android
    elevation: 5,
  },
  achievementsContainer: {
    alignItems: 'flex-start', // Align the text to the start
    width: width * 0.7, // Match the width of the search bar
    marginBottom: 10,
  },
  achievementsText: {
    fontSize: 30, // Increased font size
    color: '#f6f3f3',
    fontWeight: 'bold',
    fontFamily: 'italic',
  },
  searchIcon: {
    marginRight: 10, // Add margin to separate icon from input
  },
  searchInput: {
    flex: 1,
    height: '100%',
    // color: '#000',
    backgroundColor: 'transparent', // Ensure the background is transparent
  },
  filterIcon: {
    marginLeft: 10, // Add margin to separate input from filter icon
  },
});

export default SearchBar;
