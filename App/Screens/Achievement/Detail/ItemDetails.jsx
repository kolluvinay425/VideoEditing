import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import ReusableTabView from '../../../Components/TabView';
import {SceneMap} from 'react-native-tab-view';
import GradientBackground from '../../../Components/GradientBackground';
import images from '../../../themes/Images';
const {width} = Dimensions.get('window');
import Requirement from './RequirementScreen';
import TipsScreen from './TipsAndTricks';
import FastImage from 'react-native-fast-image';
import TabBarCollapsibleDetail from '../../../Components/CollapsibleTabViewDetail';
import Item from './Item';
const ItemDetails = ({route}) => {
  const {item, language} = route.params;
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'info', title: 'Info'},
    {key: 'tips', title: 'Tips'},
  ]);

  return (
    <>
      <GradientBackground>
        <TabBarCollapsibleDetail
          index={index}
          onIndexChange={setIndex}
          routes={routes}
          data={route.params}
        />
      </GradientBackground>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  text1: {
    color: 'white',
    margin: 0,
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
  },
  text2: {
    color: 'white',
    paddingVertical: 5,
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
  },
  header1: {
    alignItems: 'center',
  },
  header2: {
    justifyContent: 'center',
  },
  achievementImage: {
    width: 150,
    height: 120,
    resizeMode: 'contain',
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inlineImageSmall: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    marginLeft: 5,
  },
  inlineImageLarge: {
    width: 100,
    height: 60,
    // resizeMode: 'contain',
    // marginLeft: 5,
  },
  tabBar: {
    backgroundColor: '#2a2a2a',
  },
  indicator: {
    backgroundColor: '#e91e63',
  },
  label: {
    color: '#e5e5ef',
    fontWeight: 'bold',
  },
  tabStyle: {
    width: 'auto',
    paddingHorizontal: 10,
  },
});

export default ItemDetails;
