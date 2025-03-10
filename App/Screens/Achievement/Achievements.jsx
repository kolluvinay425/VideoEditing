import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import GradientBackground from '../../Components/GradientBackground';
import TabBarCollapsible from '../../Components/CollapsibleTabView';
import CollapsibleTabViewExample from '../../Components/ExampleCollapsible';

const Achievements = ({
  achievements,
  loading,
  handleQuery,
  handleEndReached,
}) => {
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

  return (
    <>
      <GradientBackground>
        <TabBarCollapsible
          routes={routes}
          achievements={achievements}
          loading={loading}
          handleQuery={handleQuery}
          indexA={index}
          onIndexChange={setIndex}
          handleEndReached={handleEndReached}
        />
        {/* <CollapsibleTabViewExample/> */}
      </GradientBackground>
    </>
  );
};

export default Achievements;
