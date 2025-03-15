import React, {useState, useEffect} from 'react';
import GradientBackground from '../../Components/GradientBackground';
import TabBarCollapsible from '../../Components/CollapsibleTabViewAchievements';
import CollapsibleTabViewExample from '../../Components/ExampleCollapsible';

const Achievements = () => {
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
        <TabBarCollapsible routes={routes} />
        {/* <CollapsibleTabViewExample /> */}
      </GradientBackground>
    </>
  );
};

export default Achievements;
