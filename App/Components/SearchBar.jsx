import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  Text,
  Dimensions,
  Animated,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('window');

const SearchBar = ({handleQuery, scrollY}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = text => {
    setInputValue(text);
    if (handleQuery) {
      handleQuery(text);
    }
  };

  const containerHeight = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [height * 0.3, height * 0.15], // Shrinks the entire search bar container
    extrapolate: 'clamp',
  });

  const textOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0], // Fades out text
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.container, {height: containerHeight}]}>
      <ImageBackground
        source={{
          uri: 'https://wallpapers.com/images/high/man-pubg-lite-character-poster-pgj9qxp3jiv28gg2.webp',
        }}
        style={styles.backgroundImage}>
        <View style={styles.overlay} />
        <Animated.View
          style={[styles.achievementsContainer, {opacity: textOpacity}]}>
          <Text style={styles.achievementsText}>Achievements</Text>
        </Animated.View>
        <View style={styles.searchContainer}>
          <MaterialIcons
            name="search"
            size={20}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            value={inputValue}
            onChangeText={handleInputChange}
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
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.7,
    height: height * 0.05,
    backgroundColor: 'rgba(243, 238, 238, 0.8)',
    borderRadius: 25,
    paddingHorizontal: 10,
    elevation: 5,
    position: 'absolute',
    bottom: 20,
  },
  achievementsContainer: {
    position: 'absolute',
    top: 30,
    alignItems: 'center',
  },
  achievementsText: {
    fontSize: 30,
    color: '#f6f3f3',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: '#000',
  },
  filterIcon: {
    marginLeft: 10,
  },
});

export default SearchBar;
