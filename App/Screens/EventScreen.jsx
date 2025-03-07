import GradientBackground from '../Components/GradientBackground';
import {StyleSheet, View, Text} from 'react-native';
function EventsScreen() {
  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={{color: 'white'}}>screen 2</Text>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  gradient: {flex: 1},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default EventsScreen;
