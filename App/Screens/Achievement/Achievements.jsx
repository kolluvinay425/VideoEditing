import React, {useState, useEffect} from 'react';
import GradientBackground from '../../Components/GradientBackground';
import TabBarCollapsible from '../../Components/CollapsibleTabView';
import {SearchBar} from 'react-native-screens';

const Achievements = ({achievements, loading, handleQuery}) => {
  console.log('achss-------->', achievements);
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
          data={achievements}
          loading={loading}
          handleQuery={handleQuery}
          headerName="SearchBar"
        />
      </GradientBackground>
    </>
  );
};

export default Achievements;
