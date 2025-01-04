import {initialWindowMetrics} from 'react-native-safe-area-context';
import {Platform} from 'react-native';

const isIOS = Platform.OS === 'ios';

export const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  tripleBaseMargin: 30,
  quadrupleBaseMargin: 40,
  eightBaseMargin: 80,
  smallMargin: 5,
  horizontalLineHeight: 1,
  searchBarHeight: 30,

  usableHeight: isIOS
    ? initialWindowMetrics.frame.height -
      initialWindowMetrics.insets.top -
      initialWindowMetrics.insets.bottom
    : initialWindowMetrics.frame.height,

  tabBarHeight: 48, // (Platform.OS === 'ios') ? 45 : 50,
  tabBarHeightCustom: 54,
  buttonRadius: 4,

  avBottomHeight: 140,
  icons: {
    tiny: 15,
    small: 23,
    regular: 28,
    normal: 30,
    medium: 34,
    large: 45,
    xl: 75,
    xxl: 112,
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 300,
  },
};
