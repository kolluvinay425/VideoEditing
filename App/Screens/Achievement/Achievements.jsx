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
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import SearchBar from '../../Components/SearchBar';
import {useNavigation} from '@react-navigation/native';
import GradientBackground from '../../Components/GradientBackground';
import images from '../../themes/Images';
import FastImage from 'react-native-fast-image';

const {width} = Dimensions.get('window');

const Achievements = () => {
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
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('en'); // Default language is English
  const [loadingLanguage, setLoadingLanguage] = useState(false); // New state to handle language change loading
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch(
          'http://localhost:3001/api/achievements/all',
        );
        const data = await response.json();
        setAchievements(data.achievements);
        console.log('----------------------------->', data.achievements[0]);
      } catch (error) {
        console.error('Error fetching achievements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

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

    const filteredAchievements =
      route.key === 'all'
        ? achievements
        : achievements.filter(ach => ach.category === route.key);

    return (
      <FlatList
        data={filteredAchievements}
        keyExtractor={(item, index) => `${route.key}-${index}`}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ItemDetails', {item, language})}
            style={styles.itemContainer}>
            <FastImage
              source={images.achievement}
              style={{
                width: 60,
                height: 50,
              }}
            />
            <Text style={styles.itemText}>{item.name[language]}</Text>
            <View style={styles.inlineContainer}>
              <FastImage
                source={images.pointsIcon}
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
      <SearchBar />
      <GradientBackground>
        <ScrollView
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
        </ScrollView>

        <TabView
          navigationState={{index, routes}}
          renderScene={SceneMap(sceneMap)}
          onIndexChange={setIndex}
          initialLayout={{width}}
          renderTabBar={props => (
            <TabBar
              {...props}
              scrollEnabled
              indicatorStyle={styles.indicator}
              style={styles.tabBar}
              labelStyle={styles.label}
              tabStyle={styles.tabStyle}
              activeColor="#ffffff"
              inactiveColor="#f0e9e9"
            />
          )}
        />
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
    backgroundColor: '#363434',
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
