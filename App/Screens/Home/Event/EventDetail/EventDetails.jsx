import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ReusableTabView from '../../../../Components/TabView';
import GradientBackground from '../../../../Components/GradientBackground';
import ElementalPowers from './ElementalPowers';
import EventInformation from './EventInfo';

const FirstRoute = ({event}) => (
  <GradientBackground>
    <View style={styles.container}>
      <Text style={styles.text}>{event?.name || 'No Event Name'}</Text>
    </View>
  </GradientBackground>
);

const SecondRoute = ({event}) => (
  <GradientBackground>
    <View style={styles.container}>
      <Text style={styles.text}>Second Tab Content</Text>
    </View>
  </GradientBackground>
);

const EventDetails = ({route}) => {
  const {params: event} = route;
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Event Info'},
    {key: 'second', title: 'Elemental Powers'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <EventInformation event={event} />;
      case 'second':
        return <ElementalPowers event={event} />;
      default:
        return null;
    }
  };

  return (
    <GradientBackground>
      <ReusableTabView
        routes={routes}
        renderScene={renderScene}
        index={index}
        onIndexChange={setIndex}
      />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  indicator: {
    backgroundColor: '#e91e63',
  },
  tabBar: {
    backgroundColor: '#2a2a2a',
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tabStyle: {
    width: 'auto',
    paddingHorizontal: 10,
  },
});

export default EventDetails;
