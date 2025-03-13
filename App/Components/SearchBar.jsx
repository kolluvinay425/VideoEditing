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

const SearchBar = ({handleQuery, scrollY, headerHeight}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = text => {
    setInputValue(text);
    if (handleQuery) {
      handleQuery(text);
    }
  };

  const height = scrollY.interpolate({
    inputRange: [0, 1, headerHeight],
    outputRange: [0, 0, -headerHeight + 150],
    extrapolateRight: 'clamp',
  });

  const searchTranslateY = scrollY.interpolate({
    inputRange: [0, 1, headerHeight],
    outputRange: [0, 0, headerHeight - 230],
    extrapolateRight: 'clamp',
  });

  const textOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0], // Fades out text
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[styles.container, {transform: [{translateY: height}]}]}>
      <ImageBackground
        source={{
          uri: 'https://wallpapers.com/images/high/man-pubg-lite-character-poster-pgj9qxp3jiv28gg2.webp',
        }}
        style={[styles.backgroundImage]}>
        <View style={styles.overlay} />
        <Animated.View
          style={[styles.achievementsContainer, {opacity: textOpacity}]}>
          <Text style={styles.achievementsText}>Achievements</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.searchContainer,
            {transform: [{translateY: searchTranslateY}]},
          ]}>
          <MaterialIcons
            name="search"
            size={30}
            color="#000000"
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
            size={30}
            color="#000000"
            style={styles.filterIcon}
          />
        </Animated.View>
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    height: 300,
    width: '100%',
    // backgroundColor: '#40C4FF',
    // alignItems: 'center',
    // justifyContent: 'center',
    position: 'absolute',
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
    width: width * 0.87,
    height: height * 0.053,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 25,
    paddingHorizontal: 10,
    elevation: 5,
    alignSelf: 'center', // Centers the search bar horizontally
    marginTop: 10, // Adds spacing below the achievements text
  },
  achievementsContainer: {
    alignItems: 'flex-start', // Centers text horizontally
    width: width * 0.7,
    marginBottom: 0, // Removes bottom margin
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
