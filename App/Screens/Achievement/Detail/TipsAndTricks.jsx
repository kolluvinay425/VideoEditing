import React from 'react';
import {ScrollView, View, Text, Image, StyleSheet} from 'react-native';
import images from '../../themes/Images';
import GradientBackground from '../../Components/GradientBackground';

const TipsScreen = () => (
  <GradientBackground>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.tabContent}>
        <Text style={styles.tabText}>
          To complete the Sharpshooter achievement in PUBG Mobile, you need to
          achieve a specific number of head shots with firearms. Here are some
          effective strategies to help you accomplish this:
        </Text>

        <Text style={styles.tabText}>
          1{')'} Select the Right Weapons:- Use weapons with high accuracy and
          damage, such as the AWM, Kar98k, M24, or M416 with a scope. Sniper
          rifles are particularly effective for head shots.
        </Text>

        <Image
          source={{
            uri: 'https://static.toiimg.com/thumb/resizemode-4,msid-66307460,width-1200,height-900/66307460.jpg',
          }}
          style={styles.image}
        />
        <Text style={styles.tabText}>
          2{')'} Use Scopes:- Equip scopes (like 4x or 8x) to improve your
          aiming precision. This is crucial for long-range shots.
        </Text>

        <Image
          source={{
            uri: 'https://img2.tapimg.net/post/etag/FhFGPEq4eQ5NL0P5kHoUuP2ZWYJB.jpg?imageMogr2/thumbnail/720x9999%3E/quality/80/format/jpg/interlace/1/ignore-error/1&t=1https://preview.redd.it/1kkblvgv3qn01.png?auto=webp&s=fcf501ea4d4b4a75c7a2acbb13d951bc44980338',
          }}
          style={styles.image}
        />
        <Text style={styles.tabText}>
          3{')'} Practice in Training Mode:- Spend time in the training grounds
          to improve your aim. Practice shooting at targets to get a feel for
          bullet drop and travel time.
        </Text>

        <Image
          source={{
            uri: 'https://www.vgr.com/wp-content/uploads/2018/04/trainingrounds-533x300.jpeg',
          }}
          style={styles.image}
        />
        <Text style={styles.tabText}>
          4{')'} Aim for the Head: - Always aim for the head when engaging
          enemies. This may take some practice, but consistent headshots will
          help you reach the achievement faster.
        </Text>

        <Image
          source={{
            uri: 'https://i.ytimg.com/vi/XJvfBhSqJ24/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDcqqU-QmkxIA22c96LYRm6W_mf0A',
          }}
          style={styles.image}
        />
        <Text style={styles.tabText}>
          5{')'} Utilize Vehicles for Positioning:- Use vehicles to get to high
          ground or advantageous positions where you can spot enemies easily and
          take headshots.
        </Text>

        <Image
          source={{
            uri: 'https://i.ytimg.com/vi/tUsaHuAlGrI/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgYihKMA8=&rs=AOn4CLBBqGM2QvAevNwE2HDEHSz-wMUpQw',
          }}
          style={styles.image}
        />
      </View>
    </ScrollView>
  </GradientBackground>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // padding: 10,
  },
  tabContent: {
    padding: 10,
    // borderRadius: 10,
  },
  tabText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#f3eeee',
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
    lineHeight: 24,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 10,
  },
});

export default TipsScreen;
