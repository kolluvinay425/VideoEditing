import {View, Text, Button, StyleSheet, PanResponder} from 'react-native';
import Video from 'react-native-video';
import FFmpeg from 'ffmpeg-kit-react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useState, useEffect} from 'react';
import {FFmpegKit, FFmpegKitConfig, ReturnCode} from 'ffmpeg-kit-react-native';
import RNFS from 'react-native-fs';
import {resolveAssetSource} from 'react-native';
export function HomeScreen({reset}) {
  const [videoUri, setVideoUri] = useState(null);
  const [processedVideoUri, setProcessedVideoUri] = useState(null);
  const [xPosition, setXPosition] = useState(5);
  const [yPosition, setYPosition] = useState(5);

  const selectVideo = async () => {
    // setProcessedVideoUri(null);
    try {
      const res = await ImagePicker.openPicker({
        mediaType: 'video',
        cropping: false,
      });

      if (!res.path) {
        console.log('User cancelled the picker');
        return;
      }

      setVideoUri(res.path);
      // console.log('uploaded video--------->', res.path);
    } catch (err) {
      console.error('Error selecting video:', err);
    }
  };

  const addTextToVideo = async () => {
    if (!videoUri) {
      console.log('No video selected');
      return;
    }
    const timestamp = Date.now(); // Get the current timestamp
    const uniqueFilename = `output_video_with_text_${timestamp}.mp4`;
    const outputFilePath = `${RNFS.CachesDirectoryPath}/${uniqueFilename}`;
    // let outputImagePath = `${RNFS.CachesDirectoryPath}/${localFileName}_%4d.png`;
    const fonts = {
      arial: '../../assets/fonts/font.ttf', // Update this path to the correct font file
    };

    FFmpegKitConfig.setFontDirectory('/system/fonts'); // Register system fonts directory

    const x_position = 5;

    const y_position = 7;

    const command = `-i ${videoUri} -vf "[in]drawtext=fontfile=${fonts.arial}:text='Hey Pichi managed to add a text overlay':fontsize=(h/30):fontcolor=white:x=${x_position}:y=${y_position}" ${outputFilePath}`;

    console.log('FFmpeg command:------------->', command); // Log the FFmpeg command  (w-text_w)/text_w

    try {
      FFmpegKit.executeAsync(
        command,
        async session => {
          const state = FFmpegKitConfig.sessionStateToString(
            await session.getState(),
          );
          const returnCode = await session.getReturnCode();
          const failStackTrace = await session.getFailStackTrace();
          const duration = await session.getDuration();

          if (ReturnCode.isSuccess(returnCode)) {
            console.log(
              `Encode completed successfully in ${duration} milliseconds.`,
            );
            setProcessedVideoUri(`file://${outputFilePath}`);
            // alert('Video processed successfully');
            console.log(`Check at ${outputFilePath}`);
          } else {
            console.log('Encode failed. Please check log for details.');
            console.log(
              `Encode failed with state ${state} and rc ${returnCode}.`,
            );
            if (failStackTrace) {
              console.log(failStackTrace);
            }
            errorCallback(); // Call the error callback
          }
        },
        log => {
          console.log(log.getMessage()); // Log FFmpeg execution messages
        },
        statistics => {
          console.log(statistics); // Log FFmpeg statistics
        },
      ).then(session =>
        console.log(
          `Async FFmpeg process started with sessionId ${session.getSessionId()}.`,
        ),
      );
    } catch (error) {
      console.error('Error running FFmpeg command:', error);
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      const newX = Math.max(
        0,
        Math.min(gestureState.moveX, window.innerWidth - 100),
      ); // Adjust the bounds
      const newY = Math.max(
        0,
        Math.min(gestureState.moveY, window.innerHeight - 50),
      ); // Adjust the bounds
      setXPosition(newX);
      setYPosition(newY);
    },
  });

  const processedVideo = () => {
    console.log('uploaded video URI path', videoUri);

    console.log('Processed video URI from func:', processedVideoUri);
    return (
      <View>
        <Video
          source={{uri: processedVideoUri}}
          style={styles.video1}
          controls={true}
        />
        <Button title="reset" onPress={resetProject} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Select Video" onPress={selectVideo} />
      {videoUri && !processedVideoUri && (
        <>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                position: 'absolute',
                left: xPosition,
                top: yPosition,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: 10,
              }}
              {...panResponder.panHandlers}>
              <Text style={{color: 'white'}}>
                Hey there i am trying to add a text overlay on a video
              </Text>
            </View>
          </View>
          <Video
            source={{uri: videoUri}}
            style={styles.video}
            controls={true}
          />
          <Button title="Add Text to Video" onPress={addTextToVideo} />
        </>
      )}
      {processedVideoUri && processedVideo()}
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
