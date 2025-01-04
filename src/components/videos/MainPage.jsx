import {View, Text, Button, StyleSheet, PanResponder} from 'react-native';
import Video from 'react-native-video';
import FFmpeg from 'ffmpeg-kit-react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useState, useEffect} from 'react';
import {FFmpegKit, FFmpegKitConfig, ReturnCode} from 'ffmpeg-kit-react-native';
import RNFS from 'react-native-fs';
import {resolveAssetSource} from 'react-native';
export function MainScreen() {
  //   const [videoUri, setVideoUri] = useState(null);
  //   const [processedVideoUri, setProcessedVideoUri] = useState(null);
  //   const [xPosition, setXPosition] = useState(5);
  //   const [yPosition, setYPosition] = useState(5);

  return (
    <View style={styles.container}>
      <>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              position: 'absolute',
              left: xPosition,
              top: yPosition,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: 10,
            }}>
            <Text style={{color: 'white'}}>
              Hey there i am trying to add a text overlay on a video
            </Text>
          </View>
        </View>
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: 700,
    height: 500,
  },
  video1: {
    width: 800,
    height: 600,
  },
});
