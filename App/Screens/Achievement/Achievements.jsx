import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import ReusableTabView from '../../Components/TabView';
import SearchBar from '../../Components/SearchBar';
import {useNavigation} from '@react-navigation/native';
import GradientBackground from '../../Components/GradientBackground';
import images from '../../themes/Images';
import FastImage from 'react-native-fast-image';
import CollapsibleTabView from '../../Components/TabBarCollapseble';

const {width} = Dimensions.get('window');

const Achievements = ({achievements, loading, handleQuery}) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'all', title: 'All'},
    {key: 'glorious_moments', title: 'Glorious Moments'},
    {key: 'matches', title: 'Matches'},
    {key: 'honor', title: 'Honor'},
    {key: 'progress', title: 'Progress'},
    {key: 'items', title: 'Items'},
    {key: 'social', title: 'Social'},
    {key: 'general', title: 'General'},
  ]);

  const [language, setLanguage] = useState('en'); // Default language is English
  const [loadingLanguage, setLoadingLanguage] = useState(false); // New state to handle language change loading
  const navigation = useNavigation();

  const renderScene = ({route}) => {
    if (loading || loadingLanguage) {
      // Show loading when achievements or language is loading
      return (
        <ActivityIndicator
          style={{padding: 100}}
          size="large"
          color="#e91e63"
        />
      );
    }

    // const filteredAchievements =
    //   route.key === 'all'
    //     ? achievements
    //     : achievements.filter(ach => ach.category === route.key);

    const filteredAchievements =
      route.key === 'all'
        ? achievements || []
        : (achievements || []).filter(ach => ach.category === route.key);

    return (
      <FlatList
        data={filteredAchievements}
        keyExtractor={(item, index) => `${route.key}-${index}`}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ItemDetails', {item, language})}
            style={styles.itemContainer}>
            <FastImage
              source={{
                uri: 'https://res.cloudinary.com/vny/image/upload/v1739896428/AchievementSkeliton_l2dkqc.png',
              }}
              style={{
                width: 60,
                height: 50,
              }}
            />

            <Text style={styles.itemText}>{item.name[language]}</Text>
            <View style={styles.inlineContainer}>
              <FastImage
                source={{
                  uri: 'https://res.cloudinary.com/vny/image/upload/v1739961906/points_vhi3dv.png',
                }}
                style={styles.inlineImage}
              />
              <Text style={styles.itemText}>{item.points}</Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={3}
      />
    );
  };

  const sceneMap = {};
  routes.forEach(route => {
    sceneMap[route.key] = renderScene;
  });

  const languages = [
    'en',
    'zh',
    'ko',
    'ja',
    'es',
    'ru',
    'fr',
    'de',
    'pt',
    'ar',
  ];

  const handleLanguageChange = lang => {
    setLoadingLanguage(true); // Start loading effect
    setLanguage(lang); // Set new language
    setTimeout(() => {
      setLoadingLanguage(false); // End loading effect after 1 second (or adjust time as needed)
    }, 1000);
  };

  return (
    <>
      {/* <SearchBar handleQuery={handleQuery} /> */}
      <GradientBackground>
        {/* <ScrollView
          style={{flexGrow: 0}}
          horizontal
          showsHorizontalScrollIndicator={false}>
          <View style={styles.languageSwitcher}>
            {languages.map(lang => (
              <TouchableOpacity
                key={lang}
                onPress={() => handleLanguageChange(lang)} // Use the new handleLanguageChange function
                style={[
                  styles.languageButton,
                  language === lang && styles.selectedLanguageButton,
                ]}>
                <Text
                  style={[
                    styles.languageText,
                    language === lang && styles.selectedLanguageText,
                  ]}>
                  {lang.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView> */}
        <CollapsibleTabView
          routes={routes}
          achievements={achievements}
          loading={loading}
        />
        {/* <ReusableTabView
          routes={routes}
          renderScene={renderScene}
          index={index}
          onIndexChange={setIndex}
        /> */}
      </GradientBackground>
    </>
  );
};

const styles = StyleSheet.create({
  languageSwitcher: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    height: 50,
  },
  languageButton: {
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selectedLanguageButton: {
    backgroundColor: '#e91e63',
    borderColor: '#e91e63',
  },
  languageText: {
    fontSize: 14,
    color: '#f3efef',
  },
  selectedLanguageText: {
    color: '#fff',
  },
  tabBar: {
    backgroundColor: '#2a2a2a',
  },
  indicator: {
    backgroundColor: '#e91e63',
  },
  label: {
    color: '#000',
    fontWeight: 'bold',
  },
  tabStyle: {
    width: 'auto',
    paddingHorizontal: 10,
  },
  itemContainer: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.3,
    borderColor: '#b09d21',
    padding: 10,
    margin: 10,
    aspectRatio: 1,
    backgroundColor: '#302d2d',
    overflow: 'hidden',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  itemText: {
    padding: 5,
    fontSize: 10,
    color: '#d5cece',
    fontWeight: 'bold',
    width: '100%', // Ensure text doesn't exceed its container
    textAlign: 'center', // Keep text centered
    overflow: 'hidden', // Hide overflow instead of wrapping
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inlineImage: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
    marginLeft: 5,
  },
});

export default Achievements;
