import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import GradientBackground from '../../Components/GradientBackground';
import TabBarCollapsible from '../../Components/CollapsibleTabView';

const Achievements = ({achievements, loading, handleQuery}) => {
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
        />
      </GradientBackground>
    </>
  );
};

export default Achievements;
