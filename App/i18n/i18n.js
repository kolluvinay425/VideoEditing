import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANG_STORAGE_KEY = 'user-language';

const getDeviceLanguage = () => {
  const locales = RNLocalize.getLocales();
  if (locales.length > 0) {
    return locales[0].languageCode;
  }
  return 'en'; // Default to English if no locale is found
};

const fetchTranslations = async language => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/translations/${language}`,
    );
    const data = await response.json();
    return data.translations || {};
  } catch (error) {
    console.error('Error fetching translations:', error);
    return {};
  }
};

const loadLanguageFromStorage = async () => {
  try {
    const storedLanguage = await AsyncStorage.getItem(LANG_STORAGE_KEY);
    return storedLanguage || getDeviceLanguage();
  } catch (error) {
    console.error('Error loading language from storage:', error);
    return getDeviceLanguage();
  }
};

const saveLanguageToStorage = async language => {
  try {
    await AsyncStorage.setItem(LANG_STORAGE_KEY, language);
  } catch (error) {
    console.error('Error saving language to storage:', error);
  }
};

const setupI18n = async () => {
  const language = await loadLanguageFromStorage();
  const translations = await fetchTranslations(language);

  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: language,
    fallbackLng: 'en',
    resources: {
      [language]: {translation: translations},
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });
};

export const setLanguage = async language => {
  const translations = await fetchTranslations(language);
  i18n.addResourceBundle(language, 'translation', translations, true, true);
  i18n.changeLanguage(language);
  await saveLanguageToStorage(language);
};

export default setupI18n;
