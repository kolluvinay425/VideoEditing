import React from 'react';
import Video from 'react-native-video';
import {View, StyleSheet} from 'react-native';

const VideoPreview = ({videoURI}) => {
  console.log('from preview------>', videoURI);
  return (
    <View style={styles.container}>
      <Video
        source={{uri: videoURI || require('./videos/1000011615.mp4')}} // Use the provided URI or fallback to a local file
        style={styles.backgroundVideo}
        resizeMode="cover"
        controls={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default VideoPreview;
