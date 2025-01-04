import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker'; // For selecting videos
import FFmpeg from 'ffmpeg-kit-react-native'; // For video cropping
import Video from 'react-native-video';
const MyVideoCropComponent = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videoURI = selectedVideo ? selectedVideo.path : null;

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

  const handleVideoPicker = async () => {
    try {
      const video = await ImagePicker.openPicker({
        mediaType: 'video', // Specify video media type
        cropping: false, // Disable cropping for video selection
      });
      console.log('Selected video path:', video.path);
      setSelectedVideo(video);
    } catch (error) {
      console.error('Error selecting video:', error);
    }
  };

  return (
    <View>
      {selectedVideo ? (
        <View>
          <VideoPreview videoURI={videoURI} />
          <Text>Video Selected </Text>
        </View>
      ) : (
        <Text>No video selected</Text>
      )}

      <TouchableOpacity onPress={handleVideoPicker}>
        <Text>Select Video</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyVideoCropComponent;
