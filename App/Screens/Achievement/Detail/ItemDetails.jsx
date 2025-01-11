import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Guns from '../../../Components/Guns';
import GradientBackground from '../../../Components/GradientBackground';
import images from '../../../themes/Images';
const {width} = Dimensions.get('window');
import Requirement from './RequirementScreen';
const ItemDetails = ({route}) => {
  const {item} = route.params;
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'info', title: 'Info'},
    // {key: 'weapons', title: 'Weapons'},
    {key: 'tips', title: 'Tips'},
  ]);

  const renderScene = SceneMap({
    info: Requirement,
    // weapons: WeaponsScreen,
    tips: TipsScreen,
  });

  return (
    <>
      <GradientBackground>
        <View style={styles.headerContainer}>
          <View style={styles.header1}>
            <Image
              source={images.achievement}
              style={styles.achievementImage}
            />
            <Text style={styles.text1}>sharpshooter</Text>
          </View>

          <View style={styles.header2}>
            <Text style={styles.text2}>Hardness: Medium</Text>
            <View style={styles.inlineContainer}>
              <Text style={styles.text2}>Achievement points: 60</Text>
              <Image
                source={images.pointsIcon}
                style={styles.inlineImageSmall}
              />
            </View>
            <View style={styles.inlineContainer}>
              <Text style={styles.text2}>Title:</Text>
              <Image
                source={images.sharpshooter}
                style={styles.inlineImageLarge}
              />
            </View>
          </View>
        </View>

        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width}}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={styles.indicator}
              style={styles.tabBar}
              labelStyle={styles.label}
              tabStyle={styles.tabStyle}
              activeColor="#ffffff"
              inactiveColor="#f0e9e9"
            />
          )}
        />
        {/* <Guns /> */}
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
    height: 100,
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
    height: 50,
    resizeMode: 'contain',
    marginLeft: 5,
  },
  backgroundImage: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 10,
  },
  tabBar: {
    backgroundColor: '#302D2D',
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
  tabContent: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  tabText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },
});

export default ItemDetails;
