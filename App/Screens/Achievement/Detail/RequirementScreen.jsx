import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GradientBackground from '../../Components/GradientBackground';
import images from '../../themes/Images';

const RequirementItem = ({title, logo, icon, children}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.item}>
      <View style={styles.titleContainer}>
        <View style={styles.bulletContainer}>
          <View style={styles.bullet}></View>
          <View
            style={
              expanded ? styles.bulletLineExpanded : styles.bulletLine
            }></View>
        </View>
        <Text style={styles.title}>{title}</Text>
        {logo && (
          <Image
            style={{width: 70, height: 60, marginLeft: 10}}
            source={logo}
          />
        )}
        {icon && (
          <Icon name={icon} style={{paddingLeft: 10}} size={50} color="#fff" />
        )}
      </View>

      <View style={styles.expandedContent}>
        <View style={styles.bulletSpacer}>
          <View style={styles.bulletLineExpanded}></View>
        </View>
        <View style={styles.content}>{children}</View>
      </View>
    </View>
  );
};

const RequirementScreen = () => {
  const handleComplete = () => {
    alert('Marked as Complete!');
  };
  return (
    <ScrollView
      style={styles.ScrollContainer}
      contentContainerStyle={styles.contentContainerStyle}>
      <Text style={styles.descriptionText}>
        Without missing a single shot, eliminate 3 enemies 50 meters away in a
        row by headshot, while in a Solo Classic match in Platinum tier or above
      </Text>

      <View style={styles.container}>
        <Text style={styles.descriptionText}></Text>
      </View>

      <Text style={styles.heading}>Requirements</Text>
      <View style={styles.container}>
        <RequirementItem title="Solo Classic Match" icon={'person'}>
          <Text style={styles.descriptionText}>
            Ensure that you are participating in a Solo Classic match. This
            challenge cannot be completed in Duo or Squad modes.
          </Text>
        </RequirementItem>
        <RequirementItem
          title="Platinum Tier Or higher"
          logo={images.platinumTier}>
          <Text style={styles.descriptionText}>
            You must be ranked at Platinum tier or higher. This ensures that you
            are playing against tougher opponents, making the achievement more
            challenging and rewarding.
          </Text>
        </RequirementItem>
        <RequirementItem title="HeadShot Kills" logo={images.headShot}>
          <Text style={styles.descriptionText}>
            Use a sniper rifle to secure three headshot kills. Precision is key
            here, as only headshots will count towards this requirement.
          </Text>
        </RequirementItem>
        <RequirementItem
          title="Consecutive Kills"
          icon={'format-list-numbered'}>
          <Text style={styles.descriptionText}>
            The three headshot kills must be consecutive. This means you cannot
            miss any shots between these kills; maintain your accuracy and
            composure to complete this part of the challenge.
          </Text>
        </RequirementItem>
        <RequirementItem title="Minimum Distance" logo={images.distance}>
          <Text style={styles.descriptionText}>
            Each of the headshot kills must be made from a distance of at least
            50 meters. This adds an extra layer of difficulty, requiring you to
            engage enemies from a longer range.
          </Text>
        </RequirementItem>

        <TouchableOpacity style={styles.button} onPress={handleComplete}>
          <Text style={styles.buttonText}>Mark as Complete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#554f4a',
    padding: 15,
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 30,
    width: '70%',
    alignSelf: 'center', // Center the button
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    paddingBottom: 30,
  },
  ScrollContainer: {
    flex: 1,
    padding: 20,
  },
  contentContainerStyle: {
    paddingBottom: 50, // Add extra padding to ensure the button is visible
  },
  container: {},
  descriptionText: {
    color: '#f5f4f4',
  },
  item: {},
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bulletContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 30,
  },
  bullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fffefe',
    marginBottom: 2,
  },
  bulletLine: {
    width: 2,
    backgroundColor: '#ffffff',
    height: 'auto',
  },
  bulletLineExpanded: {
    width: 2,
    backgroundColor: '#fffefe',
    height: 15,
    flex: 1,
  },
  bulletSpacer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  expandedContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: 4,
  },
  content: {
    padding: 10,
    flex: 1,
  },
});

export default RequirementScreen;
