import React, {useState} from 'react';
import {
  Animated,
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  Text,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('window');

const HEADER_EXPANDED_HEIGHT = height * 0.3;
const HEADER_COLLAPSED_HEIGHT = height * 0.15;

const SearchBar = ({handleQuery, scrollY}) => {
  console.log('from searchbar-------->', scrollY);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = text => {
    setInputValue(text);
    if (handleQuery) {
      handleQuery(text);
    }
  };

  // Animate header height based on scroll position
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
    extrapolate: 'clamp',
  });

  // Opacity effect for title
  const titleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.container, {height: headerHeight}]}>
      <ImageBackground
        source={{
          uri: 'https://wallpapers.com/images/high/man-pubg-lite-character-poster-pgj9qxp3jiv28gg2.webp',
        }}
        style={styles.backgroundImage}>
        <View style={styles.overlay} />
        <Animated.View
          style={[styles.achievementsContainer, {opacity: titleOpacity}]}>
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
    overflow: 'hidden',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  achievementsContainer: {
    alignItems: 'flex-start',
    width: width * 0.7,
    marginBottom: 10,
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
    backgroundColor: 'transparent',
    color: '#000',
  },
  filterIcon: {
    marginLeft: 10,
  },
});

export default SearchBar;
