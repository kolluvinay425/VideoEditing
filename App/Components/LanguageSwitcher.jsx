import React from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

const languages = ['en', 'zh', 'ko', 'ja', 'es', 'ru', 'fr', 'de', 'pt', 'ar'];

const LanguageSwitcher = ({language, setLanguage}) => {
  const handleLanguageChange = lang => {
    setLanguage(lang);
  };

  return (
    <ScrollView
      style={{flexGrow: 0}}
      horizontal
      showsHorizontalScrollIndicator={false}>
      <View style={styles.languageSwitcher}>
        {languages.map(lang => (
          <TouchableOpacity
            key={lang}
            onPress={() => handleLanguageChange(lang)}
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
});

export default LanguageSwitcher;
