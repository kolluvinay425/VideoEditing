import {View, Text, StyleSheet} from 'react-native';

const navStyles = StyleSheet.create({
  navbar: {
    position: 'fixed',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f0f0f0',
    width: '100%',
  },
});

export const FixedTopNavbar = () => {
  return (
    <View style={navStyles.navbar}>
      <Text>Home</Text>
      <Text>Settings</Text>
    </View>
  );
};
